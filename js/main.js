// import './similar-ad.js';
import './ad-form.js';
import {createSimilarAd} from './data.js';
import {activeFormState} from './form-activity-switch.js';


// Работа с картой и ее объектами
const TOKYO_CENTER_LAT = 35.68950;
const TOKYO_CENTER_LNG = 139.69171;

const address = document.querySelector('#address');


const map = L.map('map-canvas')
  .on('load', () => {
    activeFormState();
  })
  .setView({
    lat: TOKYO_CENTER_LAT ,
    lng: TOKYO_CENTER_LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/leaflet/images/marker-icon-2x.png',
  iconSize: [52, 52],
  iconAnchor: [26, 52],

});


const marker = L.marker(
  {
    lat: TOKYO_CENTER_LAT ,
    lng: TOKYO_CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);


address.value = `${TOKYO_CENTER_LAT.toFixed(5)}, ${TOKYO_CENTER_LNG.toFixed(5)}`;

marker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const createCustomPopup = (card) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = balloonTemplate.cloneNode(true);
  const avatarPicture = cardElement.querySelector('.popup__avatar');
  const popupDescription = cardElement.querySelector('.popup__description');
  const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  let popupPhotos = cardElement.querySelector('.popup__photos');
  const popupPhoto = cardElement.querySelector('.popup__photo');
  const popupTextAdress = cardElement.querySelector('.popup__text--address');
  const popupTitle = cardElement.querySelector('.popup__title');
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  const popupType = cardElement.querySelector('.popup__type');

  const getPopupPhotos = (photos) => {
    popupPhoto.remove();

    for (let int = 0; int < photos.length; int++) {
      const newElement = `<img src="${photos[int]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
      popupPhotos.insertAdjacentHTML('afterbegin', newElement);
    }
  };
  // cardElement.auerySelector();
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
  card.offer.address ? popupTextAdress.textContent =` ${card.offer.address.lat} ${card.offer.address.lng}` : popupTextAdress.classList.add('visually-hidden');
  card.offer.price ? popupTextPrice.textContent =`${card.offer.price} ₽/ночь`: popupTextPrice.classList.add('visually-hidden');
  card.offer.type ? popupType.textContent = getTypeName(card.offer.type) : popupType.classList.add('visually-hidden');
  card.offer.title ? popupTitle.textContent = card.offer.title : popupTitle.classList.add('visually-hidden');
  card.offer.checkin && card.offer.checkout ? popupTextTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}` : popupTextTime.classList.add('visually-hidden');
  card.offer.features ? featuresList  = getFeaturesElement(card.offer.features) : featuresList.classList.add('visually-hidden');
  card.offer.description ? popupDescription.textContent = card.offer.description : popupDescription.classList.add('visually-hidden');
  card.author.avatar ? avatarPicture.src = card.author.avatar  : avatarPicture.classList.add('visually-hidden');
  card.offer.photos ? popupPhotos = getPopupPhotos(card.offer.photos) : popupPhotos.classList.add('visually-hidden'), popupPhoto.remove();
  card.offer.rooms && card.offer.guests ? popupTextCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей` :  popupTextCapacity.classList.add('visually-hidden');
  return  cardElement;
};


createSimilarAd.forEach((element) => {

  const icon = L.icon({
    iconUrl: '/leaflet/images/marker-icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const markerSimilar = L.marker(
    {
      lat: element.offer.address.lat,
      lng: element.offer.address.lng,
    },
    {
      icon,
    },
  );

  createCustomPopup(element);
  markerSimilar.addTo(map).bindPopup(createCustomPopup(element));
});

