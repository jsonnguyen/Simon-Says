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
let highScore = 0;


/*----- cached elements  -----*/
// const redEl = document.getElementById("red");
// const blueEl = document.getElementById("blue");
// const yellowEl = document.getElementById("yellow");
// const greenEl = document.getElementById("green");
const buttonEl = document.querySelector("button");
const colorEl = document.getElementById("colors")


/*----- event listeners -----*/
buttonEl.addEventListener("click", handleStart);
colorEl.addEventListener("click", handlePlayer);


/*----- functions -----*/
init();

function init() {
    currentPattern = [];
    playerPattern = [];
    round = 0;
    // highScore = 0;

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
    // console.log(typeof(evt.target.id))
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
        if(round > highScore) {
            highScore = round
        };
        generatePattern();
    };
};

function endGame() {
    AUDIO_LOOKUP.error.play();
    currentPattern = [];
    playerPattern = [];
};

function render() {
    renderPattern();
};

function lightColor(color) {
    const colorEl = document.getElementById(color);
    colorEl.style.opacity = "1";
    setTimeout(() => {
        colorEl.style.opacity = ".5";
    }, 500);
};

function renderPattern() {
    let idx = 0;
    const playPattern = setInterval(function() {
        if(idx < currentPattern.length) {
            lightColor(currentPattern[idx])
            AUDIO_LOOKUP[currentPattern[idx]].play();
            idx++
        } else {
            clearInterval(playPattern);
        }
    }, 1000);
};