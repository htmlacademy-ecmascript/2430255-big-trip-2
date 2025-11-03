import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';

const headerElement = document.querySelector('.page-header');
const infoElement = headerElement.querySelector('.trip-main');

const mainElement = document.querySelector('.page-main');
const eventsContainer = mainElement.querySelector('.trip-events');

const pointModel = new PointModel();
const offerModel = new OfferModel();
const destinationModel = new DestinationModel();

pointModel.init();
offerModel.init();
destinationModel.init();

const boardPresenter = new BoardPresenter({
  container: eventsContainer,
  pointModel,
  offerModel,
  destinationModel,
});

const infoPresenter = new InfoPresenter({
  container: infoElement,
  pointModel,
  offerModel,
  destinationModel,
});

infoPresenter.init();
boardPresenter.init();
