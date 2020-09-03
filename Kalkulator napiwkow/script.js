const price = document.getElementById('price');
const num = document.getElementById('people');
const tip = document.getElementById('tip');
const costInfo = document.querySelector('.cost-info');
const cost = document.querySelector('.cost');
const error = document.querySelector('.error');

document.querySelector('.count').addEventListener('click', () =>{
    
  if((price.value === "") || (num.value === "")){
        error.style.display = "block";
        error.textContent = "Błędnie uzupełnione pola!";
        cost.style.color = "red";
        cost.textContent = "???";
    }
    else{
        let bill = (parseFloat(price.value) + (parseFloat(price.value)*parseFloat(tip.value))) / parseInt(num.value);
        error.style.display = "none";
        costInfo.style.display = 'block';
        cost.textContent = bill.toFixed(2);
    }
   
 
    
});