import { cart , addToCart, updateCartQuantity, updateCartButton} from "../data/cart.js";
import { products } from "../data/products.js";

// combine the products into html into variable
// we getting products from data/products.js
// so we don't need to define products here again
let productsHtml = "";

products.forEach((product) => {
  productsHtml += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

   <button 
  class="add-to-cart-button button-primary js-add-to-cart-button"
 data-product-name="${product.name}"
  data-product-id="${product.id}"
  data-product-price="${(product.priceCents / 100).toFixed(2)}"
  data-product-image="${product.image}"
  data-product-rating-stars="${product.rating.stars}"
  data-product-rating-count="${product.rating.count}"
>
  Add to Cart
</button>
  </div>
  `;
});

console.log(productsHtml);

// put the productsHtml into the products container
const productsContainer = document.querySelector(".js-grid");
productsContainer.innerHTML = productsHtml;



document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const productPrice = button.dataset.productPrice;

    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(quantitySelector.value);

    addToCart(productId,quantity, productPrice);

    updateCartQuantity();

    updateCartButton();
  });
});
