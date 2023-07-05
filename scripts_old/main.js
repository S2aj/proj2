
// var ding = new Audio('res/ding.mp3');
var dont = new Audio('res/dont.mp3');

var cheers = new Audio('res/cheers1.mp3');

var simple_win = new Audio('res/win1.mp3');

var simple_lost = new Audio('res/lost1.mp3');

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

var big_displayE = document.getElementById("big_display");
var small_displayE = document.getElementById("small_display");

var user_inputE = document.getElementById("user_answer_input");
var verifyAnswer_buttonE = document.getElementById("verifyAnswer_button");
var user_outputE = document.getElementById("user_correction_output");
var nextQuestion_buttonE = document.getElementById("nextQuestion_button");




var general_volumeE = document.getElementById("general_volume");
var general_volume = 1

document.addEventListener('keypress', function (e) {
	if (e.keyCode === 13 || e.which === 13) {
		e.preventDefault();
		return false;
	}
});




var menu_section = document.getElementById("menu");
var game_section = document.getElementById("game");





















emojis = []
glitters = []

class FlyingEmoji {
	constructor(x, y) {
		this.x = x
		this.y = y
		var r = randomFloat(-2*Math.PI, 0)
		var s = randomFloat(0,2)
		this.vx = Math.cos(r)*s
		this.vy = Math.sin(r)*s

		// this.hide = randomInt(0, 20)
		// this.size = randomFloat(0.5,1)
		this.rotation = randomFloat(-1, 1)

		this.start_life = 100+randomInt(0, 100)
		this.life = this.start_life
		this.cooldown = randomInt(0, 20)

		this.emoji = randomItem(['🎖️','🏆','🏅','🥇','🎖️','🏆','🏅','🥇','🎆','🎇','✨','🎈','🎉','🎀','🎯'])
	}
	update() {
		
		if (this.cooldown == 0) {
			this.life -= 1
		} else {
			this.cooldown -= 1
		}
		
		// update position
		this.x += this.vx
		this.y += this.vy
	}
	draw() {

		var size_multiply = (1-Math.max(0, this.life-this.start_life+20)/20)*(1-Math.max(0, 20-this.life)/20)
		ctx.font = 40*size_multiply+"px Arial";

		ctx.save();
		ctx.translate(this.x+canvas.width/2, this.y+canvas.height/2);
		ctx.rotate(this.rotation + Math.cos(upc*0.1)*0.1);
		ctx.textAlign = "center";
		ctx.fillText(this.emoji, 0, 0)
		ctx.restore();
	}
}

class Glitter {
	constructor(x, y) {
		this.x = x
		this.y = y
		var r = randomFloat(-2*Math.PI, 0)
		var s = randomFloat(0,15)
		this.vx = Math.cos(r)*s
		this.vy = Math.sin(r)*s
		this.life = 100+randomInt(0, 50)
		this.color = generateRGBArray()
	}
	update() {
		this.life -= 1
		this.vy += 0.1
		// update position
		this.x += this.vx
		this.y += this.vy
	}
	draw() {
		for (var i = 0; i < 3; i++) {
			this.color[i] += randomInt(-10, 10)*4
		}
		ctx.fillStyle = convertArrayRGB(this.color);
		drawCircle(this.x+canvas.width/2, this.y+canvas.height/2, 5);
	}
}

function updateParticles(array) {
	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i].life <= 0) {
			array.splice(i, 1)
		} else {
			array[i].update()
		}
	}
}

function drawParticles(array) {
	for (var i = 0; i < array.length; i++) {
		array[i].draw()
	}
}


var shake = 0





loadFromLocalStorage(entries_localStorage)
initWithLocalStorage();



function update() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.clearRect(0, 0, canvas.width, canvas.height);


	if (game_section.style.display == "flex") {
		matchUpdate()
	}

	general_volume = (parseInt(general_volumeE.value)-1)/100

	saveToLocalStorage("general_volume")
}









































