// money-container

let totalMoney = 20;

function updateTotalMoney() {
  document.getElementById("total-money").textContent = totalMoney.toFixed(2);
}

function addMoney() {
    const amount = parseFloat(document.getElementById("money-amount").value);
    const source = document.getElementById("money-source").value;
  
    if (!isNaN(amount) && source.trim() !== "") {
      if (amount === 0) {
        alert("Amount cannot be zero.");
        return;
      }
  
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

function addMoneyTransaction(amount, source) {
    const transactionsSection = document.getElementById("transactions");
    const transactionElement = document.createElement("div");
  
    if (amount >= 0) {
      transactionElement.textContent = `Received $${amount.toFixed(2)} from: ${source}`;
    } else {
      transactionElement.textContent = `Spent $${Math.abs(amount).toFixed(2)} for: ${source}`;
    }
  
    transactionsSection.appendChild(transactionElement);
  }
  

function clearMoneyInputs() {
  document.getElementById("money-amount").value = "";
  document.getElementById("money-source").value = "";
}
