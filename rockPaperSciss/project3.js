function rpsGame(choice){
    console.log(choice);
    var humanchoice,botchoice;
    humanchoice=choice.id;

    botchoice=numberToChoice(randtoRpsInt());
    console.log('Computer choice:',botchoice);

    result =decideWinner(humanchoice,botchoice);
    console.log(result);

    message = finalMessage(result);
    console.log(message);

    rpsfrontend(choice.id,botchoice,message);
}

function randtoRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissor'][number];
}

function decideWinner(choice,compchoice){
    var rpsdatabase ={
        'rock': {'scissor':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5, 'scissor':0},
        'scissor':{'paper':1,'scissor':0.5, 'rock':0}
    };
    
    var urscore = rpsdatabase[choice][compchoice];
    var compscore = rpsdatabase[compchoice][choice];
    return [urscore,compscore];
}

function finalMessage([urscore,compscore]){
    if (urscore==0){
        return {'message': 'YOU LOSE !','color':'red'}
    } else if(urscore==0.5){
        return {'message':'TIE !','color':'black'}
    } else{
        return {'message':' YOU WON !','color':'green'}
    }
}

function rpsfrontend (humanImagechoice,botImagechoice,finalMessage){
    var imagesdatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');
    
    humandiv.innerHTML =" <img src='" + imagesdatabase[humanImagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px black;'>"
    messagediv.innerHTML="<h1 style='color : "+finalMessage['color'] + "; font-size : 60px ; padding : 30px ; '>" + finalMessage['message'] + "</h1>"
    botdiv.innerHTML =" <img src='" + imagesdatabase[botImagechoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px black;'>"

    document.getElementById('flexBoxGen').appendChild(humandiv);
    document.getElementById('flexBoxGen').appendChild(messagediv);
    document.getElementById('flexBoxGen').appendChild(botdiv);

}