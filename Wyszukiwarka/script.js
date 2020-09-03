const search = document.querySelector('.search');
const li = document.querySelectorAll('li');

search.addEventListener('input', () =>{

   li.forEach( cur => {
        let upper = search.value.toUpperCase();
        let upperLi =  cur.innerText.toUpperCase();
       
       if(upperLi.includes(upper)){
           cur.style.display = 'block';
       }
       
       else{
           cur.style.display = 'none';
       }  
   }) 
       
      
   
})