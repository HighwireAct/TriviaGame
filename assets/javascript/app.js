let game = new Game();
let questionTimer = 10;
let nextRoundTimer = 3;
let time;
let secondTicker;

document.getElementById("timer").style.display = "none";
document.getElementById("game-over").style.display = "none";

function startTimer(maxTime) {
    time = maxTime;
    $("#timer").text(`Time remaining: ${time}`);

    secondTicker = setInterval(function() {
        time--;
        $("#timer").text(`Time remaining: ${time}`);

        if (time === 0) {
            clearInterval(secondTicker);

            if (game.state === "question") {
                game.displayQuestionResults(game.currentQuestion, 2);
                startTimer(nextRoundTimer);
            } else if (game.state === "results") {
                game.questionIndex++;
                if (game.currentQuestion !== undefined) {
                    game.displayQuestion(game.currentQuestion);
                    startTimer(questionTimer);
                } else {
                    game.displayGameResults();
                }
            }
        }
    }, 1000);
}

// Click start to start game
document.getElementById("start").addEventListener("click", function() {
    game.state = "question";
    $(this).css("display", "none");
    $("#timer").css("display", "block");
    game.displayQuestion(game.currentQuestion);
    startTimer(questionTimer);
});

// Click restart to restart game
$(document).on("click", "#restart", function() {
    game.reset();
    startTimer(questionTimer);
});

// Checks player answer when choice is clicked
$(document).on("click", ".choice", function() {
    clearInterval(secondTicker);
    game.answerChosen = $(this).text();
    game.checkAnswer();
    startTimer(nextRoundTimer);
});