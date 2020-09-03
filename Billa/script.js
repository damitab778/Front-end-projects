const ball = document.querySelector('.ball-img');
const text = document.querySelector('input');
const answ = document.querySelector('.answer');
const err = document.querySelector('.error');

const ansArr = ['Tak', 'Nie', 'Słabo', 'Nie chcesz znać odpowiedzi na to pytanie', 'Ale jak!'];


ball.addEventListener('click', ()=>{
    
    addClass();
    setTimeout(checkQue, 1000)
   
    
});


const addClass = () => {
    ball.firstElementChild.classList.add('shake-animation');
};

const remClass = () => {
    ball.firstElementChild.classList.remove('shake-animation');
};

const checkQue = () => {
   
    if(text.value.slice(-1) === '?' && text.value !== ''){
        drawAns();
        clearErr();
        remClass();
    }
    else if(text.value !== '?' && text.value!== ''){
        errFun("Brak pytajnika na końcu pytania!");
        answ.textContent = "";
        remClass();
    }else{
        errFun("Zadaj pytanie!");
        answ.textContent = "";
        remClass();
    }
}

const errFun = msg => {
    err.textContent = msg;
}

const clearErr = () => {
    err.textContent = "";
}

const drawAns = () => {
    let ans = ansArr[Math.floor(Math.random()*5)];
    answ.innerHTML = `<span>Odpowiedź:</span> ${ans}`;
}