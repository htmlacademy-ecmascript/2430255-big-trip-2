import AbstractView from '../framework/view/abstract-view';
import { calculateTotalPrice, getRouteInfo } from '../utils/common.js';

function createTripInfoTemplate(points, destinations) {
  if (!points || points.length === 0) {
    return `
      <section class="trip-main__trip-info trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">No points</h1>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
        </p>
      </section>
    `;
  }

  const totalPrice = calculateTotalPrice(points);
  const routeInfo = getRouteInfo(points, destinations);

  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${routeInfo.title}</h1>
        <p class="trip-info__dates">${routeInfo.dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>
  `;
}

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor({ points, destinations }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations);
  }
}
