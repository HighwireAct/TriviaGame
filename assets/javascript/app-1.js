let game = new Game();

console.log(game);

console.log(game.questions);
console.log(game.currentQuestion);

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowRight") {
        game.questionIndex++;
        console.log(game.currentQuestion);
    }
});