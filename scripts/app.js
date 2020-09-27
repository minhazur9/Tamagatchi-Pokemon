// -----------------Variables---------------
let min = 0; // minutes
let minTen = 0 // tenth digit for min
let hour = 0; // hours
let hourTen = 0 // tenth digit for hour
let day = 0; // days
let realSec = 0; // Real world seconds
let topGap = 0; // Distance from the top of the screen
let night = false; // If its night time or not
let alive = true; // If its alive or not
let $pet; // The pet
let $tag; // The name tag
let movementX = 780; // Movement from left and right
let movementY = 380; // Movement from up and down
let speed = -30; // The speed that the character is moving


// The tomagotchi
class Pet {
    constructor(name = "", hunger = 0, age = 0, sleepiness = 0, boredom = 0, stage = 1) {
        this.name = name;
        this.hunger = hunger;
        this.age = age;
        this.sleepiness = sleepiness;
        this.boredom = boredom;
        this.stage = stage;
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

    // Decements hunger
    hungerDown() {
        $(`#hunger li:nth-child(${this.hunger})`).css('background-color', 'inherit');
        this.hunger--
    }

    // Decrements sleepiness
    sleepDown() {
        $(`#sleepy li:nth-child(${this.sleepiness})`).css('background-color', 'inherit');
        $(`#sleepy li:nth-child(${this.sleepiness - 1})`).css('background-color', 'inherit');
        this.sleepiness -= 2;
    }

    // Decrements boredome
    boredDown() {
        $(`#bored li:nth-child(${this.boredom})`).css('background-color', 'inherit');
        $(`#bored li:nth-child(${this.boredom - 1})`).css('background-color', 'inherit');
        this.boredom -= 2;
    }


}

myPet = new Pet();




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
        if (realSec % 180 === 0 && realSec !== 0) { // Keeps track of meters
            myPet.hungerUp();
            myPet.sleepUp();
            myPet.boredUp();
        }
        if (day == 4) { // Keeps track of age
            day = 0;
            myPet.ageUp();
        }
        if (myPet.hunger === 10 || myPet.sleepiness === 10 || myPet.boredom === 10) {
            gameOver();
            clearInterval(time)
            clearInterval(step);
        }
        if (myPet.age === 4 && myPet.stage === 1) {
            clearInterval(step);
            midEvolve();
            setTimeout(move, 2000);
        }
        if (myPet.age === 9 && myPet.stage === 2) {
            clearInterval(step);
            finalEvolve();
            setTimeout(move, 2000);
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

// Brings up the game over screen 
function gameOver() {
    alive = false;
    $($pet).css({
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

function randomizerX() {
    return Math.floor(Math.random() * (1000 - 200) + 200);
}




