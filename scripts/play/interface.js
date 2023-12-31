
// change volume
document.addEventListener('click', function(event) {
	if (event.target.id == "general_volume_range") {
		general_volume = (parseInt(event.target.value))/100
		localStorage.setItem("general_volume", JSON.stringify(general_volume));
	}
});


// keyboard event handling
var key = {};
var last_key = jsonCopy(key);
document.addEventListener('keyup', keyUpListener);
document.addEventListener('keydown', keyDownListener);
function keyDownListener(event) { key[event.key] = true }
function keyUpListener(event) { key[event.key] = false }


// mouse event handling
var mouse = {};
var last_mouse = jsonCopy(mouse);
document.addEventListener('mouseup', mouseUpListener);
document.addEventListener('mousedown', mouseDownListener);
function mouseDownListener(event) {
	switch (event.button) {
		case 0: mouse.left = true; break;
		case 1: mouse.middle = true; break;
		case 2: mouse.right = true; break;
	}
}
function mouseUpListener(event) {
	switch (event.button) {
		case 0: mouse.left = false; break;
		case 1: mouse.middle = false; break;
		case 2: mouse.right = false; break;
	}
}


// canvas configuration & update
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function loop() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	ctx.imageSmoothingEnabled = false;
	update();
	last_key = jsonCopy(key)
	last_mouse = jsonCopy(mouse)
	requestAnimationFrame(loop);
}











