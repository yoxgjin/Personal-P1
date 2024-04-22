const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).on('keydown', function () {
    startGame();
});

$(document).on('touchstart', function (event) {
    event.preventDefault();
    startGame();
});

function startGame() {
    if (!started) {
        nextSequence();
        $("h1").text("Level " + level);
        started = true;
    }
}

$(".btn").on('click touchend', function () {
    event.preventDefault();
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () { nextSequence(); }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () { $("body").removeClass("game-over"); }, 200);
        $("h1").text("Game Over!");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () { $("#" + currentColour).removeClass("pressed"); }, 100);
}

function playSound(name) {
    const audio = new Audio("./Sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
