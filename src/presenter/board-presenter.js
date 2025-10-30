import { render } from '../framework/render.js';
import PointEditFormView from '../view/edit-form-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import SortingView from '../view/sorting-view.js';

export default class BoardPresenter {
  #sortingComponent = new SortingView();
  #pointsListComponent = new PointsListView();
  #mainContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #points = null;
  #offers = null;
  #destinations = null;

  constructor({ container, pointModel, offerModel, destinationModel }) {
    this.#mainContainer = container;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
  }

  init() {
    this.#points = this.#pointModel.points;
    this.#offers = this.#offerModel.offers;
    this.#destinations = this.#destinationModel.destinations;

    render(this.#sortingComponent, this.#mainContainer);
    render(this.#pointsListComponent, this.#mainContainer);

    if (!this.#points.length) {
      return;
    }

    // this.#renderPointEdit(this.#points[0]);
    // this.#points.slice(1).forEach((point) => this.#renderPoint(point));
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderPointEdit(point) {
    render(
      new PointEditFormView({
        point,
        offers: this.#offers,
        destinations: this.#destinations,
      }),
      this.#pointsListComponent.element
    );
  }

  #renderPoint(point) {
    const pointComponent = new PointView({
      point,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    const pointEditComponent = new PointEditFormView({
      point,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    const replacePointToForm = () => {
      this.#pointsListComponent.element.replaceChild(
        pointEditComponent.element,
        pointComponent.element
      );

      document.addEventListener('keydown', onEscKeyDown);
    };

    const replaceFormToPoint = () => {
      this.#pointsListComponent.element.replaceChild(
        pointComponent.element,
        pointEditComponent.element
      );

      document.removeEventListener('keydown', onEscKeyDown);
    };

    function onEscKeyDown(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
      }
    }

    pointComponent.setRollupButtonClickHandler(() => {
      replacePointToForm();
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
    });

    pointEditComponent.setRollupButtonClickHandler(() => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#pointsListComponent.element);
  }
}
