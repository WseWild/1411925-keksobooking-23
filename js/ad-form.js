const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const numberOfRooms = {
  ONE_ROOM: '1',
  TWO_ROOMS: '2',
  THREE_ROOMS: '3',
  ONE_HUNDRED_ROOMS: '100',
};
const numberOfGuests = {
  ONE_GUEST: '1',
  TWO_GUESTS: '2',
  THREE_GUESTS: '3',
  NOT_FOR_GUESTS: '0',
};

const formTitleInput = document.querySelector('.ad-form__title');
const formCapacity = document.querySelector('#capacity');
const formRooms = document.querySelector('#room_number');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormElements = document.getElementsByClassName('ad-form__element');
const mapFilterElements = document.getElementsByClassName('map__filter');
const mapFeatures = document.querySelector('.map__features');
const adFormField = document.querySelector('.ad-form-header__input');

const addDisabledAttribute = (elem) => elem.setAttribute('disabled', 'disabled');
const inactiveState = () => {
  adForm.classList.add(`${adForm.classList}--disabled`);
  mapFilters.classList.add(`${mapFilters.classList}--disabled`);
  Array.from(adFormElements).forEach((element) => addDisabledAttribute(element));
  Array.from(mapFilterElements).forEach((element) => addDisabledAttribute(element));
  addDisabledAttribute(mapFeatures);
  addDisabledAttribute(adFormField);
};

inactiveState();

formTitleInput.addEventListener('input', () => {
  const valueLength = formTitleInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    formTitleInput.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    formTitleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    formTitleInput.setCustomValidity('');
  }
});

adForm.addEventListener('input', (evt) => {
  if (evt.target.matches('#room_number') || evt.target.matches('#capacity') ) {
    formCapacity.setCustomValidity('');

    if (formRooms.value === numberOfRooms.ONE_ROOM && formCapacity.value !== numberOfGuests.ONE_GUEST ) {
      formCapacity.setCustomValidity('1 комната доступна только «для 1 гостя»');
    } else if (formRooms.value === numberOfRooms.TWO_ROOMS && formCapacity.value !== numberOfGuests.ONE_GUEST && formCapacity.value !== numberOfGuests.TWO_GUESTS) {
      formCapacity.setCustomValidity('2 комнаты доступны «для 2 гостей» или «для 1 гостя»');
    } else if (formRooms.value === numberOfRooms.THREE_ROOMS  && formCapacity.value === numberOfGuests.NOT_FOR_GUESTS) {
      formCapacity.setCustomValidity('3 комнаты доступны «для 3 гостей» «для 2 гостей» и «для 1 гостя»');
    } else if (formRooms.value === numberOfRooms.ONE_HUNDRED_ROOMS && formCapacity.value !== numberOfGuests.NOT_FOR_GUESTS) {
      formCapacity.setCustomValidity('100 комнат доступно только «не для гостей».');
    }

  }
});

