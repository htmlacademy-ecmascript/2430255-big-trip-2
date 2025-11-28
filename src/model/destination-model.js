import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations.js';

export default class DestinationModel extends Observable {
  #destinations = [];

  constructor() {
    super();
  }

  init() {
    this.#destinations = mockDestinations;
    this._notify('init');
  }

  getDestinations() {
    return this.#destinations;
  }

  setDestinations(destinations) {
    this.#destinations = [...destinations];
    this._notify('destinations:set', this.#destinations);
  }
}

