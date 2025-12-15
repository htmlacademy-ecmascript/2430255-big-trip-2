import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENT_TYPES, SHAKE_ANIMATION_TIMEOUT } from '../const.js';
import { convertDate, capitalizeFirstLetter } from '../utils/common.js';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

function createOffersTemplate(point, allOffersByType) {
  if (!allOffersByType || !allOffersByType.offers.length) {
    return '';
  }

  const selectedOffers = point.offers;

  return `
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${allOffersByType.offers
    .map(
      (offer) => `
          <div class="event__offer-selector">
            <input
              class="event__offer-checkbox visually-hidden"
              id="event-offer-${offer.id}"
              type="checkbox"
              name="event-offer-${offer.id}"
              ${selectedOffers.includes(offer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `
    )
    .join('')}
      </div>
    </section>
  `;
}

function createDestinationTemplate(destinationData) {
  if (!destinationData) {
    return '';
  }

  const { description, pictures } = destinationData;

  return `
    <section class="event__section event__section--destination">
      ${
  description
    ? `<p class="event__destination-description">${description}</p>`
    : ''
}
      ${
  pictures && pictures.length
    ? `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures
    .map(
      (photo) =>
        `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
    )
    .join('')}
          </div>
        </div>`
    : ''
}
    </section>
  `;
}

function getResetButtonText(isDeleting, isNewPoint) {
  if (isDeleting) {
    return 'Deleting...';
  }
  if (isNewPoint) {
    return 'Cancel';
  }
  return 'Delete';
}

function createPointEditFormTemplate(point, offers, destinations) {
  const { type, destination, basePrice, dateFrom, dateTo, id, isSaving, isDeleting, isDisabled } = point;

  const isNewPoint = !id;

  const destinationData = destinations.find((item) => item.id === destination);
  const offersByType = offers.find((item) => item.type === type);

  const startDate = dateFrom
    ? `${convertDate(dateFrom, 'CALENDAR_DATE')} ${convertDate(dateFrom, 'ONLY_TIME')}`
    : '';
  const endDate = dateTo
    ? `${convertDate(dateTo, 'CALENDAR_DATE')} ${convertDate(dateTo, 'ONLY_TIME')}`
    : '';

  const saveButtonText = isSaving ? 'Saving...' : 'Save';
  const disabledAttr = isDisabled ? 'disabled' : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post" autocomplete="off">
        <header class="event__header">

          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${type}.png"
                alt="Event type icon">
            </label>
            <input
              class="event__type-toggle visually-hidden"
              id="event-type-toggle-1"
              type="checkbox" ${disabledAttr}>

            <div class="event__type-list">
              <fieldset class="event__type-group" ${disabledAttr}>
                <legend class="visually-hidden">Event type</legend>
                ${EVENT_TYPES.map(
    (eventType) => `
                    <div class="event__type-item">
                      <input
                        id="event-type-${eventType}-1"
                        class="event__type-input visually-hidden"
                        type="radio"
                        name="event-type"
                        value="${eventType}"
                        ${eventType === type ? 'checked' : ''} ${disabledAttr}>
                      <label
                        class="event__type-label event__type-label--${eventType}"
                        for="event-type-${eventType}-1">
                        ${capitalizeFirstLetter(eventType)}
                      </label>
                    </div>
                  `
  ).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${capitalizeFirstLetter(type)}
            </label>
            <input
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destinationData ? destinationData.name : ''}"
              list="destination-list-1"
              required ${disabledAttr}>
            <datalist id="destination-list-1">
              ${destinations
    .map((dest) => `<option value="${dest.name}"></option>`)
    .join('')}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${startDate}"
              required ${disabledAttr}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${endDate}"
              required ${disabledAttr}>
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input event__input--price"
              id="event-price-1"
              type="number"
              name="event-price"
              value="${basePrice}"
              min="0"
              required ${disabledAttr}>
          </div>

          <button class="event__save-btn btn btn--blue" type="submit" ${(!destinationData || !dateFrom || !dateTo || basePrice === '' || isDisabled) ? 'disabled' : ''}>${saveButtonText}</button>
          <button class="event__reset-btn" type="reset">
            ${getResetButtonText(isDeleting, isNewPoint)}
          </button>

          ${!isNewPoint ? `
            <button class="event__rollup-btn" type="button" ${disabledAttr}>
              <span class="visually-hidden">Open event</span>
            </button>
          ` : ''}

        </header>

        <section class="event__details">
          ${createOffersTemplate(point, offersByType)}
          ${createDestinationTemplate(destinationData)}
        </section>
      </form>
    </li>
  `;
}

export default class PointEditFormView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #startDatepicker = null;
  #endDatepicker = null;
  #isValid = true;

  constructor({ point, offers, destinations }) {
    super();
    this._state = {
      ...structuredClone(point),
      offers: Array.isArray(point.offers) ? structuredClone(point.offers) : [],
      isSaving: false,
      isDeleting: false,
      isDisabled: false
    };

    this.#offers = offers;
    this.#destinations = destinations;
    this.#isValid = this.#validateForm();

    this._callback = {};
  }

  get template() {
    return createPointEditFormTemplate(
      this._state,
      this.#offers,
      this.#destinations
    );
  }

  reset(point) {
    this.updateElement({
      ...structuredClone(point),
      isSaving: false,
      isDeleting: false,
      isDisabled: false
    });
  }

  removeElement() {
    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }

    super.removeElement();
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('input', this.#validateFormHandler);

    const priceInput = this.element.querySelector('#event-price-1');
    if (priceInput) {
      priceInput.addEventListener('input', this.#priceInputHandler);
    }

    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((checkbox) =>
        checkbox.addEventListener('change', this.#offerToggleHandler)
      );

    const form = this.element.querySelector('form');
    if (form) {
      form.addEventListener('submit', this.#formSubmitHandler);
    }

    const rollupBtn = this.element.querySelector('.event__rollup-btn');
    if (rollupBtn) {
      rollupBtn.addEventListener('click', this._callback.rollupClick);
    }

    const resetBtn = this.element.querySelector('.event__reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', this.#deleteClickHandler);
    }

    this.#setDatepickers();
    this.#updateSaveButton();
  }

  setSaving() {
    this.updateElement({
      isSaving: true,
      isDisabled: true,
    });
  }

  setDeleting() {
    this.updateElement({
      isDeleting: true,
      isDisabled: true,
    });
  }

  setAborting() {
    const element = this.element;
    element.classList.add('shake');

    setTimeout(() => {
      element.classList.remove('shake');
      this.updateElement({
        isSaving: false,
        isDeleting: false,
        isDisabled: false,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupClick = callback;
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
  }

  #setDatepickers() {
    this.#startDatepicker?.destroy();
    this.#endDatepicker?.destroy();

    const startInput = this.element.querySelector('#event-start-time-1');
    const endInput = this.element.querySelector('#event-end-time-1');

    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: { firstDayOfWeek: 1 },
      'time_24hr': true,
    };

    this.#startDatepicker = flatpickr(startInput, {
      ...commonConfig,
      defaultDate: this._state.dateFrom || undefined,
      maxDate: this._state.dateTo || undefined,
      onClose: this.#startDateCloseHandler,
    });

    this.#endDatepicker = flatpickr(endInput, {
      ...commonConfig,
      defaultDate: this._state.dateTo || undefined,
      minDate: this._state.dateFrom || undefined,
      onClose: this.#endDateCloseHandler,
    });
  }

  #startDateCloseHandler = ([userDate]) => {
    this._setState({ dateFrom: userDate });
    this.#endDatepicker.set('minDate', userDate);
    this.#validateFormHandler();
  };

  #endDateCloseHandler = ([userDate]) => {
    this._setState({ dateTo: userDate });
    this.#startDatepicker.set('maxDate', userDate);
    this.#validateFormHandler();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;

    this.updateElement({
      type: newType,
      offers: [],
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value.trim();

    const selectedDestination = this.#destinations.find(
      (dest) => dest.name === value
    );

    if (!selectedDestination) {
      evt.target.value = '';
      this.updateElement({
        ...structuredClone(this._state),
        destination: null,
      });
      return;
    }

    this.updateElement({
      ...structuredClone(this._state),
      destination: selectedDestination.id,
    });

    this.#validateFormHandler();
  };

  #validateFormHandler = () => {
    this.#isValid = this.#validateForm();
    this.#updateSaveButton();
  };

  #validateForm() {
    const { destination, dateFrom, dateTo, basePrice } = this._state;
    const destinationData = this.#destinations.find((item) => item.id === destination);

    return destinationData && dateFrom && dateTo && basePrice !== '' && basePrice >= 0;
  }

  #updateSaveButton() {
    const saveButton = this.element.querySelector('.event__save-btn');
    if (saveButton) {
      saveButton.disabled = !this.#isValid || this._state.isDisabled;
    }
  }

  #offerToggleHandler = (evt) => {
    const offerId = evt.target.id.replace('event-offer-', '');

    const currentOffers = Array.isArray(this._state.offers) ? this._state.offers.slice() : [];

    let newOffers;
    if (evt.target.checked) {
      newOffers = Array.from(new Set([...currentOffers, offerId]));
    } else {
      newOffers = currentOffers.filter((id) => id !== offerId);
    }

    this._setState({ offers: newOffers });
  };

  #priceInputHandler = (evt) => {
    const value = evt.target.value;

    if (!/^\d*$/.test(value)) {
      evt.target.value = this._state.basePrice;
      return;
    }

    this._setState({
      basePrice: Number(value),
    });
    this.#validateFormHandler();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (this.#isValid) {
      this._callback.formSubmit?.(structuredClone(this._state));
    }
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick?.(structuredClone(this._state));
  };
}
