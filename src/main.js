import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';

const headerElement = document.querySelector('.page-header');
const filterContainer = headerElement.querySelector('.trip-controls__filters');

const infoElement = headerElement.querySelector('.trip-main');

const mainElement = document.querySelector('.page-main');
const eventsContainer = mainElement.querySelector('.trip-events');

const pointModel = new PointModel();
const offerModel = new OfferModel();
const destinationModel = new DestinationModel();
const filterModel = new FilterModel();

pointModel.init();
offerModel.init();
destinationModel.init();

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  pointModel,
  filterModel,
});

const boardPresenter = new BoardPresenter({
  container: eventsContainer,
  pointModel,
  offerModel,
  destinationModel,
  filterModel,
});

const infoPresenter = new InfoPresenter({
  container: infoElement,
  pointModel,
  offerModel,
  destinationModel,
});

infoPresenter.init();
filterPresenter.init();
boardPresenter.init();
