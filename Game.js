let pattern = [4, 2, 3, 2, 1, 4, 3, 1];
let userPattern = 0;
let currentIndex = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;
let clueHoldTime = 1000;
const cluePauseTime = 333;
const nextClueWaitTime = 1000;
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");


// Function to start the game
function startGame(){
    startButton.classList.add("hide");
    stopButton.classList.remove("hide");
    userPattern = 0;
    currentIndex = 0;
    gamePlaying = true;
    clueSequence();
}

//Function of game end. 
function stopGame(){
    gamePlaying = false;
    startButton.classList.remove("hide");
    stopButton.classList.add("hide");
}

function lightButton(num){
    document.getElementById("button" + num).classList.add("lit");
}
function clearButton(num){
    document.getElementById("button" + num).classList.remove("lit");
}
function singleClue(num) {
    if(gamePlaying){
        lightButton(num);
        playTone(num, clearHoldTime);
        setTimeout(clearButton, clearHoldTime, num);
    }
}
function clueSequence(){
    context.resume()
    let waitTime = nextClueWaitTime;
    currentIndex = 0;
    for( let i=0; i <= userPattern; i++){
        console.log("play single clue: " + pattern[i] + " in " + waitTime + "ms");
        setTimeout(singleClue, waitTime, pattern[i]);
        waitTime += clueHoldTime;
        waitTime += cluePauseTime;
    }

}

function userGuess(num){
    console.log("user guessed: " + num);
    if(!gamePlaying){
        return;
    }

    if(num === pattern[currentIndex]){

        currentIndex++;
    if(currentIndex === userPattern + 1){
        if(userPattern == pattern.length - 1){
            gameWin();
        }else{
            userPattern++;
            currentIndex = 0;
            setTimeout(clueSequence, 1000);

        }
}
    }else{
        gameLose();
    }
}

function gameWin(){
    stopGame();
    alert("Congratulations! You win!");
}

function gameLose(){
    stopGame();
    alert("Game Over! You lost.");
}



const freqMap = {
    1: 261.6,
    2: 293.7,
    3: 329.6,
    4: 349.2
}
function playTone(btn, len) {
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    context.resume()
    tonePlaying = true
    setTimeout(function() {
    stopTone()
}, len)
}
function startTone(btn) {
    if (!tonePlaying) {
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    context.resume()
    tonePlaying = true
}
}
function stopTone() {
    g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025)
    tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
let AudioContext = window.AudioContext || window.webkitAudioContext
let context = new AudioContext()
let o = context.createOscillator()
let g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0, context.currentTime)
o.connect(g)
o.start(0)