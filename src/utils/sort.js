import dayjs from 'dayjs';
import { getEventDuration } from './common.js';

const sortByDay = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));

const sortByTime = (a, b) => getEventDuration(b) - getEventDuration(a);

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

export { sortByDay, sortByTime, sortByPrice };
