import dayjs from 'dayjs';
import { getEventDuration } from './common.js';

const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortByTime = (pointA, pointB) => getEventDuration(pointB) - getEventDuration(pointA);

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export { sortByDay, sortByTime, sortByPrice };
