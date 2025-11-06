// presenter/point-presenter.js
import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditFormView from '../view/edit-form-view.js';
import { isEscapeKey } from '../utils/utils.js';

export default class PointPresenter {
  #container = null;
  #point = null;
  #offers = [];
  #destinations = [];

  #pointComponent = null;
  #pointEditComponent = null;

  constructor({ container, offers, destinations }) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
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
    });

    this.#pointComponent.setRollupButtonClickHandler(() =>
      this.#replacePointToForm()
    );
    this.#pointEditComponent.setFormSubmitHandler(() =>
      this.#replaceFormToPoint()
    );
    this.#pointEditComponent.setRollupButtonClickHandler(() =>
      this.#replaceFormToPoint()
    );

    if (!prevPointComponent || !prevEditComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    replace(this.#pointComponent, prevPointComponent);
    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}
