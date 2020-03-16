'use strict';

var startSlide = document.querySelector('.start');
var startButton = document.querySelector('.start__link');
var slideItems = document.querySelectorAll('.slide');
var completeSlide = document.querySelector('.complete');

var controlPrevButton = document.querySelectorAll('.controls__prev');
var controlNextButton = document.querySelectorAll('.controls__next');

var controlPercent = document.querySelectorAll('.controls__percent');
var slidePercent = Math.round(100 / slideItems.length);
var sliderPercentCurrent = slidePercent;
var sliderPercentMax = 100;

// console.log(slidePercent);

// Нажатие на кнопку начать
var onStartButtonClick = function () {
  startSlide.classList.add('hide');
  slideItems[0].classList.remove('hide');
};

// Нажатие на кнопку назад
var showPrevSlide = function () {
  controlPrevButton.forEach(function (item, i) {
    if (sliderPercentCurrent >= 100) {
      controlPercent[i].textContent = sliderPercentCurrent + '%';
    } else {
      controlPercent[i].textContent = '100%';
    }
    sliderPercentMax -= sliderPercentCurrent;
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
    if (sliderPercentCurrent <= 100) {
      controlPercent[i].textContent = sliderPercentCurrent + '%';
    } else {
      controlPercent[i].textContent = '100%';
    }
    sliderPercentCurrent += slidePercent;
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
var htmlItem = document.querySelector('html');
var deviceWidth = window.innerWidth;
var desktopWidth = 1366;
var mobileWidth = 320;

// Get desktop root size
var getDesktopRootSize = function () {
  var rootSize = deviceWidth / desktopWidth;
  return rootSize;
};

// Get mobile root size
var getMobileRootSize = function () {
  var rootSize = deviceWidth / mobileWidth;
  return rootSize;
};

// Set root size
var setRootSize = function (rootFontSize) {
  htmlItem.style.fontSize = rootFontSize + 'px';
}

// Start state for document on loading
var onDOMLoading = function () {
  checkDeviceWidth();
};

// Slider destroying
var checkDeviceWidth = function () {
  if (deviceWidth >= 768 && deviceWidth < 1366) {
    setRootSize(getDesktopRootSize() - 0.1);
  } else if (deviceWidth >= 1366) {
    setRootSize(1);
  } else {
    setRootSize(getMobileRootSize());
  }
};

document.addEventListener('DOMContentLoaded', onDOMLoading);

// var controlPercent = document.querySelectorAll('.controls__percent');

// controlPercent.forEach(function (item) {
//   item.textContent = Math.round(100 / items.length);
// });
