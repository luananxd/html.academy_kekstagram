/* eslint-disable no-constant-condition */
const ALERT_SHOW_TIME = 5000;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

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

function getRandomUniqueNumber() {
  const numbers = new Set();

  return function(min, max) {
    while(true) {
      const number = getRandomNumber(min, max);
      if(!numbers.has(number)) {
        numbers.add(number);
        return number;
      }

      continue;
    }
  };
}

function showServerMessage(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function showSuccess() {
  function closeMessage() {
    document.body.children[document.body.children.length - 1].remove();
  }

  const successManagmentButton = successMessageTemplate.querySelector('.success__button');
  document.body.append(successMessageTemplate);
  successManagmentButton.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('click', (e) => {
    if(e.target === successMessageTemplate) {
      closeMessage();
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      closeMessage();
    }
  });
}

function showError() {
  function closeMessage() {
    document.body.children[document.body.children.length - 1].remove();
  }

  const errorMessageButton = errorMessageTemplate.querySelector('.error__button');
  document.body.append(errorMessageTemplate);
  errorMessageButton.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('click', (e) => {
    if(e.target === errorMessageTemplate) {
      closeMessage();
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      closeMessage();
    }
  });
}

export { getRandomNumber, isNormalStringLenght, getRandomArrayElement, getRandomUniqueNumber, showServerMessage, showSuccess, showError };
