import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { DATE_FORMAT } from './const';

dayjs.extend(utc);
dayjs.extend(duration);

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const convertDate = (date, formatKey) =>
  dayjs.utc(date).utcOffset(1, true).format(DATE_FORMAT[formatKey]);

const getDuration = (dateFrom, dateTo) => {
  const diff = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();

  const parts = [];

  if (days > 0) {
    parts.push(`${String(days).padStart(2, '0')}D`);
  }
  if (hours > 0 || days > 0) {
    parts.push(`${String(hours).padStart(2, '0')}H`);
  }
  parts.push(`${String(minutes).padStart(2, '0')}M`);

  return parts.join(' ');
};

const capitalizeFirstLetter = (word = '') =>
  word ? word[0].toUpperCase() + word.slice(1) : '';

export {
  getRandomInteger,
  getRandomArrayElement,
  convertDate,
  getDuration,
  capitalizeFirstLetter,
};
