import { POINT_DESCRIPTIONS } from '../const';
import { getRandomArrayElement } from '../utils';

export const mockDestinations = [
  {
    id: '1',
    description: getRandomArrayElement(POINT_DESCRIPTIONS),
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563015163318',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563025163318',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
    ],
  },
  {
    id: '2',
    description: getRandomArrayElement(POINT_DESCRIPTIONS),
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563015163347',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563025163347',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563035163347',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
    ],
  },
  {
    id: '3',
    description: getRandomArrayElement(POINT_DESCRIPTIONS),
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563015169317',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
    ],
  },
  {
    id: '4',
    description: getRandomArrayElement(POINT_DESCRIPTIONS),
    name: 'Paris',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563015168816',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563025168816',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563035168816',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
    ],
  },
  {
    id: '5',
    description: getRandomArrayElement(POINT_DESCRIPTIONS),
    name: 'Nice',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563015167312',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563025167312',
        description: getRandomArrayElement(POINT_DESCRIPTIONS),
      },
    ],
  },
  {
    id: '6',
    description: getRandomArrayElement(POINT_DESCRIPTIONS),
    name: 'Lisboa',
    pictures: [],
  },
];
