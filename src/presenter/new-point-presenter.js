import { render, remove } from '../framework/render.js';
import PointEditFormView from '../view/edit-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #offers = null;
  #destinations = null;
  #onDataChange = null;
  #onDestroy = null;

  #newPointComponent = null;

  constructor({ container, offers, destinations, onDataChange, onDestroy }) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  setContainer(container) {
    this.#container = container;
  }

  init() {
    if (this.#newPointComponent) {
      return;
    }

    this.#newPointComponent = new PointEditFormView({
      point: this.#createEmptyPoint(),
      offers: this.#offers,
      destinations: this.#destinations,
    });

    this.#newPointComponent._restoreHandlers();
    this.#newPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#newPointComponent.setDeleteClickHandler(this.#handleCancel);

    render(this.#newPointComponent, this.#container, 'afterbegin');
  }

  destroy() {
    if (!this.#newPointComponent) {
      return;
    }

    remove(this.#newPointComponent);
    this.#newPointComponent = null;

    if (this.#onDestroy) {
      this.#onDestroy();
    }
  }

  #handleFormSubmit = (point) => {
    this.#onDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point
    );

    this.destroy();
  };

  #handleCancel = () => {
    this.destroy();
  };

  #createEmptyPoint() {
    return {
      id: null,
      type: 'flight',
      dateFrom: null,
      dateTo: null,
      destination: null,
      basePrice: '',
      isFavorite: false,
      offers: []
    };
  }
}
