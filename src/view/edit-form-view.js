import AbstractView from '../framework/view/abstract-view';
import { EVENT_TYPES } from '../const.js';
import { convertDate, capitalizeFirstLetter } from '../utils.js';

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

export default class PointEditFormView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;

  constructor({ point, offers, destinations }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this._callback = {};
  }

  get template() {
    return createPointEditFormTemplate(
      this.#point,
      this.#offers,
      this.#destinations
    );
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  setRollupButtonClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._callback.rollupClick);
  }
}
