var startButton = document.querySelector('.start');
var question = document.querySelector('.question');
var answer = document.querySelector('.answer');
var win = document.querySelector('.win');
var lose = document.querySelector('.lose');
var timerElement = document.querySelector('.timer-count');
var startButton = document.querySelector('.start-button');

var chosenQuestion= '';
var numberOfQuestions= 1;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

///GIVEN I am taking a code quiz
// Attach event listener to start button to call startGame function on click
document.getElementsByClassName("start-button").addEventListener('click', startGame);

//WHEN I click the start button
function startGame(){
  document.getElementsByClassName("Question-Game").style.visibility = "visible";
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 10;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderBlanks();
  startTimer();
}

//WHEN I answer a question


//THEN I am presented with another question


//WHEN I answer a question incorrectly
function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenQuestion === blanksLetters.join('')) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

//THEN time is subtracted from the clock
//THEN a timer starts and I am presented with a question
// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (isWin && timerCount > 0) {
      clearInterval(timer);
      winGame();
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

//WHEN all questions are answered or the timer reaches 0


//THEN the game is over


//WHEN the game is over
// The init function is called when the page loads
function init() {
  getWins();
  getlosses();
}

// The winGame function is called when the win condition is met
function winGame() {
  question.textContent = 'YOU WON!!!🏆 ';
  winCounter++;
  startButton.disabled = false;
  setWins();
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  question.textContent = 'GAME OVER';
  loseCounter++;
  startButton.disabled = false;
  setLosses();
}


//THEN I can save my initials and my score
//function to save task in local storage 
var savedScore = function() {
  localStorage.setItem("score", JSON.stringify(score));
}
var savedInit = function(initails) {
  localStorage.setItem("initails", JSON.stringify(initails));
}

// gets tasks from local storage and load them
function loadSaveScores() {
  // get tasks items from local stroage
  var savedScore = localStorage.getItem("score");
  var savedInit = localStorage.getItem("initails");

  savedScore  = JSON.parse(savedScore);
  savedInit = JSON.parse(savedInit);
}
