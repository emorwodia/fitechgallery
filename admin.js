// ================= FIREBASE =================

import {
  auth,
  db
} from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ================= ADMIN PROTECTION =================

onAuthStateChanged(auth, (user) => {

  if (!user) {

    window.location.href = "login.html";

  } else {

    document.getElementById("admin-email").textContent =
      user.email;

    loadProducts();
  }
});


// ================= LOGOUT =================

const logoutBtn =
  document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {

  signOut(auth)
    .then(() => {

      alert("Logged out");

      window.location.href = "login.html";
    });
});


// ================= ADD PRODUCT =================

const productForm =
  document.getElementById("product-form");

productForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name =
    document.getElementById("product-name").value;

  const price =
    Number(
      document.getElementById("product-price").value
    );

  const image =
    document.getElementById("product-image").value;

  const category =
    document.getElementById("product-category").value;

  try {

    await addDoc(
      collection(db, "products"),
      {
        name,
        price,
        image,
        category
      }
    );

    alert("Product Added");

    productForm.reset();

    loadProducts();

  } catch (error) {

    alert(error.message);
  }
});


// ================= LOAD PRODUCTS =================

async function loadProducts() {

  const container =
    document.getElementById("admin-products");

  container.innerHTML = "";

  const querySnapshot =
    await getDocs(collection(db, "products"));

  querySnapshot.forEach((docItem) => {

    const product = docItem.data();

    container.innerHTML += `

      <div class="admin-card">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <h3>${product.name}</h3>

        <p>₦${product.price}</p>

        <p>${product.category}</p>

        <button
          class="delete-btn"
          onclick="deleteProduct('${docItem.id}')"
        >
          Delete
        </button>

      </div>

    `;
  });
}


// ================= DELETE PRODUCT =================

window.deleteProduct = async function(id) {

  const confirmDelete =
    confirm("Delete this product?");

  if (!confirmDelete) return;

  await deleteDoc(doc(db, "products", id));

  loadProducts();
};