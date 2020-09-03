const addBtn = document.querySelector('.add');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtns = document.getElementsByClassName('delete-note');
const deleteAllBtn = document.querySelector('.delete-all');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const category = document.querySelector('#category');
const textArea = document.querySelector('#text');
const error = document.querySelector('.error');
const note  = document.getElementsByClassName('note');
let selectedValue;

let cardID = 0;

addBtn.addEventListener('click', () => {
    notePanel.style.display = 'flex';
});

const closePanel = () => {
    notePanel.style.display = 'none';
    error.style.visibility = 'hidden';
    textArea.value = '';
    category.selectedIndex = 0;
};

const addNote = () =>{
    let areaValue = textArea.value;
    let categoryValue = category.options[category.selectedIndex].value;
    let categoryText = category.options[category.selectedIndex].text;
    
    if(areaValue !== '' && categoryValue !== '0'){
        createNote(categoryText, areaValue);
        error.style.visibility = 'hidden'
    }else{
        error.style.visibility = 'visible'
    }
    
};

const createNote = (cT, aV) =>{
    
    const note = `<div class="note" id=${cardID}><div class="note-header"><h1 class="note-title">${cT} #${cardID}</h1><button class="delete-note" onclick="deleteNote(${cardID})"><i class="demo-icon icon-cancel"></i></button></div><div class="note-body">${aV}</div></div>`;

    noteArea.insertAdjacentHTML('beforeend', note);
    changeColor(cT);
    textArea.value = '';
    category.selectedIndex = 0;
    notePanel.style.display = 'none';
    cardID++;
};


const deleteNote = id =>{
   const noteToDelete = document.getElementById(id);
   noteArea.removeChild(noteToDelete);
}

const deleteAll = () => {
    noteArea.textContent = '';
}

const changeColor = (cT) => {
    
   let  arr = Array.from(note);
   let lastIndex = arr.length-1;

        if(cT === 'Zakupy'){
          arr[lastIndex].style.backgroundColor = 'yellow';
         

        }else if(cT === 'Praca'){
         arr[lastIndex].style.backgroundColor = 'orange';

          
        }else{
           arr[lastIndex].style.backgroundColor = 'green';


    }
    }
  


 
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
deleteAllBtn.addEventListener('click', deleteAll);
