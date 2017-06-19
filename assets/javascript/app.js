$(document).ready(function() {
	const game = {
		questions: [
			{
				question: 'What fast food franchise has the most worldwide locations?',
				answerChoices: ['Subway', 'McDonald\'s', 'Burger King'],
				correctAnswer: 0
			},
			{
				question: '"Granny Smith" is a popular type of which fruit?',
				answerChoices: ['Pear', 'Apple', 'Orange'],
				correctAnswer: 1
			},
			{
				question: 'Dijon mustand originated in the city of Dijon, located in what country?',
				answerChoices: ['France', 'Germany', 'England'],
				correctAnswer: 0
			},
			{
				question: 'In what year did McDonald\'s start serving breakfast with the introduction of the Egg McMuffin?',
				answerChoices: ['1983', '1961', '1972'],
				correctAnswer: 2
			},
			{
				question: 'Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?',
				answerChoices: ['Peru', 'El Salvador', 'Cuba'],
				correctAnswer: 1
			},
			{
				question: 'What popular soda beverage was originally developed as a mixer for whiskey?',
				answerChoices: ['Ginger Ale', 'Mountain Dew', 'Coca Cola'],
				correctAnswer: 1
			},
			{
				question: 'In what type of restaurant would you typically find the condiment wasabi?',
				answerChoices: ['Thai', 'Chinese', 'Japanese'],
				correctAnswer: 2
			},
			{
				question: 'Pho is a popular noodle soup from what country?',
				answerChoices: ['Vietnam', 'Thailand', 'Mexico'],
				correctAnswer: 0
			},
			{
				question: 'The paperboard "Chinese takeout" box was invented in what country?',
				answerChoices: ['France', 'China', 'United States'],
				correctAnswer: 2
			},
			{
				question: 'A teetotaler is a person that never drinks what?',
				answerChoices: ['Water', 'Alcohol', 'Milk'],
				correctAnswer: 1
			},
		],
		answeredCorrect: 0,
		answeredIncorrect: 0,
		counter: 15,
		currentQuestion: 0,
		questionInterval: null,
		answeredQuestion: false,
		newGame: function() {
			clearInterval(this.questionInterval);
			this.answeredCorrect = 0;
			this.answeredIncorrect = 0;
			this.counter = 15;
			this.currentQuestion = 0;
			this.questionInterval = null;
			this.answeredQuestion = false;
			this.nextQuestion();
		},
		gameOver: function() {
			clearInterval(this.questionInterval);
			$('#question').empty();
			$('#answer-choices').empty();

			$('#info').html('<h1>Game over!</h1>');
			$('#info').attr('style', 'color: blue');

			$('#info').append($('<h3>').text(`Answered Correctly: ${this.answeredCorrect}`));
			$('#info').append($('<h3>').text(`Answered Incorrectly: ${this.answeredIncorrect}`));

			$('#info').append($('<button>').addClass('btn btn-primary my-button').text('Play Again'));
		},
		startCountDown: function(time) {
			clearInterval(this.questionInterval);
			this.counter = time;
			$('#time').text(this.counter);

			this.questionInterval = setInterval(function() {
				$('#time').text(--game.counter);

				if (game.counter === 0) {
					if (!game.answeredQuestion) {
						game.answeredQuestion = true;
						game.incorrectAnswer();
					} else {
						game.nextQuestion();
					}
				}
			}, 1000);
		},
		nextQuestion: function() {
			this.answeredQuestion = false;

			$('#info').html('<h3>Time remaining: <span id="time">15</span>s</h3>');
			$('#info').attr('style', 'color: blue');
			this.startCountDown(15);

			console.log(this.currentQuestion);
			const q = this.questions[this.currentQuestion];
			$('#question').html($('<h1>').text(q.question));
			$('#answer-choices').empty();

			for (var i = 0; i < q.answerChoices.length; i++) {
				var choice = $('<h3>').text(q.answerChoices[i]);
				choice.attr('class', 'answer-choice');
				choice.attr('id', i);
				$('#answer-choices').append(choice);
			}
		},
		updateInfo: function(info, correct) {
			this.currentQuestion++;

			if (this.currentQuestion >= this.questions.length) {
				this.gameOver();
			} else {
				clearInterval(this.questionInterval);
				this.startCountDown(5);

				$('#info').attr('style', correct ? 'color: green;' : 'color: red;');
				$('#info').html(info);
			}
		},
		correctAnswer: function() {
			this.answeredCorrect++;
			this.answeredQuestion = true;

			const info = '<h3>Correct! Next Question in <span id="time">5</span>s</h3>';
			this.updateInfo(info, true);
		},
		incorrectAnswer: function() {
			this.answeredIncorrect++;
			this.answeredQuestion = true;

			const question = this.questions[this.currentQuestion];
			const answer = question.answerChoices[question.correctAnswer];

			const info = `<h3>Incorrect! The correct answer was "${answer}". Next question in <span id="time">5</span>s</h3>`;
			this.updateInfo(info, false);
		}
	};

	game.newGame();

	$('#answer-choices').on('click', '.answer-choice', function() {
		if (parseInt($(this).attr('id')) === game.questions[game.currentQuestion].correctAnswer) {
			game.correctAnswer();
		} else {
			game.incorrectAnswer();
		}
	});

	$('#info').on('click', '.my-button', function() {
		game.newGame();
	});
});