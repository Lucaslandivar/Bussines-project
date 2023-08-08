// Money Section
// Seleção de Elementos
const moneyContainer = document.getElementById("moneyContainer");
const totalMoneyAmount = document.getElementById("totalMoney");
const moneyAmountInput = document.getElementById("money-amount");
const moneySourceInput = document.getElementById("money-source");
const transactionList = document.getElementById("transactionsList");
const moneyBtn = document.getElementById("moneyBtn");

let totalMoney = 20;

// Funções

// Adicionar uma transação
function addTransaction() {
    const moneyAmount = parseFloat(moneyAmountInput.value);
    const moneySource = moneySourceInput.value;
    const moneyLi = document.createElement("li");
    const moneyP = document.createElement("p");

    if (moneyAmount >= 0) {
        moneyLi.innerHTML = `<span class="positiveMoneyTransaction">$${moneyAmount}</span> foram adicionados de: <span class="transactionInfo">${moneySource}</span>`;
        totalMoney += moneyAmount;
        moneyP.innerHTML = `Dinheiro Total: <span class="positive">$${totalMoney.toFixed(2)}</span>`;
    } else {
        moneyLi.innerHTML = `<span class="negativeMoneyTransaction">-$${Math.abs(moneyAmount)}</span> foram descontados por: <span class="transactionInfo">${moneySource}</span>`;
        totalMoney += moneyAmount;
        moneyP.innerHTML = `Dinheiro Total: <span class="negative">$${totalMoney.toFixed(2)}</span>`;
    }

    moneyLi.classList.add("moneyLi");
    transactionList.appendChild(moneyLi);

    moneyContainer.replaceChild(moneyP, totalMoneyAmount);

    if (isNaN(moneyAmount) || moneyAmountInput.value === '' || moneySourceInput.value === '') {
        alert("Valores incorretos!");
    } else {
        moneyAmountInput.value = ''; 
        moneySourceInput.value = '';
    }
};

// Eventos
moneyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    addTransaction();

});