import TripInfoView from '../view/trip-info-view.js';
import { render } from '../render.js';

export default class InfoPresenter {
  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.tripInfoComponent = null;
  }

  init() {
    const points = this.pointsModel.getPoints();
    this.tripInfoComponent = new TripInfoView({ points });
    render(this.tripInfoComponent, this.container, 'afterbegin');
  }
}
