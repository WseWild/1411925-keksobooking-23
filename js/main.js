function getRandomPositiveInteger(int1, int2) {
  const lower = Math.ceil(Math.min(Math.abs(int1), Math.abs(int2)));
  const upper = Math.floor(Math.max(Math.abs(int1), Math.abs(int2)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat(int1, int2, digits = 1) {
  const lower = Math.min(Math.abs(int1), Math.abs(int2));
  const upper = Math.max(Math.abs(int1), Math.abs(int2));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}


const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
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

const randomArray =  function getRandomArray(array) {
  const maxLength = array.length;
  const lengthOfArray = getRandomPositiveInteger(0, maxLength - 1);
  const anyArray = [];

  while (anyArray.length < lengthOfArray) {
    const indexElement = getRandomPositiveInteger(0, maxLength - 1);
    const element = array[indexElement];

    if (!anyArray.includes(element)) {
      anyArray.push(element);
    }
  }
  return anyArray;
};


const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const SIMILAR_AD_COUNT = 10;

let avatarCounter = 0;

const getUserAvatar = function () {
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
      type: randomArray(TYPE),
      rooms: getRandomPositiveInteger(1, 10),
      guests:  getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
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

const createSimilarAD = new Array(SIMILAR_AD_COUNT).fill(null).map(() => getSimilarAd());

createSimilarAD();
