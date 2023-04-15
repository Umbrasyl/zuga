"use strict";
const nav_container = document.getElementById("nav-container");

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
  console.log("used");
  const currentXStr = ele.style.transform;
  let currentX = +currentXStr.replace(/[^-?\d.]/g, '');
  console.log(currentX);
  const amount = direction * 15;
  if (currentX <= -90 && direction === -1) {
    currentX = 15;
  } else if (currentX >= 0 && direction === 1) {
    currentX = -105;
  }
  currentX += amount;
  console.log(currentX);
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
    nav.classList.remove("fs-600");
    nav.classList.add("fs-400")
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
    nav.classList.add("fs-600");
    nav.classList.remove("fs-400")
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

