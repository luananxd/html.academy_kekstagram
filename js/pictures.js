import {usersPhotoList} from './create-users-list.js';

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
}

createPicturesElement(usersPhotoList);
picturesList.append(picturesListFragment);

export {picturesList};

