

// getting elements
var big_displayE = document.getElementById("big_display");
var small_displayE = document.getElementById("small_display");
var answer_inputE = document.getElementById("answer_input");
var verifyAnswer_buttonE = document.getElementById("verifyAnswer_button");
var correction_outputE = document.getElementById("correction_output");
var nextQuestion_buttonE = document.getElementById("nextQuestion_button");
var general_volume_rangeE = document.getElementById("general_volume_range");


// loading medias
ding_sounds = [
	new Audio('res/dingB6.mp3'),
	new Audio('res/dingB5.mp3'),
	new Audio('res/dingB4.mp3'),
	new Audio('res/dingB3.mp3'),
	new Audio('res/dingB2.mp3'),
	new Audio('res/dingB1.mp3'),
]
click_sounds = [
	new Audio('res/clickB3.mp3'),
	new Audio('res/clickB2.mp3'),
	new Audio('res/clickB1.mp3'),
]
explosion_sounds = [
	new Audio('res/p1.wav'),
	new Audio('res/p2.wav'),
	new Audio('res/p3.wav'),
	new Audio('res/p4.wav'),
]
var dont = new Audio('res/dont.mp3');
var cheers = new Audio('res/cheers1.mp3');
var simple_win = new Audio('res/win1.mp3');
var simple_lost = new Audio('res/lost1.mp3');




loadAllLocalStorage()
loadTheme()


general_volume_rangeE.value = general_volume*100


function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	matchUpdate();

	// screen shake feedback
	if (shake>0) { shake -= 1 }
	let deg = randomFloat(-shake/10*4, shake/10*4)
	user_outputE.style.transform = 'rotate('+deg+'deg)';

	// particles feedback
	updateParticles(glitters)
	updateParticles(emojis)
	drawParticles(glitters)
	drawParticles(emojis)
}










