// Spawn the tomagotchi
function spawnPet() {
    $('#screen').append($pet);
    $($pet).css({
        'animation-name': 'fadeIn',
        'animation-duration': '1s'
    })
    move();
}

// Plays the hatching the egg animation
function hatchEgg() {
    $("#egg").css({
        "animation-name": "shake_and_fade",
        "animation-duration": "2s"
    });
}

// The first evolution
function midEvolve() {
    if ($('#charmander').is('img')) {
        $('.flash').remove();
        $('body').append('<div class="flash"></div>');
        $('li').remove();
        $('#screen').append('<li class="pet"><img src="./images/charmeleon.png" alt="Charmeleon" id="charmeleon"></li>');
        $pet = $('#screen li.pet');
        $($pet).append('<div class="name_tag"></div>');
        $tag = $('.name_tag')
        $($tag).text(myPet.name);
        $($pet).css({ 'left': `${movementX}px` });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        myPet.stage++;
    }
}

// The second evolution
function finalEvolve() {
    if ($('#charmeleon').is('img')) {
        $('.flash').remove();
        $('body').append('<div class="flash"></div>');
        $('li').remove();
        $('#screen').append('<li class="pet"><img src="./images/charizard.png" alt="Charizard" id="charizard"></li>');
        $pet = $('#screen li.pet');
        $($pet).append('<div class="name_tag"></div>');
        $tag = $('.name_tag')
        $($tag).text(myPet.name);
        $($pet).css({ 'left': `${movementX}px` });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        myPet.stage++;
    }
}

// Moves the tomogotochi across the screen back and forth
function move() {
    step = setInterval(function () {
        $pet
            .velocity({ left: `${movementX += speed}px`, top: `${movementY -= 15}px` }, { duration: 300 })
            .velocity({ left: `${movementX += speed}px`, top: `${movementY += 15}px` }, { duration: 300 });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        $tag.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        setTimeout(function () {
            if (movementX < 30 || movementX > 1060) {
                speed *= -1;
            }
        }, 300)

        if ($('img').hasClass('rare_candy')) {
            if ($($pet).offset().left >= $('.rare_candy').offset().left - 30 &&
                $($pet).offset().left <= $('.rare_candy').offset().left + 30 &&
                $($pet).offset().left >= $('.rare_candy').offset().left - 30) {
                $('.rare_candy').remove();
                myPet.hungerDown();
                myPet.sleepUp();
            }
        }
        if (!alive) {
            clearInterval(step);
        }
    }, 1000)

}