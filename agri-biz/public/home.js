import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlCMR9NQgWg2r1I1xPZ2AZ6lk-yoZDOOg",
  authDomain: "agriculture-ecomm.firebaseapp.com",
  databaseURL: "https://agriculture-ecomm-default-rtdb.firebaseio.com",
  projectId: "agriculture-ecomm",
  storageBucket: "agriculture-ecomm.appspot.com",
  messagingSenderId: "1081774247089",
  appId: "1:1081774247089:web:6c57438b3bae218bcf2690",
  measurementId: "G-3EJRGTGY4V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", () => {
  renderSlides();
});
async function renderSlides() {
  const slideshowContainer = document.getElementById("slideshow-container");
  const dotsContainer = document.querySelector("div[style='text-align:center']");
  slideshowContainer.innerHTML = ""; // Clear previous content
  dotsContainer.innerHTML = ""; // Clear previous dots

  const querySnapshot = await getDocs(collection(db, "products"));
  let slideIndex = 0; // Start at the first slide

  querySnapshot.forEach((doc, index) => {
    const product = doc.data();

    const slideDiv = document.createElement("div");
    slideDiv.classList.add("mySlides", "fade");

    const productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.name;
    productImage.style.width = "100%";

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
    textDiv.textContent = product.name;

    slideDiv.appendChild(productImage);
    slideDiv.appendChild(textDiv);
    slideshowContainer.appendChild(slideDiv);

    // Create dot
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      currentSlide(index + 1);
    });
    dotsContainer.appendChild(dot);
  });

  showSlides(slideIndex); // Initialize the slideshow

  function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
    setTimeout(() => showSlides(slideIndex + 1), 3000); // Change image every 3 seconds
  }

  window.plusSlides = function (n) {
    showSlides(slideIndex += n);
  };

  window.currentSlide = function (n) {
    showSlides(slideIndex = n - 1);
  };
}