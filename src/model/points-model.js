import { mockPoints } from '../mock/points.js';

export default class PointsModel {
  constructor() {
    this.points = [];
  }

  init() {
    this.points = mockPoints;
  }

  getPoints() {
    return this.points;
  }
}
