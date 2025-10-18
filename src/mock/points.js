import { getRandomInteger } from '../utils.js';

export const mockPoints = [
  {
    id: '1',
    basePrice: getRandomInteger(50, 80),
    dateFrom: '2025-07-10T11:05:00.845Z',
    dateTo: '2025-07-10T11:21:13.375Z',
    destination: '2',
    isFavorite: false,
    offers: ['2'],
    type: 'taxi',
  },
  {
    id: '2',
    basePrice: getRandomInteger(120, 140),
    dateFrom: '2025-07-10T12:20:00.845Z',
    dateTo: '2025-07-10T15:40:13.375Z',
    destination: '4',
    isFavorite: false,
    offers: ['2', '4'],
    type: 'train',
  },
  {
    id: '3',
    basePrice: getRandomInteger(70, 100),
    dateFrom: '2025-07-11T09:10:00.845Z',
    dateTo: '2025-07-11T17:05:00.375Z',
    destination: '1',
    isFavorite: false,
    offers: ['1', '3'],
    type: 'bus',
  },
  {
    id: '4',
    basePrice: getRandomInteger(1100, 2000),
    dateFrom: '2025-07-11T22:55:56.845Z',
    dateTo: '2025-07-21T11:00:00.375Z',
    destination: '1',
    isFavorite: true,
    offers: [],
    type: 'check-in',
  },
];
