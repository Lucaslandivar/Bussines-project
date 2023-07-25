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
  
    if (stock[product] >= quantity && quantity > 0 && price > 0) {
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
      alert("Invalid quantity, product not available, or invalid price!");
    }
  }
  
  function refillProduct() {
    const product = document.getElementById("refill-product").value;
    const quantity = parseInt(document.getElementById("refill-quantity").value);
    const price = parseFloat(document.getElementById("refill-price").value);
  
    if (quantity > 0 && price > 0) {
      stock[product] += quantity;
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
    const refillProductContainer = document.getElementById("refill-product-container");
    refillProductContainer.innerHTML = "<h2>Refilled Products</h2>";
    for (const product in refillProducts) {
      const { quantity, totalCost, pricePerItem } = refillProducts[product];
      refillProductContainer.innerHTML += `<p>${product}: ${quantity} refilled for $${totalCost.toFixed(2)} ($${pricePerItem.toFixed(2)} each)</p>`;
    }
  
    // Set a timeout to remove the product details after 2 seconds
    setTimeout(() => {
      refillProductContainer.innerHTML = "<h2>Refilled Products</h2>";
    }, 2000); // 2000 milliseconds = 2 seconds
  }
  
  function updateTotalMoney() {
    document.getElementById("total-money").textContent = totalMoney.toFixed(2);
  }
   