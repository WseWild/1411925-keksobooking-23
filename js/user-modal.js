import {showAlert, isEscEvent} from './util.js';
import {mapCanvas} from './popup.js';

showAlert(document.querySelector('#error').content.querySelector('.error'));
showAlert(document.querySelector('#success').content.querySelector('.success'));

const showLoadFailMessage = (message) => {
  const errorMessageBlock = document.createElement('div');
  errorMessageBlock.style.cssText = `
    position: relative;
    margin: 10px auto;
    display: flex;
    width: 70%;
    height: 10%;
    align-items: center;
    justify-content: center;
    background-color: red;
    color: white;
    border-radius: 20px;
    border: 1px solid #cb2020;
    z-index: 999;
    text-align: center;
    font-size: 1.5em;
    line-height: 1em;
    font-weight: bold;
  `;
  errorMessageBlock.textContent = message;
  mapCanvas.appendChild(errorMessageBlock);
};

const adSuccess = document.querySelector('.success');
const adError = document.querySelector('.error');
const adErrorClose = adError.querySelector('.error__button');

const onSuccessPopupKeydownEsc = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    adSuccess.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessPopupKeydownEsc);
    document.removeEventListener('click', onSuccessPopupClick);
  }
};

const onSuccessPopupClick = (evt) => {
  if (evt.currentTarget === document && evt.type === 'click') {
    evt.preventDefault();
    adSuccess.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessPopupKeydownEsc);
    document.removeEventListener('click', onSuccessPopupClick);
  }
};

const onErrorPopupKeydownEsc = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    adError.classList.add('hidden');
    document.removeEventListener('keydown', onErrorPopupKeydownEsc);
    document.removeEventListener('click', onErrorPopupClick);
  }
};

const onErrorPopupClick = (evt) => {
  if (evt.currentTarget === document && evt.type === 'click') {
    evt.preventDefault();
    adError.classList.add('hidden');
    document.removeEventListener('keydown', onErrorPopupKeydownEsc);
    document.removeEventListener('click', onErrorPopupClick);
  }
};

const openSuccessModal = () => {
  adSuccess.classList.remove('hidden');
  document.addEventListener('keydown', onSuccessPopupKeydownEsc);
  document.addEventListener('click', onSuccessPopupClick);
};

const openErrorModal = () => {
  adError.classList.remove('hidden');
  document.addEventListener('keydown', onErrorPopupKeydownEsc);
  document.addEventListener('click', onErrorPopupClick);
};

const closeErrorModal = () => {
  adError.classList.add('hidden');
  document.removeEventListener('keydown', onErrorPopupKeydownEsc);
  document.removeEventListener('click', onErrorPopupClick);
};

adErrorClose.addEventListener('click', () => {
  closeErrorModal();
});

export {openSuccessModal, openErrorModal, showLoadFailMessage, adSuccess, adError};
