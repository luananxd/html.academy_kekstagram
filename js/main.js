function getRandomNumber(min, max) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

getRandomNumber(4, 20);

function isNormalStringLenght(string, maxLength) {
  return string.length > maxLength
}

isNormalStringLenght('Кекс', 4);

// ----- Третье задание -----

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

let usersStartID = 1;
let commentsID = [];

function getRandomArrayElement (array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function getRandomUniqueNumber (min, max) {
  while(true) {
    let commentID = getRandomNumber(min, max);
    if (!commentsID.includes(commentID)) {
      commentsID.push(commentID);
      return commentID;
    } else {
      continue;
    }
  }
}

function createComment () {
  return {
    id: getRandomUniqueNumber (1, 999),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
}

function createUser () {
  return {
    id: ++usersStartID,
    url: `photos/${usersStartID}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(1, 5)}, createComment),
  }
}

let users = Array.from({length: 25}, createUser);
