export default class DestinationAdapter {
  static adaptToClient(destination) {
    return { ...destination };
  }

  static adaptToServer(destination) {
    return { ...destination };
  }
}
