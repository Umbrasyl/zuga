
// #region Horizontal Scroll Slider
function getAbsoluteCoord(ele) {
  const rect = ele.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
  };
}

const slideScreenWrapper = document.querySelector(".slide-screen-wrapper");
const screenWrapperTop = getAbsoluteCoord(slideScreenWrapper).top;
const screenWrapperHeight = getAbsoluteCoord(slideScreenWrapper).bottom - screenWrapperTop;
const topOffsetArray = [];
const cardHeaderArray = [];
const cardTextArray = [];
for(let i = 0; i < 4; i++) {
  // Screen Wrapper Height / 6.5 because after the 4 items whatever percentage of height is left should be 100vh. Right now
  // the Screen Wrapper is 260vh. If we call the divider x then ((screenWrapperHeight / x) * (x-4)) should be 100vh.
  topOffsetArray.push(screenWrapperTop + Math.floor((screenWrapperHeight / 6.5) * i));
  cardHeaderArray.push(document.querySelector(`[data-card-header='${i+1}']`));
  cardTextArray.push(document.querySelector(`[data-card-slide='${i+1}']`));
}
const bringOnScreen = function(inputCardHeaderArray, inputCardTextArray, index) {
  for (let i = 0; i < inputCardHeaderArray.length; i++) {
    if (i === index) {
      inputCardHeaderArray[i].classList.add("red-bar");
      inputCardTextArray[i].classList.remove("visually-hidden");
    } else {
      inputCardHeaderArray[i].classList.remove("red-bar");
      inputCardTextArray[i].classList.add("visually-hidden");
    }
  }
}

window.addEventListener("scroll", swapCard);

function swapCard() {
  if (window.scrollY >= topOffsetArray[3]) {
    bringOnScreen(cardHeaderArray, cardTextArray, 3);
  } else if (window.scrollY >= topOffsetArray[2]) {
    bringOnScreen(cardHeaderArray, cardTextArray, 2);
  } else if (window.scrollY >= topOffsetArray[1]) {
    bringOnScreen(cardHeaderArray, cardTextArray, 1);
  } else {
    bringOnScreen(cardHeaderArray, cardTextArray, 0);
  }
}


// #endregion

// #region Hide Left and Right Arrows on Mobile
const buttonsDiv = document.querySelector(".arrow-buttons");

function hideArrows(e) {
  if (e.matches) {
    buttonsDiv.classList.remove("visually-hidden");
  } else {
    buttonsDiv.classList.add("visually-hidden");
  }
}

mediaQuery.addEventListener("change", hideArrows);
hideArrows(mediaQuery);

// #endregion

// #region Right and Left Buttons sliding cards.

// We want to set the width of the cardGrid as width of one card times the number of cards plus one.
const cardGrid = document.querySelector(".card-grid");
const totalCards = document.querySelectorAll(".story-card");
const cardWidth = document.querySelector(".story-card").offsetWidth;
const cardScreen = document.querySelector(".card-screen");

cardGrid.style.width = `${cardWidth * (totalCards.length + 1)}px`;

const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");

leftButton.addEventListener("click", () => {
  smoothScrollTo(cardScreen, -2 * cardWidth, 800);
});
rightButton.addEventListener("click", () => {
  smoothScrollTo(cardScreen, 2 * cardWidth, 800);
});

function smoothScrollTo(element, scrollAmount, duration) {
  const start = element.scrollLeft;
  const end = start + scrollAmount;
  const increment = 20;
  let currentTime = 0;

  function animateScroll() {
    currentTime += increment;
    const newPosition = Math.easeInOutQuad(currentTime, start, end - start, duration);
    element.scrollLeft = newPosition;
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  animateScroll();
}

// Easing function
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

// #endregion

