import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

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
      this._notify(UpdateType.INIT, { type: 'offers' });
    } catch (error) {
      this.#offers = [];
      this._notify(UpdateType.INIT, { type: 'offers', error: true });
    }
  }


  get offers() {
    return this.#offers;
  }
}
