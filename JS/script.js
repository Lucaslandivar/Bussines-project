let stock = {
    cookie: 5,
    candy: 10,
    chocolate: 4,
  };
  
  let soldProducts = {};
  let refillProducts = {};
  
  let totalMoney = 20;
  
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
  
  function getProductFromStock(product) {
    for (const stockProduct in stock) {
      if (stockProduct.toLowerCase() === product.toLowerCase()) {
        return stockProduct;
      }
    }
    return product.toLowerCase(); // If not found in stock, use the input as the product name
  }
  
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
  
  function editProduct(product) {
    const productNameElement = document.querySelector(`[data-product="${product}"]`);
    const newProductName = productNameElement.innerText.trim().toLowerCase();
  
    if (stock[product] !== undefined && newProductName !== product && newProductName !== "") {
      stock[newProductName] = stock[product];
      delete stock[product];
      updateStockList();
      updateSellProductOptions(); // Update options in the sell-product dropdown
    } else {
      // Restore the original name
      productNameElement.innerText = capitalizeFirstLetter(product);
    }
  }
  
  function deleteProduct(product) {
    if (confirm(`Are you sure you want to delete "${capitalizeFirstLetter(product)}"?`)) {
      delete stock[product];
      updateStockList();
      updateSellProductOptions(); // Update options in the sell-product dropdown
    }
  }
  
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
      <button onclick="editProduct('${product}')">Edit</button>
      <button onclick="deleteProduct('${product}')">Delete</button>
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
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function updateStock() {
    const stockList = document.getElementById("stock-list");
    stockList.innerHTML = "";
  
    for (const product in stock) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span contenteditable="true" class="product-name" data-product="${product}">${capitalizeFirstLetter(product)}</span>: 
        <span class="product-quantity" id="stock-${product}">${stock[product]}</span>
        <button onclick="editProduct('${product}')">Edit</button>
        <button onclick="deleteProduct('${product}')">Delete</button>
      `;
      stockList.appendChild(listItem);
    }
  }
  
  function updateSoldProducts() {
    const soldProductContainer = document.getElementById("sold-product-container");
    soldProductContainer.innerHTML = "<h2>Sold Products</h2>";
    for (const product in soldProducts) {
      const { quantity, totalRevenue } = soldProducts[product];
      const pricePerItem = totalRevenue / quantity;
      soldProductContainer.innerHTML += `<p>${product}: ${quantity} sold for $${totalRevenue.toFixed(2)} ($${pricePerItem.toFixed(2)} each)</p>`;
    }
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
  
  function updateTotalMoney() {
    document.getElementById("total-money").textContent = totalMoney.toFixed(2);
  }
  
  // Initialize the page with the current stock and sold products
  updateStock();
  updateSellProductOptions();
  updateSoldProducts();
  updateTotalMoney();
  