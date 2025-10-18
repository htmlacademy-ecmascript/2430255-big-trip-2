import TripInfoView from '../view/trip-info-view.js';
import { render } from '../render.js';

export default class InfoPresenter {
  constructor({ container, pointModel }) {
    this.container = container;
    this.pointModel = pointModel;
    this.tripInfoComponent = null;
  }

  init() {
    const points = this.pointModel.getPoints();
    this.tripInfoComponent = new TripInfoView({ points });
    render(this.tripInfoComponent, this.container, 'afterbegin');
  }
}
