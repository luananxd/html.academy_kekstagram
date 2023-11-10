import {picturesList} from './pictures.js';
import {usersPhotoList} from './create-users-list.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.comment-count--current');

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscapeKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onBigPictureEscapeKeydown);
}

function onBigPictureEscapeKeydown() {
  if(event.key === 'Escape') {
    closeBigPicture();
  }
}

function renderBigPictureComments(commentsArray) {
  let i = 0;
  let page = 5;

  return function createComments(commentsArray) {
    const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

    for(i; i < page; i++) {
      if(i >= commentsArray.length) {
        commentsLoader.classList.add('hidden');
        break;
      }

      const newComment = commentTemplate.cloneNode(true);
      newComment.querySelector('.social__picture').src = commentsArray[i].avatar;
      newComment.querySelector('.social__picture').alt = commentsArray[i].name;
      newComment.querySelector('.social__text').textContent = commentsArray[i].message;
      bigPictureCommentsList.append(newComment);
    }

    socialCommentCount.textContent = i;

    commentsLoader.addEventListener('click', () => {
      page += 5;
      createComments(commentsArray);
    });
  };
}

function renderBigPicture({url, likes, comments, description}) {
  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  bigPictureCommentsList.innerHTML = '';
  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  bigPictureDescription.textContent = description;
  renderBigPictureComments(comments)(comments);
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
  });
});
