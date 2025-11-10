import { render } from '../framework/render.js';
import PointsListView from '../view/points-list-view.js';
import SortingView from '../view/sorting-view.js';
import FilterView from '../view/filter-view.js';
import { FilterType, SortType } from '../const.js';
import { filter } from '../utils/filter.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sort.js';
import { updateItem } from '../utils/common.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #mainContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;

  #sortingComponent = null;
  #pointsListComponent = new PointsListView();
  #filterComponent = null;

  #points = [];
  #offers = [];
  #destinations = [];
  #currentFilter = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;

  #pointPresenters = new Map();

  constructor({ container, pointModel, offerModel, destinationModel }) {
    this.#mainContainer = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
  }

  init() {
    this.#points = this.#pointModel.points;
    this.#offers = this.#offerModel.offers;
    this.#destinations = this.#destinationModel.destinations;

    this.#renderApp();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    const presenter = this.#pointPresenters.get(updatedPoint.id);
    if (presenter) {
      presenter.init(updatedPoint);
    }
  };

  #handleFilterChange = (filterType) => {
    if (this.#currentFilter === filterType) {
      return;
    }
    this.#currentFilter = filterType;
    this.#clearPoints();
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
    const filters = Object.values(FilterType).map((type) => ({
      type,
      hasPoints: filter[type](this.#points).length > 0,
    }));

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#currentFilter,
      onFilterChange: this.#handleFilterChange,
    });

    const headerElement = document.querySelector('.trip-controls__filters');
    render(this.#filterComponent, headerElement);
  }

  #renderSorting() {
    this.#sortingComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortingComponent, this.#mainContainer);
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#mainContainer);
  }

  #renderPoints() {
    const filteredPoints = filter[this.#currentFilter](this.#points);
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
      offers: this.#offers,
      destinations: this.#destinations,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    presenter.init(point);
    this.#pointPresenters.set(point.id, presenter);
  }
}
