// stock-container
let stock = {
    cookie: 5,
    candy: 10,
    chocolate: 4,
  };
  
  // Get the correct product name from the stock
  function getProductFromStock(product) {
    for (const stockProduct in stock) {
      if (stockProduct.toLowerCase() === product.toLowerCase()) {
        return stockProduct;
      }
    }
    return product.toLowerCase();
  }
  
  // Delete a product from the stock
  function deleteProduct(product) {
    if (confirm(`Are you sure you want to delete "${capitalizeFirstLetter(product)}"?`)) {
      delete stock[product];
      updateStock();
      updateSellProductOptions(); // Update options in the sell-product dropdown
    }
  }
  
  // Update the stock list display
  function updateStock() {
    const stockList = document.getElementById("stock-list");
    stockList.innerHTML = "";
  
    for (const product in stock) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span contenteditable="true" class="product-name" data-product="${product}">${capitalizeFirstLetter(product)}</span>: 
        <span class="product-quantity" id="stock-${product}">${stock[product]}</span>
        <button onclick="deleteProduct('${product}')">Remove</button>
      `;
      stockList.appendChild(listItem);
    }
  }
  
  // sell-container
  function sellProduct() {
    const product = document.getElementById("sell-product").value;
    const quantity = parseInt(document.getElementById("sell-quantity").value);
    const price = parseFloat(document.getElementById("sell-price").value);
  
    if (quantity > 0 && price > 0) {
      const productName = getProductFromStock(product);
      if (stock[productName] >= quantity) {
        stock[productName] -= quantity;
        totalMoney += price * quantity;
  
        if (soldProducts[productName]) {
          soldProducts[productName].quantity += quantity;
          soldProducts[productName].totalRevenue += price * quantity;
        } else {
          soldProducts[productName] = { quantity, totalRevenue: price * quantity };
        }
  
        updateStock();
        updateSoldProducts();
        updateTotalMoney();
      } else {
        alert("Not enough quantity in stock!");
      }
    } else {
      alert("Invalid quantity or price!");
    }
  }
  
  // refill-container
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
  
  // Add product to stock list
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
  
  // Add product to sell-container dropdown
  function addProductToSellContainer(product) {
    const sellProductSelect = document.getElementById("sell-product");
    const productOption = document.createElement("option");
    productOption.value = product;
    productOption.textContent = capitalizeFirstLetter(product);
    sellProductSelect.appendChild(productOption);
  }
  
  // Capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Update options in the sell-product dropdown
  function updateSellProductOptions() {
    const sellProductSelect = document.getElementById("sell-product");
    sellProductSelect.innerHTML = "";
  
    for (const product in stock) {
      const productOption = document.createElement("option");
      productOption.value = product;
      productOption.textContent = capitalizeFirstLetter(product);
      sellProductSelect.appendChild(productOption);
    }
  }
  
  // Update the refill-products display
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
  
  // sold-container
  let soldProducts = {};
  
  // Update the sold-products display
  function updateSoldProducts() {
    const soldProductContainer = document.getElementById("sold-product-container");
    soldProductContainer.innerHTML = "<h2>Sold Products</h2>";
    for (const product in soldProducts) {
      const { quantity, totalRevenue } = soldProducts[product];
      const pricePerItem = totalRevenue / quantity;
      soldProductContainer.innerHTML += `<p>${product}: ${quantity} sold for $${totalRevenue.toFixed(2)} ($${pricePerItem.toFixed(2)} each)</p>`;
    }
  }
  
  // money
  let totalMoney = 20;
  
  // Update the total money display
  function updateTotalMoney() {
    document.getElementById("total-money").textContent = totalMoney.toFixed(2);
  }

  function addMoney() {
    const amount = parseFloat(document.getElementById("money-amount").value);
    const source = document.getElementById("money-source").value;
  
    if (amount > 0 && source.trim() !== "") {
      totalMoney += amount;
      updateTotalMoney();
      addMoneyTransaction(amount, source);
      clearMoneyInputs();
    } else {
      alert("Invalid amount or source!");
    }
  }
  
  function addMoneyTransaction(amount, source) {
    const moneyTransactionList = document.getElementById("money-transaction-list");
    const transactionElement = document.createElement("div");
    transactionElement.textContent = `Received $${amount.toFixed(2)} from: ${source}`;
    moneyTransactionList.appendChild(transactionElement);
  }
  
  function clearMoneyInputs() {
    document.getElementById("money-amount").value = "";
    document.getElementById("money-source").value = "";
  }
  
  // Initialize the page with the current stock and sold products
  updateStock();
  updateSellProductOptions();
  updateSoldProducts();
  updateTotalMoney();
  