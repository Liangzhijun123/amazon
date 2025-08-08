import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrenct } from "./utils/money.js";
hello();
console.log(dayjs());

let cartSummaryHtml = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHtml += `
 <div class="cart-item-container js-cart-item-container-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrenct(cartItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <input type="number" min="1" class="quantity-input input-quantity" value="${cartItem.quantity}" data-product-id="${matchingProduct.id}">
            </span>
            <span class="update-quantity-link link-primary js-update" data-product-id="${matchingProduct.id}">
              Update
            </span>
           <span 
            class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingProduct.id}">
            Delete
          </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

console.log("Cart summary HTML:", cartSummaryHtml);

const checkout = document.querySelector(".js-orderSummary");
checkout.innerHTML = cartSummaryHtml;

checkoutQuantity();

// delete link event listener
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    console.log("Delete link clicked");

    const productId = link.dataset.productId;
    console.log("Product ID to delete:", productId);

    removeFromCart(productId);
    console.log("Cart after deletion:", cart);

    // Re-render the cart summary after deletion
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    console.log(cartItemContainer);

    cartItemContainer.remove();

    checkoutQuantity();
  });
});

export function checkoutQuantity() {
  const checkoutQuantityElement = document.querySelector(".checkout-quantity");
  // Sum all quantities in the cart
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  checkoutQuantityElement.innerText = `Checkout (${totalQuantity} items)`;
}

const updateButtons = document.querySelectorAll(".js-update");
updateButtons.forEach((button) => {
  button.addEventListener("click", function handler() {
    const productId = button.dataset.productId;
    const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);

    if (button.innerText === "Update") {
      // Enable editing and change button to "Save"
      input.removeAttribute("readonly");
      input.focus();
      button.innerText = "Save";
    } else {
      // Save the new quantity
      const newQuantity = Number(input.value);
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem && newQuantity > 0) {
        cartItem.quantity = newQuantity;
        saveToStorage();
        checkoutQuantity();
        // Optionally, set input back to readonly and button back to "Update"
        input.setAttribute("readonly", true);
        button.innerText = "Update";
      }
    }
  });
});

// Make all quantity inputs readonly by default
document.querySelectorAll(".quantity-input").forEach(input => {
  input.setAttribute("readonly", true);
});