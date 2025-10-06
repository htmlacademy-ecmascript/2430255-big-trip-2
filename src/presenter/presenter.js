import PointEditFormView from '../view/edit-form-view.js';
import EditListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortingView from '../view/sorting-view.js';
import { render } from '../render.js';

const POINTS_COUNT = 3;

export default class Presenter {
  sortingComponent = new SortingView();
  eventListComponent = new EditListView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortingComponent, this.container);
    render(this.eventListComponent, this.container);
    render(new PointEditFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView(), this.eventListComponent.getElement());
    }
  }
}
