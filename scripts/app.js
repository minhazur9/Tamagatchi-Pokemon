// -----------------Variables---------------
let min = 0; // minutes
let minTen = 0 // tenth digit for min
let hour = 0; // hours
let hourTen = 0 // tenth digit for hour
let day = 0; // days
let realSec = 0; // Real world seconds

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

    hungerUp() {
        this.hunger++;
        $(`#hunger li:nth-child(${this.hunger})`).css('background-color','red');
    }

}




//-----------------Functions-----------------

// ticks the clock starting from when you first start the game
function tick() {
    let time = setInterval(function () {
        min++;
        realSec++;
        if (min % 10 === 0) {
            min = 0;
            minTen++;
        }
        if (realSec % 360 === 0 && realSec !== 0) {
            myPet.hungerUp();
        }
        if (minTen % 6 === 0 && minTen !== 0) {
            minTen = 0;
            hour++;
        }
        if (hour % 10 === 0 && hour !== 0) {
            hour = 0;
            hourTen++;
        }
        if (hourTen === 2 && hour === 4) {
            hour = 0;
            hourTen = 0;
            day++;
        }
        if (day == 5 && day !== 0) {
            day = 0;
            myPet.ageUp();
        }
        $('#time').text(`${hourTen}${hour}:${minTen}${min}`)
    }, 1000)

}


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
    myPet = new Pet();
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
            // Your tomagotchi
            $('.pet').detach().appendTo('#screen');
        }
        if (t === 5) {
            $('#egg').remove();
            tick();
            clearInterval(animate);
        }
    }, 1000)

});

$('#pokemon-list').on('click', 'li', function () {
    $(this).addClass('pet');
})

