export default class PointAdapter {
  static adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] ? new Date(point['date_from']) : null,
      dateTo: point['date_to'] ? new Date(point['date_to']) : null,
      isFavorite: point['is_favorite'],
      isSaving: false,
      isDeleting: false,
      isDisabled: false,
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = {
      'base_price': point.basePrice,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : point.dateFrom,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : point.dateTo,
      'is_favorite': !!point.isFavorite,
      destination: point.destination,
      offers: Array.isArray(point.offers) ? point.offers.slice() : [],
      type: point.type,
    };

    if ('id' in adaptedPoint) {
      delete adaptedPoint.id;
    }

    return adaptedPoint;
  }
}
