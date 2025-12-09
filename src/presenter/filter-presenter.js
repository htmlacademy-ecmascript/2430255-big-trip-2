import FilterView from '../view/filter-view.js';
import { render, replace, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import { FilterType, UpdateType } from '../const.js';

export default class FilterPresenter {
  #container = null;
  #filterModel = null;
  #pointModel = null;
  #filterComponent = null;

  constructor({ container, filterModel, pointModel }) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const filters = this.#getFilters();
    const currentFilter = this.#filterModel.filter;

    const prevComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: currentFilter,
      onFilterChange: this.#handleFilterTypeChange,
    });

    if (prevComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevComponent);
    remove(prevComponent);
  }

  #getFilters() {
    const points = this.#pointModel.points;

    return Object.values(FilterType).map((type) => ({
      type,
      hasPoints: filter[type](points).length > 0,
    }));
  }

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.INIT || updateType === UpdateType.MINOR || updateType === UpdateType.MAJOR) {
      this.init();
    }
  };

  #handleFilterTypeChange = (newFilter) => {
    if (this.#filterModel.filter === newFilter) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, newFilter);
  };
}
