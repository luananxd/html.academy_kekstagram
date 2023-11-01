import {usersList} from './create-users-list.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();

function addPicturesToPage(picturesArray) {
  picturesArray.forEach(({url, likes, comments}) => {
    let newPageElement = pictureTemplate.cloneNode(true);
    newPageElement.querySelector('.picture__img').src = url;
    newPageElement.querySelector('.picture__comments').textContent = comments.length;
    newPageElement.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.append(newPageElement);
  });
  picturesList.append(picturesListFragment);
}

addPicturesToPage(usersList);

