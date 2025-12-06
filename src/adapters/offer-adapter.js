export default class OfferAdapter {
  /**
   * Преобразует данные предложений с сервера в клиентский формат
   * @param {Object} offer - данные с сервера
   * @returns {Object} предложение в формате приложения
   */
  static adaptToClient(offer) {
    // В данном случае структура совпадает
    return { ...offer };
  }

  /**
   * Преобразует данные предложений в формат сервера
   * @param {Object} offer - данные предложения
   * @returns {Object} предложение в формате сервера
   */
  static adaptToServer(offer) {
    return { ...offer };
  }
}
