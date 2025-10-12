import { POINTS_COUNT } from '../const.js';
import { getRandomPoints } from '../mock/points.js';

export default class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getRandomPoints);

  getPoints() {
    return this.points;
  }
}
