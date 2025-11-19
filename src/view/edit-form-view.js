import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENT_TYPES } from '../const.js';
import { convertDate, capitalizeFirstLetter } from '../utils/common.js';

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

function createPointEditFormTemplate(point, offers, destinations) {
  const { type, destination, basePrice, dateFrom, dateTo } = point;

  const destinationData = destinations.find((item) => item.id === destination);
  const offersByType = offers.find((item) => item.type === type);

  const startDate = `${convertDate(dateFrom, 'CALENDAR_DATE')} ${convertDate(
    dateFrom,
    'ONLY_TIME'
  )}`;
  const endDate = `${convertDate(dateTo, 'CALENDAR_DATE')} ${convertDate(
    dateTo,
    'ONLY_TIME'
  )}`;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
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
              type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
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
                        ${eventType === type ? 'checked' : ''}>
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
              list="destination-list-1">
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
              value="${startDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${endDate}">
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
              value="${basePrice}">
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
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

  constructor({ point, offers, destinations }) {
    super();
    this._state = structuredClone(point);
    this.#offers = offers;
    this.#destinations = destinations;

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
    this.updateElement(structuredClone(point));
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputHandler);

    this.element
      .querySelector('#event-start-time-1')
      .addEventListener('change', this.#startDateChangeHandler);

    this.element
      .querySelector('#event-end-time-1')
      .addEventListener('change', this.#endDateChangeHandler);

    this.element
      .querySelector('#event-price-1')
      .addEventListener('input', this.#priceInputHandler);

    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((checkbox) =>
        checkbox.addEventListener('change', this.#offerToggleHandler)
      );

    this.setFormSubmitHandler(this._callback.formSubmit);

    this.setRollupButtonClickHandler(this._callback.rollupClick);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._callback.rollupClick);
  }

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
    const value = evt.target.value;

    const selectedDestination = this.#destinations.find(
      (dest) => dest.name === value
    );

    if (!selectedDestination) {
      return;
    }

    this.updateElement({
      destination: selectedDestination.id,
    });
  };

  #offerToggleHandler = (evt) => {
    const offerId = Number(evt.target.id.replace('event-offer-', ''));

    let newOffers = [];

    if (evt.target.checked) {
      newOffers = [...this._state.offers, offerId];
    } else {
      newOffers = this._state.offers.filter((id) => id !== offerId);
    }

    this._setState({ offers: newOffers });
  };

  #priceInputHandler = (evt) => {
    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  #startDateChangeHandler = (evt) => {
    this._setState({
      dateFrom: new Date(evt.target.value),
    });
  };

  #endDateChangeHandler = (evt) => {
    this._setState({
      dateTo: new Date(evt.target.value),
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit?.();
  };
}
