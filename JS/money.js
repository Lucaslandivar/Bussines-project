// money-container

let totalMoney = 20;

// Update the total money display
function updateTotalMoney() {
    const totalMoneyElement = document.getElementById("total-money");
    totalMoneyElement.textContent = totalMoney.toFixed(2);
    totalMoneyElement.style.color = totalMoney >= 0 ? "green" : "red"; // Set color based on positive/negative value
  }

// Add money to the total money amount
function addMoney() {
    const amount = parseFloat(document.getElementById("money-amount").value);
    const source = document.getElementById("money-source").value;
  
    if (!isNaN(amount) && amount !== 0 && source.trim() !== "") {
      totalMoney += amount;
      updateTotalMoney();
      addMoneyTransaction(amount, source);
      clearMoneyInputs();
    } else {
      alert("Invalid amount or source!");
    }
  }
  

function toggleTransactions() {
  const transactionsSection = document.getElementById("transactions");
  transactionsSection.style.display = transactionsSection.style.display === "none" ? "block" : "none";
}

// Add money transaction to the money section
function addMoneyTransaction(amount, source) {
    const transactionsSection = document.getElementById("transactions");
    const transactionElement = document.createElement("div");
    transactionElement.textContent = `${amount >= 0 ? "Received" : "Spent"} $${Math.abs(amount).toFixed(2)} from/to: ${source}`;
    transactionElement.style.color = amount >= 0 ? "green" : "red"; // Set color based on positive/negative amount
    transactionsSection.appendChild(transactionElement);
  }

function clearMoneyInputs() {
  document.getElementById("money-amount").value = "";
  document.getElementById("money-source").value = "";
}
