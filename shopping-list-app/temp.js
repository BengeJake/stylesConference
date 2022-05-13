
const input = document.querySelector('.input-section input')
const addBtn = document.querySelector('.input-section button')
const shoppingList = document.querySelector('.list-items')
const itemsNumber = document.querySelector('.items-number')
const clearBtn = document.querySelector('.footer button')

//adding event listner
inputBox.onkeyup = function () {

    let data = inputBox.value; //get entered value
    //checks if empty
    if(data.trim() !=0){ 
        //adds active to button
        addBtn.classList.add('active'); 
    }else{
        //removes active from button
        addBtn.classList.remove('active');
    }
}

addBtn.onclick = function(){
    //gets value from input box
    let data = inputBox.value;
    //gets local storage
    let getLocalStorage = localStorage.getItem('New Shopping Item')

    //checks for content 
    if(getLocalStorage == null){
        //if no content return an empty array
        shopListArr = [];
    }
    else{
        shopListArr = JSON.parse(getLocalStorage);
    }

    shopListArr.push(data);

    localStorage.setItem('New Shopping List', JSON.stringify(shopListArr));
    showShoppingList();
    addBtn.classList.remove('active');
}

function showShoppingList(){
    let getLocalStorage = localStorage.getItem('New Shopping Item')

    if(getLocalStorage == null){
        shopListArr = [];
    }
    else{
        shopListArr = JSON.parse(getLocalStorage);
    }

    itemsNumber.textContent = shopListArr.length;
    if(shopListArr.length > 0 ){
        clearBtn.classList.add('active');
    }
    else{
        clearBtn.classList.remove('active');
    }

    let newListElement = '';
    shopListArr.forEach(function (element, index){
        newListElement += `<li>${element}<span onclick="deleteItem(${index})"><a class="del-btn">Delete</a></span></li>`
    });

    shoppingList.innerHTML = newListElement;
    inputBox.value='';
}

function deleteItem(index){
    let getLocalStorage = localStorage.getItem('New Shopping List');

    shopListArr = JSON.parse(getLocalStorage);
    shopListArr.splice(index, 1);

    localStorage.setItem('New Shopping List', JSON.stringify(shopListArr));
    showShoppingList();
}

clearBtn.onclick=function () {
    shopListArr =[];

    localStorage.setItem('New Shopping List', JSON.stringify(shopListArr));
    showShoppingList();
}