// sell-container
function sellProduct() {
  const product = document.getElementById("sell-product").value;
  const quantity = parseInt(document.getElementById("sell-quantity").value);
  const price = parseFloat(document.getElementById("sell-price").value);

  if (quantity > 0 && price > 0) {
    const productName = getProductFromStock(product);
    const availableQuantity = stock[productName];

    if (availableQuantity >= quantity) {
      const totalSaleAmount = price * quantity;

      stock[productName] -= quantity;
      totalMoney += totalSaleAmount;

      if (soldProducts[productName]) {
        soldProducts[productName].quantity += quantity;
        soldProducts[productName].totalRevenue += totalSaleAmount;
      } else {
        soldProducts[productName] = { quantity, totalRevenue: totalSaleAmount };
      }

      updateStock();
      updateSoldProducts();
      updateTotalMoney();
      updateRefillProducts();

      // Store the updated data in Local Storage
      localStorage.setItem("stock", JSON.stringify(stock));
      localStorage.setItem("soldProducts", JSON.stringify(soldProducts));
      localStorage.setItem("totalMoney", JSON.stringify(totalMoney));
    } else {
      alert(`Not enough quantity in stock! Available quantity: ${availableQuantity}`);
    }
  } else {
    alert("Invalid quantity or price!");
  }
}