import Observable from '../framework/observable.js';

export default class DestinationModel extends Observable {
  #destinations = [];
  #api = null;

  constructor(api) {
    super();
    this.#api = api;
  }

  async init() {
    try {
      this.#destinations = await this.#api.destinations;
      this._notify('init');
    } catch (error) {
      this.#destinations = [];
      this._notify('init');
    }
  }

  get destinations() {
    return this.#destinations;
  }
}
