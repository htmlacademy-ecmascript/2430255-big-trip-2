import Presenter from './presenter/presenter.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';
import { render } from './render.js';

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-main');

const filterElement = headerElement.querySelector('.trip-controls__filters');
const eventsContainer = mainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const presenter = new Presenter({ container: eventsContainer, pointsModel });

render(new FilterView(), filterElement);

presenter.init();
