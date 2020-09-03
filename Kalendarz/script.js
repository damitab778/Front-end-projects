const settings = document.querySelector('.settings');
const settingsBtn = document.querySelector('.settings-btn');
const imageSection = document.querySelector('.image-section');

const eventName = document.querySelector('#event-name');
const eventDay = document.querySelector('#event-day');
const eventMonth = document.querySelector('#event-month');
const eventYear = document.querySelector('#event-year');
const eventImg = document.querySelector('#event-image');

const daysCount = document.querySelector('.days-count');
const hoursCount = document.querySelector('.hours-count');
const minutesCount = document.querySelector('.minutes-count');
const secondsCount = document.querySelector('.seconds-count');

const saveBtn = document.querySelector('.save');
const eventSpan = document.querySelector('.event');
let usersTime;

const setTime = () => {
    const currentTimie = new Date();
    const result =  usersTime - currentTimie;
    const daysAll = result / 1000 / 60 / 60 / 24;
    const days = Math.floor(result / 1000 / 60 / 60 / 24);
    const hoursAll = (daysAll - days)*24;
    const hours = Math.floor((daysAll - days)*24);
    const minutesAll = (hoursAll - hours)*60;
    const minutes = Math.floor((hoursAll - hours)*60);
    const seconds = Math.floor((minutesAll - minutes)*60);
    
    daysCount.textContent = days;
    hoursCount.textContent = hours;
    minutesCount.textContent = minutes;
    secondsCount.textContent = seconds;
    
}


const appUpdate = () => {
    
    eventSpan.textContent = eventName.value;
    imageSection.style.backgroundImage = `url(${eventImg.value})`;
    usersTime = new Date(`${eventMonth.value} ${eventDay.value} ${eventYear.value} `)
    setTime();
}


settingsBtn.addEventListener('click', () =>{
    settings.classList.toggle('active');
})

saveBtn.addEventListener('click', appUpdate);

appUpdate()
setInterval(setTime, 1000);
