export const cart = [];

export function addToCart(productId, quantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      return;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cartQuantity").innerHTML = cartQuantity;

  console.log(
    "Cart updated:",
    productName,
    "price:",
    productPrice,
    "cart quantity:",
    cartQuantity
  );
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