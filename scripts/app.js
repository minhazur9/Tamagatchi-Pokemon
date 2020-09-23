// -----------------Variables---------------





//-----------------Functions-----------------





//-----------------Event Listeners---------------------

$('#screen').on('click', function (event) {
    $('#start').css({
        "animation-name": "fadeOut",
        "animation-duration": "200ms"
    });
    $('#screen').append('<img src="./images/sun.png" alt="The Sun" id="sun"></img>');
    $('#pokemon-list').append('<li><img src="./images/bulbasaur.png" alt="Bulbsaur" id="bulbasaur"></img></li>');
    $('#pokemon-list').append('<li><img src="./images/squirtle.png" alt="Squirtle" id="squirtle"></img></li>');
    $('#pokemon-list').append('<li><img src="./images/charmander.png" alt="Chamander" id="charmander"></img></li>');
    $('#pokemon-list').css({ "animation-name": "drop" });
    $('#screen').off('click');
})

$('#pokemon-list').on('click', 'li', function (event) {
    let t = 0;
    $('#start').remove();
    $('#pokemon-list li').css({ "animation-name": "fadeOut" });
    $('#screen').css({ "animation-name": "screen-fade" })
    $("#egg").css({ "animation-name": "shake" });
    animate = setInterval(function () {
        t++;
        console.log(t);
        if (t === 3) {
            $('#egg').css({
                "animation-name": "fadeOut",
                "animation-duration": "200ms",
            })
        }
        if (t === 4) {
            $('.pet').detach().appendTo('#screen');
        }
        if (t === 5) {
            $('#egg').remove();
            clearInterval(animate);
        }

        if (t === 6) {
        }
    }, 1000)

});

$('#pokemon-list').on('click', 'li', function () {
    $(this).addClass('pet');
})

