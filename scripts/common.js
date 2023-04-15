"use strict";
const nav_container = document.getElementById("nav-container");

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

