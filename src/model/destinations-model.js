import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  constructor() {
    this.destinations = [];
  }

  init() {
    this.destinations = mockDestinations;
  }

  getDestinations() {
    return this.destinations;
  }
}
