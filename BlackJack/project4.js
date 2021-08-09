let blackjackgame = {
    'you' : {'scoreSpan' : '#urblackjackresult', 'div' : '#your-box' , 'score' : 0},
    'dealer' : {'scoreSpan' : '#dealer-blackjack-result', 'div' : '#dealer-box' , 'score' : 0},
    'cards' : ['2','3', '4', '5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap' : {'2' : 2, '3':3, '4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10 ,'A':[1,11] },
    'wins' :0 ,
    'losses':0,
    'draws': 0,
    'isStand' : false ,
    'turnsOver':false,
};

const YOU = blackjackgame['you']
const DEALER = blackjackgame['dealer']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#black-jack-hit').addEventListener('click',blackjackhit);

document.querySelector('#black-jack-stand').addEventListener('click',dealerlogic);

document.querySelector('#black-jack-deal').addEventListener('click',blackjackdeal);

function blackjackhit() {
    if (blackjackgame['isStand'] === false){
        let card = randomcard();
        //console.log(card);
        showcard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        //console.log(YOU['score']);
    }    
}

function randomcard() {
    let randomIndex =Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomIndex];
}

function showcard(card , activePlayer) {
    if (activePlayer['score'] <=21){
        let cardImage = document.createElement('img')
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }    
} 

function blackjackdeal() {
    // let winner = computeWinner();
    // showResult(winner);
    if (blackjackgame['turnsOver'] === true) {

        blackjackgame['isStand']=false;
        
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for (i=0 ; i < yourImages.length ; i++) {
            yourImages[i].remove();
        }

        for (i=0 ; i < dealerImages.length ; i++) {
            dealerImages[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#urblackjackresult').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;

        document.querySelector('#urblackjackresult').style.color = '#ffffff' ;
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff' ;

        document.querySelector('#black-jack-result').textContent='Lets Play !';
        document.querySelector('#black-jack-result').style.color='black';
        blackjackgame['turnsOver']= true;
    }        
} 

function updateScore(card,activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackjackgame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackgame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackgame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score'] += blackjackgame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score']  > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust !';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve , ms));
}

async function dealerlogic() {
    blackjackgame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackgame['isStand']=== true){

        let card = randomcard();
        showcard(card,DEALER);
        updateScore(card , DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    blackjackgame['turnsOver']=true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner(){
    let winner ;
     
    if (YOU['score'] <= 21){
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackgame['wins']++;
            winner =YOU;
        
        } else if (YOU['score'] < DEALER['score']){
            blackjackgame['losses']++;
            winner = DEALER;
        
        } else if (YOU['score'] === DEALER['score']){
            blackjackgame['draws']++;
        }

    } else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackgame['losses']++;
        winner =DEALER ;
    
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackgame['draws']++;
    } 
    
    console.log(blackjackgame);
    return winner ;
}

function showResult(winner){
    let message , messageColor ;

    if (blackjackgame['turnsOver'] === true){

        if (winner === YOU){
            document.querySelector('#wins').textContent = blackjackgame['wins'];
            message = 'YOU WON !';
            messageColor = 'white';
            winSound.play();
        } else if( winner === DEALER){
            document.querySelector('#losses').textContent = blackjackgame['losses'];
            message = 'YOU LOST !'
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackgame['draws'];
            message = 'DRAW !';
            messageColor = 'black';
        }

        document.querySelector('#black-jack-result').textContent = message;
        document.querySelector('#black-jack-result').style.color = messageColor ;

    }
}