import {debounce} from './utils/debounce.js';
import './map.js';
import './popup.js';
import './user-modal.js';
import {setUserFormSubmit, sendUserForm} from './user-form.js';
import {setFilterFormChange, renderSimilarList} from './filter-form.js';
import {getData, getDataUrl} from './server.js';
import {showLoadFailMessage} from './user-modal.js';
import './avatar.js';

const RERENDER_DELAY = 500;

getData(
  getDataUrl,
  (data) => {
    renderSimilarList(data);
    setFilterFormChange(debounce(
      () => renderSimilarList(data),
      RERENDER_DELAY,
    ));
  },
  showLoadFailMessage);

setUserFormSubmit(sendUserForm);
