// -----------------Variables---------------
let min = 0; // minutes
let minTen = 0 // tenth digit for min
let hour = 0; // hours
let hourTen = 0 // tenth digit for hour
let day = 0; // day # per year
let realSec = 0; // Real world seconds * 3
let topGap = 0; // Distance from the top of the screen
let night = false; // If its night time or not
let alive = true; // If its alive or not
let $pet; // The pet
let $tag; // The name tag
let movementX = 780; // Movement from left and right
let movementY = 380; // Movement from up and down
let speed = -30; // The speed that the character is moving
let paused = false; //If game is paused or not
let step = null; //Id for movement interval
let daysCount = 0 // Total days
let asleep = false;


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
        this.sleepiness--;
    }

    // Decrements boredome
    boredDown() {
        $(`#bored li:nth-child(${this.boredom})`).css('background-color', 'inherit');
        $(`#bored li:nth-child(${this.boredom - 1})`).css('background-color', 'inherit');
        this.boredom -= 2;
    }


}

myPet = new Pet(); //Generates the pet




//-----------------Functions-----------------

// ticks the clock starting from when you first start the game and keeps track of all stats
function tick() {
    let time = setInterval(function () {
        min++;
        realSec++;
        if (paused === true) {
            clearInterval(time);
        }
        if (realSec % 2 === 0 && realSec !== 0) {
            cycle();
            if (night === false) {
                moveClouds();
            }
        }
        adjustTime();
        if (realSec % 90 === 0 && realSec !== 0) { // Keeps track of meters
            myPet.hungerUp();
            if(asleep == false) {
                myPet.sleepUp();
            }
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

// move the clouds 
function moveClouds() {
    $('.clouds').velocity({ translateX: `-=1px` });
}
// Cycles through the day and night
function cycle() {
    topGap++;
    if (topGap === 400) {
        night = !night;
        $('.clouds').remove();
        topGap = 0;
        $('#screen').toggleClass('night');
    }
    if (night === false) {
        if (topGap === 0) {
            $('#moon').remove();
            $('.stars').remove();
            $('#screen').append('<img src="./images/sun.png" alt="The Sun" id="sun"></img>');
            $('#screen').append('<img src="./images/clouds.png" alt="Clouds" class="clouds">');
        }
        $('#sun').css(`transform`, `translateY(${topGap}px)`);
        return;
    }
    if (topGap === 0) {
        $('#sun').remove();
        $('#screen').append('<img src="./images/moon.png" alt="The Moon" id="moon">');
        $('#screen').append('<img src="./images/stars.png" alt="Stars" class="stars">')
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
        daysCount++;
    }
    $('#time').text(`${hourTen}${hour}:${minTen}${min}`);
}

// Brings up the game over screen 
function gameOver() {
    $pet.css({
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
    $('#screen').append('<img src="./images/rip.png" alt="Grave" class="rip">');
    if (myPet.hunger >= 10) {
        quote = `Oh no ${myPet.name} starved to death`;
    }
    else if (myPet.sleepiness >= 10) {
        quote = `${myPet.name} died of sleep deprivation`;
    }
    else {
        quote = `You bored ${myPet.name} to death`;
    }
    $('#screen').append(`<h1 class="game_over">GAME OVER</h1>`);
    $('.game_over').append(`<h3 class="quote">${quote}<br>${myPet.name} lived for ${Math.floor(daysCount)} days </h3>`)
    if (night === true) {
        $('.game_over').addClass('night_text');
        $('.quote').addClass('night_text');
    }
    alive = false;
}

// Randomly selects a number for the x coordinate
function randomizerX() {
    return Math.floor(Math.random() * (1000 - 200) + 200);
}

// Randomizes the meter values
function meterRandomizer() {
    let randHunger = Math.floor(Math.random() * 5);
    let randSleep = Math.floor(Math.random() * 5); 
    let randBored = Math.floor(Math.random() * 5);
    for(let i = 1; i <= randHunger; i++) {
        myPet.hungerUp();
    }
    for(let j = 1; j <= randSleep; j++) {
        myPet.sleepUp();
    }
    for(let k = 1; k <= randBored; k++) {
        myPet.boredUp();
    }
}

// Its to make buttons glow red when they shouldn't be available
function dontWork(id) {
    $(id)
        .velocity({ backgroundColor: "#ff0000" }, { duration: 250 })
        .velocity({ backgroundColor: "#dddddd" }, { duration: 250 })
}



