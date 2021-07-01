import {createSimilarAd} from './data.js';

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAd = createSimilarAd;

const similarFragment = document.createDocumentFragment();

const mapCanvas = document.querySelector('#map-canvas');


similarAd.forEach((card) => {
  const cardElement = similarAdTemplate.cloneNode(true);
  const avatarPicture = cardElement.querySelector('.popup__avatar');

  let popupPhotos = cardElement.querySelector('.popup__photos');
  const popupPhoto = cardElement.querySelector('.popup__photo');

  const getPopupPhotos = (photos) => {
    popupPhoto.remove();

    for (let int = 0; int < photos.length; int++) {
      const newElement = `<img src="${photos[int]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
      popupPhotos.insertAdjacentHTML('afterbegin', newElement);
    }
  };

  const getTypeName = (type) => {
    switch(type) {
      case 'flat':
        return 'Квартира';
      case 'bungalow':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      case 'hotel':
        return 'Отель';
    }
  };

  let featuresList = cardElement.querySelector('.popup__features');

  const getFeaturesElement = (features) => {
    featuresList.innerHTML = '';

    for (let int = 0; int < features.length; int++) {
      const newElement = `<li class="popup__feature popup__feature--${features[int]}"></li>`;
      featuresList.insertAdjacentHTML('afterbegin', newElement);
    }
  };

  featuresList  = getFeaturesElement(card.offer.features);
  cardElement.querySelector('.popup__type').textContent = getTypeName(card.offer.type);
  cardElement.querySelector('.popup__description').textContent = card.offer.title;
  cardElement.querySelector('.popup__title').textContent = card.offer.features;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent =`${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  avatarPicture.src = card.author.avatar;
  popupPhotos = getPopupPhotos(card.offer.photos);
  similarFragment.appendChild(cardElement);
});

mapCanvas.appendChild(similarFragment);


