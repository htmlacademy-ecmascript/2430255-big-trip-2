import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditFormView from '../view/edit-form-view.js';
import { isEscapeKey } from '../utils/common.js';

export default class PointPresenter {
  #container = null;
  #point = null;
  #offers = [];
  #destinations = [];

  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  constructor({ container, offers, destinations, onDataChange, onModeChange }) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    this.#pointEditComponent = new PointEditFormView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
    });

    this.#pointEditComponent._restoreHandlers();

    this.#pointComponent.setRollupButtonClickHandler(() =>
      this.#replacePointToForm()
    );
    this.#pointEditComponent.setFormSubmitHandler(() =>
      this.#replaceFormToPoint()
    );
    this.#pointEditComponent.setRollupButtonClickHandler(() =>
      this.#replaceFormToPoint()
    );
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (!prevPointComponent || !prevEditComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    replace(this.#pointComponent, prevPointComponent);
    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (
      this.#pointEditComponent &&
      this.#container.contains(this.#pointEditComponent.element)
    ) {
      this.#replaceFormToPoint();
    }
  }

  #handleFormSubmit = (updatedPoint) => {
    this.#handleDataChange(updatedPoint);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #replacePointToForm() {
    this.#handleModeChange();
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #replaceFormToPoint() {
    this.#pointEditComponent.reset(this.#point);
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };
}
