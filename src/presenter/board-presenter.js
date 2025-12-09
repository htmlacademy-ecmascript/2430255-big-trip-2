import { render, replace, remove } from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorView from '../view/error-view.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sort.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class BoardPresenter {
  #mainContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #filterModel = null;

  #sortingComponent = null;
  #pointsListComponent = new PointsListView();
  #loadingComponent = new LoadingView();
  #errorComponent = new ErrorView();

  #currentSortType = SortType.DAY;
  #pointPresenters = new Map();
  #newPointPresenter = null;

  #isLoading = true;
  #isError = false;
  #pointsLoaded = false;
  #offersLoaded = false;
  #destinationsLoaded = false;
  #hasAnyError = false;

  constructor({
    container,
    pointModel,
    offerModel,
    destinationModel,
    filterModel,
  }) {
    this.#mainContainer = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#offerModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();

    const newEventButton = document.querySelector('.trip-main__event-add-btn');
    if (newEventButton) {
      newEventButton.removeEventListener('click', this.#handleNewPointClick);
      newEventButton.addEventListener('click', this.#handleNewPointClick);
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        if (data && data.type) {
          if (data.type === 'points') {
            this.#pointsLoaded = true;
          } else if (data.type === 'offers') {
            this.#offersLoaded = true;
          } else if (data.type === 'destinations') {
            this.#destinationsLoaded = true;
          }

          if (data.error) {
            this.#hasAnyError = true;
          }
        }

        if (!this.#pointsLoaded || !this.#offersLoaded || !this.#destinationsLoaded) {
          this.#isLoading = true;
          this.#clearBoard();
          this.#renderBoard();
          return;
        }

        this.#isLoading = false;
        this.#isError = this.#hasAnyError;
        this.#clearBoard();
        this.#renderBoard();
        break;

      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderPoints();
        break;

      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        await this.#pointModel.updatePoint(updateType, update);
        break;

      case UserAction.ADD_POINT:
        await this.#pointModel.addPoint(updateType, update);
        break;

      case UserAction.DELETE_POINT:
        await this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((p) => p.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#clearPoints();
    this.#renderPoints();
  };

  #handleNewPointClick = (evt) => {
    evt.preventDefault();
    this.#handleModeChange();
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#currentSortType = SortType.DAY;
    evt.target.disabled = true;
    this.#newPointPresenter.setContainer(this.#pointsListComponent.element);
    this.#newPointPresenter.init();
  };

  #handleNewPointDestroy = () => {
    const btn = document.querySelector('.trip-main__event-add-btn');
    if (btn) {
      btn.disabled = false;
    }
  };

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#isError) {
      this.#renderError();
      return;
    }

    this.#renderSorting();
    this.#clearPointList();
    render(this.#pointsListComponent, this.#mainContainer);
    this.#renderPoints();

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#pointsListComponent.element,
      offers: this.#offerModel.offers,
      destinations: this.#destinationModel.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointDestroy,
    });
  }

  #clearBoard() {
    remove(this.#loadingComponent);
    remove(this.#errorComponent);
    remove(this.#sortingComponent);
    this.#clearPoints();
    this.#sortingComponent = null;
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer);
  }

  #renderError() {
    render(this.#errorComponent, this.#mainContainer);
  }

  #renderSorting() {
    const prev = this.#sortingComponent;

    this.#sortingComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    if (!prev) {
      render(this.#sortingComponent, this.#mainContainer, 'afterbegin');
      return;
    }

    replace(this.#sortingComponent, prev);
    remove(prev);
  }

  #renderPoints() {
    this.#clearPointList();

    const filtered = this.#getFilteredPoints();
    const sorted = this.#getSortedPoints(filtered);

    if (!sorted.length) {
      this.#pointsListComponent.element.innerHTML = `
      <p class="trip-events__msg">
        There are no ${this.#filterModel.filter} events now
      </p>`;
      return;
    }

    sorted.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const presenter = new PointPresenter({
      container: this.#pointsListComponent.element,
      offers: this.#offerModel.offers,
      destinations: this.#destinationModel.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    presenter.init(point);
    this.#pointPresenters.set(point.id, presenter);
  }

  #getFilteredPoints() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;

    return filter[filterType](points);
  }

  #getSortedPoints(points) {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...points].sort(sortByTime);
      case SortType.PRICE:
        return [...points].sort(sortByPrice);
      default:
        return [...points].sort(sortByDay);
    }
  }

  #clearPoints() {
    this.#pointPresenters.forEach((p) => p.destroy());
    this.#pointPresenters.clear();
  }

  #clearPointList() {
    this.#pointsListComponent.element.innerHTML = '';
  }
}
