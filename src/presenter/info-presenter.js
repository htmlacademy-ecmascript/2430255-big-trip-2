import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UpdateType } from '../const.js';

export default class InfoPresenter {
  #container = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointModel, destinationModel, offerModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
    if (this.#offerModel) {
      this.#offerModel.addObserver(this.#handleModelEvent);
    }
  }

  init() {
    this.#renderInfo();
  }

  #renderInfo() {
    const points = this.#pointModel.points;
    const destinations = this.#destinationModel.destinations;
    const offers = this.#offerModel ? this.#offerModel.offers : [];

    if (points.length === 0) {
      if (this.#tripInfoComponent) {
        remove(this.#tripInfoComponent);
        this.#tripInfoComponent = null;
      }
      return;
    }

    const prevComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      points,
      destinations,
      offers,
    });

    if (prevComponent === null) {
      render(this.#tripInfoComponent, this.#container, 'afterbegin');
      return;
    }

    replace(this.#tripInfoComponent, prevComponent);
    remove(prevComponent);
  }

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.INIT || updateType === UpdateType.MINOR || updateType === UpdateType.MAJOR) {
      this.#renderInfo();
    }
  };
}
