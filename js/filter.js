import { getRandomUniqueNumber } from './util.js';
import { createPicturesElement } from './pictures.js';

const picturesFilter = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const picturesList = document.querySelector('.pictures');

function clearAllPhotos() {
  for(let i = picturesList.children.length - 1; i > 0; i--) {
    if(picturesList.children[i].tagName === 'A') {
      picturesList.children[i].remove();
    }
  }
}

function selectFilterButton(targetButton) {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  targetButton.classList.add('img-filters__button--active');
}

function sortPhoto(a, b) {
  return b.comments.length - a.comments.length;
}

function createRandomPhotosArray(data) {
  let randomPhotosArray = [];
  const getRandomArrayIndex = getRandomUniqueNumber();

  for(let i = 0; i <= 11; i++) {
    randomPhotosArray.push(data[getRandomArrayIndex(0, data.length - 1)]);
  }
  clearAllPhotos();
  createPicturesElement(randomPhotosArray);
  randomPhotosArray = [];
}

function createRankedPhotosArray(data) {
  const rankedPhotosArray = data.sort(sortPhoto);

  clearAllPhotos();
  createPicturesElement(rankedPhotosArray);
}

function useFilterMethod(method, data) {
  switch(method) {
    case 'filter-default':
      clearAllPhotos();
      createPicturesElement(data);
      break;

    case 'filter-random':
      createRandomPhotosArray(data);
      break;

    case 'filter-discussed':
      createRankedPhotosArray(data);
      break;
  }
}


export { picturesFilter, selectFilterButton, useFilterMethod };
