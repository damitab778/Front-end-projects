const user = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const clear = document.querySelector('.clear');
const send = document.querySelector('.send');
const close = document.querySelector('.close');
const popup = document.querySelector('.popup');

clear.addEventListener('click', e =>{
    e.preventDefault();
    let tab = [user, pass, pass2, email];
    tab.forEach(cur =>{
        cur.value = '';
        clearError(cur);
    });
});

send.addEventListener('click', e =>{
    e.preventDefault();
    checkForm([user, pass, pass2, email]);
    checkLength(user, 6);
    checkLength(pass, 8);
    checkLength(pass2, 8);
    checkPassword(pass, pass2);
    checkMail(email);
    checkErrors();
});


const checkForm = (input =>{
    input.forEach(cur =>{
        if(cur.value === ""){
            showError(cur, cur.placeholder);
        }else{
           clearError(cur);
        }
    });
});

const checkLength = (input, min) =>{
        if(input.value.length<=min){
            const shortcut = input.previousElementSibling.innerText;
            const inputClear = shortcut.substr(0, shortcut.length - 1);
            showError(input, `${inputClear} musi składać się z min. ${min} znaków!`);
        }
        else{
            clearError(input);
        }
};

const checkPassword = (pass, pass2) => {
    if(pass.value === pass2.value){
        console.log("wsio ok");
    }
    else{
        showError(pass2, "Hasła nie są identyczne!");
    }
}

const checkMail = email => {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

    if(re.test(email.value)){
        clearError(email);
    }else{
        showError(email, 'Email jest niepoprawny!');
    }

}

const checkErrors = () =>{
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0;
    
    allInputs.forEach(el =>{
        if(el.classList.contains('error')){
            errorCount++;
        }
    });
    if(errorCount === 0) {
        popup.classList.add('show-popup');
    }
    console.log(errorCount);
};

const showError = (input, msg) =>{
    const formBox = input.parentNode;
    const errorMsg = formBox.querySelector('.error-text');
    errorMsg.textContent = msg;
    formBox.classList.add("error");
};

const clearError = input =>{
    const formBox = input.parentNode;
    formBox.classList.remove("error");
}

