var themes = [
	{
		name: "modern_dark",
		fr: "Sombre moderne",
		vars: {
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
		}
	},
	{
		name: "saturated_light",
		fr: "Saturé lumineux",
		vars: {
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
		}
	},
	{
		name: "classic",
		fr: "Classique",
		vars: {
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
		}
	},
]

function loadTheme() {
	let rootE = document.querySelector(':root');
	let i = themes.findIndex(item => item.name == selected_theme);
	for (let variable in themes[i].vars) {
		rootE.style.setProperty(variable, themes[i].vars[variable]);
	}
}


var responses_options = [
	{name: "one_chance", fr: "Une seule chance"},
	{name: "repeat_question", fr: "Répéter la question"},
]

var tenses_options = [
	{name: "all", fr: "Tous"},
	{name: "infinitive", fr: "Infinitif"},
	{name: "past_simple", fr: "Passé simple"},
	{name: "past_participle", fr: "Participe passé"},
]



