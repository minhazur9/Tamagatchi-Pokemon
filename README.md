# Project #0: The Game

## About

The game is a tamagotchi game inspired by Pokemon. The main goal is to just take care of your character for as long as you can before any of its three meters fill up or else it dies. You have to feed it when it gets hungry, put it to sleep when its sleepy, and play with it when its bored. If you have taken care of your pet for long enough it may evolve. 

## Explanation

My approach for this game was to use a simple tick function to control the day/night cycle, the clock, the evolutions, and the meters. Its not all controlled by single function, but its that single function that is accompanied by many other helper functions to those little tasks of which all are dependant on a time interval. My main technologies were just css animation keyframes, jquery, and a little bit of velocity. CSS key frames gave me enough flexibility with the percentages and animation durations and delays for it to be capable of complex animations but the problem was it was very hard to chain multiple animations to the same element so that is where velocity came in. Some of the unsolved problems would be that the back and forth animation with the character would sometimes start going crazy when you go into a different tab as if the animation is trying to catch up to the actual numbers in the time interval. Another problem would just be in unpolished animations not meshing well with some PNGs.

## User Stories

### Layout

The layout should have a bright purple-like rectangular background for the HUD and a smaller background inside the HUD for the screen.

In the HUD there should be buttons on the bottom left and right corners and one in the middle for feed, sleep, and play. 

The corners and middle should have the hunger, sleepiness, and boredom bar. The age and time should be near the top middle of the HUD too. 

The starting screen background should be sky blue for daytime, the ground should be dirt colored and there should be a sun pixel art in the sky too. It should also have start screen text.

There should be an egg thats far from the start text.

### After Pressing Start

The start text should go away.

The three starter pokemon should appear directly above the egg waiting for you to choose one of them.

There should be a border when hovering over one of the pokemon.

After choosing one of them all three should disappear.

The egg should start rotating as if it is hatching.

The screen should fade to white and fade back in with the egg gone and the chosen pokemon replacing it.

### After selection

The time should start ticking as a 24 hour clock, 1 real sec = 3 game min, age up every 4 game days.

The meters should start gradually get shaded in every in game quarter day, which is 6 min, time needed to increment may change.

The sun should start gradually moving down and once it does, the background changes to night colors and the moon appears.

The moon should do the reverse and the switch should happen every 12 game minutes.

### The Buttons

The feed button should spawn in food and decrement a hunger bar once it touches your pokemon and increment one sleepiness

The play button should spawn in a ball and bounce directly over your pokemon for a few seconds, decrement two boredom and increment one for sleepiness and hunger

The sleep button should spawn in a house for your pet to sleep inside for until the meter goes to 0, decrement two sleepiness per real minute

### Game Over

If any of the meters reach get filled up then the time should stop ticking.

The tomoagotchi should get replaced with a tombstone.

Put it on text in the middle of the screen.

### Names

The game should ask you to name your tomogotchi before it appears on screen.

Once it does the name should appear above it.

### Moving around

The tomogotchi should start moving back and forth.

If it touches food it should disappear.

If it touches a house, the tomogotchi should be hidden until its done sleeping.

If it a ball appears it should jump.

### Evolution

After it reaches age 4 it should disappear and be replaced with another sprite.

After it reaches age 9 it should disappear again and be replaced with an adult sprite.

The screen should start flashing and the character should stop moving briefly.  

## WireFrames

![Start](/wireframes/start.PNG)

![Night](/wireframes/night.PNG)

![House](/wireframes/wireframeHouse.PNG)

![Play](/wireframes/play.PNG)