import Observable from '../framework/observable.js';
import { mockOffers } from '../mock/offers.js';

export default class OfferModel extends Observable {
  #offers = [];

  constructor() {
    super();
  }

  init() {
    this.#offers = mockOffers;
    this._notify('init');
  }

  get offers() {
    return this.#offers;
  }

  set offers(offers) {
    this.#offers = [...offers];
    this._notify('offers:set', this.#offers);
  }
}
