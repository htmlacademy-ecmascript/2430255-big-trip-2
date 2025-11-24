import AbstractView from '../framework/view/abstract-view';

function createEditListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class PointsListView extends AbstractView {
  get template() {
    return createEditListTemplate();
  }
}
