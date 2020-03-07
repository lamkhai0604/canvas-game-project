/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 450;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;

// let startTime = Date.now();
// elapsedTime = Date.now() - startTime;


let time = 11; // change time every round
let elapsedTime = 0;
let round = 1; 
let roundArea = document.getElementById("roundArea");
let resultArea = document.getElementById("resultArea");
// let resetButton = document.getElementById("resetButton")
let score = 0
let bg = ''
let hero = ''
let monster = ''
let playButton = document.getElementById("playButton")

playButton.addEventListener("click", play);
// resetButton.addEventListener("click", reset);


function timecounting() {
    roundArea.innerHTML = `Round : ${round}`;
    myTime =setInterval(() => {
    time -= 1
    document.getElementById('timecount').innerHTML = time

    //Round 1
    if ((time == 0) && (round == 1) && (score >= 10)) {
        time += 15; // change time every round
        round = round +1;       
        let message = 'Maybe lucky, Let next round'
        roundArea.innerHTML = `Round : ${round}`;
        resultArea.innerHTML =  `${message}`
    }
    if ((time ==0) && (round == 1) && (score < 10)){
        alert('You lose 😂🤣😆 Noob')
        stopTime()
    }

    //Round 2
    if ((time == 0) && (round == 2) && (score >= 30)) {
        time += 20; // change time every round
        round = round +1;       
        let message = 'You win'
        roundArea.innerHTML = `Round : ${round}`;
        resultArea.innerHTML =  `${message}`
    }
    if ((time ==0) && (round == 2) && (score < 30)){
        alert('You lose 😂🤣😆 Noob')
        stopTime()
    }

    //Round 3
    if ((time == 0) && (round == 3) && (score >= 60)) {
        time += 25; // change time every round
        round = round +1;       
        let message = 'You win'
        roundArea.innerHTML = `Round : ${round}`;
        resultArea.innerHTML =  `${message}`
    }
    if ((time ==0) && (round == 3) && (score < 60)){
        alert('You lose 😂🤣😆 Noob')
        stopTime()
    }

    //Round 4
    if ((time == 0) && (round == 4) && (score >= 90)) {
        time += 30; // change time every round
        round = round +1;       
        let message = 'You win'
        roundArea.innerHTML = `Round : ${round}`;
        resultArea.innerHTML =  `${message}`
    }
    if ((time ==0) && (round == 4) && (score < 90)){
        alert('You lose 😂🤣😆 Noob')
        stopTime()
    }

    //Round 5
    if ((time == 0) && (round == 5) && (score >= 150)) {
        // time += 15; // change time every round
        // round = round +1;       
        // let message = 'You win'
        // roundArea.innerHTML = `Round : ${round}`;
        // resultArea.innerHTML =  `${message}`
        promt = ("wow, You win ❤❤❤ Congratulation !!!")
        stopTime()
    }
    if ((time ==0) && (round == 5) && (score < 150)){
        alert('You lose 😂🤣😆 Noob')
        stopTime()
    }

    if (round > 6 ){
        alert('You lose 😂🤣😆 Noob')
        stopTime()
    }}, 1000);
    }

// timecounting()

function stopTime() {
    clearInterval(myTime);
  }


  // Reset time button
// function reset() {
//     heroX = canvas.width / 2;
//     heroY = canvas.height / 2;
    
//     monsterX = Math.floor(Math.random() * canvas.height);
//     monsterY = Math.floor(Math.random() * canvas.height);
    
//     score = 0
//     round = 1
//     resultArea.innerHTML = `Score : ${score}`;
//     roundArea.innerHTML = `Round : ${round}`
//     timecounting()
// }

// Play button
function play() {
    score = 0
    round = 1
    resultArea.innerHTML = `Score : ${score}`;
    roundArea.innerHTML = `Round : ${round}`;
    timecounting()
}

function loadImages() {
    bgImage = new Image();
    bgImage.onload = function () {
        // show the background image
        bgReady = true;

    };

    bgImage.src = "bg3.gif";

    
    heroImage = new Image();
    heroImage.onload = function () {
        // show the hero image
        heroReady = true;

    };
    heroImage.src = "hero.png";

    monsterImage = new Image();
    monsterImage.onload = function () {
        // show the monster image
        monsterReady = true;
    };
    monsterImage.src = "monster.png";
}


/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;


let monsterX = 200;
let monsterY = 300;


/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
    // Check for keys pressed where key represents the keycode captured
    // For now, do not worry too much about what's happening here. 
    addEventListener("keydown", function (key) {
        keysDown[key.keyCode] = true;
    }, false);

    addEventListener("keyup", function (key) {
        delete keysDown[key.keyCode];
    }, false);
}



/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
    // Update the time.

    if (38 in keysDown) { // Player is holding up key
        heroY -= 8;
    }
    if (40 in keysDown) { // Player is holding down key
        heroY += 8;
    }
    if (37 in keysDown) { // Player is holding left key
        heroX -= 8;
    }
    if (39 in keysDown) { // Player is holding right key
        heroX += 8;
    }

    // Check if player and monster collided. Our images
    // are about 32 pixels big.
    if (
        heroX <= (monsterX + 32)
        && monsterX <= (heroX + 32)
        && heroY <= (monsterY + 32)
        && monsterY <= (heroY + 32)
    ) {
        // Pick a new location for the monster.
        // Note: Change this to place the monster at a new, random location.

        let limitX = bgImage.width - monsterImage.width
        let limitY = bgImage.height - monsterImage.height

        monsterX = getMyRandom(0, limitX);
        monsterY = getMyRandom(0, limitY);
        score +=1;
        resultArea.innerHTML = `Score : ${score}`
    }
    if (heroX > canvas.width - heroImage.width) {
        heroX = canvas.width - heroImage.width
    }
    if (heroX < 0) {
        heroX = 0
    }
    if (heroY > canvas.height - heroImage.height) {
        heroY = canvas.height -heroImage.height
    }
    if (heroY < 0) {
        heroY = 0
    }
    

};


function getMyRandom(min, max) {
    return Math.random() * (max - min) + min;
    
  }

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, heroX, heroY);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monsterX, monsterY);
        // console.log('draw monster image')
    }
   
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
    update();
    render();
    // Request to do this again ASAP. This is a special method
    // for web browsers. 
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();


