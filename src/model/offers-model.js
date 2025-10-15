import { mockOffers } from '../mock/offers.js';

export default class OffersModel {
  constructor() {
    this.offers = [];
  }

  init() {
    this.offers = mockOffers;
  }

  getOffers() {
    return this.offers;
  }
}
