class Game {
    constructor() {
        this.questions = this.createQuestions();
        this.questionIndex = 0;
        this.correct = 0;
        this.incorrect = 0;
    }

    createQuestions() {
        return [new Question(
            'Who wrote "The Wind-Up Bird Chronicle?',
            ['Kurt Vonnegut', 'Octavia Butler', 'Haruki Murakami', 'R.L. Stine'],
            'Haruki Murakami',
            'murakami.jpg'),
        new Question(
            'What is the name of the fictional republic in Margaret Atwood\'s "A Handmaid\'s Tale"?',
            ['Oz', 'Gilead', 'Panem', 'Discworld'],
            'Gilead',
            'ofred.jpg'),
        new Question(
            'What object in William Golding\'s "Lord of the Flies" grants its holder the right to speak?',
            ['A conch shell', 'A coconut', 'A starfish', 'An oyster shell'],
            'A conch shell',
            'conch.jpg')];
    }
}