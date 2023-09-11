// !Money Section

// ?Seleção de Elementos
const moneyAmountInput = document.getElementById("money-amount");
const moneySourceInput = document.getElementById("money-source");
const transactionList = document.getElementById("transactionsList");
const moneyBtn = document.getElementById("moneyBtn");

let totalMoney = 20;

// ?Funções

// *Função de atualizar o dinheiro total na conta
function updateTotalMoney() {
    const totalMoneyAmount = document.getElementById("totalMoney");
    totalMoneyAmount.textContent = totalMoney >= 0 ? `$${totalMoney.toFixed(2)}` : `-$${Math.abs(totalMoney.toFixed(2))}`;
    totalMoneyAmount.style.color = totalMoney >= 0 ? "green" : "red";
}

// *Função de adicionar transação
function addTransaction() {

    const moneyAmount = parseFloat(moneyAmountInput.value);
    const moneySource = moneySourceInput.value;

        // *Se os valores estiverem vazios
        if (isNaN(moneyAmount) || moneyAmountInput.value === '' || moneySourceInput.value === '') {
            alert("Valores incorretos!");
            return;
        } 

    const moneyLi = document.createElement("li");

    // *Criar um novo elemento na parte das transações
    if (moneyAmount >= 0) {
        moneyLi.innerHTML = `<span class="positiveMoneyTransaction">$${moneyAmount}</span> foram adicionados de: <span class="transactionInfo">${moneySource}</span>`;
        totalMoney += moneyAmount;
        updateTotalMoney();
    } else {
        moneyLi.innerHTML = `<span class="negativeMoneyTransaction">-$${Math.abs(moneyAmount)}</span> foram descontados por: <span class="transactionInfo">${moneySource}</span>`;
        totalMoney += moneyAmount;
        updateTotalMoney();
    }

    // *criando e adicionando o novo Li
    moneyLi.classList.add("moneyLi");
    transactionList.appendChild(moneyLi);

    // *Limpar os inputs e focar no moneyAmountInput depois de limpado
    moneyAmountInput.value = ''; 
    moneySourceInput.value = '';

    moneyAmountInput.focus();
};

// ?Eventos

// *Quando o botão é clicado:
moneyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    addTransaction();
});

// *Quando a tecla enter é precionda:
moneyAmountInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {

        e.preventDefault();

        addTransaction();
    }
});

moneySourceInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        
        e.preventDefault();

        addTransaction();
    }
});