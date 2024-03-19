/*----- constants -----*/
const COLOR_LOOKUP = ["red", "blue", "yellow", "green"]
const AUDIO_LOOKUP = {
    red: new Audio("assets/Retreat_ping_SFX.ogg"),
    blue: new Audio("assets/Generic_ping_SFX.ogg"),
    green: new Audio("assets/Assist_Me_ping_SFX.ogg"),
    yellow: new Audio("assets/Enemy_Missing_ping_SFX.ogg"),
    error: new Audio("assets/you-have-been-slain-made-with-Voicemod.mp3")
};



/*----- state variables -----*/
let currentPattern;
let playerPattern;
let round;
let highScore


/*----- cached elements  -----*/
const buttonEl = document.querySelector("button");
const colorEl = document.getElementById("colors");
const currentRoundEl = document.getElementById("current");
const highScoreEl = document.getElementById("high");

/*----- event listeners -----*/
buttonEl.addEventListener("click", handleStart);
// colorEl.addEventListener("click", handlePlayer);


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
    buttonEl.innerText = "Play Again!";
    buttonEl.style.visibility = "hidden";
};

function generatePattern() {
    currentPattern.push(COLOR_LOOKUP[Math.floor(Math.random() * COLOR_LOOKUP.length)]);
    renderPattern();
}

function handlePlayer(evt) {
    if(!COLOR_LOOKUP.includes(evt.target.id)) return;
    console.log(evt.target)
    playerPattern.push(evt.target.id)
    lightColor(evt.target.id);
    AUDIO_LOOKUP[evt.target.id].currentTime = 0;
    AUDIO_LOOKUP[evt.target.id].volume = 0.25;
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
        currentRoundEl.innerText = `${round}`
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
    currentRoundEl.innerText = `${round}`
    buttonEl.style.visibility = "visible";
    colorEl.removeEventListener("click", handlePlayer)
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
            AUDIO_LOOKUP[currentPattern[idx]].volume = 0.25;
            AUDIO_LOOKUP[currentPattern[idx]].play();
            idx++
        } else {
            clearInterval(playPattern);
        }
    }, time);
    colorEl.addEventListener("click", handlePlayer);
};