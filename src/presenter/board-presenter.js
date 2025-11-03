import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/utils.js';
import PointEditFormView from '../view/edit-form-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import SortingView from '../view/sorting-view.js';
import FilterView from '../view/filter-view.js';
import { FilterType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class BoardPresenter {
  #sortingComponent = new SortingView();
  #pointsListComponent = new PointsListView();
  #mainContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #filterComponent = null;

  #points = [];
  #offers = [];
  #destinations = [];
  #currentFilter = FilterType.EVERYTHING;

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

  #handleFilterChange = (filterType) => {
    if (this.#currentFilter === filterType) {
      return;
    }
    this.#currentFilter = filterType;
    this.#clearPoints();
    this.#renderPoints();
  };

  #clearPoints() {
    this.#pointsListComponent.element.innerHTML = '';
  }

  #renderSorting() {
    render(this.#sortingComponent, this.#mainContainer);
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#mainContainer);
  }

  #renderPoints() {
    const filteredPoints = filter[this.#currentFilter](this.#points);

    if (!filteredPoints.length) {
      this.#pointsListComponent.element.innerHTML = `<p class="trip-events__msg">There are no ${
        this.#currentFilter
      } events now</p>`;
      return;
    }

    filteredPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointComponent = new PointView({
      point,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    const pointEditComponent = new PointEditFormView({
      point,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    const onEscKeyDown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
      }
    };

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', onEscKeyDown);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    }

    pointComponent.setRollupButtonClickHandler(replacePointToForm);
    pointEditComponent.setFormSubmitHandler(replaceFormToPoint);
    pointEditComponent.setRollupButtonClickHandler(replaceFormToPoint);

    render(pointComponent, this.#pointsListComponent.element);
  }
}
