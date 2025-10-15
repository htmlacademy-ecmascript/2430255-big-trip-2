import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import { render } from './render.js';

const headerElement = document.querySelector('.page-header');
const filterElement = headerElement.querySelector('.trip-controls__filters');
const infoElement = headerElement.querySelector('.trip-main');

const mainElement = document.querySelector('.page-main');
const eventsContainer = mainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

pointsModel.init();
offersModel.init();
destinationsModel.init();

const boardPresenter = new BoardPresenter({
  container: eventsContainer,
  pointsModel,
  offersModel,
  destinationsModel,
});

const infoPresenter = new InfoPresenter({
  container: infoElement,
  pointsModel,
});

render(new FilterView(), filterElement);

infoPresenter.init();
boardPresenter.init();
