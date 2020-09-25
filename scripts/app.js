// -----------------Variables---------------
let min = 0; // minutes
let minTen = 0 // tenth digit for min
let hour = 0; // hours
let hourTen = 0 // tenth digit for hour
let day = 0; // days
let realSec = 0; // Real world seconds
let topGap = 0; // Distance from the top of the screen
let night = false;
let alive = true;
let $pet;
let movementX = 780;
let movementY = 380

class Pet {
    constructor(name = "", hunger = 0, age = 0, sleepiness = 0, boredom = 0) {
        this.name = name;
        this.hunger = hunger;
        this.age = age;
        this.sleepiness = sleepiness;
        this.boredom = boredom;
    }

    // Increments age
    ageUp() {
        this.age++;
        $('#age').text(`${this.age}`);
    }

    // Increments hunger
    hungerUp() {
        this.hunger++;
        $(`#hunger li:nth-child(${this.hunger})`).css('background-color', 'red');
    }

    // Increments sleepiness
    sleepUp() {
        this.sleepiness++;
        $(`#sleepy li:nth-child(${this.sleepiness})`).css('background-color', 'red');
    }

    // Increments boredom
    boredUp() {
        this.boredom++;
        $(`#bored li:nth-child(${this.boredom})`).css('background-color', 'red');
    }

    hungerDown() {
        $(`#hunger li:nth-child(${this.hunger})`).css('background-color', 'inherit');
        this.hunger--
    }

    sleepDown() {
        $(`#sleepy li:nth-child(${this.sleepiness})`).css('background-color', 'inherit');
        $(`#sleepy li:nth-child(${this.sleepiness - 1})`).css('background-color', 'inherit');
        this.sleepiness -= 2;
    }

    boredDown() {
        $(`#bored li:nth-child(${this.boredom})`).css('background-color', 'inherit');
        $(`#bored li:nth-child(${this.boredom - 1})`).css('background-color', 'inherit');
        this.boredom -= 2;
    }


}




//-----------------Functions-----------------

// ticks the clock starting from when you first start the game and keeps track of all stats
function tick() {
    let time = setInterval(function () {
        min++;
        realSec++;
        if (realSec % 2 === 0 && realSec !== 0) {
            cycle();
        }
        adjustTime();
        if (realSec % 360 === 0 && realSec !== 0) { // Keeps track of meters
            myPet.hungerUp();
            myPet.sleepUp();
            myPet.boredUp();
        }
        if (day == 5 && day !== 0) { // Keeps track of age
            day = 0;
            myPet.ageUp();
        }
        if (myPet.hunger === 10 || myPet.sleepiness === 10 || myPet.boredom === 10) {
            gameOver(time);
        }
        if (myPet.age === 16) {
            midEvolve();
        }
        if (myPet.age === 36) {
            finalEvolve();
        }
    }, 300)

}

// Cycles through the day and night
function cycle() {
    topGap++;
    if (topGap === 400) {
        night = !night;
        topGap = 0;
        $('#screen').toggleClass('night');
    }
    if (night === false) {
        if (topGap === 0) {
            $('#moon').remove();
            $('#screen').append('<img src="./images/sun.png" alt="The Sun" id="sun"></img>');
        }
        $('#sun').css(`transform`, `translateY(${topGap}px)`);
        return;
    }
    if (topGap === 0) {
        $('#sun').remove();
        $('#screen').append('<img src="./images/moon.png" alt="The Moon" id="moon">');
    }
    $('#moon').css(`transform`, `translateY(${topGap}px)`);

}

// Adjusts the time on the HUD
function adjustTime() {
    if (min % 10 === 0) { // Keeps track of first minute digit
        min = 0;
        minTen++;
    }
    if (minTen % 6 === 0 && minTen !== 0) { // Keeps track of second hour digit
        minTen = 0;
        hour++;
    }
    if (hour % 10 === 0 && hour !== 0) { // Keeps track of first hour digit
        hour = 0;
        hourTen++;
    }
    if (hourTen === 2 && hour === 4) { // Keeps track of amount of days passed
        hour = 0;
        hourTen = 0;
        day++;
    }
    $('#time').text(`${hourTen}${hour}:${minTen}${min}`);
}


function gameOver(id) {
    clearInterval(id);
    alive = false;
    $('.pet').css({
        "animation-name": "fadeOut",
        "animation-duration": "1s",
        "animation-fill-mode": "forwards"
    });
    $('.house').css({
        "animation-name": "fadeOut",
        "animation-duration": "1s",
        "animation-fill-mode": "forwards"
    });
    $('.lights_off').remove();
    $('#screen').append('<img src="./images/rip.png" alt="Grave" class="rip">')
    $('#screen').append('<h1 class="game_over">GAME OVER</h1>')
    if (night === true) {
        $('.game_over').addClass('night_text');
    }
}

function spawnPet() {
    $('#screen').append($pet);
    $($pet).css({
        'animation-name': 'fadeIn',
        'animation-duration': '1s'
    })
    move();
}

function hatchEgg() {
    $("#egg").css({
        "animation-name": "shake_and_fade",
        "animation-duration": "2s"
    });
}

function midEvolve() {
    if ($('#charmander').is('img')) {
        $('#charmander').remove();
        $('#screen').append('<img src="./images/charmeleon.png" alt="Charmeleon" id="charmeleon" class="pet">');
        $('.pet').append('<div class="name_tag"></div>');
        $('.name_tag').text(myPet.name);
    }
}

function finalEvolve() {
    if ($('#charmeleon').is('img')) {
        $('#charmeleon').remove();
        $('#screen').append('<img src="./images/charizard.png" alt="Charizard" id="charizard" class="pet">');
        $('.pet').append('<div class="name_tag"></div>');
        $('.name_tag').text(myPet.name);
    }
}

function move() {
    let i = 0;
    interval = setInterval(function () {
        console.log(i);
        i++;
        movementX-=2
        if (i === 5) {
            movementY-=2
            $($pet).animate({left: `${movementX}`, top: `${movementY}`});
        }
        if (i === 6) {
            movementY+=2
            $($pet).animate({left: `${movementX}`, top: `${movementY}`});
            i = 4;
        }
    },800)
}

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

$('#feed').on("click", function () {
    $('.rare_candy').remove();
    if (myPet.hunger >= 1 && alive) {
        $('#screen').append('<img src="./images/rare_candy.png" alt="Rare Candy" class="rare_candy"></img>');
        myPet.hungerDown();
        myPet.sleepUp();
    }

})

$('#sleep').on("click", function () {
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

$('#play').click("click", function () {
    if (myPet.boredom >= 2 && alive) {
        $('.ball').remove();
        $('#screen').append('<img src="./images/pokeball.png" alt="Pokeball" class="ball"></img>');
        myPet.boredDown();
        myPet.hungerUp();
        myPet.sleepUp();
    }
})

$('#name').on("submit", function (event) {
    event.preventDefault();
    $(this).css({
        "animation-name": "rise",
        "animation-duration": "1.5s"
    })
    myPet.name = $(`.name_text`).val();
    $('.pet').append('<div class="name_tag"></div>');
    $('.name_tag').text(myPet.name);
    hatchEgg();
    $('.pet').detach()
    setTimeout(spawnPet, 3500);
    $('#start').remove();
    $('#screen').css({ "animation-name": "screen-fade" })
    move();
    tick();
});

