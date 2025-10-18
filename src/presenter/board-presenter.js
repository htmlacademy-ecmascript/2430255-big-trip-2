import { render } from '../render.js';
import PointEditFormView from '../view/edit-form-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import SortingView from '../view/sorting-view.js';

export default class BoardPresenter {
  sortingComponent = new SortingView();
  pointsListComponent = new PointsListView();

  constructor({ container, pointModel }) {
    this.mainContainer = container;
    this.pointModel = pointModel;
  }

  init() {
    this.points = this.pointModel.getPoints();
    this.offers = this.pointModel.getOffers();
    this.destinations = this.pointModel.getDestinations();

    render(this.sortingComponent, this.mainContainer);
    render(this.pointsListComponent, this.mainContainer);

    if (!this.points.length) {
      return;
    }

    this.renderPointEdit(this.points[0]);
    this.points.slice(1).forEach((point) => this.renderPoint(point));
  }

  renderPointEdit(point) {
    render(
      new PointEditFormView({
        point,
        offers: this.offers,
        destinations: this.destinations,
      }),
      this.pointsListComponent.getElement()
    );
  }

  renderPoint(point) {
    render(
      new PointView({
        point,
        offers: this.offers,
        destinations: this.destinations,
      }),
      this.pointsListComponent.getElement()
    );
  }
}
