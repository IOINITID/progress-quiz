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
    slideItems[i].classList.add('hide');
var showPrevSlide = function () {
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
};

showPrevSlide();

// Нажатие на кнопку вперед
var showNextSlide = function () {
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
};

showNextSlide();

startSlide.addEventListener('click', onStartButtonClick);

// Прокрутка карточек
var sliderScroll = document.querySelectorAll('.slider');
var sliderScrollPrev = document.querySelectorAll('.slider__prev');
var sliderScrollNext = document.querySelectorAll('.slider__next');

// Показ и прокрутка карточек по нажатию
var getSlideScroll = function () {
  slideItems.forEach(function (item, i) {
    var cardList = document.querySelectorAll('.fields__list');
    var cardItems = slideItems[i].querySelectorAll('.fields__list--scroll .fields__item');

    // Скрывает все кнопки скрола
    sliderScroll[i].style.display = 'none';

    // Показывает кнопки скрола при условии
    if (cardItems.length > 3) {
      sliderScroll[i].style.display = 'flex';
    }

    // Нажатие на прокрутку влево
    sliderScrollPrev[i].addEventListener('click', function () {
      cardList[i].scrollLeft = 0;
    });

    // Нажатие на прокрутку вправо
    sliderScrollNext[i].addEventListener('click', function () {
      cardList[i].scrollLeft = cardList[i].clientWidth + 100;
    });
  });
}

getSlideScroll();

// Установка root значения для rem
