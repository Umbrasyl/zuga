"use strict";
const nav_container = document.getElementById("nav-container");

// #region Horizontal Scroll Slider
const scrollSlider = document.querySelector(".scroll-slider");
const sliderContainer = document.querySelector(".scroll-wrapper");
const sliderTop = getCoord(sliderContainer).top;
const sliderHeight = getCoord(sliderContainer).bottom - sliderTop;
const topOffsetArray = [];
const cardsArray = [];
const slideArray = [];
for(let i = 0; i < 4; i++) {
  topOffsetArray.push(sliderTop + Math.floor((sliderHeight / 4) * i * 0.5));
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
// #endregion

// #region Right and Left Buttons sliding cards.
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
// #endregion

// #region Mobile Nav Close Button Animation
const btn_nav = document.getElementById("btn-nav");
const btn_nav_stroke_top = document.querySelector(".stroke-top");
const btn_nav_stroke_mid = document.querySelector(".stroke-mid");
const btn_nav_stroke_bottom = document.querySelector(".stroke-bottom");
btn_nav.addEventListener("click", ()=>{
  btn_nav_stroke_top.classList.toggle("rotate-minus-45");
  btn_nav_stroke_mid.classList.toggle("zero-width");
  btn_nav_stroke_bottom.classList.toggle("rotate-45");
  nav_container.classList.toggle("visually-hidden");
});
// #endregion

// #region Mobile And Desktop Nav Toggle
const header = document.querySelector("header");
const header_banner = document.querySelector(".header-banner");
const nav = document.querySelector(".nav");
const div_btn_nav = document.getElementById("div-btn-nav");
const mediaQuery = window.matchMedia("(min-width: 50em)");

function handleWidthChange(e) {
  if(e.matches) {
    // Remove the mobile columnar layout of the navigation menu
    nav.classList.remove("nav-mobile");
    // Remove the big and bold font
    nav.classList.remove("ff-ggb");
    nav.classList.remove("fs-500");
    // Hide the mobile nav button
    div_btn_nav.classList.add("visually-hidden");
    // Remove the full width and height nav menu
    nav_container.classList.remove("nav-container");
    nav_container.classList.remove("visually-hidden");
    // Appen the nav menu to the top of the page header banner or it won't show up  as the banner is position fixed.
    header_banner.appendChild(nav_container);

  } else {
    nav.classList.add("nav-mobile");
    nav.classList.add("ff-ggb");
    nav.classList.add("fs-500");
    div_btn_nav.classList.remove("visually-hidden");
    nav_container.classList.add("nav-container");
    nav_container.classList.add("visually-hidden");
    // Append the full page menu to the header element.
    header.appendChild(nav_container);
  }
}

mediaQuery.addEventListener("change", handleWidthChange);
handleWidthChange(mediaQuery);

// #endregion

