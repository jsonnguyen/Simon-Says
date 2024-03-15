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
let highScore;


/*----- cached elements  -----*/
const redEl = document.getElementById("red");
const blueEl = document.getElementById("blue");
const yellowEl = document.getElementById("yellow");
const greenEl = document.getElementById("green");
const buttonEl = document.querySelector("button");


/*----- event listeners -----*/
buttonEl.addEventListener("click", handleStart);


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
    currentPattern.push(COLOR_LOOKUP[Math.floor(Math.random() * COLOR_LOOKUP.length)]);
    renderPattern();
};

function render() {
    renderPattern();
};

function renderPattern() {
    let idx = 0;
    const playPattern = setInterval(function() {
        if(idx < currentPattern.length) {
            AUDIO_LOOKUP[currentPattern[idx]].play();
            idx++
        } else {
            clearInterval(playPattern);
        }
    }, 1000);
};