const inputs =  document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
let wrongLetter = document.querySelector(".wrong-letter span");
let guessLeft = document.querySelector(".guess-left span");
let typingInput = document.querySelector(".typing-input");
let word,maxGuess;
let incorrect = [];
let correct = [];
var winning = new Audio('winning.mp3');
var gameOver = new Audio('game-over.mp3');
var correctLetter = new Audio('correct.mp3');
function randomWord(){
    let ranObj = wordList[Math.floor(Math.random()*wordList.length)];
     word = ranObj.word;
     maxGuess = 8; incorrect = []; correct = [];
    console.log(ranObj);

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuess;
    wrongLetter.innerHTML = incorrect;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
   
    inputs.innerHTML=html;
}
randomWord();

function initGame(e){
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`) && !correct.includes(key)){
        console.log(key);
        if(word.includes(key)){//if letter found in word
            for (let i = 0; i < word.length; i++) {
                //showing matched letter in the input value
              if(word[i] === key){
                correct.push(key);
                inputs.querySelectorAll("input")[i].value = key;
              }
            }
        }else{
            maxGuess--;//dicrement maxGuess by 1
            incorrect.push(` ${key}`);
        }
        guessLeft.innerText = maxGuess;
        wrongLetter.innerHTML = incorrect;
    }
    typingInput.value = "";
   if(correct.length === word.length){
    winning.play();
    alert(`Congrats! You Found the Word ${word.toUpperCase()}`);
    randomWord();
    }
    else if(maxGuess<1){
        gameOver.play();
        alert("Game over! You don't have remaining guesses");
        for (let i = 0; i < word.length; i++) {
          inputs.querySelectorAll("input")[i].value = word[i];
        }
    }  
}

resetBtn.addEventListener("click",randomWord);
typingInput.addEventListener("input",initGame);
document.addEventListener("keydown",()=>typingInput.focus());