const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');
const sectionRight = document.querySelector('.section-left');


const calculate = () => {
    
    fetch(`https://api.ratesapi.io/api/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
    .then(res => res.json())
    .then(data => {
        const currency1 = currencyOne.value;
        const currency2 = currencyTwo.value;
        
        const rate = data.rates[currency2];
        rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`;
        
        amountTwo.value = (amountOne.value * rate).toFixed(3);
    })
}


const swap = () => {
    let temp = currencyTwo.value;
    currencyTwo.value = currencyOne.value;
    currencyOne.value = temp;
    calculate();
}
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap)

calculate();