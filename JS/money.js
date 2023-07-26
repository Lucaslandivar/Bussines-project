// money-container
let totalMoney = 20;

// Update the total money display and set color to green if money is >= 0
function updateTotalMoney() {
  const totalMoneyElement = document.getElementById("total-money");
  totalMoneyElement.textContent = totalMoney.toFixed(2);
  totalMoneyElement.style.color = totalMoney >= 0 ? "green" : "red";
}

// Add money
function addMoney() {
  const amount = parseFloat(document.getElementById("money-amount").value);
  const source = document.getElementById("money-source").value;

  if (!isNaN(amount) && parseFloat(amount) !== 0 && source.trim() !== "") {
    totalMoney += amount;
    updateTotalMoney();
    addMoneyTransaction(amount, source);
    clearMoneyInputs();

    // Store the updated total money and transactions in Local Storage
    localStorage.setItem("totalMoney", JSON.stringify(totalMoney));
    updateTransactionsInLocalStorage();
  } else {
    alert("Invalid amount or source!");
  }
}

// Clear money input fields
function clearMoneyInputs() {
  document.getElementById("money-amount").value = "";
  document.getElementById("money-source").value = "";
}

// Add money transaction to the transactions section
function addMoneyTransaction(amount, source) {
    const transactionsSection = document.getElementById("transactions");
    const transactionElement = document.createElement("div");
    transactionElement.innerHTML = `Received $${amount.toFixed(2)} from: ${source}`;
    transactionElement.style.color = amount >= 0 ? "green" : "red"; // Set color to green for positive income and red for negative income
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      deleteTransaction(transactionElement);
      updateTransactionsInLocalStorage();
    };
  
    transactionElement.appendChild(deleteButton);
    transactionsSection.appendChild(transactionElement);
  }
  
  // Function to delete a transaction
  function deleteTransaction(transactionElement) {
    const transactionsSection = document.getElementById("transactions");
    transactionsSection.removeChild(transactionElement);
  }
  
  // Update the transactions data in Local Storage
  function updateTransactionsInLocalStorage() {
    const transactionsSection = document.getElementById("transactions");
    const transactions = Array.from(transactionsSection.children).map(transaction => {
      return {
        content: transaction.innerHTML,
        color: transaction.style.color
      };
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  // Function to delete a transaction
function deleteTransaction(transactionElement) {
    const transactionContent = transactionElement.innerHTML;
    const amountRegex = /Received \$([\d.]+) from:/; // Regex to match the amount in the transaction content
    const match = transactionContent.match(amountRegex);
  
    if (match) {
      const amount = parseFloat(match[1]);
      const confirmationMessage = `Are you sure you want to delete the transaction with amount $${amount.toFixed(2)}?`;
      const userConfirmed = confirm(confirmationMessage);
  
      if (userConfirmed) {
        totalMoney -= amount;
        updateTotalMoney();
  
        const transactionsSection = document.getElementById("transactions");
        transactionsSection.removeChild(transactionElement);
      }
    }
  }

// Update the transactions data in Local Storage
function updateTransactionsInLocalStorage() {
    const transactionsSection = document.getElementById("transactions");
    const transactions = Array.from(transactionsSection.children).map(transaction => {
      return {
        content: transaction.innerHTML,
        color: transaction.style.color
      };
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

// When the page loads, retrieve data from Local Storage if available
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("stock")) {
    stock = JSON.parse(localStorage.getItem("stock"));
    updateStock();
  }

  if (localStorage.getItem("soldProducts")) {
    soldProducts = JSON.parse(localStorage.getItem("soldProducts"));
    updateSoldProducts();
  }

  if (localStorage.getItem("refillProducts")) {
    refillProducts = JSON.parse(localStorage.getItem("refillProducts"));
    updateRefillProducts();
  }

  if (localStorage.getItem("totalMoney")) {
    totalMoney = parseFloat(localStorage.getItem("totalMoney"));
    updateTotalMoney();
  }

  // Retrieve transactions from Local Storage
  if (localStorage.getItem("transactions")) {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    const transactionsSection = document.getElementById("transactions");
    transactions.forEach(transaction => {
      const transactionElement = document.createElement("div");
      transactionElement.innerHTML = transaction.content;
      transactionElement.style.color = transaction.color;
      transactionsSection.appendChild(transactionElement);
    });
  }
});

// Initialize the page with the current stock and sold products
updateStock();
updateSellProductOptions();
updateSoldProducts();
updateTotalMoney();