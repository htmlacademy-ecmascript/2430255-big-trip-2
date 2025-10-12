import { getRandomInteger, getRandomArrayElement } from '../utils.js';

const mockPoints = [
  {
    id: '1',
    basePrice: getRandomInteger(300, 500),
    dateFrom: '2019-07-10T22:55:56.845Z',
    date: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    favorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: 'taxi',
  },
  {
    id: '2',
    basePrice: getRandomInteger(800, 1500),
    dateFrom: '2019-07-10T22:55:56.845Z',
    date: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    favorite: true,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: 'flight',
  },
  {
    id: '3',
    basePrice: getRandomInteger(800, 1500),
    dateFrom: '2019-07-10T22:55:56.845Z',
    date: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    favorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: 'flight',
  },
  {
    id: '4',
    basePrice: getRandomInteger(60, 100),
    dateFrom: '2019-07-10T22:55:56.845Z',
    date: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    favorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa31'],
    type: 'bus',
  },
  {
    id: '5',
    basePrice: getRandomInteger(500, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    date: '2019-07-11T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    favorite: false,
    offers: [],
    type: 'ship',
  },
];

export const getRandomPoints = function () {
  return getRandomArrayElement(mockPoints);
};
