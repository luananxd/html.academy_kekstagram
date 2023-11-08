import {picturesList} from './pictures.js';
import {usersPhotoList} from './create-users-list.js';

const pictureItems = picturesList.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

pictureItems.forEach((picture, index) => {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
    const likesCount = bigPicture.querySelector('.likes-count');
    const commentsCount = bigPicture.querySelector('.comments-count');
    const bigPictureDescription = bigPicture.querySelector('.social__caption');

    bigPictureImage.src = usersList[index].url;
    likesCount.textContent = usersList[index].likes;
    commentsCount.textContent = usersList[index].comments.length;
    bigPictureDescription.textContent = usersList[index].description;
    bigPictureCommentsList.innerHTML = '';
    addComments(usersList[index].comments);

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  });
});

function addComments(commentsArray) {
  const commentsListFragment = document.createDocumentFragment();

  commentsArray.forEach(({avatar, message, name}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentsListFragment.append(newComment);
  });

  bigPictureCommentsList.append(commentsListFragment);
}

bigPictureCloseButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

addComments(usersList[0].comments);
