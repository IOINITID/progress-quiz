'use strict';

var startSlide = document.querySelector('.start');
var startButton = document.querySelector('.start__link');
var slideItems = document.querySelectorAll('.slide');
var completeSlide = document.querySelector('.complete');

var controlPrevButton = document.querySelectorAll('.controls__prev');
var controlNextButton = document.querySelectorAll('.controls__next');

console.log();

// Нажатие на кнопку начать
var onStartButtonClick = function () {
  startSlide.classList.add('hide');
  slideItems[0].classList.remove('hide');
};

// Нажатие на кнопку назад
controlPrevButton.forEach(function (item, i) {
  item.addEventListener('click', function () {
    slideItems[i].classList.add('hide');
    if (i > 0) {
      slideItems[i - 1].classList.remove('hide');
    }
    if (item === controlPrevButton[0]) {
      startSlide.classList.remove('hide');
    }
  });
});

// Нажатие на кнопку вперед
controlNextButton.forEach(function (item, i) {
  item.addEventListener('click', function () {
    slideItems[i].classList.add('hide');
    if (i < slideItems.length - 1) {
      slideItems[i + 1].classList.remove('hide');
    }
    if (item === controlNextButton[controlNextButton.length - 1]) {
      completeSlide.classList.remove('hide');
    }
  });
});

startSlide.addEventListener('click', onStartButtonClick);


var sliderScroll = document.querySelectorAll('.slider');
var sliderScrollPrev = document.querySelectorAll('.slider__prev');
var sliderScrollNext = document.querySelectorAll('.slider__next');

