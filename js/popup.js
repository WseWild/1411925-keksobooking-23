import {GUESTS, ROOMS} from './data.js';
import {getRussianCase, getRussianGenitiveCase, getAccommodationType} from './util.js';

const map = document.querySelector('.map');
const mapCanvas = map.querySelector('#map-canvas');
const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createCustomPopup = (avatar, offer) => {
  const adElement = adCardTemplate.cloneNode(true);
  avatar.title ? adElement.querySelector('.popup__title').textContent = offer.title : adElement.querySelector('.popup__title').classList.add('visually-hidden');
  offer.address ? adElement.querySelector('.popup__text--address').textContent = offer.address : adElement.querySelector('.popup__text--address').classList.add('visually-hidden');
  offer.price ? adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` : adElement.querySelector('.popup__text--price').classList.add('visually-hidden');
  offer.type ? adElement.querySelector('.popup__type').textContent = getAccommodationType(offer.type) : adElement.querySelector('.popup__type').classList.add('visually-hidden');
  offer.rooms && offer.guests ? adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getRussianCase(offer.rooms, ROOMS)} для ${offer.guests} ${getRussianGenitiveCase(offer.guests, GUESTS)}` : adElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  offer.checkin && offer.checkout ? adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : adElement.querySelector('.popup__text--time').classList.add('visually-hidden');
  if (offer.features) {
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    adElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    adElement.querySelector('.popup__features').classList.add('visually-hidden');
  }
  offer.description ? adElement.querySelector('.popup__description').textContent = offer.description : adElement.querySelector('.popup__description').classList.add('visually-hidden');
  if (offer.photos) {
    offer.photos.forEach((item) => {
      const img = adElement.querySelector('.popup__photo').cloneNode();
      img.setAttribute('src', item);
      adElement.querySelector('.popup__photos').appendChild(img);
    });
    adElement.querySelector('.popup__photo').remove();
  } else {
    adElement.querySelector('.popup__photos').classList.add('visually-hidden');
  }

  return adElement;
};

export {mapCanvas, createCustomPopup};
