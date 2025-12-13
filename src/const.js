import { generateAuthString } from './utils/common.js';

const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DATE_FORMAT = {
  SHORT_DATE: 'MMM DD',
  FULL_DATE: 'YYYY-MM-DD',
  ONLY_TIME: 'HH:mm',
  FULL_DATE_AND_TIME: 'YYYY-MM-DDTHH:mm',
  CALENDAR_DATE: 'DD/MM/YY',
  DAY_ONLY: 'D',
  MONTH_ONLY: 'MMM',
  TRIP_INFO_DATE: 'D MMM',
};

const API_URL = 'https://22.objects.htmlacademy.pro/big-trip';

const AUTHORIZATION = generateAuthString();

const SHAKE_ANIMATION_TIMEOUT = 600;

const UI_BLOCKER_CONFIG = {
  lowerLimit: 350,
  upperLimit: 1000,
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  PAST: 'PAST',
  PRESENT: 'PRESENT',
  FUTURE: 'FUTURE',
};

const SortType = {
  DAY: 'DAY',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export {
  EVENT_TYPES,
  DATE_FORMAT,
  API_URL,
  AUTHORIZATION,
  SHAKE_ANIMATION_TIMEOUT,
  UI_BLOCKER_CONFIG,
  FilterType,
  SortType,
  UpdateType,
  UserAction,
};
