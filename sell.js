// !Sell container 

// ?Seleção de elementos
const cancelBtn = document.getElementById("cancelBtn");
const sellBtn = document.getElementById("sellBtn");
const sellAmountInput = document.getElementById("product-sell-amount");
const sellDetailsInput = document.getElementById("sell-details");
const soldList = document.getElementById("soldList");
const productsInSale = document.getElementById("product-in-sell");

const productPrices = {
    kitKat: 3.50,
    guarana: 2.50,
    bisExtra: 3.50,
};

// ?Funções

// TODO: Sell product
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