$(document).ready(function(){
  var currentQuestion;
  var interval; 
  var timeLeft = 10; // global variable to hold initial value of timer
  var score = 0; // global variable to keep track of score
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  // changes score variable and updates it in the DOM
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };
  
  var startGame = function () {
    if (!interval) {
      // call the updateTimeLeft function if the timeLeft is 0
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score); // resets score to 0 when new round starts by passing negative score value to updateScore(). If score is 10, updateScore(-score); sets score to 10 - 10, which is 0
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };
  

// underscore random number generator
var randomNumberGenerator = function() {
  return _.random(10);
}
  
  // question generator
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    
    return question;
  };
  
  // render new question
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };
  
  // check answer
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val(''); //auto clear input when user is right
      updateTimeLeft(+1); // update time by 1 if answer is right
      updateScore(+1); //update score by 1  if answer is right
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  

  // we call the renderNewQuestion function at end of program so we see a question when the page loads
  renderNewQuestion();
});