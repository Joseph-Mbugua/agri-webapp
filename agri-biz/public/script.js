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
  renderProducts(); // Initial render of products

  // Add event listeners for filter and search
  const categoryFilter = document.getElementById("category-filter");
  const searchBar = document.getElementById("search-bar");

  categoryFilter.addEventListener("change", renderProducts);
  searchBar.addEventListener("input", renderProducts);

  updateCartCount();
});

// Function to render products
async function renderProducts() {
  const productContainer = document.getElementById("product-container");
  const categoryFilterValue = document.getElementById("category-filter").value.toLowerCase();
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();

  productContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach(doc => {
    const product = doc.data();

    // Apply filters
    if (
      (categoryFilterValue !== "all" && product.category.toLowerCase() !== categoryFilterValue) ||
      (!product.name.toLowerCase().includes(searchTerm) && !product.description.toLowerCase().includes(searchTerm))
    ) {
      return;
    }

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.name;
    productImage.onload = () => equalizeImageHeight(productImage);

    const productName = document.createElement("h2");
    productName.textContent = product.name;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Price: $${product.price}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.addEventListener("click", () => addToCart(product));

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productDescription);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartBtn);

    productContainer.appendChild(productCard);
  });

  // Update cart count after rendering products
  updateCartCount();
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added ${product.name} to cart!`);
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

function equalizeImageHeight() {
  let minHeight = Infinity;
  document.querySelectorAll(".product-card img").forEach(image => {
    if (image.height < minHeight) {
      minHeight = image.height;
    }
  });

  document.querySelectorAll(".product-card img").forEach(image => {
    image.style.height = `${minHeight}px`;
  });
}
