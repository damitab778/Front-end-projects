//Obliczenia //kantor nie zmienia sie przed zmiana waluty
var budgetController = (function(){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
             this.percentage =  Math.round((this.value / totalIncome) * 100);
        } else {
             this.percentage = -1;
        }
       
    };
    
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }
    
    var Income  = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    }
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0, 
            inc: 0,
            expCur: 0,
            incCur: 0
        },
        budget: 0,
        budgetCur: 0,
        percentage: -1
    };
    
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            
            // Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else {
                ID = 0;
            }
            
            
            // Create new Item
            if(type === 'exp'){
                    newItem = new Expense(ID, des, val) 
            }else if(type === 'inc'){
                    newItem = new Income(ID, des, val) 
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            //  Return
            return newItem;
            
        }, 
        
        calculateBudget: function(){
            
            //calulate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            //calulate the budget income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //calculate the petentage of income that we spent
            if(data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        
        calculatePercentages: function(){
            data.allItems.exp.forEach(function(curr){
                curr.calcPercentage(data.totals.inc);
            });
            
        },
        
        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(curr){
                return curr.getPercentage();
            });
            return allPerc;
        },
        
        deleteItem: function(type, id){
         var ids, index;
         ids = data.allItems[type].map(function(current){
             return  current.id
          });
        
          index = ids.indexOf(id);
          if(index !== -1){
              data.allItems[type].splice(index, 1)
          }
        },
        getBudget: function(){
            return {
                budget: data.budget,
                budgetCur: data.budgetCur,
                totalIncCur: data.totals.incCur,
                totalInc: data.totals.inc,
                totalExpCur: data.totals.expCur,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        
        changeCurrency: function(currency){
           switch (currency){
                   case 'EUR' : 
                   data.budgetCur = data.budget / 4.44;
                   data.totals.expCur = data.totals.exp / 4.44;
                   data.totals.incCur = data.totals.inc / 4.44;
                    console.log('eur');
                    console.log(data.budgetCur);
                    console.log(data.totals.expCur);
                    console.log(data.totals.incCur);
               break;
                   case 'USD' : 
                   data.budgetCur = data.budget / 3.88;
                   data.totals.expCur = data.totals.exp / 3.88;
                   data.totals.incCur = data.totals.inc / 3.88;
                     console.log('usd');
                     console.log(data.budgetCur);
                     console.log(data.totals.expCur);
                     console.log(data.totals.incCur);
               break;
                   case 'CHF' : 
                   data.budgetCur = data.budget / 4.13;
                   data.totals.expCur = data.totals.exp / 4.13;
                   data.totals.incCur = data.totals.inc / 4.13;
                     console.log('chf');
                     console.log(data.budgetCur);
                     console.log(data.totals.expCur);
                     console.log(data.totals.incCur);
               break;
               default: data.budgetCur = data.budget;
                     console.log('zł');
                     console.log(data.budgetCur);
                     console.log(data.totals.exp);
                     console.log(data.totals.inc);
               break;
           }
        },
        
        testing: function(){
            console.log(data);
            
        }
    }
})();


// Dane
var UIControler = (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        inputCurr: '.add__currency',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
        budgetCur: '.budget__cur'
        
    };
    
    var formatNumber = function(num, type){
           var numSplit, int, dec;
           num = Math.abs(num); //Liczba całkowita
           num = num.toFixed(2); //Miejsca po przecinku
           numSplit = num.split('.');
           int = numSplit[0];
           if(int.length > 3){
             int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3, 3);  // input 2310 -> output 2,310
           }
        
           dec = numSplit[1];
           return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec; 
           
       };
    
       var nodeListForEach = function(list, callback){
               for(var i = 0; i < list.length; i++){
                   callback(list[i], i);
               }
        };
    
   return {
       getinput: function(){
           return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
           };
       },
       
       addListItem: function(obj, type){
              var html, newHtml, element;
            
            if(type === 'inc'){
            // Create HTML string with placeholder text
              element = DOMstrings.incomeContainer;
                
              html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
            }else if(type ==='exp'){
              element = DOMstrings.expensesContainer;
                
              html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
    
           // Replace the placeholder with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
           // Insert into HTML 
           document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
           
           
       },
       
       deleteListItem: function(selectorID){
           var el = document.getElementById(selectorID);
           el.parentNode.removeChild(el)
           
           
       },
       
       clearFields: function(){
           var fields, filedsArr;
           var fields, filedsArr;
           fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
           
           var filedsArr = Array.prototype.slice.call(fields);
           
           filedsArr.forEach(function(current, index, array){
               current.value = "";
           });
           filedsArr[0].focus();
       },
       
       displayBudget: function(obj){
           var type;
           obj.budget > 0 ? type = 'inc' : type = 'exp';
         
           document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budgetCur, type);
           document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncCur, type);
           document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExpCur, type);

           
           if(obj.percentage > 0 ){document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
           } else {
               document.querySelector(DOMstrings.percentageLabel).textContent = '---';
           }
           
       },
       
       displayPercentages: function(percentages){  //Własny forEach na nodzie z colbackiem
           
           var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
           
           nodeListForEach(fields, function(current, index){
               
               if(percentages[index] > 0){
                  current.textContent = percentages[index] + '%';  
               } else {
                  current.textContent = '---';
               }
              
               
           });   
       },
         
       displayMonth: function(){
           var now, year, month, months;
           now = new Date();
           month = now.getMonth();
           months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
           year = now.getFullYear();
           document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year; 
       },
       
       changedType: function(){
           
           var fields = document.querySelectorAll(
           DOMstrings.inputType + ', ' + 
           DOMstrings.inputCurr + ', ' + 
           DOMstrings.inputDescription + ', ' +
           DOMstrings.inputValue);
           nodeListForEach(fields, function(curr){
               curr.classList.toggle('red-focus');
           });
           
           document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
       },
       
       checkCurrency: function(){
           var curr;
           return curr = document.querySelector(DOMstrings.inputCurr).value;
       },
       
       changeLabelCur: function(cur){
            document.querySelector(DOMstrings.budgetCur).textContent = cur;
       },
       
       getDOMstrings: function(){
           return DOMstrings;
       }
   };
    
    
})();

// Połączenie danych z obliczeniami
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
         var DOM = UICtrl.getDOMstrings();
        
         document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

         document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        document.querySelector(DOM.inputCurr).addEventListener('change', currency);
    };
     
    var updateBudget = function(){
        
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        // 1. Get the field input data
        input = UICtrl.getinput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        
        // 4. Clear the fields
        UICtrl.clearFields();
        
        // 5. Calulate and update budget 
        updateBudget();
        
        // 6. Calculate and update percentages
        updatePercentages();
            
        currency();
        }
    };
    
    var updatePercentages = function(){
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. Read pecentages from the budget controler
        var percentages = budgetCtrl.getPercentages();
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    
    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetController.deleteItem(type, ID);
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            // 3. Update and show the new budget
            updateBudget();
            // 4. Calculate and update percentages
            updatePercentages();
            
            currency();
        }
    };
    
    var currency = function(){
        budgetCtrl.changeCurrency(UICtrl.checkCurrency());
        var budgetCurr = budgetCtrl.getBudget();
        UICtrl.displayBudget(budgetCurr);
        
        UICtrl.changeLabelCur(UICtrl.checkCurrency()); //ZROBIC
        
    };
    
    return {
        init: function(){
            console.log('Start');
            UIControler.displayMonth();
            UICtrl.displayBudget( {
                budget: 0,
                totalInc: 0,
                totalIncCur: 0,
                totalExp: 0,
                totalExpCur: 0,
                percentage: -1
            });
            currency();
            setupEventListeners();
        }
    };
    
    
   
})(budgetController, UIControler);

controller.init();