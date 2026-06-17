const products = [
  {
    id: "original",
    name: "Pure Original",
    category: "classic",
    flavor: "Clean coconut",
    size: "11 oz carton",
    notes: ["0 g added sugar", "not from concentrate", "470 mg potassium"],
    description: "Crisp young coconut water with a smooth, naturally sweet finish."
  },
  {
    id: "pineapple",
    name: "Pineapple Lift",
    category: "fruit",
    flavor: "Pineapple coconut",
    size: "11 oz carton",
    notes: ["tropical fruit", "light acidity", "post-workout friendly"],
    description: "Bright pineapple flavor balanced with clean coconut water for sunny refreshment."
  },
  {
    id: "lime",
    name: "Lime Breeze",
    category: "fruit",
    flavor: "Lime coconut",
    size: "11 oz carton",
    notes: ["citrus finish", "no added sugar", "served chilled"],
    description: "A fresh lime finish makes this blend especially crisp after movement."
  },
  {
    id: "mango",
    name: "Mango Tide",
    category: "fruit",
    flavor: "Mango coconut",
    size: "11 oz carton",
    notes: ["smooth mango", "natural electrolytes", "family favorite"],
    description: "Soft mango notes give this coconut water a mellow tropical character."
  },
  {
    id: "sparkling",
    name: "Sparkling Wave",
    category: "classic",
    flavor: "Carbonated coconut",
    size: "10 oz slim can",
    notes: ["light bubbles", "clean mixer", "refreshing finish"],
    description: "A bubbly version of coconut water for afternoons, mocktails, and light meals."
  },
  {
    id: "case",
    name: "Studio Case Pack",
    category: "bulk",
    flavor: "Assorted flavors",
    size: "24 cartons",
    notes: ["gym ready", "café friendly", "wholesale option"],
    description: "A mixed case built for cafés, yoga studios, office fridges, and events."
  }
];

const storageKeys = {
  savedProducts: "cocowaveSavedProducts",
  contactRequest: "cocowaveContactRequest"
};

function getSavedProducts() {
  const saved = localStorage.getItem(storageKeys.savedProducts);
  return saved ? JSON.parse(saved) : [];
}

function saveProducts(savedProducts) {
  localStorage.setItem(storageKeys.savedProducts, JSON.stringify(savedProducts));
}

function createProductCard(product, isSaved = false) {
  const notes = product.notes.map((note) => `<li>${note}</li>`).join(``);
  const buttonText = isSaved ? "Saved" : "Save Product";

  return `
    <article class="product-card">
      <div class="product-art" aria-hidden="true">
        <div class="carton">
          <strong>CocoWave</strong>
          <span>${product.flavor}</span>
        </div>
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <ul class="product-meta">
        <li>${product.size}</li>
        ${notes}
      </ul>
      <button class="save-button" type="button" data-product-id="${product.id}">${buttonText}</button>
    </article>
  `;
}

function renderProducts(containerId, filter = "all", limit = products.length) {
  const container = document.querySelector(`#${containerId}`);

  if (!container) {
    return;
  }

  const savedProducts = getSavedProducts();
  const filteredProducts = products
    .filter((product) => filter === "all" || product.category === filter)
    .slice(0, limit);

  container.innerHTML = filteredProducts
    .map((product) => createProductCard(product, savedProducts.includes(product.id)))
    .join("");
}

function updateSavedMessage() {
  const message = document.querySelector("#saved-message");

  if (!message) {
    return;
  }

  const savedCount = getSavedProducts().length;
  message.textContent = savedCount > 0
    ? `You have ${savedCount} saved CocoWave selection${savedCount === 1 ? `` : `s`}.`
    : `Save products to compare your favorites later.`;
}

function toggleSavedProduct(productId) {
  const savedProducts = getSavedProducts();
  const isSaved = savedProducts.includes(productId);
  const updatedProducts = isSaved
    ? savedProducts.filter((savedId) => savedId !== productId)
    : [...savedProducts, productId];

  saveProducts(updatedProducts);
  renderProducts("product-list", document.querySelector(".filter-button.active")?.dataset.filter || "all");
  renderProducts("featured-products", "all", 3);
  updateSavedMessage();
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", `${isOpen}`);
  });
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((currentButton) => currentButton.classList.remove("active"));
      button.classList.add("active");
      renderProducts("product-list", button.dataset.filter);
      updateSavedMessage();
    });
  });
}

function setupProductSaving() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".save-button");

    if (!button) {
      return;
    }

    toggleSavedProduct(button.dataset.productId);
  });
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (!form || !status) {
    return;
  }

  const storedRequest = localStorage.getItem(storageKeys.contactRequest);

  if (storedRequest) {
    const request = JSON.parse(storedRequest);
    form.elements.name.value = request.name || "";
    form.elements.email.value = request.email || "";
    form.elements.request.value = request.request || "";
    form.elements.quantity.value = request.quantity || "";
    form.elements.message.value = request.message || "";
    form.elements.updates.checked = request.updates || false;
    status.textContent = `Welcome back, ${request.name}. Your last request was restored.`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const request = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      request: formData.get("request"),
      quantity: formData.get("quantity"),
      message: formData.get("message").trim(),
      updates: formData.has("updates")
    };

    if (request.message.length < 12) {
      status.textContent = `Please share a little more detail so our team can route your request correctly.`;
      return;
    }

    localStorage.setItem(storageKeys.contactRequest, JSON.stringify(request));
    status.textContent = `Thank you, ${request.name}. Your ${request.request} request has been saved and is ready to send.`;
    form.reset();
  });
}

function setFooterYear() {
  document.querySelectorAll("#year").forEach((year) => {
    year.textContent = `${new Date().getFullYear()}`;
  });
}

renderProducts("featured-products", "all", 3);
renderProducts("product-list");
updateSavedMessage();
setupNavigation();
setupFilters();
setupProductSaving();
setupContactForm();
setFooterYear();
