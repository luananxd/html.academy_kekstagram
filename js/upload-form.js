import { sendServerRequest } from './server.js';
import { showError, showSuccess } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const imageEditWindow = document.querySelector('.img-upload__overlay');
const formSubmitButton = document.querySelector('.img-upload__submit');
const formCloseButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const formData = new FormData(form);

function openForm() {
  imageEditWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onFormEscapeKeydown);
}

function closeForm() {
  imageEditWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadFileInput.value = '';
  document.removeEventListener('keydown', onFormEscapeKeydown);
}

function onFormEscapeKeydown() {
  if(event.key === 'Escape') {
    closeForm();
  }
}

function isHashtag(string) {
  return /^#[a-zA-ZА-Яа-яЁё]{1,19}/.test(string);
}

function validateHashtags() {
  let hashtagsString = hashtagsInput.value;
  let result = true;
  hashtagsString = hashtagsString.toUpperCase();

  const hashtagsArray = hashtagsString.split(' ');
  if(hashtagsArray.length > 5) {
    result = false;
  }

  const countHashtags = {};
  hashtagsArray.forEach((hashtag) => {
    countHashtags[hashtag] = countHashtags[hashtag] ? countHashtags[hashtag] + 1 : 1;
    if(countHashtags[hashtag] > 1) {
      result = false;
    }

    if(!isHashtag(hashtag)) {
      result = false;
    }
  });

  if(hashtagsString.length === 0) {
    result = true;
  }

  return result;
}

uploadFileInput.addEventListener('change', () => {
  if(!/^C:\\fakepath\\.{1,1000}.[jpg, png]/.test(uploadFileInput.value)) {return;}

  openForm();
  hashtagsInput.addEventListener('keydown', (e) => {
    if(document.hasFocus() && e.key === 'Escape') {
      e.stopPropagation();
    }
  });

  formCloseButton.addEventListener('click', () => {
    form.reset();
    closeForm();
  });
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error'
});

pristine.addValidator(hashtagsInput, validateHashtags, 'Ошибка в хештегах!');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    formSubmitButton.setAttribute('disabled', true);
    sendServerRequest('POST', 'https://25.javascript.pages.academy/kekstagram', formData)
      .then(() => {
        showSuccess();
        formSubmitButton.removeAttribute('disabled');
        form.reset();
        closeForm();
      })
      .catch(() => {
        showError('Не удалось отправить данные');
        formSubmitButton.removeAttribute('disabled');
        form.reset();
        closeForm();
      });
  }
});

export { form };
