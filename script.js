var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-container"));
var timer = document.getElementById("time");
var timerInterval;
var secondsLeft = 75;
var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var startButton = document.getElementById("startgame");
var startScreen = document.getElementById("main");
var quizScreen = document.getElementById("quiz");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var yourInitials = document.getElementById("initials");
var submitBtn = document.getElementById("submit");


var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choice1: "strings",
    choice2: "booleans",
    choice3: "alerts",
    choice4: "numbers",
    answer: 1
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    choice1: "quotes",
    choice2: "curly brackets",
    choice3: "parantheses",
    choice4: "square brackets",
    answer: 3
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "booleans",
    choice4: "all of the above",
    answer: 4
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "parentheses",
    answer: 3
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "JavaScript",
    choice2: "terminal / bash",
    choice3: "for loops",
    choice4: "console.log",
    answer: 4
  }
];


function startQuiz() {
  startScreen.setAttribute("class", "hide");
  quizScreen.removeAttribute("class");
  questionCounter = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  setTime();
};

function setTime() {
  timerInterval = setInterval(function() {

    if (secondsLeft <= 0) {
      timer.texContent = 0;
      clearInterval(timerInterval);
      quizEnd();
      // secondsLeft = 0;
    } else {
      secondsLeft--;
      timer.textContent = "Time: " + secondsLeft};

  }, 1000);


}

function getNewQuestion() {
  questionCounter++;
  var questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;


  choices.forEach(function (choice) {
    var number = choice.dataset["number"];
    var labelString = number.toString();

    choice.innerText = labelString + ". " + currentQuestion["choice" + number];

  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(function (choice, i) {
  choice.addEventListener("click", function (choice) {
    
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = choice.target;
    
    var selectedAnswer = selectedChoice.dataset["number"];

    var classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      if (classToApply === "incorrect") {
        secondsLeft -= 15
        console.log("secs left", secondsLeft);
        if(secondsLeft < 14) {
          var timerText = timer.textContent.substring(5,8);
          finalScore = timerText;
          console.log("final score", finalScore);
        }

      };

    selectedChoice.classList.add(classToApply);

    setTimeout(function () {
      selectedChoice.classList.remove(classToApply);
      if (questionCounter < questions.length) {
        getNewQuestion();
      } else {quizEnd()};
       
    }, 1000);

  });

});

function quizEnd() {
  endScreen.removeAttribute("class");
  quizScreen.setAttribute("class", "hide");
  clearInterval(timerInterval);
  console.log("down here", finalScore)
  document.getElementById("final-score").innerHTML= finalScore;

  
}

function saveHighscore() {
  var initials = yourInitials.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: finalScore,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;

startButton.addEventListener("click", function () {
  startQuiz();
});

yourInitials.onkeyup = checkForEnter;
