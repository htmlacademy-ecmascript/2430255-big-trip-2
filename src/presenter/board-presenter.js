import PointEditFormView from '../view/edit-form-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import SortingView from '../view/sorting-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  sortingComponent = new SortingView();
  pointsListComponent = new PointsListView();

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.offersModel.getOffers()];
    this.destinations = [...this.destinationsModel.getDestinations()];

    render(this.sortingComponent, this.container);
    render(this.pointsListComponent, this.container);

    if (this.points.length > 0) {
      render(
        new PointEditFormView({
          point: this.points[0],
          offers: this.offers,
          destinations: this.destinations,
        }),
        this.pointsListComponent.getElement()
      );
    }

    for (let i = 0; i < this.points.length; i++) {
      render(
        new PointView({
          point: this.points[i],
          offers: this.offers,
          destinations: this.destinations,
        }),
        this.pointsListComponent.getElement()
      );
    }
  }
}
