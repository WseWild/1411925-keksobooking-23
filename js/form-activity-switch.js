
const mapFilters = document.querySelector('.map__filters');
const adFormElements = document.getElementsByClassName('ad-form__element');
const mapFilterElements = document.getElementsByClassName('map__filter');
const mapFeatures = document.querySelector('.map__features');
const adFormField = document.querySelector('.ad-form-header__input');
const adForm = document.querySelector('.ad-form');

const addDisabledAttribute = (elem) => elem.setAttribute('disabled', 'disabled');
const removeDisabledAttribute = (elem) => elem.removeAttribute('disabled');

const inactiveFormState = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  Array.from(adFormElements).forEach((element) => addDisabledAttribute(element));
  Array.from(mapFilterElements).forEach((element) => addDisabledAttribute(element));
  addDisabledAttribute(mapFeatures);
  addDisabledAttribute(adFormField);
};

const activeFormState = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  Array.from(adFormElements).forEach((element) => removeDisabledAttribute(element));
  Array.from(mapFilterElements).forEach((element) => removeDisabledAttribute(element));
  removeDisabledAttribute(mapFeatures);
  removeDisabledAttribute(adFormField);
};

export {adForm, inactiveFormState, activeFormState};
