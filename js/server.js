import {openSuccessModal} from './user-modal.js';

const getDataUrl = 'https://23.javascript.pages.academy/keksobooking/data';
const sendDataUrl = 'https://23.javascript.pages.academy/keksobooking';

const getData = async (url, onSuccess, onError) => {
  const ads = await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`Ошибка ${response.status}, не удалось получить данные с сервера...`);
    })
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err.message));

  return await ads || [];
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    sendDataUrl,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        openSuccessModal();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData, getDataUrl};
