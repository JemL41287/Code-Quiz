var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choice1: "<strings>",
    choice2: "<booleans>",
    choice3: "<alerts>",
    choice4: "<numbers>",
    answer: 1
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    choice1: "<quotes>",
    choice2: "<curly brackets>",
    choice3: "<parantheses>",
    choice4: "<square brackets>",
    answer: 3
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choice1: "<numers and strings>",
    choice2: "<other arrays>",
    choice3: "<booleans>",
    choice4: "<all of the above>",
    answer: 4
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choice1: "<commas>",
    choice2: "<curly brackets>",
    choice3: "<quotes>",
    choice4: "<parentheses>",
    answer: 3
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "<JavaScript>",
    choice2: "<terminal / bash>",
    choice3: "<for loops>",
    choice4: "<console.log>",
    answer: 4
  }
];

function startGame() {
  questionCounter = 0;
  availableQuestions = [ ... questions];
  console.log(availableQuestions);
  getNewQuestion();
};

function getNewQuestion() {
  questionCounter++;
  var questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText  = currentQuestion.question;

  choices.forEach( function(choice) {
    var number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

};


startGame();


