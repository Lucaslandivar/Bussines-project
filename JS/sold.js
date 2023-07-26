// sold-container

let soldProducts = {};

function updateSoldProducts() {
  const soldProductContainer = document.getElementById("sold-product-container");
  soldProductContainer.innerHTML = "<h2>Sold Products</h2>";
  for (const product in soldProducts) {
    const { quantity, totalRevenue } = soldProducts[product];
    const pricePerItem = totalRevenue / quantity;
    soldProductContainer.innerHTML += `<p>${product}: ${quantity} sold for $${totalRevenue.toFixed(2)} ($${pricePerItem.toFixed(2)} each)</p>`;
  }
}
