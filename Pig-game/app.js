/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScores, activePlayer, gamePlaying, i, buffor, bufforsec;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
   
    if(gamePlaying){
    // CHALLENGE I two 6 in a row
        i++;
    // 1. Random nr
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        buffor[i] = dice;
        bufforsec[i] = dice2;
        if(((buffor[i]===buffor[i-1]) && (buffor[i]===6)) || ((bufforsec[i]===bufforsec[i-1]) && (bufforsec[i]===6))){
            document.getElementById('score-' + activePlayer).textContent = '0';
            scores[activePlayer] = 0;
            nextPlayer();
        }
    // 2. Display result
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice-sec').style.display = 'block';

        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        document.querySelector('.dice-sec').src = 'dice-' + dice2 + '.png';
        
    // 3. Update the round score
        if(dice !== 1 && dice2 !== 1){
        roundScore += dice + dice2;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else {
         nextPlayer();

        } 
}
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore;
        //Update UI
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        //Check if won a game
        var input, winningScore;
        input = document.getElementById('text').value;
        
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }
        
        if(scores[activePlayer]>=winningScore){
            document.getElementById('name-'+activePlayer).textContent = 'WINNER!'
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-sec').style.display = 'none';
            gamePlaying = false;
        }
    else{
        //Next player
        nextPlayer();
        } 
        }
});


function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        buffor = [];
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        /*
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        */
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-sec').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
     scores = [0,0];
     activePlayer = 0;
     roundScore = 0;
     gamePlaying = true;
     i = 0;
     buffor = [];
     bufforsec = [];
    
     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.dice-sec').style.display = 'none';
     document.getElementById('score-0').textContent = '0';
     document.getElementById('score-1').textContent = '0';
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';
     document.getElementById('name-0').textContent = 'Player 1';
     document.getElementById('name-1').textContent = 'Player 2';
     document.querySelector('.player-0-panel').classList.remove('winner');
     document.querySelector('.player-1-panel').classList.remove('winner');
     document.querySelector('.player-0-panel').classList.remove('winner');
     document.querySelector('.player-0-panel').classList.add('active');
     document.querySelector('.player-1-panel').classList.remove('active');
}














