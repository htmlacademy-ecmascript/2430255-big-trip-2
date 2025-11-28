import { render, replace } from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view.js';
import FilterView from '../view/filter-view.js';
import { FilterType, SortType } from '../const.js';
import { filter } from '../utils/filter.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sort.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #mainContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;

  #sortingComponent = null;
  #pointsListComponent = new PointsListView();
  #filterComponent = null;

  #currentFilter = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;

  #pointPresenters = new Map();

  constructor({ container, pointModel, offerModel, destinationModel }) {
    this.#mainContainer = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderApp();
  }

  #handleModelEvent = () => {
    this.#clearPoints();
    this.#renderPoints();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointModel.updatePoint(updatedPoint);
  };

  #handleFilterChange = (filterType) => {
    if (this.#currentFilter === filterType) {
      return;
    }

    this.#currentFilter = filterType;
    this.#currentSortType = SortType.DAY;

    this.#clearPoints();
    this.#renderSorting();
    this.#renderPoints();
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
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderApp() {
    this.#renderFilter();
    this.#renderSorting();
    this.#renderPointsList();
    this.#renderPoints();
  }

  #renderFilter() {
    const points = this.#pointModel.getPoints();

    const filters = Object.values(FilterType).map((type) => ({
      type,
      hasPoints: filter[type](points).length > 0,
    }));

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#currentFilter,
      onFilterChange: this.#handleFilterChange,
    });

    const headerElement = document.querySelector('.trip-controls__filters');
    render(this.#filterComponent, headerElement);
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

  #renderSorting() {
    const prevSortingComponent = this.#sortingComponent;

    this.#sortingComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    if (prevSortingComponent === null) {
      render(this.#sortingComponent, this.#mainContainer);
      return;
    }

    replace(this.#sortingComponent, prevSortingComponent);
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#mainContainer);
  }

  #renderPoints() {
    const points = this.#pointModel.getPoints();
    const filteredPoints = filter[this.#currentFilter](points);
    const sortedPoints = this.#getSortedPoints(filteredPoints);

    if (!sortedPoints.length) {
      this.#pointsListComponent.element.innerHTML = `
        <p class="trip-events__msg">
          There are no ${this.#currentFilter} events now
        </p>`;
      return;
    }

    sortedPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const presenter = new PointPresenter({
      container: this.#pointsListComponent.element,
      offers: this.#offerModel.getOffers(),
      destinations: this.#destinationModel.getDestinations(),
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    presenter.init(point);
    this.#pointPresenters.set(point.id, presenter);
  }
}
