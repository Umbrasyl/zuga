"use strict";

// Horizontal Scroll Slider
const scrollSlider = document.querySelector(".scroll-slider");
const sliderContainer = document.querySelector(".scroll-wrapper");
const sliderTop = getCoord(sliderContainer).top;
const sliderHeight = getCoord(sliderContainer).bottom - sliderTop;
const topOffsetArray = [];
const cardsArray = [];
const slideArray = [];
for(let i = 0; i < 4; i++) {
  topOffsetArray.push(sliderTop + Math.floor((sliderHeight / 4) * i * 0.7));
  cardsArray.push(document.querySelector(`[data-card='${i+1}']`));
  slideArray.push(document.querySelector(`[data-slide='${i+1}']`));
}
const horizontalSlide = function(inputCardsArray, inputSlideArray, index) {
  for (let i = 0; i < inputCardsArray.length; i++) {
    if (i === index) {
      inputCardsArray[i].classList.add("red-bar");
      inputSlideArray[i].classList.add("visible");
    } else {
      inputCardsArray[i].classList.remove("red-bar");
      inputSlideArray[i].classList.remove("visible");
    }
  }
}

window.addEventListener("scroll", swapCard);

function swapCard() {
  if (window.scrollY >= topOffsetArray[3]) {
    horizontalSlide(cardsArray, slideArray, 3);
  } else if (window.scrollY >= topOffsetArray[2]) {
    horizontalSlide(cardsArray, slideArray, 2);
  } else if (window.scrollY >= topOffsetArray[1]) {
    horizontalSlide(cardsArray, slideArray, 1);
  } else {
    horizontalSlide(cardsArray, slideArray, 0);
  }
}

function getCoord(ele) {
  const rect = ele.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
  };
}

// Right and Left Buttons sliding cards.

const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const cardGrid = document.querySelector(".card-grid");

leftButton.addEventListener("click", () => {
  moveCardsHorizontally(cardGrid, 1);
});
rightButton.addEventListener("click", () => {
  moveCardsHorizontally(cardGrid, -1);
});

const moveCardsHorizontally = function(ele, direction) {
  const currentXStr = ele.style.transform;
  let currentX = +currentXStr.replace(/[^-?\d.]/g, '');
  console.log(currentX);
  const amount = direction * 15;
  currentX += amount;
  console.log(currentX);
  if (currentX < -45) {
    currentX = 15;
  } else if (currentX > 20) {
    currentX = -45;
  }
  ele.style.transform = `translateX(${currentX}vw)`;
}