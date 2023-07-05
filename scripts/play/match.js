


function matchUpdate() {

	// go to the next state when Enter pressed
	if (key["Enter"] && !last_key["Enter"]) {
		if (match_state == "question") {
			verifyAnswer()
		} else if (match_state == "correction") {
			nextQuestion()
		}
	}

	// spawn flyingEmojis depending on the score
	if (match_state == "game_over") {
		if (match_score/match_answered_questions.length == 1) {
			if (randomInt(1,6) == 1) {
				emojis.push(new FlyingEmoji(randomFloat(-canvas.width/2, canvas.width/2), randomFloat(-canvas.height/2, canvas.height/2)));
			}
			// spawn glitter when mouse clicked
			if (mouse.left && !last_mouse.left) {
				playASound(explosion_sounds, general_volume*0.5, 0.5+Math.random()*0.5)
				let pos_x = mouse.x-canvas.width/2
				let pos_y = mouse.y-canvas.height/2
				for (let i = 0; i < randomInt(50,100); i++) {
					glitters.push(new Glitter(pos_x, pos_y));
				}
			}
		} else if (match_score/match_answered_questions.length >= 0.8) {
			if (randomInt(1,16) == 1) {
				emojis.push(new FlyingEmoji(randomFloat(-canvas.width/2, canvas.width/2), randomFloat(-canvas.height/2, canvas.height/2)));
			}
		}
	}

}


function startMatch() {
	match_questions = []
	match_questions = generateMatchQuestions(banks_selected)
	// start a match only if there are questions to ask
	if (match_questions.length > 0) {
		match_score = 0;
		showCurrentQuestion()
	}
}



function generateMatchQuestions(banks_selected) {
	var match_questions = []

	// for each selected bank
	for (var i = 0; i < banks_selected.length; i++) {

		// get the items that we want by iterating since we're not using a dictionnary
		var bank = word_banks.filter(bank => bank.name == banks_selected[i])[0].items;

		// generate the questions
		for (var j = 0; j < bank.length; j++) {
			var question = {}
			question.correct_answer = bank[j].inf
			question.text = bank[j].fr
			match_questions.push(question)
		}
	}

	shuffleArray(match_questions)
	return match_questions
}







