// -----------------Variables---------------





//-----------------Functions-----------------





//-----------------Event Listeners---------------------

$('#screen').on('click',function(event){
    $('#start').css({"animation-name":"fadeOut", "animation-duration": "200ms"})
    $('#screen').append('<img src="./images/sun.png" alt="The Sun" id="sun"></img>');
    $('#screen').append('<ul id = "pokemon-list"/>');
    $('#pokemon-list').append('<li><img src="./images/bulbasaur.png" alt="Bulbsaur" id="bulbasaur"></img></li>');
    $('#pokemon-list').append('<li><img src="./images/squirtle.png" alt="Squirtle" id="squirtle"></img></li>');
    $('#pokemon-list').append('<li><img src="./images/charmander.png" alt="Chamander" id="charmander"></img></li>');
    $('#screen').off('click');
})