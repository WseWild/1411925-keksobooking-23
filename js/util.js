const getFloatNumber = (number, numeralCount) => {
  let count = 1;
  for (let counter = 0; counter < numeralCount; counter++) {
    count *= 10;
  }
  if (number >= 0) {
    return Math.floor(number * count) / count;
  }
  throw 'Число меньше 0';
};

const getRussianCase = (integer, russianWord) => {
  const remainder = integer % 10;
  if (integer > 10 && integer < 20) {
    return russianWord[2];
  } else if (remainder > 1 && remainder < 5) {
    return russianWord[1];
  } else if (remainder === 1) {
    return russianWord[0];
  }
  return russianWord[2];
};

const getRussianGenitiveCase = (integer, russianWord) => {
  const remainder = integer % 10;
  return remainder === 1 && integer !== 11 ? russianWord[0] : russianWord[1];
};

const getAccommodationType = (type) => {
  switch (type) {
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

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showAlert = (modal) => {
  const alertContainer = modal.cloneNode(true);

  document.body.append(alertContainer);
};

export {getFloatNumber, getRussianCase, getRussianGenitiveCase, getAccommodationType, isEscEvent, showAlert};
