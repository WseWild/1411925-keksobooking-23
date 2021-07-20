import {createMarker, markerGroup} from './map.js';
import {SIMILAR_ADS_COUNT, PARSE_INT_SCALE} from './data.js';

const FILTER_TYPE_ANY = 'any';
const PriceKeys = {
  'low': 10000,
  'high': 50000,
};

const filterForm = document.querySelector('.map__filters');
const accommodationTypeSelect = filterForm.querySelector('[name="housing-type"]');
const accommodationPriceSelect = filterForm.querySelector('[name="housing-price"]');
const accommodationRoomsSelect = filterForm.querySelector('[name="housing-rooms"]');
const accommodationGuestsSelect = filterForm.querySelector('[name="housing-guests"]');

const getFeatures = (elem) => {
  const checkedHousingFeatures = filterForm.querySelectorAll('.map__checkbox:checked');

  return Array.from(checkedHousingFeatures).every((checkedFeature) => {
    if (elem.offer.features) {
      return elem.offer.features.includes(checkedFeature.value);
    }
  });
};

const getHousingType = (item) => accommodationTypeSelect.value === FILTER_TYPE_ANY ? true : accommodationTypeSelect.value === item.offer.type;

const getRoomsNumber = (item) => accommodationRoomsSelect.value === FILTER_TYPE_ANY ? true : parseInt(accommodationRoomsSelect.value, PARSE_INT_SCALE) === item.offer.rooms;

const getGuestsNumber = (item) => accommodationGuestsSelect.value === FILTER_TYPE_ANY ? true : parseInt(accommodationGuestsSelect.value, PARSE_INT_SCALE) === item.offer.guests;

const getHousingPrice = (item) => {
  switch (accommodationPriceSelect.value) {
    case 'low':
      return item.offer.price < PriceKeys.low;
    case 'middle':
      return item.offer.price >= PriceKeys.low && item.offer.price <= PriceKeys.high;
    case 'high':
      return item.offer.price > PriceKeys.high;
    default:
      return true;
  }
};

const setFilterFormChange = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};

const renderSimilarList = (data) => {
  markerGroup.clearLayers();
  data
    .filter((item) => getHousingType(item) && getHousingPrice(item) && getRoomsNumber(item) && getGuestsNumber(item) && getFeatures(item))
    .slice(0, SIMILAR_ADS_COUNT)
    .forEach((item) => {
      createMarker(item.author.avatar, item.offer, item.location);
    });
};

export {setFilterFormChange, renderSimilarList};
