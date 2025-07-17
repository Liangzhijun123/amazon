export let cart = JSON.parse(localStorage.getItem("cart"));

//if the cart is empty
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      priceCents: 1090,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      priceCents: 2095,
    },
  ];
}

function saveToStorage() {
  // save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function reloadCartFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function addToCart(productId, quantity, priceCents) {
  reloadCartFromStorage();

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      return;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
    // Optionally update priceCents if needed
    // matchingItem.priceCents = priceCents;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      priceCents: priceCents,
    });
  }

  saveToStorage();
}


export function updateCartQuantity() {
  // Always get the latest cart from localStorage
  const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
  let cartQuantity = 0;
  cartFromStorage.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const cartQuantityElement = document.querySelector(".js-cartQuantity");
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

export function updateCartButton() {
  const productContainer = button.closest(".product-container");
  const addedToCart = productContainer.querySelector(".js-added-to-cart");
  console.log(`Added to cart ${productId}`);
  addedToCart.classList.add("active-button");

  const addedToCartTimeouts = {};
  // Clear previous timeout if it exists
  if (addedToCartTimeouts[productId]) {
    clearTimeout(addedToCartTimeouts[productId]);
  }

  // Set new timeout and store its ID
  addedToCartTimeouts[productId] = setTimeout(() => {
    addedToCart.classList.remove("active-button");
    addedToCartTimeouts[productId] = null;
  }, 2000);
}

export function removeFromCart(productId) {
  reloadCartFromStorage();
  
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  console.log("Cart after removal:", cart);

  saveToStorage();
}
