import {adForm} from './user-form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooser = adForm.querySelector('#avatar');
const avatarPhoto = adForm.querySelector('.ad-form-header__preview img');
const photoChooser = adForm.querySelector('#images');
const accomodationPhoto = adForm.querySelector('.ad-form__photo img');

const checkPreviewImg = (input, img) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      img.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

avatarChooser.addEventListener('change', checkPreviewImg.bind(null, avatarChooser, avatarPhoto));
photoChooser.addEventListener('change', checkPreviewImg.bind(null, photoChooser, accomodationPhoto));
