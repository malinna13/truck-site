"use strict";

const getData = async (url) => {
  const result = await fetch(url);
  if (!result.ok) {
    console.log("Error");
  }
  return await result.json();
};

class Card {
  constructor(url, title, descr) {
    this.url = url;
    this.title = title;
    this.descr = descr;
  }
  generateCard() {
    const container = document.querySelector(".uslugi-cards");
    const block = document.createElement("div");
    block.classList.add("uslugi-card");
    block.style.backgroundImage = `url('${this.url}`;
    block.innerHTML += `
    <h3 class="uslugi-card-header">
    ${this.title}
  </h3>
  <p class="uslugi-card-text">
    ${this.descr}
  </p>
      `;
    container.append(block);
  }
}

getData("http://localhost:3000/cards").then((data) => {
  data.forEach(({ img, title, descr }) => {
    new Card(img, title, descr).generateCard();
  });
});

// modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("ctaBtn");
const span = document.getElementsByClassName("close")[0];
const submit = document.getElementsByClassName("submit")[0];
// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// Send input data on submit
const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const submitEl = document.querySelector(".submit");
let name, phone;

submitEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (nameEl.value.length !== 0 && phoneEl.value.length !== 0) {
    const data = {
      name: nameEl.value,
      phone: phoneEl.value,
    };

    fetch("http://localhost:3000/requests", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
});

// sticky nav

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the navbar
const navbar = document.querySelector(".nav-bottom-menu");

// Get the offset position of the navbar
const sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
