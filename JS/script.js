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

// *Quantidades iniciais dos produtos
const initialProductAmounts = {
    kitKat: 10,
    guarana: 5,
    bisExtra: 3,
};

// ?Funções

// *Atualizar a quantidade do produto
function updateProductAmount(productName, quantity, isRefill) {
    if (initialProductAmounts.hasOwnProperty(productName)) {
        // *Em caso de não houver produto suficiente
        if (!isRefill && quantity > initialProductAmounts[productName]) {
            alert("Não há produto suficiente.");
            return;
        }

        // *Ajustando a quantidade baseada no refill ou no sell
        initialProductAmounts[productName] += isRefill ? quantity : -quantity;

        const productAmountElement = document.querySelector(`.productAmount[data-product="${productName}"]`);
        
        if (productAmountElement) {
            productAmountElement.textContent = initialProductAmounts[productName];
        }
    }
}


// *Remover produtos do stock
function removeProduct(event) {
    const deleteButton = event.currentTarget; 
    const productElement = deleteButton.closest(".products");
    
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
stockContainer.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".bx-trash");
    if (deleteButton) {
        const productElement = deleteButton.closest(".products");
        if (confirm("Tem certeza que quer remover este produto?")) {
            productElement.remove();
        }
    }
});

// *Evento de trocar a classe do botão de vender
stockContainer.addEventListener("click", (event) => {
    const sellButton = event.target.closest(".bx-money-withdraw");
    if (sellButton) {
        goToSell(event);
    }
});

// !Sell container 

// ?Seleção de elementos
const cancelBtn = document.getElementById("cancelBtn");
const sellBtn = document.getElementById("sellBtn");
const sellAmountInput = document.getElementById("product-sell-amount");
const productsInSale = document.getElementById("product-in-sell");
const sellDetailsInput = document.getElementById("sell-details");
const soldList = document.getElementById("soldList")

const productPrices = {
    kitKat: 3.50,
    guarana: 2.50,
    bisExtra: 3.50,
};

// ?Funções

// *Sell product
function sellProduct() {

    const sellAmount = parseFloat(sellAmountInput.value);
    const sellDetails = sellDetailsInput.value;
    const productLi = document.createElement("li"); 

    // *Selecionar o produto individualmente
    const productDropdown = productsInSale.value;
    const productPrice = productPrices[productDropdown]; 

    // *Multiplicar a quantidade vezes o preço do produto
    const finalSellPrice = sellAmount * productPrice;

    // *Se os valores estiverem vazios
    if (isNaN(sellAmount) || sellDetailsInput.value === '') {
        alert("Valores incorretos!");
        return;
    } else {
        // *Criar uma Li com o resultado 
        productLi.innerHTML = `<span class="soldAmount">${sellAmount} </span><span class="soldProduct">${productDropdown} vendidos por: </span><span class="positive">R$${finalSellPrice.toFixed(2)}</span> para: <span class="soldInfo">${sellDetails}</span>`;
        totalMoney += finalSellPrice;
        updateProductAmount(productDropdown, sellAmount);
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
});

// *Cancelar Venda
cancelBtn.addEventListener("click", () => {
    sellContainer.classList.toggle("hide");
});

// !Refill Section

// ?Seleção de elementos
const refillContainer = document.getElementById("refillContainer");
const refillProductInput = document.getElementById("refill-product");
const refillAmountInput = document.getElementById("refill-amount");
const refillPriceInput = document.getElementById("refill-price");
const refillBtn = document.getElementById("refillBtn");
const cancelRefillBtn = document.getElementById("cancelRefillBtn");

// ?Funções

// *Adicionar produto ao stock
function updateStock() {
    const refillProductDropdown = document.getElementById("refill-product");
    const refillAmount = parseFloat(refillAmountInput.value);
    const refillPrice = parseFloat(refillPriceInput.value);
    const refillProductLi = document.createElement("li");
    
    // *Selecionar o produto no menu
    const refillProduct = refillProductDropdown.value;
    
    if (refillProduct === "newProduct") {
        const newProductName = prompt("Informe o nome do novo produto:");
        if (newProductName) {
            updateProductAmount(newProductName, refillAmount, true);
            
            // *Criar um novo produto
            const newProduct = document.createElement("div");
            newProduct.innerHTML = `
            <h4>${newProductName}: <span class="productAmount" data-product="${newProductName}">${refillAmount}</span></h4>
            <i class='bx bx-money-withdraw'></i>
            <i class='bx bx-trash'></i>`;
            newProduct.classList.add("products");
            stockContainer.appendChild(newProduct);
            
            // *Adicionar nova opção de venda e refill com o novo produto
            const newProductOption = document.createElement("option");
            newProductOption.value = newProductName;
            newProductOption.textContent = newProductName;
            productsInSale.appendChild(newProductOption);
            refillProductDropdown.appendChild(newProductOption);
            
            // *Adicionar o novo produto ao productPrice 
            const newProductPrice = parseFloat(prompt(`Informe o preço do novo produto ${newProductName}:`));
            productPrices[newProductName] = newProductPrice;
        }
    } else {
        // *Atualizar a quantidade dos produtos
        updateProductAmount(refillProduct, refillAmount, true);
        // *Criar uma Li com o resultado 
        refillProductLi.innerHTML = `<span class="soldAmount">${refillAmount} </span><span class="soldProduct">${refillProduct} comprados por: </span><span class="negative">-R$${refillPrice.toFixed(2)}</span></span>`;
        totalMoney -= refillPrice;
        updateTotalMoney();

        // *Limpar os inputs
        refillAmountInput.value = '';
        refillPriceInput.value = '';
    }

    refillProductLi.classList.add("soldLi");
    soldList.appendChild(refillProductLi);
}

// ?Eventos

refillBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(isNaN){
        alert("Nenhum produto selecionado!")
    } else {
        updateStock();
    }
});

// *Cancelar compra de produto
cancelRefillBtn.addEventListener("click", () => {
    console.log("Compra cancelada");
});