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
  slideshowContainer.innerHTML = ""; // Clear previous content

  const querySnapshot = await getDocs(collection(db, "products"));
  let slideIndex = 0; // Start at the first slide

  querySnapshot.forEach((doc) => {
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
  });

  showSlides(); // Initialize the slideshow

  function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
  }

  window.plusSlides = function(n) {
    showSlides(slideIndex += n - 1); // Adjust slideIndex to match manual control
  };

  window.currentSlide = function(n) {
    showSlides(slideIndex = n);
  };
}
