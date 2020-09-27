//-----------------Event Listeners---------------------

// Click to start
$('#screen').on('click', function (event) {
    $("#mysoundclip").play();
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
    $(this).addClass('pet');
    $pet = $(this);

});

// The feed button
$('#feed').on("click", function () {
    $('.rare_candy').remove();
    if (myPet.hunger >= 1 && alive) {
        let random = randomizerX();
        $('#screen').append('<img src="./images/rare_candy.png" alt="Rare Candy" class="rare_candy"></img>');
        $('.rare_candy').css({ 'left': `${random}px` })
    }

})

// The sleep button
$('#sleep').on("click", function () {
    if (myPet.sleepiness >= 2) {
        $('.lights_off').remove();
        myPet.boredUp();
        myPet.boredUp();
        let sleepTime = 0;
        let nap = setInterval(function () {
            sleepTime++;
            if (sleepTime % 90 === 0 && sleepTime !== 0) {
                myPet.sleepDown();
            }
            if (myPet.sleepiness === 0) {
                $('.house').remove();
                clearInterval(nap);
                $('.lights_off').remove();
                $pet.show();
                move();
            }
        }, 300)
        $('#screen').append('<img src="./images/house.png" alt="House" class="house"></img>');
        $('body').append('<div class="lights_off"></div>')

    }
})

// The play button
$('#play').click("click", function () {
    if (myPet.boredom >= 2 && alive) {
        $('.ball').remove();
        $('#screen').append('<img src="./images/pokeball.png" alt="Pokeball" class="ball"></img>');
        if (speed < 0) {
            $('.ball').css({ 'left': `${movementX - 55}px` });
        }
        else {
            $('.ball').css({ 'left': `${movementX + 75}px` });
        }
        $('.ball')
            .velocity({top:`${movementY-38}px`,rotateZ: '180deg'},{duration: 500, delay: 1500})
            .velocity({top:'190px',rotateZ: '360deg'},{duration: 500})
            .velocity({top:`${movementY-38}px`,rotateZ: '540deg'},{duration: 500})
            .velocity({top:'190px',rotateZ: '720deg'},{duration: 500})
            .velocity({top:`${movementY-38}px`,rotateZ: '900deg'},{duration: 500})
            .velocity({top:'190px',rotateZ: '1080deg'},{duration: 500});

        myPet.boredDown();
        myPet.hungerUp();
        myPet.hungerUp();
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
