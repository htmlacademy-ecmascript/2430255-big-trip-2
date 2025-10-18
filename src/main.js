import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import FilterView from './view/filter-view.js';
import PointModel from './model/point-model.js';
import { render } from './render.js';

const headerElement = document.querySelector('.page-header');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const infoElement = headerElement.querySelector('.trip-main');

const mainElement = document.querySelector('.page-main');
const eventsContainer = mainElement.querySelector('.trip-events');

const pointModel = new PointModel();

const boardPresenter = new BoardPresenter({
  container: eventsContainer,
  pointModel: pointModel,
});

const infoPresenter = new InfoPresenter({
  container: infoElement,
  pointModel: pointModel,
});

render(new FilterView(), filterElement);

pointModel.init();
infoPresenter.init();
boardPresenter.init();
