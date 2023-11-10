const form = document.querySelector('#upload-select-image');
const uploadFileInput = form.querySelector('#upload-file');
const imageEditWindow = form.querySelector('.img-upload__overlay');
const formCloseButton = form.querySelector('#upload-cancel');
const hashtagsList = form.querySelector('.text__hashtags');

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

function validateHashtags(hashtagsString) {
  let result = true;
  hashtagsString = hashtagsString.toUpperCase();

  let hashtagsArray = hashtagsString.split(' ');
  if(hashtagsArray.length > 5) {
    result = false;
  }

  const countHashtags = {};
  hashtagsArray.forEach(hashtag => {
    countHashtags[hashtag] = countHashtags[hashtag] ? countHashtags[hashtag] + 1 : 1;
    if(countHashtags[hashtag] > 1) {
      result = false;
    };

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
  if(!/^C:\\fakepath\\.{1,1000}.[jpg, png]/.test(uploadFileInput.value)) {return};

  openForm();
  hashtagsList.addEventListener('keydown', (e) => {
    if(document.hasFocus() && e.key === 'Escape') {
      e.stopPropagation();
    }
  });

  formCloseButton.addEventListener('click', () => {
    closeForm();
  });
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
});

pristine.addValidator(hashtagsList, validateHashtags, 'Ошибка в хештегах!');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  pristine.validate();
});
