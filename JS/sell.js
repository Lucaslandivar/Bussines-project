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
