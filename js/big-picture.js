import {picturesList} from './pictures.js';
import {usersPhotoList} from './create-users-list.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscapeKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscapeKeydown);
}

function onBigPictureEscapeKeydown() {
  if(event.key === 'Escape') {
    closeBigPicture();
  }
}

function renderBigPictureComments(commentsArray) {
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const commentsListFragment = document.createDocumentFragment();

  bigPictureCommentsList.innerHTML = '';

  commentsArray.forEach(({avatar, message, name}) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = avatar;
    newComment.querySelector('.social__picture').alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentsListFragment.append(newComment);
  });

  bigPictureCommentsList.append(commentsListFragment);
}

function renderBigPicture({url, likes, comments, description}) {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  bigPictureDescription.textContent = description;
  renderBigPictureComments(comments);
}

picturesList.addEventListener('click', (e) => {
  if(e.target.className !== 'picture__img' && e.target.className !== 'picture__info') {
    return;
  }

  openBigPicture();
  const picture = e.target.parentNode;
  const pictureId = picture.dataset.pictureId;

  renderBigPicture(usersPhotoList[pictureId - 1]);

  bigPictureCloseButton.addEventListener('click', () => {
    closeBigPicture();
  })
})

socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');
