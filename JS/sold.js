// sold-container
let soldProducts = {};

// Update the sold-products display with green color for sold items
function updateSoldProducts() {
  const soldProductContainer = document.getElementById("sold-product-container");
  soldProductContainer.innerHTML = "<h2>Sold Products</h2>";
  for (const product in soldProducts) {
    const { quantity, totalRevenue } = soldProducts[product];
    const pricePerItem = totalRevenue / quantity;
    const productElement = document.createElement("p");
    productElement.textContent = `${product}: ${quantity} sold for $${totalRevenue.toFixed(2)} ($${pricePerItem.toFixed(2)} each)`;
    productElement.style.color = "green"; // Set color to green for sold products
    soldProductContainer.appendChild(productElement);
  }
}