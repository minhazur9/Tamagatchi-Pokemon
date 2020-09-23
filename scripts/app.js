// -----------------Variables---------------
let min = 0; // minutes
let minTen = 0 // tenth digit for min
let hour = 0; // hours
let hourTen = 0 // tenth digit for hour
let day = 0; // days
let realSec = 0; // Real world seconds
let topGap = 0; // Distance from the top of the screen
let night = false;
class Pet {
    constructor(hunger = 0, age = 0, sleepiness = 0, boredom = 0) {
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
        if(this.hunger <= 1) return;
        $(`#hunger li:nth-child(${this.hunger})`).css('background-color', 'inherit');
        this.hunger--
    }

    sleepDown() {
        if(this.sleepiness <= 1) return;
        $(`#sleepy li:nth-child(${this.sleepiness})`).css('background-color', 'inherit');
        $(`#sleepy li:nth-child(${this.sleepiness-1})`).css('background-color', 'inherit');
        this.sleepiness -= 2;
    }

    boredDown() {
        if(this.boredom <= 1) return;
        $(`#bored li:nth-child(${this.boredom})`).css('background-color', 'inherit');
        $(`#bored li:nth-child(${this.boredom-1})`).css('background-color', 'inherit');
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
    }, 1000)

}

// Cycles through the day and night
function cycle() {
    topGap++;
    if (topGap === 413) {
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
        myPet.hungerUp();
        myPet.sleepUp();
        myPet.boredUp();
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

//-----------------Event Listeners---------------------

// Click to start
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

// Choose your pokemon
$('#pokemon-list').on('click', 'li', function (event) {
    let t = 0;
    myPet = new Pet();
    $(this).addClass('pet');
    $('#start').remove();
    $('#pokemon-list li').css({ "animation-name": "fadeOut" });
    $('#screen').css({ "animation-name": "screen-fade" })
    $("#egg").css({ "animation-name": "shake" });
    animate = setInterval(function () {
        t++;
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
            tick();
            clearInterval(animate);
        }
    }, 1000)

});

$('#feed').click(function() {
    myPet.hungerDown();
})

$('#sleep').click(function() {
    myPet.sleepDown();
})

$('#play').click(function() {
    myPet.boredDown();
})


