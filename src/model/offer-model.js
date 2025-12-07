import Observable from '../framework/observable.js';

export default class OfferModel extends Observable {
  #offers = [];
  #api = null;

  constructor(api) {
    super();
    this.#api = api;
  }

  async init() {
    try {
      this.#offers = await this.#api.offers;
      this._notify('init');
    } catch (error) {
      this.#offers = [];
      this._notify('init');
    }
  }

  get offers() {
    return this.#offers;
  }
}
