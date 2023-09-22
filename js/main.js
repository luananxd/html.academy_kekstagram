function getRandomNumber(min, max) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

getRandomNumber(4, 20);

function isNormalStringLenght(string, maxLength) {
  if(string.length > maxLength) {
    return false;
  }

  return true;
}

isNormalStringLenght('Кекс', 4);

