import {getRandomNumber, getRandomArrayElement, RandomUniqueNumber} from './util.js';


const DESCRIPTIONS = [
  'На курорте в Майами',
  'Как прекрасна осень!',
  'С Виталиком на даче',
  'Просто фото',
  'Мой статус - на связи'
];

const NAMES = [
  'Артём',
  'Иннокентий',
  'Иван',
  'Джон',
  'Дмитрий',
  'Олег',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let usersStartID = 0;

const randomCommentID = RandomUniqueNumber();

function createComment () {
  return {
    id: randomCommentID(1, 999),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

function createUser() {
  return {
    id: usersStartID++,
    url: `photos/${usersStartID}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(1, 5)}, createComment),
  };
}

function createUsersPhotoList(count) {
  return Array.from({length: count}, createUser);
}

const usersPhotoList = createUsersPhotoList(25);

export {usersPhotoList};
