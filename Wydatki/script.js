const incomeSelection = document.querySelector('.income-area');
const expensesSelection = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel');

const categorySelect = document.querySelector('#category');
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');

const addTransaction = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');

const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];


const showPanel = () => {
    
    addTransactionPanel.style.display = 'flex';
    clearInputs();
    
}

const hidePanel = () => {
    
    addTransactionPanel.style.display = 'none';
   
}

const checkForm = () => {
    
    if(nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none'){
        createNewTransaction();
    }else {
        
        alert('Wypełnij wszystkie pola!');
    }
    
}

const checkCategory = transaction => {
    switch (transaction){
            
        case '[ + ] Przychód':
            categoryIcon = '<i class="demo-icon icon-dollar"></i>';
            break;  
        case '[ - ] Zakupy':
            categoryIcon = '<i class="demo-icon icon-shopping-basket"></i>';
            break;
             
        case '[ - ] Jedzenie':
            categoryIcon = '<i class="demo-icon icon-food"></i>';
            break;
        case '[ - ] Kino':
            categoryIcon = '<i class="demo-icon icon-cinema"></i>';
            break;

    }
};

const createNewTransaction = () => {
    
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);
    
    checkCategory(selectedCategory);
    
    newTransaction.innerHTML = ` 
                         <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
                         <p class="transaction-amount">${amountInput.value}zł
                            <button class="delete" onclick="deleteTransaction(${ID})">
                                <i class="demo-icon icon-cancel-circled2"></i>
                            </button>
                        </p>`
    
    amountInput.value > 0 ? incomeSelection.appendChild(newTransaction) && newTransaction.classList.add('income') : expensesSelection.appendChild(newTransaction) && newTransaction.classList.add('expense');
    moneyArr.push(parseFloat(amountInput.value));
    
    countMoney(moneyArr)
    hidePanel();
    clearInputs();
    ID++;
    
};

const selectCategory = () => {
    selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const clearInputs = () => {
    
    nameInput.value = '';
    amountInput.value = '';
    categorySelect.selectedIndex = 0;
    
};

const countMoney = money => {
    
    const newMoney = money.reduce((a,b) => a + b);
    availableMoney.textContent = `${newMoney}zł`;
    
};

const deleteTransaction = id => {
    const transactionToDelite = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelite.childNodes[3].innerText);
    const indexOfTransaction = moneyArr.indexOf(transactionAmount);
    
    moneyArr.splice(indexOfTransaction,1);
    
    
    //Usuwanie z DOM dzieci z przychodow/wydatkow
    transactionToDelite.classList.contains('income') ? incomeSelection.removeChild(transactionToDelite) : expensesSelection.removeChild(transactionToDelite)
    
    countMoney(moneyArr);
};

const deleteAllTransactions = () => {
    
    incomeSelection.innerHTML = '<h3>Przychód:<h/3>';
    expensesSelection.innerHTML = '<h3>Wydatki:<h/3>';
    availableMoney.textContent = '0zł';
    moneyArr = [0];
    
}

const changeStyleLight = () => {
    root.style.setProperty('--first-color', '#f9f9f9');
    root.style.setProperty('--second-color', '#14161f');
    root.style.setProperty('--border-color', 'rgba(0,0,0,.2)');
    
}

const changeStyleDark = () => {
    root.style.setProperty('--first-color', '#14161f');
    root.style.setProperty('--second-color', '#f9f9f9');
    root.style.setProperty('--border-color', 'rgba(255,255,255,.4)');
    
}


addTransaction.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', hidePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions);
lightBtn.addEventListener('click', changeStyleLight);
darkBtn.addEventListener('click', changeStyleDark);