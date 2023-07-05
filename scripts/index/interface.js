
// change volume
document.addEventListener('click', function(event) {
	if (event.target.id == "general_volume_range") {
		general_volume = (parseInt(event.target.value))/100
		localStorage.setItem("general_volume", JSON.stringify(general_volume));
	}
});

function startPlaying() {
	window.location.href = 'play.html'
}

function switchOption(element, options, option) {
	playASound(click_sounds)

	// switch to the next index
	let i = window[options].findIndex(item => item.name == window[option]);
	i = (i+1)%window[options].length

	// update js variables
	element.value = window[options][i].fr
	window[option] = window[options][i].name
	localStorage.setItem(option, window[option]);
}

function setOption(element, options, option) {
	// switch to the next index
	let i = window[options].findIndex(item => item.name == window[option]);
	// update js variables
	element.value = window[options][i].fr
	window[option] = window[options][i].name
	localStorage.setItem(option, window[option]);
}

function toggleBank(element, bank) {
	playASound(click_sounds);
	if (element.style.boxShadow == "") {
		element.style.boxShadow = "inset 0 0 32px var(--button-on-shadow-color)";
		banks_selected.push(bank)
	} else {
		element.style.boxShadow = "";
		banks_selected = banks_selected.filter(pack => pack != bank);
	}
	localStorage.setItem("banks_selected", JSON.stringify(banks_selected));
}

function displayBanks(banks) {
	var banks_containerE = document.getElementById("word_banks_panel");
	var innerHTML = "";

	// for each line
	var elements_per_line = 3
	for (var l = 0; l < banks.length; l += elements_per_line) {
		innerHTML += '<div class="line">'

		// for each element of line
		for (var e = l; e < l+elements_per_line; e++) {
			if (banks[e] != null) {
				// if pack already slected last session, show the button as selected
				if (banks_selected.includes(banks[e].name)) {
					innerHTML += '<input type="button" value="'+banks[e].fr+'" onclick="toggleBank(this, \''+banks[e].name+'\')" style="min-height: 64px; box-shadow: inset 0 0 32px var(--button-on-shadow-color);">'
				// else, everything is unselected
				} else {
					innerHTML += '<input type="button" value="'+banks[e].fr+'" onclick="toggleBank(this, \''+banks[e].name+'\')" style="min-height: 64px;">'
				}
			} else {
				innerHTML += '<input type="button" value="" style="min-height: 64px;" disabled>'
			}
		}

		innerHTML += '</div>'
	}

	// add banks buttons
	var index = banks_containerE.innerHTML.indexOf("</span>")+"</span>".length
	banks_containerE.innerHTML = banks_containerE.innerHTML.slice(0, index) + innerHTML + banks_containerE.innerHTML.slice(index);
}






