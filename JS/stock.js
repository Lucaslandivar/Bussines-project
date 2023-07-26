// stock-container

let stock = {
    cookie: 5,
    candy: 10,
    chocolate: 4,
  };
  
  // Define the updateSellProductOptions function
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
  
  // Capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

  // Initialize the page with the current stock and sold products
    updateStock();
    updateSellProductOptions();
    updateSoldProducts();
    updateTotalMoney();