import { mockDestinations } from '../mock/destinations.js';

export default class DestinationModel {
  #destinations = [];

  constructor() {
    this.#destinations = [];
  }

  init() {
    this.#destinations = mockDestinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
