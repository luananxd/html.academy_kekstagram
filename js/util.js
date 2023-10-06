function getRandomNumber(min, max) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

function isNormalStringLenght(string, maxLength) {
  return string.length > maxLength;
}

function getRandomArrayElement (array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function RandomUniqueNumber() {
  const numbers = new Set();

  return function(min, max) {
    while(true) {
      let number = getRandomNumber(min, max);
      if(!numbers.has(number)) {
        numbers.add(number);
        return number;
      }

      continue;
    }
  };
}

export {getRandomNumber, isNormalStringLenght, getRandomArrayElement, RandomUniqueNumber};
