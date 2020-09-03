const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timelist = document.querySelector('.time-list');
const infoBtn = document.querySelector('.icon-help');
const colorBtn = document.querySelector('.icon-brush');
const colors = document.querySelector('.colors');
const modalShadow = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');

const one = document.querySelector('.one');
const sec = document.querySelector('.sec');
const thrd = document.querySelector('.thrd');


let countTime;
let minutes = 0;
let seconds = 0;
let timeArr = [];
let countMeasure = 0;

const handleStart = () => {
    clearInterval(countTime);
    countTime = setInterval(() =>{
        if(seconds%60==0 && seconds>0){
            seconds=0;
            minutes++;
        }
        if(seconds<10){
            stopwatch.textContent = `${minutes}:0${seconds}`;
        }else{
            stopwatch.textContent = `${minutes}:${seconds}`;
        }
        
        seconds++;
    }, 100);
}

const handlePause = () => {
     clearInterval(countTime);
}

const handleStop = () => {
    
    time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`;
    if(stopwatch.textContent !== '0:00'){
        time.style.visibility = 'visible';
        timeArr.push(stopwatch.textContent);
        
    }
    init();
     
}


const handleReset = () => {
    
    time.style.visibility = 'hidden';
    init();
    timeArr = [];

    
}

const init = () => {
     clearInterval(countTime);
     stopwatch.textContent = '0:00';
     minutes = 0;
     seconds = 0;
     
}

const showHistory = () => {
    timelist.textContent= "";
    timeArr.forEach((curr)=>{
       
        const newTime = document.createElement('li');
        newTime.innerHTML = `Pomiar nr ${countMeasure++}: <span>${curr}</span>`;
        timelist.appendChild(newTime);
        
   });
}

const showModal = () => {
    if(!(modalShadow.style.display === 'block')){
        modalShadow.style.display = 'block';
    }else{
        modalShadow.style.display = 'none'
    };
    
    modalShadow.classList.toggle('modal-animation');
}

const showColors = () => {
    
    if(!(colors.style.display === 'flex')){
        colors.style.display = 'flex';
    }else{
        colors.style.display = 'none'
    };
    
    colors.classList.toggle('modal-animation');
}
    

const changeColor = (e) => {

    if(e.target === one){
       document.documentElement.style.setProperty('--first-color', '#FA1406');
    }else if(e.target === sec){
       document.documentElement.style.setProperty('--first-color', '#f06c00');
    }else{
       document.documentElement.style.setProperty('--first-color', '#44f51a');
    }
    
}


startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);
historyBtn.addEventListener('click', showHistory);

infoBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', showModal);
window.addEventListener('click', e => e.target === modalShadow ? showModal() : false);

colorBtn.addEventListener('click', showColors);

one.addEventListener('click', changeColor);
sec.addEventListener('click', changeColor);
thrd.addEventListener('click', changeColor);



























