let blackjackGame = {
    'you' : { 'scoreSpan' : '#your-blackjack-result','div':'#your-box','score':0 },
    'dealer' : { 'scoreSpan' : '#dealer-blackjack-result','div':'#dealer-box','score':0 },
    'cards' : ['2','3','4','5','6','7','8','9','10','k','j','q','a'],
    'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'k':10,'j':10,'q':10,'a':[1,11]},
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('./sounds/play.mp3');
const winSound = new Audio('./sounds/win.mp3');
const lossSound = new Audio('./sounds/loss.mp3');

document.querySelector("#blackjack-hit-button").addEventListener('click',blackjackHit);
document.querySelector("#blackjack-stand-button").addEventListener('click',dealerLogic);
document.querySelector("#blackjack-deal-button").addEventListener('click',blackjackDeal);


function blackjackHit(){
 let card = randomCard();
   showCard(card,YOU);
   updateScore(card,YOU);
   showScore(YOU);
}

function dealerLogic(){
    let card = randomCard();
      showCard(card,DEALER);
      updateScore(card,DEALER);
      showScore(DEALER);
   }
   
function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21){
    let cardImage = document.createElement('img');
    cardImage.src=`./images/${card}.png`;
    document.querySelector(activePlayer.div).appendChild(cardImage);
    hitSound.play();
    }
}

function blackjackDeal(){
 showResult(computeWinner());
  let yourImages = document.querySelector('#your-box').querySelectorAll('img');
  let dealImages = document.querySelector('#dealer-box').querySelectorAll('img');
  for(i=0; i<yourImages.length; i++){
    yourImages[i].remove();
  }
  for(i=0; i<dealImages.length; i++){
    dealImages[i].remove();
  }
  YOU['score'] = 0;
  DEALER['score']= 0;
  document.querySelector('#your-blackjack-result').textContent = 0;
  document.querySelector('#dealer-blackjack-result').textContent = 0;
  document.querySelector('#your-blackjack-result').style.color = 'white';
  document.querySelector('#dealer-blackjack-result').style.color = 'white';

}

  function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
  }

function updateScore(card , activePlayer){
    if(card === 'a'){
        // add 11 if the score wont exceed 21 otherwise add 1
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }else{
      activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else {
  document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

// check the winner and return who won
function computeWinner(){
  let winner 
  if(YOU['score'] <= 21){
      if(YOU['score'] > DEALER['score'] || (DEALER['score']>21)){
          console.log('You won !');
          winner = YOU ;
      }else if (YOU['score'] < DEALER['score']){
          console.log('You lost !');
          winner = DEALER ;
      }else if (YOU['score']=== DEALER['score']){
          console.log('You drew !');
      }
      // when user bust but dealer doesn't 
  }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
      console.log('You lost !');
      winner = DEALER ;
  
    }else if (YOU['score']> 21 && DEALER['score'] > 21){
        console.log('You drew !');
    }

    console.log('Winner is', winner);
    return winner;
}

function showResult(winner){
  let message , messageColor ;
     
  if(winner === YOU){
    message = 'You won !';
    messageColor = 'green';
    winSound.play();
  }else if(winner === DEALER){
      message = 'You lost !';
      messageColor = 'red';
      lossSound.play();
  }else{
      message = 'You drew !';
      messageColor = 'black';
  }

  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;

}