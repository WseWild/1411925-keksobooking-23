import {useActivePageState, adAddress} from './user-form.js';
import {getFloatNumber} from './util.js';
import {createCustomPopup} from './popup.js';

const TOKYO_CENTER_LAT = 35.68950;
const TOKYO_CENTER_LNG = 139.69171;

const map = L.map('map-canvas')
  .on('load', () => {
    useActivePageState();
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (avatar, offer, point) => {
  const {lat, lng} = point;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      createCustomPopup(avatar, offer),
      {
        keepInView: true,
      },
    );
};

const setMainPinCoords = (lat, lng) => {
  mainPinMarker
    .setLatLng({
      lat: lat,
      lng: lng,
    });
  adAddress.setAttribute('value', `${getFloatNumber(lat, 5)}, ${getFloatNumber(lng, 5)}`);
  adAddress.setAttribute('placeholder', `${getFloatNumber(lat, 5)}, ${getFloatNumber(lng, 5)}`);
};

setMainPinCoords(TOKYO_CENTER_LAT, TOKYO_CENTER_LNG);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  adAddress.setAttribute('value', `${getFloatNumber(evt.target.getLatLng().lat, 5)}, ${getFloatNumber(evt.target.getLatLng().lng, 5)}`);
  adAddress.setAttribute('placeholder', `${getFloatNumber(evt.target.getLatLng().lat, 5)}, ${getFloatNumber(evt.target.getLatLng().lng, 5)}`);
});

export {setMainPinCoords, createMarker, markerGroup, TOKYO_CENTER_LAT, TOKYO_CENTER_LNG};
