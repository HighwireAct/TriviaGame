let game = new Game();

console.log(game);

console.log(game.questions);
console.log(game.questions[game.questionIndex]);

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowRight") {
        game.questionIndex++;
        console.log(game.questions[game.questionIndex]);
    }
});