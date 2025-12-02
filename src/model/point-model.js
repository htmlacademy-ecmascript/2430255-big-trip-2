import Observable from '../framework/observable.js';
import { mockPoints } from '../mock/points.js';
import { UpdateType } from '../const.js';

export default class PointModel extends Observable {
  #points = [];

  constructor() {
    super();
  }

  init() {
    this.#points = mockPoints;
    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = [...points];
    this._notify(UpdateType.MINOR, this.#points);
  }

  updatePoint(update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(
        `Can't update point. Point with id=${update.id} not found`
      );
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(UpdateType.MINOR, update);
  }

  addPoint(point) {
    const pointWithId = {
      ...point,
      id: point.id ?? `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };

    this.#points = [pointWithId, ...this.#points];
    this._notify(UpdateType.MAJOR, pointWithId);
  }

  deletePoint(point) {
    const index = this.#points.findIndex((p) => p.id === point.id);

    if (index === -1) {
      throw new Error(
        `Can't delete point. Point with id=${point.id} not found`
      );
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(UpdateType.MAJOR, point);
  }
}
