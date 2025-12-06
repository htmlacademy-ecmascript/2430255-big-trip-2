export default class PointAdapter {
  /**
   * Преобразует данные точки с сервера в клиентский формат
   * @param {Object} point - данные с сервера
   * @returns {Object} точка в формате приложения
   */
  static adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    // Удаляем лишние поля, если они есть
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  /**
   * Преобразует данные точки из клиентского формата в формат сервера
   * @param {Object} point - данные точки в формате приложения
   * @returns {Object} точка в формате сервера
   */
  static adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    // Удаляем лишние поля
    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
