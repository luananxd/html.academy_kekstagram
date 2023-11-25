import { getServerData } from './server.js';
import { showServerMessage } from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();

function createPicturesElement(picturesArray) {
  picturesArray.forEach(({id, url, likes, comments}) => {
    const newPageElement = pictureTemplate.cloneNode(true);
    newPageElement.dataset.pictureId = id;
    newPageElement.querySelector('.picture__img').src = url;
    newPageElement.querySelector('.picture__comments').textContent = comments.length;
    newPageElement.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.append(newPageElement);
  });
  picturesList.append(picturesListFragment);
}

getServerData('https://25.javascript.pages.academy/kekstagram/data').
  then((response) => {
    if(response.ok) {
      return response.json();
    }

    throw new Error('Не удалось связаться с сервером');
  }).
  then((data) => createPicturesElement(data)).
  catch((err) => {
    showServerMessage(err);
  });

export { picturesList };

