import { render, replace, remove } from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view.js';
import { SortType, UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sort.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #mainContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #filterModel = null;

  #sortingComponent = null;
  #pointsListComponent = new PointsListView();

  #currentSortType = SortType.DAY;
  #pointPresenters = new Map();

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
  }

  init() {
    this.#renderBoard();
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
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

  #handleModeChange = () => {
    this.#pointPresenters.forEach((p) => p.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointModel.updatePoint(updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#clearPoints();
    this.#renderPoints();
  };

  #clearPoints() {
    this.#pointPresenters.forEach((p) => p.destroy());
    this.#pointPresenters.clear();
  }

  #clearBoard() {
    this.#clearPoints();

    remove(this.#sortingComponent);
    this.#sortingComponent = null;
  }

  #renderBoard() {
    this.#renderSorting();
    render(this.#pointsListComponent, this.#mainContainer);
    this.#renderPoints();
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

  #renderPoints() {
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
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    presenter.init(point);
    this.#pointPresenters.set(point.id, presenter);
  }
}
