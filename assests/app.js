const foodAdd = document.querySelector('#card-icon');
const closeBtn = document.querySelector('.close-btn');
const card = document.querySelector('.card');


// console.log(card);

foodAdd.addEventListener('click', () => {
    card.classList.add('card-active');
});

closeBtn.addEventListener('click', () => {
    card.classList.remove('card-active');
});


//Content Loaded
document.addEventListener('DOMContentLoaded', loadfood);

function loadfood() {
    loadcontent();
}

function loadcontent() {
    //remove food items from card
    const btnRemove = document.querySelectorAll('.card-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeitems);
    });

    //Qty not change isNAN or negative values
    const Qty = document.querySelectorAll('.card-quantity');
    Qty.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    //Add food items
    const addItem = document.querySelectorAll('.add-card');
    addItem.forEach((food)=>{
        food.addEventListener('click' ,addCard);
    });
    
    updateTotal();
}

//remove items 
function removeitems() {
    if (confirm('Are you remove item!')) {
        let title = this.parentElement.querySelector('.card-food-title').innerHTML;
        itemList = itemList.filter(el=>el.title != title);
        this.parentElement.remove();
    }
    updateTotal();
}


//Change Qty
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadcontent();
}

let itemList = [];

//addCard items
function addCard() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgsrc = food.querySelector('.food-image').src;
    // console.log(title,price,imgsrc);
    
    let newProtect = {title,price,imgsrc}
    
    //Check protect already exist in card
    if(itemList.find((el)=>el.title == newProtect.title)){
        alert('Protect already added in card');
        return;
    }else{
        itemList.push(newProtect);
    }


    let newProtectElement = createCardProtect(title,price,imgsrc);
    let createDiv = document.createElement('div');
    createDiv.innerHTML = newProtectElement; 
    let basket = document.querySelector('.card-content');
    basket.append(createDiv);

    loadcontent();
}

function createCardProtect(title,price,imgsrc) {
    
    return `
    <div class="card-box">
                    <img src="${imgsrc}" class="card-img">
                    <div class="datail-box">
                        <div class="card-food-title">${title}</div>
                        <div class="price-box">
                            <div class="card-price">${price}</div>
                            <div class="card-amt">${price}</div>
                        </div>
                        <input type="number" value="1" class="card-quantity">
                    </div>
                    <i class="fa-solid fa-trash card-remove"></i>
                </div>
    `;
}

function updateTotal() {
    let cardItems = document.querySelectorAll('.card-box');
    let totalValue = document.querySelector('.total-price');

    let total = 0;

    cardItems.forEach(protect=>{
        let priceEl = protect.querySelector('.card-price');
        let price = parseFloat(priceEl.innerHTML.replace('Rs.',''));


        let qty = protect.querySelector('.card-quantity').value;
        total += (price*qty);
        protect.querySelector('.card-amt').innerText ='Rs.' + (price*qty);

    });

    totalValue.innerHTML = 'Rs.' + total;

    //Add protect counting
    let cardCounting = document.querySelector('.card-count');
    
    let count = itemList.length;
    cardCounting.innerHTML = count;
    
    if(count != 0){
        cardCounting.style.display = 'block';
    }else{
        cardCounting.style.display = 'none';
    }
    
}




