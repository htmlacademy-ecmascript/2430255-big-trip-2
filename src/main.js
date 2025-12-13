import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import BigTripApi from './api/big-trip-api.js';
import { API_URL, AUTHORIZATION } from './const.js';

const headerElement = document.querySelector('.page-header');
const filterContainer = headerElement.querySelector('.trip-controls__filters');

const infoElement = headerElement.querySelector('.trip-main');

const mainElement = document.querySelector('.page-main');
const eventsContainer = mainElement.querySelector('.trip-events');

const api = new BigTripApi(API_URL, AUTHORIZATION);

const pointModel = new PointModel(api);
const offerModel = new OfferModel(api);
const destinationModel = new DestinationModel(api);
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  container: eventsContainer,
  pointModel,
  offerModel,
  destinationModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  pointModel,
  filterModel,
});

const infoPresenter = new InfoPresenter({
  container: infoElement,
  pointModel,
  destinationModel,
  offerModel,
});

boardPresenter.init();

Promise.all([
  pointModel.init(),
  offerModel.init(),
  destinationModel.init()
])
  .then(() => {
    filterPresenter.init();
    infoPresenter.init();
  })
  .catch(() => {
    filterPresenter.init();
    infoPresenter.init();
  });
