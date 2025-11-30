import TripInfoView from '../view/trip-info-view.js';
import { render, replace } from '../framework/render.js';

export default class InfoPresenter {
  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointModel, destinationModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderInfo();
  }

  #renderInfo() {
    const points = this.#pointModel.points;
    const destinations = this.#destinationModel.destinations;

    const prevComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      points,
      destinations,
    });

    if (prevComponent === null) {
      render(this.#tripInfoComponent, this.#container, 'afterbegin');
      return;
    }

    replace(this.#tripInfoComponent, prevComponent);
  }

  #handleModelEvent = () => {
    this.#renderInfo();
  };
}
