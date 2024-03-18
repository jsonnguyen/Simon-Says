/*----- constants -----*/
const COLOR_LOOKUP = ["red", "blue", "yellow", "green"]
const AUDIO_LOOKUP = {
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    error: new Audio("https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav")
};


/*----- state variables -----*/
let currentPattern;
let playerPattern;
let round;
let highScore


/*----- cached elements  -----*/
// const redEl = document.getElementById("red");
// const blueEl = document.getElementById("blue");
// const yellowEl = document.getElementById("yellow");
// const greenEl = document.getElementById("green");
const buttonEl = document.querySelector("button");
const colorEl = document.getElementById("colors");
const currentRoundEl = document.getElementById("current");
const highScoreEl = document.getElementById("high");

/*----- event listeners -----*/
buttonEl.addEventListener("click", handleStart);
colorEl.addEventListener("click", handlePlayer);


/*----- functions -----*/
init();

function init() {
    currentPattern = [];
    playerPattern = [];
    round = 0;
    highScore = 0;

    render();
};

function handleStart() {
    generatePattern();
    buttonEl.innerText = "Play Again";
    buttonEl.style.visibility = "hidden";
};

function generatePattern() {
    currentPattern.push(COLOR_LOOKUP[Math.floor(Math.random() * COLOR_LOOKUP.length)]);
    renderPattern();
}

function handlePlayer(evt) {
    if(evt.target.id === "colors") return;
    playerPattern.push(evt.target.id)
    lightColor(evt.target.id);
    AUDIO_LOOKUP[evt.target.id].play();
    checkPattern();
};

function checkPattern() {
    for(let i = 0; i < playerPattern.length; i++) {
        if(playerPattern[i] !== currentPattern[i]) {
            endGame();
            return
        };
    };
    if(playerPattern.length === currentPattern.length) {
        playerPattern = [];
        round++
        console.log(currentRoundEl)
        currentRoundEl.innerText = `Current Score: ${round}`
        if(round > highScore) {
            highScore = round
            highScoreEl.innerText = `High Score: ${highScore}`
        };
        setTimeout(() => {
            generatePattern();
        }, 250);
    };
};

function endGame() {
    AUDIO_LOOKUP.error.play();
    currentPattern = [];
    playerPattern = [];
    round = 0;
    currentRoundEl.innerText = `Current Score: ${round}`
    buttonEl.style.visibility = "visible";
};

function render() {
    renderPattern();
};

function lightColor(color) {
    let time = 500
    if (round > 9) {
        time = 250
    } else if (round > 4) {
        time = 375
    };
    const colorEl = document.getElementById(color);
    colorEl.style.opacity = "1";
    setTimeout(() => {
        colorEl.style.opacity = ".5";
    }, time);
};

function renderPattern() {
    colorEl.removeEventListener("click", handlePlayer);
    let time = 1000
    if (round > 9) {
        time = 500
    } else if (round > 4) {
        time = 750
    };
    let idx = 0;
    const playPattern = setInterval(function() {
        if(idx < currentPattern.length) {
            lightColor(currentPattern[idx])
            AUDIO_LOOKUP[currentPattern[idx]].currentTime = 0;
            AUDIO_LOOKUP[currentPattern[idx]].play();
            idx++
        } else {
            clearInterval(playPattern);
        }
    }, time);
    colorEl.addEventListener("click", handlePlayer);
};