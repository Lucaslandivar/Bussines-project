// Money Section
// Seleção de Elementos
const totalMoney = document.getElementById("totalMoney");
const moneyAmountInput = document.getElementById("money-amount");
const moneySourceInput = document.getElementById("money-source");
const transactionList = document.getElementById("transactionsList");
const moneyBtn = document.getElementById("moneyBtn");


// Funções
function addTransaction() {
    const moneyAmount = moneyAmountInput.value;
    const moneySource = moneySourceInput.value;
    const moneyLi = document.createElement("li");
    const moneySpan = document.getElementsByClassName("negativeMoneyTransaction");

    if (moneyAmount >= 0) {
        moneyLi.innerHTML = `<span class="positiveMoneyTransaction">$${moneyAmount}</span> foram adicionados de: <span class="transactionInfo">${moneySource}</span>`;
        moneyLi.classList.add("moneyLi");
        transactionList.appendChild(moneyLi);
    } else {
        moneyLi.innerHTML = `<span class="negativeMoneyTransaction">-$${moneyAmount}</span> foram descontados por: <span class="transactionInfo">${moneySource}</span>`;
        moneyLi.classList.add("moneyLi");
        transactionList.appendChild(moneyLi);
    }

    if (moneyAmountInput.value === '' || moneySourceInput.value === '') {
        alert("Valores incorretos!")
    } else {
        return;
    }
};

// Eventos
moneyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    addTransaction();
});
