class Question {
    constructor(questionText, correctAnswer, questionChoices) {
        this.questionText = questionText;
        this.correctAnswer = correctAnswer;
        this.questionChoices = questionChoices;
    }
}

let Game = {
    state: "start",
    correctCount: 0,
    incorrectCount: 0,
    changeState: function(state) {
        this.state = state;
    }
}

let questionArray = [
    new Question(
        "What is the meaning of life?",
        "42",
        [
            "42",
            "I don't know",
            "Chocolate",
            "Happiness"
        ]
    ),
    new Question(
        "What year was I born?",
        "1995",
        [
            "1885",
            "1995",
            "1990",
            "Happiness"
        ]
    ),
    new Question(
        "What is my name?",
        "Ethan",
        [
            "Ethan",
            "Dave",
            "Brent",
            "Happiness"
        ]
    )
];

let index = 0;
let time = 10;
let questionTimer;

function askQuestion() {
    clearInterval(questionTimer);
    time = 10;
    startTimer();
    $("#question-text").text(questionArray[index].questionText);
    $("#question-choices").empty();
    for (let i = 0; i < questionArray[index].questionChoices.length; i++) {
        let choiceListElement = $("<li>");
        choiceListElement.text(questionArray[index].questionChoices[i]);
        choiceListElement.addClass("choice");
        $("#question-choices").append(choiceListElement);
    }
}

function startTimer() {
    $("#time").text(time);
    questionTimer = setInterval(function() {
        time--;
        $("#time").text(time);
        if (time === 0) {
            index++;
            askQuestion();
        } 
    }, 1000);
}

askQuestion();

$("#question-choices").on("click", ".choice", function() {
    let userChoice = $(this).text();
    console.log(userChoice);
    if (userChoice === questionArray[index].correctAnswer) {
        console.log("Correct!");
    } else {
        console.log("Tough luck, buddy!");
    }
    index++;
    if (index === questionArray.length) {
        console.log("End game");
    } else {
        askQuestion();
    }
});