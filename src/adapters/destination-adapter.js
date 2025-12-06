export default class DestinationAdapter {
  /**
   * Преобразует данные направления с сервера в клиентский формат
   * @param {Object} destination - данные с сервера
   * @returns {Object} направление в формате приложения
   */
  static adaptToClient(destination) {
    // В данном случае структура совпадает, но оставляем для будущих изменений
    return { ...destination };
  }

  /**
   * Преобразует данные направления в формат сервера
   * @param {Object} destination - данные направления
   * @returns {Object} направление в формате сервера
   */
  static adaptToServer(destination) {
    return { ...destination };
  }
}
