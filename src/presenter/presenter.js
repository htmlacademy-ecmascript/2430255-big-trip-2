import PointEditFormView from '../view/edit-form-view.js';
import EditListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortingView from '../view/sorting-view.js';
import { render } from '../render.js';

export default class Presenter {
  sortingComponent = new SortingView();
  eventListComponent = new EditListView();

  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(this.sortingComponent, this.container);
    render(this.eventListComponent, this.container);
    render(new PointEditFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(
        new PointView({ point: this.points[i] }),
        this.eventListComponent.getElement()
      );
    }
  }
}
