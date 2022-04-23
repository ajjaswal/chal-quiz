// page elements
var startButton = document.querySelector("#start-button");
var highscoreButton = document.getElementById("highscore-button");
var backButton = document.getElementById("back-button");
var submitButton = document.getElementById("submit-button");
var clearButton = document.getElementById("clear-button");

var homePage = document.getElementById("home-page");
var questionPage = document.getElementById("question-page");
var scorePage = document.getElementById("score-page");
var highscorePage = document.getElementById("highscore-page");

var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var correctnessEl = document.getElementById("correctness");
var timerEL = document.getElementById("timer");
var scoreEl = document.getElementById("score");
var initialsEl = document.getElementById("initials");
var highscoresEL = document.getElementById("highscores");
var highscoreArray = [];

// questions
var question0 = {
    question: "Inside which HTML element do we put the JavaScript?",
    answer1: "<javascript>",
    answer2: "<js>",
    answer3: "<scripting>",
    rightAnswer: "<script>"
  };
  var question1 = {
    question: "Where is the correct place to insert a JavaScript?",
    answer1: "The stylesheet",
    answer2: "The <body> section",
    answer3: "The <head> section",
    rightAnswer: "The <head> section or the <body> section"
  };
  var question2 = {
    question: "How do you write 'Hello World' in an alert box?",
    answer1: "msg('Hello World');",
    answer2: "msgBox('Hello World');",
    answer3: "alertBox('Hello World');",
    rightAnswer: "alert('Hello World');"
  };
  var question3 = {
    question: "What special character are javascript arrays contained in?",
    answer1: "' '",
    answer2: "( )",
    answer3: "{ }",
    rightAnswer: "[ ]"
  };

  var questionArray = [question0, question1, question2, question3];
  var questionIndex = 0;

// high score localStorage
function init() {
    if (localStorage.getItem("highscores") !== null) {
      highscoreArray = JSON.parse(localStorage.getItem("highscores"));
      console.log("block 1");
    }else{
      localStorage.setItem("highscores", JSON.stringify(highscoreArray));
      console.log("block 2");
    }
  }

  //page buttons
  function viewHighscores() {
    gameOver = true;
    homePage.classList.add("d-none");
    questionPage.classList.add("d-none");
    scorePage.classList.add("d-none");
    highscorePage.classList.remove("d-none");
    showHighscores();
  }
  
  function startQuiz() {
    homePage.classList.add("d-none");
    questionPage.classList.remove("d-none");
    gameOver = false;
    questionIndex = 0;
  
    startClock();
    startQuestion();
  }