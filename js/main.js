import './util.js';
import './pictures.js';
import './big-picture.js';
import './upload-form.js';
import './effects.js';
import './server.js';

import { getServerData } from './server.js';
import { viewBigPicture } from './big-picture.js';
import { showServerMessage, debounce } from './util.js';
import { createPicturesElement } from './pictures.js';
import { picturesFilter, selectFilterButton, useFilterMethod } from './filter.js';

getServerData('https://25.javascript.pages.academy/kekstagram/data').
  then((response) => {
    if(response.ok) {
      return response.json();
    }

    throw new Error('Не удалось связаться с сервером');
  }).
  then((data) => {
    picturesFilter.classList.remove('img-filters--inactive');
    createPicturesElement(data);
    viewBigPicture(data);

    picturesFilter.addEventListener('click', (e) => {
      if(!e.target.classList.contains('img-filters__button')) {return;}
      selectFilterButton(e.target);
      debounce(useFilterMethod, 500)(e.target.id, data);
    });
  }).
  catch((err) => {
    showServerMessage(err);
  });

