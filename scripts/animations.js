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
        $($pet).detach();
        $('#charmander').remove();
        $('#screen').append('<img src="./images/charmeleon.png" alt="Charmeleon" id="charmeleon" class="pet">');
        $pet = $('#charmeleon');
        $($pet).append($tag);
        if (speed > 0) {
            $pet.css({ 'transform': `scaleX(-1)` });
            $tag.css({ 'transform': `scaleX(-1)` });
        }
        else {
            $pet.css({ 'transform': `scaleX(1)` });
            $tag.css({ 'transform': `scaleX(1)` });
        }
    }
}

// The second evolution
function finalEvolve() {
    if ($('#charmeleon').is('img')) {
        $($pet).detach();
        $('#charmeleon').remove();
        $('#screen').append('<img src="./images/charizard.png" alt="Charizard" id="charizard" class="pet">');
        $pet = $('#charizard');
        $($pet).append($tag);
        if (speed > 0) {
            $pet.css({ 'transform': `scaleX(-1)` });
            $tag.css({ 'transform': `scaleX(-1)` });
        }
        else {
            $pet.css({ 'transform': `scaleX(1)` });
            $tag.css({ 'transform': `scaleX(1)` });
        }
    }
}

// Moves the tomogotochi across the screen back and forth
function move() {
    wait = setInterval(function () {
        $pet
            .velocity({ left: `${movementX += speed}px`, top: `${movementY -= 15}px` }, { duration: 500 })
            .velocity({ left: `${movementX += speed}px`, top: `${movementY += 15}px` }, { duration: 500 });
        if (movementX < 30) {
            setTimeout(function () {
                $pet.css({ 'transform': `scaleX(-1)` });
                $tag.css({ 'transform': `scaleX(-1)` });
            }, 1500)

            speed *= -1;
        }
        else if (movementX > 1060) {
            setTimeout(function () {
                $pet.css({ 'transform': `scaleX(1)` });
                $tag.css({ 'transform': `scaleX(1)` });
            }, 1500)
            speed *= -1;

        }

        if ($('img').hasClass('.rare_candy')){
            if ($($pet).offset().left >= $('.rare_candy').offset().left - 20 && $($pet).offset().left <= $('.rare_candy').offset().left + 20) {
                $('.rare_candy').remove();
                myPet.hungerDown();
                myPet.sleepUp();
            }
        }
        if (!alive) {
            clearInterval(wait);
        }
    }, 1000)

}