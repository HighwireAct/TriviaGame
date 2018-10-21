class Game {
    constructor() {
        this.questions = this.createQuestions();
        this.questionIndex = 0;
        this.answerChosen = "";
        this.correctCount = 0;
        this.state = "question";
    }

    /**
     * Creates an array of questions for the round
     * @return {array}  Array of questions
     */
    createQuestions() {
        return [new Question(
            'Who wrote "The Wind-Up Bird Chronicle"?',
            ['Kurt Vonnegut', 'Octavia Butler', 'Haruki Murakami', 'R.L. Stine'],
            'Haruki Murakami',
            'murakami.jpg'),
        new Question(
            'What is the name of the fictional republic in Margaret Atwood\'s "A Handmaid\'s Tale"?',
            ['Oz', 'Gilead', 'Panem', 'Discworld'],
            'Gilead',
            'gilead.png'),
        new Question(
            'What object in William Golding\'s "Lord of the Flies" grants its holder the right to speak?',
            ['A conch shell', 'A coconut', 'A starfish', 'An oyster shell'],
            'A conch shell',
            'conch.jpg'),
        new Question(
            'In "The Hunger Games", the weapons tributes scramble for as the games begin are contained in what object?',
            ['A chest', 'A pit', 'A cornucopia', 'A plate'],
            'A cornucopia',
            'cornucopia.jpg'),
        new Question(
            'What is the name of the surveillance state in George Orwell\'s dystopian novel "1984"?',
            ['Big Brother', 'EYE', 'The Panopticon', 'FizzBuzz'],
            'Big Brother',
            'big-brother.png'),
        new Question(
            'What two words are written on the back of the Hitchhiker\'s Guide to the Galaxy?',
            ['Carry On', 'No Worries', 'Don\'t Panic', 'Keep Calm'],
            'Don\'t Panic',
            'dont-panic.jpg')
        ];
    }

    /**
     * Displays a question on the screen
     * @param {Object} question - Question to display
     */
    displayQuestion(question) {
        this.changeState("question");

        let questionHeading = $("<h2>").text(question.statement);
        let choiceList = $("<ul>").addClass("choice-list");

        for (let choice of question.choices) {
            let choiceListElement = $("<li>").addClass("choice button");
            choiceListElement.text(choice);
            choiceList.append(choiceListElement);
        }

        this.activeElement.append(questionHeading);
        this.activeElement.append(choiceList);
    }

    /** 
     * Compares a player's chosen answer with the question's actual answer
     * and displays the appropriate result screen
     */
    checkAnswer() {
        if (this.answerChosen === this.currentQuestion.answer) {
            this.correctCount++;
            console.log(this.correctCount);
            this.displayQuestionResults(this.currentQuestion, 0);
        } else {
            this.displayQuestionResults(this.currentQuestion, 1);
        }
    }

    /**
     * Displays the results for a question on the screen depending on previous screen
     * @param {Object} question  - Question whose answer will be displayed.
     * @param {Number} exitState - Number indicating if player chose the correct response (0), 
     *                             the incorrect response (1), or ran out of time (2)
     */
    displayQuestionResults(question, exitState) {
        this.changeState("results");

        let message = "";

        switch(exitState) {
            case 0:
                message = "Correct!";
                break;
            case 1:
                message = "Better luck next time!";
                break;
            case 2:
                message = "Out of time!";
                break;
        }

        let resultText = $("<h2>").text(message);
        let correctAnswer = $("<p>").text(`The correct answer was: ${question.answer}`);
        let resultImage = $("<img>").attr("src", `assets/images/${question.image}`);

        this.activeElement.append(resultText);
        if (exitState !== 0) { this.activeElement.append(correctAnswer); }
        this.activeElement.append(resultImage);
    }

    /** Change game to desired state, clearing the current
     *  game area and rendering the target area.
     */
    changeState(state) {
        this.activeElement.empty();
        this.activeElement.css("display", "none");
        // Hides timer if coming from question state
        if (game.state === "question") {
            $("#timer").css("display", "none");
        }

        this.state = state;

        // Shows timer if going to question state
        if (game.state === "question") {
            $("#timer").css("display", "block");
        }

        this.activeElement.css("display", "block");
    }

    /** 
     * Displays game results at the end of a round with a message
     * based on their percent correct and a button to reset the game.
     */
    displayGameResults() {
        this.changeState("endgame");

        let grade = game.correctCount / game.questions.length;
        let scoreDisplay = $("<h2>");
        let assessment = $("<h2>");

        let restartButton = $("<div>Restart</div>");
        restartButton.addClass("button");
        restartButton.attr("id", "restart");

        if (grade <= 1 && grade > 0.8) {
            // A-B
            assessment.text("Great work!");
        } else if (grade <= 0.8 && grade > 0.6) {
            // B-D
            assessment.text("Not bad!");
        } else {
            // F
            assessment.text("Try again!");
        }
        scoreDisplay.html(`Your final score: ${this.correctCount} / ${this.questions.length}`);
        this.activeElement.append(scoreDisplay);
        this.activeElement.append(assessment);
        this.activeElement.append(restartButton);
    }

    /** Resets the game */
    reset() {
        this.questionIndex = 0;
        this.correctCount = 0;

        this.changeState("question");
        this.displayQuestion(this.currentQuestion);
    }

    /**
     * Gets the current question from the questions array
     * @return {Object} The question at the game's current questionIndex
     */
    get currentQuestion() {
        return this.questions[this.questionIndex];
    }

    /**
     * Gets the current html area associated with the game's state
     */
    get activeElement() {
        switch (this.state) {
            case "question":
                return $("#question-area");
            case "results":
                return $("#question-results-area");
            case "endgame":
                return $("#game-over");
        }
    }
}