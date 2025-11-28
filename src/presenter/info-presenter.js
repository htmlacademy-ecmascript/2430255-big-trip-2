import TripInfoView from '../view/trip-info-view.js';
import { render } from '../framework/render.js';

export default class InfoPresenter {
  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointModel, destinationModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
  }

  init() {
    const points = this.#pointModel.getPoints();
    const destinations = this.#destinationModel.getDestinations();

    this.#tripInfoComponent = new TripInfoView({
      points,
      destinations,
    });

    render(this.#tripInfoComponent, this.#container, 'afterbegin');
  }
}

