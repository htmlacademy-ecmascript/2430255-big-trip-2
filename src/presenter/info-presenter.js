import TripInfoView from '../view/trip-info-view.js';
import { render } from '../framework/render.js';

export default class InfoPresenter {
  #container = null;
  #pointModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.getPoints();
    this.#tripInfoComponent = new TripInfoView({ points });
    render(this.#tripInfoComponent, this.#container, 'afterbegin');
  }
}
