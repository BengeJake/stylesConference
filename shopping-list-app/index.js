/** selecting all needed elements*/
const inputBox = document.querySelector('.input-section input');
const addBtn = document.querySelector('.input-section button');
const shoppingList = document.querySelector('.list-items');
const itemsNumber = document.querySelector('.items-number');
const clearAllBtn = document.querySelector('.footer button');

/* Adding an event listener to the input box. */
inputBox.onkeyup = function () {
  let data = inputBox.value;

  /* this is checking if the input is empty */
  if (data.trim() != 0) {
    /** if the input box is not empty, the class attribute of value
     * active is added to the add item button (addBtn)
     */
    addBtn.classList.add('active');
  } else {
    /** if the input is empty, the class attribute of value active is removed*/
    addBtn.classList.remove('active');
  }
};

showShoppingList();

addBtn.onclick = function () {
  /** select the contents in the input */
  let data = inputBox.value;
  /** get localStorage */
  let getLocalStorage = localStorage.getItem('New Shopping List');

  /** Check if there are contents in the localStorage */
  if (getLocalStorage == null) {
    /** if no contents in the localStorage, return an empty array*/
    shopListArr = [];
  } else {
    shopListArr = JSON.parse(getLocalStorage);
  }
  shopListArr.push(data);
  localStorage.setItem(
    'New Shopping List',
    JSON.stringify(shopListArr)
  );
  showShoppingList();
  addBtn.classList.remove('active');
};

function showShoppingList() {
  let getLocalStorage = localStorage.getItem('New Shopping List');

  if (getLocalStorage == null) {
    shopListArr = [];
  } else {
    shopListArr = JSON.parse(getLocalStorage);
  }

  itemsNumber.textContent = shopListArr.length;

  if (shopListArr.length > 0) {
    clearAllBtn.classList.add('active');
  } else {
    clearAllBtn.classList.remove('active');
  }
  let newListElement = '';
  shopListArr.forEach(function (element, index) {
    newListElement += `<li>${element}<span onclick="deleteItem(${index})"><a class="del-btn">Delete</a></span></li>`;
  });
  shoppingList.innerHTML = newListElement;
  inputBox.value = '';
}

function deleteItem(index) {
  let getLocalStorage = localStorage.getItem('New Shopping List');
  shopListArr = JSON.parse(getLocalStorage);
  shopListArr.splice(index, 1);
  // update the localStorage contents
  localStorage.setItem(
    'New Shopping List',
    JSON.stringify(shopListArr)
  );
  showShoppingList();
}

clearAllBtn.onclick = function () {
  shopListArr = [];

  localStorage.setItem(
    'New Shopping List',
    JSON.stringify(shopListArr)
  );
  showShoppingList();
};