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
  
    startTimer();
    startQuestion();
  }

  // score timer
  function startTimer() {
    score = 75;
    timerEL.textContent = score;
    var timerInterval = setInterval(function() {
      if (gameOver) {
        clearInterval(timerInterval);
      }else if(score <= 0){
        gameOver = true;
        clearInterval(timerInterval);
        correctnessEl.textContent = "TIME UP!";
        scoreEl.textContent = score;
        setTimeout(function(){questionPage.classList.add("d-none");
        scorePage.classList.remove("d-none");},1002)
      } else {
        score--;
        timerEL.textContent = score;
      }
    }, 1000);
  }
  
  function startQuestion() {
    answersEl.innerHTML = "";
    questionEl.textContent = questionArray[questionIndex].question;
    var answerArray = genererateAnswerArray(questionArray[questionIndex]);
    for (var i = 0; i < answerArray.length; i++) {
      var answerButton = document.createElement("button");
      answerButton.textContent = answerArray[i];
      answerButton.classList.add("btn", "btn-primary");
      answersEl.appendChild(answerButton);
    }
  }
  
  function genererateAnswerArray(question) {
    var answerArray = [];
    answerArray.push(
      question.answer1,
      question.answer2,
      question.answer3,
      question.rightAnswer
    );
    shuffle(answerArray);
    return answerArray;
  }
  
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  function checkAnswer(event) {
    if (event.target.matches("button")) {
      if (event.target.textContent === questionArray[questionIndex].rightAnswer) {
        correctnessEl.textContent = "CORRECT";
        setTimeout(function() {
          correctnessEl.textContent = "";
        }, 1200);
      } else {
        if(score >= 15){
        score -= 15;
        }else{
          score = 0;
          setTimeout(function() {
            questionPage.classList.add("d-none");
            scorePage.classList.remove("d-none");
          }, 1002);
        }
        timerEL.textContent = score;
        correctnessEl.textContent = "WRONG";
        setTimeout(function() {
          correctnessEl.textContent = "";
        }, 1000);
      }
      if (questionIndex < questionArray.length - 1) {
        questionIndex++;
        startQuestion();
      } else {
        gameOver = true;
        setTimeout(function() {
          questionPage.classList.add("d-none");
          scorePage.classList.remove("d-none");
        }, 1002);
        scoreEl.textContent = score;
      }
    }
  }

  function submitScore(event) {
    event.preventDefault();
    var newScore = {
      initials: "",
      yourScore: ""
    };
    newScore.initials = initialsEl.value.toUpperCase();
    newScore.yourScore = score;
    highscoreArray.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscoreArray));
    viewHighscores();
    showHighscores();
  }
  
  function showHighscores() {
    highscoresEL.innerHTML = "";
    highscoreArray.sort(compare);
    for (var i = 0; i < highscoreArray.length; i++) {
      var insertedScore = document.createElement("li");
      insertedScore.classList.add("list-group-item", "list-group-item-primary");
      insertedScore.textContent =
        i +
        1 +
        ". " +
        highscoreArray[i].initials +
        ": " +
        highscoreArray[i].yourScore;
      highscoresEL.appendChild(insertedScore);
    }
    highscoreButton.disabled = true;
  }

  function compare(a, b) {
    return b.yourScore - a.yourScore;
  }
  
  function back(event) {
    highscorePage.classList.add("d-none");
    homePage.classList.remove("d-none");
    highscoreButton.disabled = false;
  }
  
  function clearScores() {
    highscoreArray = [];
    localStorage.setItem("highscores", JSON.stringify(highscoreArray));
    highscoresEL.innerHTML = "";
  }
  
  function testFunction(event) {
    console.log("test");
  }
  
  highscoreButton.addEventListener("click", viewHighscores);
  startButton.addEventListener("click", startQuiz);
  backButton.addEventListener("click", back);
  answersEl.addEventListener("click", checkAnswer);
  submitButton.addEventListener("click", submitScore);
  clearButton.addEventListener("click", clearScores);
  
  init();