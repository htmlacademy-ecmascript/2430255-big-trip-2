import { mockPoints } from '../mock/points.js';

export default class PointModel {
  #points = [];

  constructor() {
    this.#points = [];
  }

  init() {
    this.#points = mockPoints;
  }

  get points() {
    return this.#points;
  }
}
