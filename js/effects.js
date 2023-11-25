import { form } from './upload-form.js';

const imageCropButtonSmaller = form.querySelector('.scale__control--smaller');
const imageCropButtonBigger = form.querySelector('.scale__control--bigger');
const imageCropValueField = form.querySelector('.scale__control--value');
const imageUploadPreview = form.querySelector('.img-upload__preview img');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderValue = form.querySelector('.effect-level__value');
const effectsList = form.querySelector('.effects__list');

let cropValue = Number(imageCropValueField.value.split('%')[0]);

imageUploadPreview.style.transform = `scale(${cropValue / 100})`;

imageCropButtonBigger.addEventListener('click', () => {
  if(cropValue < 100) {
    cropValue += 25;
    imageCropValueField.value = `${cropValue}%`;
    imageUploadPreview.style.transform = `scale(${cropValue / 100})`;
  }
});

imageCropButtonSmaller.addEventListener('click', () => {
  if(cropValue > 25) {
    cropValue -= 25;
    imageCropValueField.value = `${cropValue}%`;
    imageUploadPreview.style.transform = `scale(${cropValue / 100})`;
  }
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0.5,
  step: 0.1,
  connect: 'lower',
});
sliderElement.style.display = 'none';

effectsList.addEventListener('change', (e) => {
  switch(e.target.getAttribute('id')) {
    case 'effect-chrome':
      sliderElement.style.display = 'block';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 0.5,
      });

      sliderElement.noUiSlider.on('update', () => {
        sliderValue.value = sliderElement.noUiSlider.get();
        imageUploadPreview.style.filter = `grayscale(${sliderValue.value})`;
      });
      break;

    case 'effect-sepia':
      sliderElement.style.display = 'block';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 0.5,
      });

      sliderElement.noUiSlider.on('update', () => {
        sliderValue.value = sliderElement.noUiSlider.get();
        imageUploadPreview.style.filter = `sepia(${sliderValue.value})`;
      });
      break;

    case 'effect-marvin':
      sliderElement.style.display = 'block';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 50,
      });

      sliderElement.noUiSlider.on('update', () => {
        sliderValue.value = sliderElement.noUiSlider.get();
        imageUploadPreview.style.filter = `invert(${sliderValue.value}%)`;
      });
      break;

    case 'effect-phobos':
      sliderElement.style.display = 'block';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 1.5,
      });

      sliderElement.noUiSlider.on('update', () => {
        sliderValue.value = sliderElement.noUiSlider.get();
        imageUploadPreview.style.filter = `blur(${sliderValue.value}px)`;
      });
      break;

    case 'effect-heat':
      sliderElement.style.display = 'block';
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 2,
      });

      sliderElement.noUiSlider.on('update', () => {
        sliderValue.value = sliderElement.noUiSlider.get();
        imageUploadPreview.style.filter = `brightness(${sliderValue.value})`;
      });
      break;

    default:
      sliderElement.style.display = 'none';
      imageUploadPreview.style.filter = 'none';
      break;
  }
});

form.addEventListener('reset', () => {
  sliderElement.style.display = 'none';
  imageUploadPreview.style.filter = 'none';
  imageUploadPreview.style.transform = 'scale(1)';
});
