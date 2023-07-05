
function drawCircle(x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI, false);
	ctx.fill();
	// ctx.stroke();
}

// returns random integer
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// returns random float
function randomFloat(min, max) {
	return Math.random() * (max - min) + min
}

// generate array with 3 color values
function generateRGBArray() {
	var color = [randomInt(0,256), randomInt(0,256), randomInt(0,256)]
	return color
}

// convert an rgb array to a color string for the canvas context
function convertArrayRGB(ar, a=1) {
	return "rgba("+ar[0]+", "+ar[1]+", "+ar[2]+", "+a+")";
}

function randomProperty(obj) {
	var keys = Object.keys(obj);
	return obj[keys[ keys.length * Math.random() << 0]];
}

function randomPropertyName(obj) {
	var keys = Object.keys(obj);
	return keys[ keys.length * Math.random() << 0];
}

function randomItem(tab) {
	return tab[Math.floor(Math.random()*tab.length)];
}

function randomChar(str) {
	return str.charAt(Math.floor(Math.random()*str.length))
}

function playASound(sounds, volume=1, pitch=1) {
	var cloned_sound = null
	if (Array.isArray(sounds)) {cloned_sound = randomItem(sounds).cloneNode()} else {cloned_sound = sounds.cloneNode()}
	if (pitch!=1) {
		cloned_sound.mozPreservesPitch = false;
		cloned_sound.preservesPitch = false;
		cloned_sound.playbackRate = pitch;
	}
	cloned_sound.volume = volume;
	cloned_sound.play();
}

function lerp(x, y, a) {
	return x * (1 - a) + y * a;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}


