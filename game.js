const buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let randomNumber;
let gamePattern = [];
let level = 0;
let started = false;

$(document).on("keypress", function () {
  if (!started) nextSquence();
  $("#level-title").text("Level " + level);
  started = true;
});

$(".btn").on("click", function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSquence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.round(Math.random() * 3);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  new Audio("./sounds/" + name + ".mp3").play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    // nextSquence();
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSquence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    new Audio("./sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press any key to restart ");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
