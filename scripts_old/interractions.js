
function nextQuestion() {
	playASound(click_sounds, general_volume)
	showCurrentQuestion()
}

function startPlaying() {
	playASound(click_sounds, general_volume)
	startMatch()
}

function switchVariableWithList(element, variable_name, switch_to_next=true, play_sound=true) {
	if (play_sound) {playASound(click_sounds)}

	// get the option index
	var list = this["list_"+variable_name]
	var i = list.findIndex(item => item.name == this[variable_name]);
	// switch to the next option index
	if (switch_to_next) {i = (i+1)%list.length}

	// set variable and button to the values of the option
	element.value = list[i].fr
	this[variable_name] = list[i].name
	saveToLocalStorage(variable_name)
}


var selected_theme_name = "classic"
var themes = [
	{
		name: "modern_dark",
		fr: "Sombre moderne",

		"--main-bg-color": "#111122",
		"--main-text-color": "#fff",
		"--main-outline-color": "#1b2547",

		"--small-bg-color": "#45618f",
		"--input-shadow-color": "#bbb",
		"--input-text-color": "#252947",

		"--slider-color1": "#45618f",
		"--slider-color2": "#78b39a",

		"--button-bg-color": "#44aa55",
		"--button-text-color": "#fff",
		"--button-shadow-color": "#0e5738",

		"--button-hover-bg-color": "#7d8",
		"--button-active-bg-color": "#fff",
		"--button-disabled-bg-color": "transparent",
		"--button-disabled-shadow-color": "#06050d",

		"--button-on-shadow-color": "#063640",
	},
	{
		name: "saturated_light",
		fr: "Saturé lumineux",

		"--main-bg-color": "#fff",
		"--main-text-color": "#00b86b",
		"--main-outline-color": "#c3ebea",

		"--small-bg-color": "#c3ebea",
		"--input-shadow-color": "#c3ebea",
		"--input-text-color": "#00b86b",

		"--slider-color1": "#317ff5",
		"--slider-color2": "#abf5ff",

		"--button-bg-color": "#2bbfff",
		"--button-text-color": "#fff",
		"--button-shadow-color": "#0c66ed",

		"--button-hover-bg-color": "#42e9ff",
		"--button-active-bg-color": "#e0feff",
		"--button-disabled-bg-color": "transparent",
		"--button-disabled-shadow-color": "#c3ebea",

		"--button-on-shadow-color": "#42e9ff",
	},
	{
		name: "classic",
		fr: "Classique",

		"--main-bg-color": "#381e0f",
		"--main-text-color": "#fff",
		"--main-outline-color": "#a66b28",

		"--small-bg-color": "#a66b28",
		"--input-shadow-color": "#99b346",
		"--input-text-color": "#f33",

		"--slider-color1": "#a66b28",
		"--slider-color2": "#c6d160",

		"--button-bg-color": "#99b346",
		"--button-text-color": "#fff",
		"--button-shadow-color": "#4E8531",

		"--button-hover-bg-color": "#c6d160",
		"--button-active-bg-color": "#fcffcc",
		"--button-disabled-bg-color": "transparent",
		"--button-disabled-shadow-color": "#210e07",

		"--button-on-shadow-color": "#0c2b14",
	},
]


var the_root = document.querySelector(':root');
function switchTheme(element, theme_name=null, play_sound=true) {
	if (play_sound) {playASound(click_sounds)}

	// get the option index
	var i = null
	// set theme
	if (theme_name!=null) {
		i = themes.findIndex(item => item.name == theme_name);
	// switch to next theme
	} else {
		i = themes.findIndex(item => item.name == selected_theme_name);
		i = (i+1)%themes.length
	}

	// set variable and button to the values of the option
	element.value = themes[i].fr
	selected_theme_name = themes[i].name
	saveToLocalStorage("selected_theme_name")

	// set css variables
	for (var variable in themes[i]) {
		if (variable != "name" && variable != "fr") {
			the_root.style.setProperty(variable, themes[i][variable]);
		}
	}
}

































entries_localStorage = [
	{name: "general_volume", type: "number"},
	{name: "selected_theme_name", type: "string"},
	// match
	{name: "match_mode", type: "string"},
	{name: "questions_policy", type: "string"},
	{name: "words_filter", type: "string"},
	{name: "verbs_filter", type: "string"},
	{name: "banks_selected", type: "json"},
]

function loadFromLocalStorage(entries) {
	for (var i = 0; i < entries.length; i++) {
		if (localStorage.getItem(entries[i].name) != null) {
			// load based on the type
			var item = localStorage.getItem(entries[i].name)
			if (entries[i].type == "number") {
				item = Number(item)
			} else if (entries[i].type == "json") {
				item = JSON.parse(item)
			}
			this[entries[i].name] = item
		}
	}
}

function saveToLocalStorage(entry_name) {
	var i = entries_localStorage.findIndex(entry => entry.name == entry_name);
	if (i >= 0) {
		// save based on the type
		var value_to_save = null
		if (entries_localStorage[i].type == "string") {
			value_to_save = this[entry_name]
		} else {
			value_to_save = JSON.stringify(this[entry_name])
		}
		localStorage.setItem(entry_name, value_to_save);
	} else {
		console.error("saveToLocalStorage(\""+entry_name+"\"), entry_name not found")
	}
}

function initWithLocalStorage() {

	general_volumeE.value = general_volume*100+1

	switchTheme(document.getElementById("switch_theme_button"), selected_theme_name, false)

	switchVariableWithList(document.getElementById("words_filter_button"), "words_filter", false, false)
	switchVariableWithList(document.getElementById("verbs_filter_button"), "verbs_filter", false, false)
	switchVariableWithList(document.getElementById("match_mode_button"), "match_mode", false, false)
	switchVariableWithList(document.getElementById("questions_policy_button"), "questions_policy", false, false)

	displayBanks(word_banks);
}







































function toggleBank(element, bank_name) {
	playASound(click_sounds);
	if (element.style.boxShadow == "") {
		element.style.boxShadow = "inset 0 0 32px var(--button-on-shadow-color)";
		banks_selected.push(bank_name)
		console.log(bank_name)
	} else {
		element.style.boxShadow = "";
		banks_selected = banks_selected.filter(pack => pack != bank_name);
	}
	saveToLocalStorage("banks_selected")
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
					innerHTML += '<input type="button" value="'+banks[e].name+'" onclick="toggleBank(this, \''+banks[e].name+'\')" style="min-height: 64px; box-shadow: inset 0 0 32px var(--button-on-shadow-color);">'
				// else, everything is unselected
				} else {
					innerHTML += '<input type="button" value="'+banks[e].name+'" onclick="toggleBank(this, \''+banks[e].name+'\')" style="min-height: 64px;">'
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










