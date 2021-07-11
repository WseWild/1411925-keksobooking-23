const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

const formTitleInput = document.querySelector('.ad-form__title');

const formCapacity = document.querySelector('#capacity');
const formRooms = document.querySelector('#room_number');
const adForm = document.querySelector('.ad-form');


formTitleInput.addEventListener('input', () => {
  const valueLength = formTitleInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    formTitleInput.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    formTitleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    formTitleInput.setCustomValidity('');
  }
});

adForm.addEventListener('input', (evt) => {
  if (evt.target.matches('#room_number') || evt.target.matches('#capacity') ) {
    formCapacity.setCustomValidity('');

    if (formRooms.value === '1' && formCapacity.value !== '1') {
      formCapacity.setCustomValidity('1 комната доступна только «для 1 гостя»');
    } else if (formRooms.value === '2' && formCapacity.value !== '1' && formCapacity.value !== '2') {
      formCapacity.setCustomValidity('2 комнаты доступны «для 2 гостей» или «для 1 гостя»');
    } else if (formRooms.value === '3' && formCapacity.value === '0' ) {
      formCapacity.setCustomValidity('3 комнаты доступны «для 3 гостей» «для 2 гостей» и «для 1 гостя»');
    } else if (formRooms.value === '100' && formCapacity.value !== '0') {
      formCapacity.setCustomValidity('100 комнат доступно только «не для гостей».');
    }

  }
});

