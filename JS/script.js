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
      if (stock[product] >= quantity) {
        stock[product] -= quantity;
        totalMoney += price * quantity;
  
        if (soldProducts[product]) {
          soldProducts[product].quantity += quantity;
          soldProducts[product].totalRevenue += price * quantity;
        } else {
          soldProducts[product] = { quantity, totalRevenue: price * quantity };
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
  
  function refillProduct() {
    const product = document.getElementById("refill-product").value.toLowerCase(); // Convert to lowercase
    const quantity = parseInt(document.getElementById("refill-quantity").value);
    const price = parseFloat(document.getElementById("refill-price").value);
  
    if (quantity > 0 && price > 0) {
      if (stock[product]) {
        // If the product exists in stock, just refill it
        stock[product] += quantity;
      } else {
        // If the product doesn't exist in stock, add it
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
  
      // Clear the input fields after successfully refilling a product
      document.getElementById("refill-product").value = "";
      document.getElementById("refill-quantity").value = "1";
      document.getElementById("refill-price").value = "";
    } else {
      alert("Invalid quantity or price!");
    }
  }

  function addProductToStock(product, quantity) {
    stock[product] = quantity;
    const stockContainer = document.getElementById("stock-container");
    const productElement = document.createElement("p");
    productElement.innerHTML = `${capitalizeFirstLetter(product)}: <span id="stock-${product}">${quantity}</span>`;
    stockContainer.appendChild(productElement);
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
    document.getElementById("stock-cookie").textContent = stock.cookie;
    document.getElementById("stock-candy").textContent = stock.candy;
    document.getElementById("stock-chocolate").textContent = stock.chocolate;
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
      refillProductMessage.appendChild(productElement); // Append to the message div
    }
  }
  
  function updateTotalMoney() {
    document.getElementById("total-money").textContent = totalMoney.toFixed(2);
  }
   