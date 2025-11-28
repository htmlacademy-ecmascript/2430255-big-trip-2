import Observable from '../framework/observable.js';
import { mockPoints } from '../mock/points.js';

export default class PointModel extends Observable {
  #points = [];

  constructor() {
    super();
  }

  init() {
    this.#points = mockPoints;
    this._notify('init');
  }

  getPoints() {
    return this.#points;
  }

  setPoints(points) {
    this.#points = [...points];
    this._notify('points:set', this.#points);
  }

  updatePoint(update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update point. Point with id=${update.id} not found`);
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify('points:update', update);
  }
}
