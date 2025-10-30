import { mockOffers } from '../mock/offers.js';

export default class OfferModel {
  #offers = [];

  constructor() {
    this.#offers = [];
  }

  init() {
    this.#offers = mockOffers;
  }

  get offers() {
    return this.#offers;
  }
}
