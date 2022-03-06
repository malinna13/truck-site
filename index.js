"use strict";

const apiKey = "AIzaSyBT4vo586Sty_hpBfsS1XhQaKxDshEZ4_g";

const getData = async (url) => {
  const result = await fetch(url);
  if (!result.ok) {
    console.log("Error");
  }
  return await result.json();
};

//google maps

const selectFrom = document.querySelector("#from");

const selectTo = document.querySelector("#to");

selectTo.disabled = "true";
const frame = document.querySelector("iframe");

let locationsData = [];
let originCoords = [];

const locations = getData("http://localhost:3000/locations").then((data) => {
  data.forEach(({ LocationId, Name, Coordinates }) => {
    selectFrom.innerHTML += `<option value="${LocationId}">${Name}</option>`;
    selectTo.innerHTML += `<option value="${LocationId}">${Name}</option>`;
  });

  locationsData = data;
});

// document.addEventListener("DOMContentLoaded", function () {
//   const source = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBT4vo586Sty_hpBfsS1XhQaKxDshEZ4_g&q=Kazakhstan`;

//   frame.src = source;
// });

document.querySelector("#from").addEventListener("change", function () {
  const myLocation = locationsData.find(
    (loc) => loc.LocationId === +this.value
  );
  const [second, first] = myLocation.Coordinates;

  originCoords = [first, second];

  const source = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBT4vo586Sty_hpBfsS1XhQaKxDshEZ4_g&q=${first},${second}`;

  frame.src = source;
  selectTo.removeAttribute("disabled");
});

document.querySelector("#to").addEventListener("change", function () {
  const myLocation = locationsData.find(
    (loc) => loc.LocationId === +this.value
  );
  const [second, first] = myLocation.Coordinates;

  const source = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBT4vo586Sty_hpBfsS1XhQaKxDshEZ4_g&origin=${originCoords[0]},${originCoords[1]}&destination=${first},${second}`;
  frame.src = source;
});

// notification

const notification = document.querySelector(".notification");
function showNotification() {
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 1000);
}

// cards

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

// modal;
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
const companyNameEl = document.querySelector("#pname");
const passEl = document.querySelector("#password");
const companySubmitEl = document.querySelector(".submit-company");
let pname, password;
companySubmitEl.addEventListener("click", async (e) => {
  e.preventDefault();
  if (companyNameEl.value.length !== 0 && passEl.value.length !== 0) {
    const data = {
      pname: companyNameEl.value,
      password: passEl.value,
    };

    const res = await fetch("http://localhost:3000/companies", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    modal.style.display = "none";

    if (res.status === 201) {
      showNotification();
    }
  }
});

// Send input data on submit
const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const submitEl = document.querySelector(".submit");
let name, phone;
submitEl.addEventListener("click", async (e) => {
  e.preventDefault();
  if (nameEl.value.length !== 0 && phoneEl.value.length !== 0) {
    const data = {
      name: nameEl.value,
      phone: phoneEl.value,
    };

    const res = await fetch("http://localhost:3000/requests", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (res.status === 201) {
      showNotification();
    }
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

//slider

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
