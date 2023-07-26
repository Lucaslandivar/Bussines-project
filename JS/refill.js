// refill-container

let refillProducts = {};

function refillProduct() {
  const product = document.getElementById("refill-product").value.toLowerCase();
  const quantity = parseInt(document.getElementById("refill-quantity").value);
  const price = parseFloat(document.getElementById("refill-price").value);

  if (quantity > 0 && price > 0) {
    if (stock[product]) {
      stock[product] += quantity;
    } else {
      stock[product] = quantity;
      addProductToStock(product, quantity);
      addProductToSellContainer(product);
    }

    const totalCost = price * quantity;
    totalMoney -= totalCost;

    if (refillProducts[product]) {
      refillProducts[product].quantity += quantity;
      refillProducts[product].totalCost += totalCost;
      refillProducts[product].pricePerItem = refillProducts[product].totalCost / refillProducts[product].quantity;
    } else {
      refillProducts[product] = { quantity, totalCost, pricePerItem: price };
    }

    updateStock();
    updateRefillProducts();
    updateTotalMoney();

    document.getElementById("refill-product").value = "";
    document.getElementById("refill-quantity").value = "1";
    document.getElementById("refill-price").value = "";
  } else {
    alert("Invalid quantity or price!");
  }
}

function addProductToStock(product, quantity) {
  const stockList = document.getElementById("stock-list");
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <span contenteditable="true" class="product-name" data-product="${product}">${capitalizeFirstLetter(product)}</span>: 
    <span class="product-quantity" id="stock-${product}">${quantity}</span>
    <button onclick="deleteProduct('${product}')">Remove</button>
  `;
  stockList.appendChild(listItem);
}

function addProductToSellContainer(product) {
  const sellProductSelect = document.getElementById("sell-product");
  const productOption = document.createElement("option");
  productOption.value = product;
  productOption.textContent = capitalizeFirstLetter(product);
  sellProductSelect.appendChild(productOption);
}

function updateRefillProducts() {
  const refillProductMessage = document.getElementById("refill-product-message");
  refillProductMessage.innerHTML = "<h2>Refilled Products</h2>";
  for (const product in refillProducts) {
    const { quantity, totalCost, pricePerItem } = refillProducts[product];
    const productElement = document.createElement("p");
    productElement.textContent = `${product}: ${quantity} refilled for $${totalCost.toFixed(2)} ($${pricePerItem.toFixed(2)} each)`;
    refillProductMessage.appendChild(productElement); 
  }
}
