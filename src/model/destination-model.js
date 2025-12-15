import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationModel extends Observable {
  #destinations = [];
  #api = null;

  constructor(api) {
    super();
    this.#api = api;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#api.destinations;
      this._notify(UpdateType.INIT, { type: 'destinations' });
    } catch (error) {
      this.#destinations = [];
      this._notify(UpdateType.INIT, { type: 'destinations', error: true });
    }
  }
}
