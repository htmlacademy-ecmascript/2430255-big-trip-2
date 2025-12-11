import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointModel extends Observable {
  #points = [];
  #api = null;

  constructor(api) {
    super();
    this.#api = api;
  }

  async init() {
    try {
      const points = await this.#api.points;
      this.#points = points;
      this._notify(UpdateType.INIT, { type: 'points' });
    } catch (error) {
      this.#points = [];
      this._notify(UpdateType.INIT, { type: 'points', error: true });
    }
  }

  get points() {
    return this.#points;
  }

  async updatePoint(updateType, update) {
    try {
      const response = await this.#api.updatePoint(update);
      const index = this.#points.findIndex((point) => point.id === update.id);

      if (index === -1) {
        throw new Error('Can\'t update unexisting point');
      }

      this.#points = [
        ...this.#points.slice(0, index),
        response,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, response);
    } catch (error) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, point) {
    try {
      const response = await this.#api.addPoint(point);
      this.#points = [response, ...this.#points];
      this._notify(updateType, response);
    } catch (error) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, point) {
    try {
      await this.#api.deletePoint(point.id);
      const index = this.#points.findIndex((p) => p.id === point.id);

      if (index === -1) {
        throw new Error('Can\'t delete unexisting point');
      }

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, point);
    } catch (error) {
      throw new Error('Can\'t delete point');
    }
  }
}
