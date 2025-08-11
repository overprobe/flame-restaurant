const menuItems = [
  { name: "Fried Noodle", price: 2.2 },
  { name: "Fried Rice", price: 3 },
  { name: "Chicken Rice", price: 5 },
  { name: "Curry Rice", price: 7 }
];

const todaysPick = [];

// Select 2 random picks for today
function pickTodaysPick() {
  const picks = [];
  while (picks.length < 2) {
    const pick = menuItems[Math.floor(Math.random() * menuItems.length)];
    if (!picks.includes(pick)) picks.push(pick);
  }
  return picks;
}

const cart = [];

const todaysPickList = document.getElementById("todaysPickList");
const menuList = document.getElementById("menuList");
const cartList = document.getElementById("cartList");
const totalPriceEl = document.getElementById("totalPrice");
const myCartBtn = document.getElementById("myCartBtn");
const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const closeCartBtn = document.getElementById("closeCartBtn");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const orderSuccessModal = document.getElementById("orderSuccessModal");
const closeModalBtn = document.getElementById("closeModalBtn");

let highlightedItem = null;

// Render Today's Pick
function renderTodaysPick() {
  const picks = pickTodaysPick();
  todaysPickList.innerHTML = "";
  picks.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - RM ${item.price.toFixed(2)}`;
    li.addEventListener("click", () => {
      highlightMenuItem(item.name);
    });
    todaysPickList.appendChild(li);
  });
}

// Render Menu List with images toggle
function renderMenu() {
  menuList.innerHTML = "";
  menuItems.forEach(({ name, price }) => {
    const li = document.createElement("li");
    li.id = `menu-${name.replace(/\s+/g, "")}`;

    // Main clickable top row with item name and add to cart
    const itemTop = document.createElement("div");
    itemTop.classList.add("item-top");
    itemTop.innerHTML = `
      <span>${name} - RM ${price.toFixed(2)}</span>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    // Image element, hidden initially
    const img = document.createElement("img");
    img.classList.add("item-image");
    img.src = `img/${name.toLowerCase().replace(/\s+/g, "")}.png`;
    img.alt = name;
    img.loading = "lazy";
    img.style.display = "none";

    // Add to Cart button event
    const addToCartBtn = itemTop.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering li click
      addToCart(name);
    });

    // Clicking on li toggles image display
    li.addEventListener("click", () => {
      // Hide previously shown images in other items
      document.querySelectorAll(".item-image").forEach(image => {
        if (image !== img) {
          image.style.display = "none";
        }
      });

      // Toggle current image
      if (img.style.display === "none") {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });

    li.appendChild(itemTop);
    li.appendChild(img);
    menuList.appendChild(li);
  });
}

// Add item to cart
function addToCart(name) {
  const item = menuItems.find(i => i.name === name);
  if (!item) return;

  // If already in cart, increase quantity
  const cartItem = cart.find(i => i.name === name);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartCount();
}

// Render cart items
function renderCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    const li = document.createElement("li");
    li.classList.add("empty");
    li.textContent = "Your cart is empty.";
    cartList.appendChild(li);
    totalPriceEl.textContent = "Total: RM 0.00";
    return;
  }

  cart.forEach(({ name, price, quantity }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${name}</span>
      <div class="quantity-control">
        <button class="decrement-btn">-</button>
        <span>${quantity}</span>
        <button class="increment-btn">+</button>
        RM ${(price * quantity).toFixed(2)}
        <button class="remove-btn">Remove</button>
      </div>
    `;

    // Add event listeners for increment and decrement buttons
    li.querySelector(".decrement-btn").addEventListener("click", () => {
      updateCartQuantity(name, -1);
    });
    li.querySelector(".increment-btn").addEventListener("click", () => {
      updateCartQuantity(name, 1);
    });

    // Remove button event
    li.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(name);
    });

    cartList.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.textContent = `Total: RM ${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(name) {
  const index = cart.findIndex(i => i.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  renderCart();
  updateCartCount();
}

// Open Cart Panel
function openCart() {
  renderCart();
  cartPanel.classList.add("open");
  resetCartCount();
}

// Close Cart Panel
function closeCart() {
  cartPanel.classList.remove("open");
}

// Reset cart count badge to hidden
function resetCartCount() {
  cartCount.style.display = "none";
}

// Update cart count badge with total quantity
function updateCartCount() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalQuantity > 0) {
    cartCount.textContent = totalQuantity;
    cartCount.style.display = "inline-block";
  } else {
    cartCount.style.display = "none";
  }
}

let highlightedMenuItem = null;

// Highlight and scroll to menu item
function highlightMenuItem(name) {
  if (highlightedMenuItem) {
    highlightedMenuItem.classList.remove("highlight-permanent");
    highlightedMenuItem = null;
  }

  const id = `menu-${name.replace(/\s+/g, "")}`;
  const item = document.getElementById(id);
  if (!item) return;

  item.scrollIntoView({ behavior: "smooth", block: "center" });
  item.classList.add("highlight-permanent");
  highlightedMenuItem = item;

  function clearHighlightOnInput(e) {
    if (e.type === "scroll" || e.type === "mousedown") {
      if (highlightedMenuItem) {
        highlightedMenuItem.classList.remove("highlight-permanent");
        highlightedMenuItem = null;
      }
      window.removeEventListener("scroll", clearHighlightOnInput);
      window.removeEventListener("mousedown", clearHighlightOnInput);
    }
  }

  window.addEventListener("scroll", clearHighlightOnInput, { once: true });
  window.addEventListener("mousedown", clearHighlightOnInput, { once: true });
}

document.getElementById('adminPanelBtn').addEventListener('click', () => {
  window.location.href = 'admin.php';
});

// Event listeners
myCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);

placeOrderBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  // Send order to data.php via POST
  fetch('data.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items: cart })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      // Show modal confirmation
      orderSuccessModal.classList.remove("hidden");

      // Clear cart
      cart.length = 0;
      renderCart();
      updateCartCount();
      closeCart();
    } else {
      alert("Failed to place order.");
    }
  })
  .catch(() => {
    alert("Error placing order.");
  });
});

closeModalBtn.addEventListener("click", () => {
  orderSuccessModal.classList.add("hidden");
});

// Update item quantity in the cart
function updateCartQuantity(name, change) {
  const cartItem = cart.find(i => i.name === name);
  if (!cartItem) return;

  // Update the quantity
  cartItem.quantity += change;

  // Prevent quantity from going below 1
  if (cartItem.quantity < 1) cartItem.quantity = 1;

  renderCart();
  updateCartCount();
}

// Initialize
renderTodaysPick();
renderMenu();
updateCartCount();
