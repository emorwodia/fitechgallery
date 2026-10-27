// ================= FIREBASE =================

import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ================= PRODUCTS =================

let products = [];


// ================= FORMAT PRICE =================

function formatPrice(price) {

  return "₦" + Number(price).toLocaleString();
}


// ================= LOAD PRODUCTS =================

async function loadProducts() {

  const container =
    document.getElementById("product-container");

  if (!container) return;

  container.innerHTML = "<p>Loading products...</p>";

  try {

    const querySnapshot =
      await getDocs(collection(db, "products"));

    products = [];

    querySnapshot.forEach((doc) => {

      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    displayProducts(products);

  } catch (error) {

    container.innerHTML =
      "<p>Failed to load products</p>";

    console.log(error);
  }
}


// ================= DISPLAY PRODUCTS =================

function displayProducts(productsArray) {

  const container =
    document.getElementById("product-container");

  container.innerHTML = "";

  productsArray.forEach(product => {

    container.innerHTML += `

      <div class="product-card">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <h3>${product.name}</h3>

        <p>${formatPrice(product.price)}</p>

        <button
          onclick="viewProduct('${product.id}')"
        >
          View Product
        </button>

      </div>

    `;
  });
}


// ================= VIEW PRODUCT =================

window.viewProduct = function(id) {

  const selectedProduct =
    products.find(product => product.id === id);

  localStorage.setItem(
    "selectedProduct",
    JSON.stringify(selectedProduct)
  );

  window.location.href = "product.html";
};


// ================= START =================

loadProducts();