//-----------------Event Listeners---------------------

// Click to start
$('#screen').on('click', function (event) {
    $('#start').css({
        "animation-name": "fadeOut",
        "animation-duration": "200ms"
    });
    $('#screen').append('<img src="./images/sun.png" alt="The Sun" id="sun"></>');
    $('#pokemon-list').append('<li><img src="./images/bulbasaur.png" alt="Bulbsaur" id="bulbasaur"></img></li>');
    $('#pokemon-list').append('<li><img src="./images/squirtle.png" alt="Squirtle" id="squirtle"></img></li>');
    $('#pokemon-list').append('<li><img src="./images/charmander.png" alt="Chamander" id="charmander"></img></li>');
    $('#pokemon-list').css({ "animation-name": "drop" });
    $('#screen').off('click');
})

// Choose your pokemon
$('#pokemon-list').on('click', 'li', function (event) {
    $('#name').css({
        'animation-name': 'drop',
        'animation-duration': '1s',
        'visibility': 'visible'
    })
    $('#pokemon-list li').css({ "animation-name": "fadeOut" });
    myPet = new Pet();
    $(this).addClass('pet');
    $pet = $(this);

});

// The feed button
$('#feed').on("click", function () {
    $('.rare_candy').remove();
    if (myPet.hunger >= 1 && alive) {
        let random = randomizerX();
        $('#screen').append('<img src="./images/rare_candy.png" alt="Rare Candy" class="rare_candy"></img>');
        $('.rare_candy').css({'left':`${random}px`})
    }

})

// The sleep button
$('#sleep').on("click", function () {
    $('.lights_off').remove();
    if (myPet.sleepiness >= 2 && alive) {
        let sleepTime = 0;
        let nap = setInterval(function () {
            sleepTime++;
            if (sleepTime === 720) {
                $('.house').remove();
                clearInterval(nap);
                $('.lights_off').remove();
            }
        }, 1000)
        $('#screen').append('<img src="./images/house.png" alt="House" class="house"></img>');
        $('body').append('<div class="lights_off"></div>')
        myPet.sleepDown();
    }
})

// The play button
$('#play').click("click", function () {
    if (myPet.boredom >= 2 && alive) {
        $('.ball').remove();
        $('#screen').append('<img src="./images/pokeball.png" alt="Pokeball" class="ball"></img>');
        myPet.boredDown();
        myPet.hungerUp();
        myPet.sleepUp();
    }
})

// Name your tomogotchi
$('#name').on("submit", function (event) {
    event.preventDefault();
    $(this).css({
        "animation-name": "rise",
        "animation-duration": "1.5s"
    })
    myPet.name = $(`.name_text`).val();
    $('.pet').append('<div class="name_tag"></div>');
    $tag = $('.name_tag')
    $($tag).text(myPet.name);
    hatchEgg();
    $('.pet').detach()
    setTimeout(spawnPet, 2150);
    $('#start').remove();
    $('body').append('<div class="flash"></div>')
    tick();
});
