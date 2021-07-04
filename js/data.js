import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, randomArray} from './utils.js';

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

let avatarCounter = 2;
const SIMILAR_AD_COUNT = 1;

const getUserAvatar =  () => {
  for (; ;) {
    if (avatarCounter < 9) {
      avatarCounter++;
      return `img/avatars/user0${avatarCounter}.png`;
    }
    avatarCounter++;
    return `img/avatars/user${avatarCounter}.png`;
  }
};

const getSimilarAd = () => {
  const randomLatCoordinates = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const randomLngCoordinates = getRandomPositiveFloat(139.70000, 139.80000, 5);

  return {

    author: {
      avatar: getUserAvatar(),
    },

    offer: {
      title: 'Подходящий вариант для жилья',
      address: `${randomLatCoordinates},  ${randomLngCoordinates}`,
      price: getRandomPositiveInteger(0, 1000000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: randomArray(FEATURES),
      description: 'Перед оформлением обратите внимание устраивают ли вас все детали',
      photos: randomArray(PHOTOS),
    },

    location: {
      lat: randomLatCoordinates,
      lng: randomLngCoordinates,
    },

  };
};

const createSimilarAd = new Array(SIMILAR_AD_COUNT).fill(null).map(() => getSimilarAd());

export {createSimilarAd};
