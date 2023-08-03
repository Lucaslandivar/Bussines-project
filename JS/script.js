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

    if (moneyAmountInput.value === '' || moneySourceInput.value === '') {
        alert("Valores incorretos!")
    } else {
        moneyLi.innerHTML = `$${moneyAmount} foram adicionados de: ${moneySource}`;
        moneyLi.classList.add("moneyLi");
        transactionList.appendChild(moneyLi);
    }
};
// Eventos
moneyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    addTransaction();
});
