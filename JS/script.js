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

// !Stock Container

// ?Seleção de Elementos
const productsElements = document.querySelector(".products");
const stockContainer = document.getElementById("stockContainer");
const deleteBtn = document.querySelectorAll(".bx-trash");
const sellProductBtn = document.querySelectorAll(".bx-money-withdraw");
const sellContainer = document.getElementsByClassName("sellContainer")[0];

// ?Funções

function getProductFromStock(product) {
    for (const stockProduct in stock) {
    if (stockProduct.toLowerCase() === product.toLowerCase()) {
        return stockProduct;
        }
    }
    return product.toLowerCase();
}

// *Remover produtos do stock
function removeProduct(event) {
    const deleteButton = event.currentTarget; 
    const productElement = deleteButton.parentElement;
    
    if (confirm(`Tem certeza que quer remover este produto?`)) {
        productElement.remove(); 
    }
}

// *Trocar a clase da sell section
function goToSell(event) {
    sellContainer.classList.toggle("hide");
}

// ?Eventos

// *Evento de apagar produtos no botão de apagar
deleteBtn.forEach(deleteButton => {
    deleteButton.addEventListener("click", removeProduct);
});

// *Evento de trocar a clase do botão de vender
sellProductBtn.forEach(sellProductBtn => {
    sellProductBtn.addEventListener("click", goToSell);
});

// !Sell container 

// ?Seleção de elementos
const cancelBtn = document.getElementById("cancelBtn");
const sellBtn = document.getElementById("sellBtn");
const sellAmountInput = document.getElementById("product-sell-amount");
const productsInSale = document.getElementById("product-in-sell");
const sellDetailsInput = document.getElementById("sell-details");

let sellPrice = 3.50;
// ?Funções

// *Sell product
function sellProduct() {

    const sellAmount = parseFloat(sellAmountInput.value);
    const sellDetails = sellDetailsInput.value;
    const soldList = document.getElementById("soldList")
    const productLi = document.createElement("li"); 

    // *Multiplicar a quantidade vezes o preço do produto
    const finalSellPrice = sellAmount * sellPrice;

    // *Se os valores estiverem vazios
    if (isNaN(sellAmount) || sellDetailsInput.value === '') {
        alert("Valores incorretos!");
        return;
    } else {
        // *Criar uma Li com o resultado 
        productLi.innerHTML = `<li class="soldLi"><span class="soldAmount">${sellAmount} </span><span class="soldProduct">Kit Kat vendidos: </span><span class="positive">$${finalSellPrice}</span> foram comprados por: <span class="soldInfo">${sellDetails}</span></li>`;
        totalMoney += finalSellPrice;
        updateTotalMoney();
    }

    productLi.classList.add("soldLi");
    soldList.appendChild(productLi);


    // *Limpar os valores dos inputs
    sellAmountInput.value = "";
    sellDetailsInput.value = "";
}

// ?Eventos

// *vender Btn
sellBtn.addEventListener("click", (e) => {
    e.preventDefault();

    sellProduct();
})

// *Cancelar Venda
cancelBtn.addEventListener("click", () => {
    sellContainer.classList.toggle("hide");
});

// !Refill Section

// ?Seleção de elementos

// ?Funções

// ?Eventos