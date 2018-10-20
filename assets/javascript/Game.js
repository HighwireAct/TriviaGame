class Game {
    constructor() {
        this.questions = this.createQuestions();
        this.questionIndex = 0;
        this.answerChosen = null;
        this.correctCount = 0;
        this.incorrectCount = 0;
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
            'conch.jpg')];
    }

    /**
     * Displays a question on the screen
     * @param {Object} question - Question to display
     */
    displayQuestion(question) {
        let questionHeading = $("<h2>").text(question.statement);
        let choiceList = $("<ul>").addClass("choice-list");

        for (let choice of question.choices) {
            let choiceListElement = $("<li>").addClass("choice button");
            choiceListElement.text(choice);
            choiceList.append(choiceListElement);
        }

        $("#question-area").append(questionHeading);
        $("#question-area").append(choiceList);
    }

    /**
     * Displays the results for a question on the screen depending on previous screen
     * @param {Object} question  - Question whose answer will be displayed.
     * @param {Number} exitState - Number indicating if player chose the correct response (0), 
     *                             the incorrect response (1), or ran out of time (2)
     */
    displayQuestionResults(question, exitState) {
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

        $("#question-results-area").append(resultText);
        if (exitState !== 0) { $("#question-results-area").append(correctAnswer); }
        $("#question-results-area").append(resultImage);
    }

    /**
     * Gets the current question from the questions array
     * @return {Object} The question at the game's current questionIndex
     */
    get currentQuestion() {
        return this.questions[this.questionIndex];
    }
}