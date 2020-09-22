// -----------------Variables---------------





//-----------------Functions-----------------





//-----------------Event Listeners---------------------

$('#screen').on('click',function(event){
    $('#start').css({"animation-name":"fadeOut", 
                     "animation-duration": "200ms"
                    });
    $('#screen').append('<img src="./images/sun.png" alt="The Sun" id="sun"></img>');
    $('#pokemon-list').append('<li><img src="./images/bulbasaur.png" alt="Bulbsaur" id="bulbasaur"></img></li>');
    $('#pokemon-list').append('<li><img src="./images/squirtle.png" alt="Squirtle" id="squirtle"></img></li>');
    $('#pokemon-list').append('<li><img src="./images/charmander.png" alt="Chamander" id="charmander"></img></li>');
    $('#pokemon-list').css({"animation-name":"drop",
                            "animation-duration": "1.7s",
                            "animation-delay": "1s"
                           });
    $('#screen').off('click');
})

$('#pokemon-list').on('click', 'li', function(event){
    $('#pokemon-list li').css({"animation-name":"fadeOut", 
                               "animation-duration": "200ms", 
                               "animation-fill-mode":"forwards"
                              });
    $('#egg').css({"animation-name":"shake",
                    "animation-duration":"2s",
                    "animation-fill-mode":"forwards"
                  })
})

