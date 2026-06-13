/* =========================================================
   Product Review Console — form.js
   ========================================================= */

// Data source for the "Product" select field.
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

/**
 * Builds the <option> elements for the Product select on form.html
 * using the `products` array above. The option's visible text is the
 * product name, and its value is the product id.
 */
function populateProductSelect() {
  const select = document.getElementById("product-name");
  if (!select) return;

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
  });
}

/**
 * Limits the Installation Date field so the user can't pick a date
 * in the future.
 */
function setMaxInstallDate() {
  const dateInput = document.getElementById("install-date");
  if (!dateInput) return;

  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("max", today);
}

/**
 * Turns a value like "easy-installation" into "Easy installation"
 * for display on the confirmation page.
 */
function humanize(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Reads the submitted form data from the query string (the form uses
 * method="get") and renders a short summary on review.html.
 */
function renderReviewSummary() {
  const summary = document.getElementById("review-summary");
  if (!summary) return;

  const params = new URLSearchParams(window.location.search);

  const productId = params.get("product-name");
  const product = products.find((item) => item.id === productId);
  const productName = product ? humanize(product.name) : "a product";

  const rating = params.get("rating");
  const installDate = params.get("install-date");
  const features = params.getAll("features");
  const reviewText = params.get("review-text");
  const userName = params.get("user-name");

  const greeting = userName ? `Thanks, ${userName}!` : "Thanks for the report!";

  let html = `<h2>${greeting}</h2><dl>`;

  html += `<dt>Product</dt><dd>${productName}</dd>`;

  if (rating) {
    html += `<dt>Rating</dt><dd>${"&star;".repeat(Number(rating))} (${rating} / 5)</dd>`;
  }

  if (installDate) {
    html += `<dt>Installed on</dt><dd>${installDate}</dd>`;
  }

  if (features.length > 0) {
    html += `<dt>Useful features</dt><dd>${features.map(humanize).join(", ")}</dd>`;
  }

  if (reviewText) {
    html += `<dt>Review</dt><dd>${reviewText}</dd>`;
  }

  html += "</dl>";
  summary.innerHTML = html;
}

/**
 * Increments and displays the count of reviews submitted from this
 * browser, stored in localStorage so it persists between visits.
 */
function updateReviewCounter() {
  const counter = document.getElementById("review-counter");
  if (!counter) return;

  const STORAGE_KEY = "productReviewCount";
  const current = Number(localStorage.getItem(STORAGE_KEY)) || 0;
  const updated = current + 1;

  localStorage.setItem(STORAGE_KEY, String(updated));
  counter.textContent = String(updated);
}

document.addEventListener("DOMContentLoaded", () => {
  // form.html
  populateProductSelect();
  setMaxInstallDate();

  // review.html
  renderReviewSummary();
  updateReviewCounter();
});
