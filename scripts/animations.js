// Spawn the tomagotchi
function spawnPet() {
    $('#screen').append($pet);
    $pet.css({
        'animation-name': 'fadeIn',
        'animation-duration': '1s'
    })
    $("#pokemon-list li").remove();
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
        $pet.remove();
        $('#screen').append('<li class="pet"><img src="./images/charmeleon.png" alt="Charmeleon" id="charmeleon"></li>');
        $pet = $('#screen li.pet');
        $pet.append('<div class="name_tag"></div>');
        $tag = $('.name_tag')
        $tag.text(myPet.name);
        $pet.css({ 'left': `${movementX}px` });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        myPet.stage++;
    }
    else if ($('#bulbasaur').is('img')) {
        $('.flash').remove();
        $('body').append('<div class="flash"></div>');
        $pet.remove();
        $('#screen').append('<li class="pet"><img src="./images/ivysaur.png" alt="Ivysaur" id="ivysaur"></li>');
        $pet = $('#screen li.pet');
        $pet.append('<div class="name_tag"></div>');
        $tag = $('.name_tag')
        $tag.text(myPet.name);
        $pet.css({ 'left': `${movementX}px` });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        myPet.stage++;
    }
    else {
        $('.flash').remove();
        $('body').append('<div class="flash"></div>');
        $pet.remove();
        $('#screen').append('<li class="pet"><img src="./images/wartortle.png" alt="Wartortle" id="wartortle"></li>');
        $pet = $('#screen li.pet');
        $pet.append('<div class="name_tag"></div>');
        $tag = $('.name_tag')
        $tag.text(myPet.name);
        $pet.css({ 'left': `${movementX}px` });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        myPet.stage++;
    }
}

// The second evolution
function finalEvolve() {
    if ($('#charmeleon').is('img')) {
        $('.flash').remove();
        $('body').append('<div class="flash"></div>');
        $pet.remove();
        $('#screen').append('<li class="pet"><img src="./images/charizard.png" alt="Charizard" id="charizard"></li>');
        $pet = $('#screen li.pet');
        $pet.append('<div class="name_tag"></div>');
        $tag = $('.name_tag')
        $tag.text(myPet.name);
        $pet.css({ 'left': `${movementX}px` });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        myPet.stage++;
    }
    else if ($('#ivysaur').is('img')) {
        $('.flash').remove();
        $('body').append('<div class="flash"></div>');
        $pet.remove();
        $('#screen').append('<li class="pet"><img src="./images/venasaur.png" alt="Venasaur" id="venasaur"></li>');
        $pet = $('#screen li.pet');
        $pet.append('<div class="name_tag"></div>');
        $tag = $('.name_tag')
        $tag.text(myPet.name);
        $pet.css({ 'left': `${movementX}px` });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        myPet.stage++;
    }
    else {
        $('.flash').remove();
        $('body').append('<div class="flash"></div>');
        $pet.remove();
        $('#screen').append('<li class="pet"><img src="./images/blastoise.png" alt="Blastoise" id="blastoise"></li>');
        $pet = $('#screen li.pet');
        $pet.append('<div class="name_tag"></div>');
        $tag = $('.name_tag')
        $tag.text(myPet.name);
        $pet.css({ 'left': `${movementX}px` });
        $pet.css({ 'transform': `scaleX(${(speed / 30) * -1})` });
        myPet.stage++;
    }
}

// Moves the tomogotochi across the screen back and forth
function move() {
    step = setInterval(function () {
        if (paused === true) {
            clearInterval(step);
        }
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
            eat();
        }

        if ($('img').hasClass('house')) {
            goInsideHouse();
        }

        if ($('img').hasClass('ball')) {
            clearInterval(step);
            jump();
            setTimeout(function () {
                $('.ball').remove()
                move();
            }, 5000)
        }

    }, 1000)

}

// The animation for jump
function jump() {
    $pet
        .velocity({ top: `${movementY -= 15}px` }, { duration: 200, delay: 380 })
        .velocity({ top: `${movementY += 15}px` }, { duration: 200, delay: 350 })
        .velocity({ top: `${movementY -= 15}px` }, { duration: 200, delay: 350 })
        .velocity({ top: `${movementY += 15}px` }, { duration: 200, delay: 350 })
        .velocity({ top: `${movementY -= 15}px` }, { duration: 200, delay: 350 })
        .velocity({ top: `${movementY += 15}px` }, { duration: 200, delay: 350 })
}

// Eats food
function eat() {
    if ($pet.offset().left >= $('.rare_candy').offset().left - 30 &&
        $pet.offset().left <= $('.rare_candy').offset().left + 30 &&
        $pet.offset().top >= $('.rare_candy').offset().top - 30 &&
        $pet.offset().top <= $('.rare_candy').offset().top + 30) {
        $('.rare_candy').remove();
        myPet.hungerDown();
        myPet.hungerDown();
        myPet.sleepUp();
    }
}

// Disappears inside house
function goInsideHouse() {
    if ($pet.offset().left >= $('.house').offset().left - 30 && $pet.offset().left <= $('.house').offset().left + 30) {
        clearInterval(step);
        $pet.hide();
    }
}