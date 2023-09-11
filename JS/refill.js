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

    // *Selecionar o produto no menu
    const refillProduct = refillProductDropdown.value;

    if (refillProduct === "newProduct") {
        const newProductName = prompt("Informe o nome do novo produto:");
        if (newProductName) {
            // *Atualizar a quantidade dos produtos
            updateProductAmount(newProductName, refillAmount, true);

            // *Criar uma Li com o resultado
            const refillProductLi = document.createElement("li");
            refillProductLi.innerHTML = `<span class="soldAmount">${refillAmount} </span><span class="soldProduct">${newProductName} comprados por: </span><span class="negative">-R$${refillPrice.toFixed(2)}</span></span>`;
            totalMoney -= refillPrice;
            updateTotalMoney();

            refillProductLi.classList.add("soldLi");
            soldList.appendChild(refillProductLi);

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

            // *Adicionar o novo produto ao productPrices
            const newProductPrice = parseFloat(prompt(`Informe o preço do novo produto ${newProductName}:`));
            productPrices[newProductName] = newProductPrice;
        }
    } else {
        // *Atualizar a quantidade dos produtos
        updateProductAmount(refillProduct, refillAmount, true);

        // *Criar uma Li com o resultado
        const refillProductLi = document.createElement("li");
        refillProductLi.innerHTML = `<span class="soldAmount">${refillAmount} </span><span class="soldProduct">${refillProduct} comprados por: </span><span class="negative">-R$${refillPrice.toFixed(2)}</span></span>`;
        totalMoney -= refillPrice;
        updateTotalMoney();

        refillProductLi.classList.add("soldLi");
        soldList.appendChild(refillProductLi);
    }

    // *Limpar os inputs
    refillAmountInput.value = '';
    refillPriceInput.value = '';
}


// ?Eventos

// *Comprar ou aumentar produto
refillBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (isNaN(refillAmountInput.value)) {
        alert("Nenhum produto selecionado ou quantidade inválida!");
    } else {
        updateStock();
    }    
});

// *Cancelar compra de produto
cancelRefillBtn.addEventListener("click", () => {
    console.log("Compra cancelada");
});