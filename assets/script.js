// variables to keep track of quiz state
var currentQuestionIndex = 0;
// Sets the time so user gets 15 seconds per question
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
// ID questions
var question = document.getElementById("questions");
// ID time timerElement
var timerElement = document.getElementById("time");
// ID choices Element
var choicesEl = document.getElementById("choices");
// ID submit button or btn
var submitBtn = document.getElementById("submit");
// ID start button
var startButton = document.getElementById("start");
// Give ID initials an element
var initialsEl = document.getElementById("initials");
// ID feedback
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("../sfx/project.wav");
var sfxWrong = new Audio("../sfx/Project_3.wav");


function startGame() {
  // hide start screen
  // ID start-screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hide questions section
  question.removeAttribute("class");

  // start timer and setInterval to decrement clock by 1 every 1000ms
  timerId = setInterval(clockTick, 1000);

  // show starting time from defined variable above (starts at #questions*15)
  timerElement.textContent = time;
  //Call getQuestion function below
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  console.log(currentQuestionIndex)
  // update title with current question
  // ID question-title
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  // .forEach Performs the specified action for each element in an array (choices is an array in questions.js).
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice and assign class names using setAttribute
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    // textContent starts with i=0 and increments up 1 for each button, and fills in the corresponding value for each index (i)
    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice that calls the function questionClick below
    choiceNode.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong by comparing this.value (the user's choice that they clicked on) and the "answer" from questions.js
  // if not equal then you lose 15 seconds, if time is less than zero it gets set to 0
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerElement.textContent = time;

   
  } else {
   
    // feedbackEl.setAttribute("class", "feedback backGroundFBRight");
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second (500ms)
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 3000);

  // move to next question and increments currentQuestionIndex by 1
  currentQuestionIndex++;

  // check if we've run out of questions by comparing current index to length of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  // ID end-screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  // ID final-score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  question.setAttribute("class", "hide");
}
//THEN a timer starts and I am presented with a question
// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function clockTick() {
  // Sets timer
  time--;
  timerElement.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}
//Allow users to hti Enter OR click the button to enter initials
function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startButton.onclick = startGame;