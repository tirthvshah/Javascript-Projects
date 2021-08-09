function ageindays(){
    var birthyear = prompt ('What year were you born?');
    var ageRn = (2020-birthyear) *365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You Are '+ageRn+' days old.')
    h1.setAttribute('id','ageindays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    // console.log(ageRn);
}

function reset() {
    document.getElementById('ageindays').remove();
}