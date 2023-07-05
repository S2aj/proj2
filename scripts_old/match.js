




// match options lists

var list_words_filter = [
	{name: "all", fr: "Tous les mots"},
	{name: "hiragana_only", fr: "Seulement en hiragana"},
	{name: "verbs_only", fr: "Seulement les verbes"},
]

var list_verbs_filter = [
	{name: "infinitive", fr: "Sans conjugaisons"},
	{name: "conjugated", fr: "Avec conjugaisons"},
	{name: "conjugated_except_inf_past", fr: "Avec, sauf passé informel"},
]

var list_match_mode = [
	{name: "cool", fr: "Détente [ne fait rien]"},
	{name: "extreme", fr: "Extrême [ne fait rien]"},
]

var list_questions_policy = [
	{name: "one_chance", fr: "Une seule chance"},
	{name: "until_all_correct", fr: "Jusqu'à ce que tout soit juste"},
	{name: "one_chance_but_3_passes", fr: "1 chance, 3 passes [marche pas]"}, // "Une seule chance avec 3 passes"
]


// vars selected before match
var match_mode = "cool"
var questions_policy = "one_chance"
var words_filter = "all"
var verbs_filter = "infinitive"
var banks_selected = []

// vars used during match
var match_questions = []
var match_answered_questions = []
var match_score = 0
var match_state = null // "question" or "correction" or "game_over"

function startMatch() {
	match_questions = []
	match_questions = generate_match_questions(banks_selected)
	// start a match only if there are questions to ask
	if (match_questions.length > 0) {
		menu_section.style.display = "none";
		game_section.style.display = "flex";
		match_score = 0;
		showCurrentQuestion()
	}
}




function generate_match_questions(banks_selected) {
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


function showGameOver() {
	match_state = "game_over";
	
	canvas.style.pointerEvents = "auto";

	user_inputE.style.display = "none";
	verifyAnswer_buttonE.style.display = "none";
	user_outputE.style.display = "none";
	nextQuestion_buttonE.style.display = "none";

	big_displayE.innerHTML = "Score : "+match_score+"/"+match_answered_questions.length;
	small_displayE.innerHTML = "Échap pour quitter";

	if (match_score/match_answered_questions.length < 0.4) {
		playASound(simple_lost, general_volume)
	} else if (match_score/match_answered_questions.length == 1) {
		playASound(cheers, general_volume);
		playASound(simple_win, general_volume);
		small_displayE.innerHTML = "CLIQUE SUR L'ÉCRAN !";
	} else if (match_score/match_answered_questions.length >= 0.8) {
		playASound(simple_win, general_volume);
	}
}

function quitMatch() {
	match_state = null;
	menu_section.style.display = "flex";
	game_section.style.display = "none";
	canvas.style.pointerEvents = "none";
	glitters = [];
	emojis = [];
	match_questions = [];
	match_answered_questions = [];
}


function showCurrentQuestion() {
	// if there still are questions
	if (match_questions.length > 0) {
		match_state = "question"

		user_inputE.style.display = "inline";
		verifyAnswer_buttonE.style.display = "inline";
		user_outputE.style.display = "none";
		nextQuestion_buttonE.style.display = "none";


		user_inputE.focus();
		big_displayE.innerHTML = match_questions[0].text
		if (match_questions[0].sub_text != null) {
			small_displayE.innerHTML = match_questions[0].sub_text
		} else {
			small_displayE.innerHTML = "-"
		}
	} else {
		showGameOver()
	}
}

function showCorrection(question) {
	match_state = "correction"

	user_inputE.style.display = "none";
	verifyAnswer_buttonE.style.display = "none";
	user_outputE.style.display = "inline";
	nextQuestion_buttonE.style.display = "inline";

	var correctionHTML = "";

	var last_cc = 0 // last corresponding char checked (index of question.correct_answer)
	for (var ac = 0; ac < question.answer.length; ac++) {

		var sliced_correct_answer = question.correct_answer.slice(last_cc)
		// check if there's a corresponding char
		var cc = sliced_correct_answer.indexOf(question.answer[ac]);

		// if corresponding character found
		if (cc >= 0) {
			// display missed characters
			if (cc > 0) {
				correctionHTML += '<span style="color:#e80">'
				correctionHTML += sliced_correct_answer.slice(0, cc)
				correctionHTML += '</strike>'
			}
			// display the character as right
			correctionHTML += '<span style="color:#0af">'
			correctionHTML += question.answer[ac]
			correctionHTML += "</span>"
			last_cc += cc+1
		// else display the character as wrong
		} else {
			correctionHTML += '<strike style="color:#c00"><span style="color:#f00">'
			correctionHTML += question.answer[ac]
			correctionHTML += '</span></strike>'
		}

	}
	// display the last missed characters
	if (last_cc < question.correct_answer.length) {
		correctionHTML += '<span style="color:#e80">'
		correctionHTML +=question.correct_answer.slice(last_cc)
		correctionHTML += '</strike>'
	}
		
	user_outputE.innerHTML = correctionHTML;
}









function verifyAnswer() {
	match_questions[0].answer = user_inputE.value
	user_inputE.value = ""

	if (match_questions[0].answer == match_questions[0].correct_answer) {

		// feedback
		playASound(ding_sounds, general_volume)
		for (var i = 0; i < randomInt(50,300); i++) {
			glitters.push(new Glitter(0, user_inputE.getBoundingClientRect().top+user_inputE.getBoundingClientRect().height/2-canvas.height/2));
		}

		if (questions_policy == "until_all_correct") {
			// add a point only if not already answered
			if (match_questions[0].cancel_point != true) {
				match_score += 1
			}
			match_answered_questions.push(match_questions.shift());
		} else if (questions_policy == "one_chance") {
			match_answered_questions.push(match_questions.shift());
			match_score += 1
		}
		showCurrentQuestion()
	} else {
		// feedback
		playASound(dont, general_volume, 0.5+Math.random()*0.5)
		shake = 10

		showCorrection(match_questions[0])

		if (questions_policy == "until_all_correct") {
			// put the question in a random location
			var item = match_questions.shift()
			match_questions.splice(randomInt(0, match_questions.length-1), 0, item)
			// and tag it to indicate "don't add a point when answered correctly"
			item.cancel_point = true
		} else if (questions_policy == "one_chance") {
			match_answered_questions.push(match_questions.shift());
		}
	}
}


























function matchUpdate() {
	// verify answer when enter key is pressed
	if (key["Enter"] && !last_key["Enter"]) {
		if (match_state == "question") {
			verifyAnswer()
		} else if (match_state == "correction") {
			nextQuestion()
		}
	}
	if (key["Escape"] && !last_key["Escape"]) {
		if (match_state == "game_over") {
			quitMatch();
		} else {
			quitMatch();
		}
	}


	if (match_state == "game_over") {
		if (match_score/match_answered_questions.length == 1) {
			if (randomInt(1,6) == 1) {
				emojis.push(new FlyingEmoji(randomFloat(-canvas.width/2, canvas.width/2), randomFloat(-canvas.height/2, canvas.height/2)));
			}
			if (mouse.left && !last_mouse.left) {
				playASound(explosion_sounds, general_volume*0.5, 0.5+Math.random()*0.5)
				var pos_x = mouse.x-canvas.width/2
				var pos_y = mouse.y-canvas.height/2
				for (var i = 0; i < randomInt(50,100); i++) {
					glitters.push(new Glitter(pos_x, pos_y));
				}
			}
		} else if (match_score/match_answered_questions.length >= 0.8) {
			if (randomInt(1,16) == 1) {
				emojis.push(new FlyingEmoji(randomFloat(-canvas.width/2, canvas.width/2), randomFloat(-canvas.height/2, canvas.height/2)));
			}
		}
	}
	
	if (shake>0) { shake -= 1 }
	deg = randomFloat(-shake/10*4, shake/10*4)
	user_outputE.style.transform       = 'rotate('+deg+'deg)';

	updateParticles(glitters)
	updateParticles(emojis)

	drawParticles(glitters)
	drawParticles(emojis)
}


