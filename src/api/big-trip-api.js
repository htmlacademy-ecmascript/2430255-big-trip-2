import ApiService from '../framework/api-service.js';
import PointAdapter from '../adapters/point-adapter.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const Url = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export default class BigTripApi extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  get points() {
    return this._load({ url: Url.POINTS })
      .then(ApiService.parseResponse)
      .then((points) => points.map(PointAdapter.adaptToClient));
  }

  get destinations() {
    return this._load({ url: Url.DESTINATIONS })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: Url.OFFERS })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const adaptedPoint = PointAdapter.adaptToServer(point);
    const response = await this._load({
      url: `${Url.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptedPoint),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return PointAdapter.adaptToClient(parsedResponse);
  }

  async addPoint(point) {
    const adaptedPoint = PointAdapter.adaptToServer(point);
    const response = await this._load({
      url: Url.POINTS,
      method: Method.POST,
      body: JSON.stringify(adaptedPoint),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return PointAdapter.adaptToClient(parsedResponse);
  }

  async deletePoint(id) {
    await this._load({
      url: `${Url.POINTS}/${id}`,
      method: Method.DELETE,
    });
  }
}
