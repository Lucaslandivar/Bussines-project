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