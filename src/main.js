import Presenter from './presenter/presenter.js';
import FilterView from './view/filter-view.js';
import { render } from './render.js';

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-main');

const filterElement = headerElement.querySelector('.trip-controls__filters');
const eventsContainer = mainElement.querySelector('.trip-events');

const presenter = new Presenter({ container: eventsContainer });

render(new FilterView(), filterElement);

presenter.init();
