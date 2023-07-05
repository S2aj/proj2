














#### design résumé

L'app permet d'apprendre du vocabulaire anglais, particulièrement les verbes irréguliers. Il y a 3 pages importantes:

Le menu:
- La page principale contenant le titre AnglaisTango et des options
- Avec un tableau où on peut séléctionner des "collections de verbes" à pratiquer. Plusieurs collections peuvent être séléctionnés à la fois. Chaque collection augmente en difficulté avec des verbes plus rares.
- D'autres options incluent, le changement du thème de la page, choisir de pratiquer un temps en particulier (parmis l'infinitif, le passé simple et le participe passé)
- Afficher un message (avec effet de fondu) indiquant que le site contient du son serait apprecié

Le jeu:
- La page contiendra le verbe à traduire et aussi le temps au quel il faudra le retranscrire
- Un bouton "vérifier" permettera de vérifier la réponse
- Si la réponse est juste, un feedback positif est affiché, accompagné d'un ding et de particules colorés
- Si la réponse est fausse, un feedback négatif est affiché, accompagné d'un son et de tremblement de l’écran
- Après ceci, un bouton "passer" permettera de passer à la question suivante

Ecran de fin:
- Le score est affiché à la fin du jeu
- Si le score est mauvais <40%, un son négatif sera joué
- Si le score est élevé >80%, un jingle sera joué
- Si le score est parfait 100%, un jingle sera joué, avec des particules colorés qui tombent du haut de l'écran
- Appuyer sur échap fait revenir sur la page des options




#### technique résumée


















#### structure

Structure contenant des collection de verbes
```js
word_banks = [
   {
      name: "Nom de la collection n°1",
      items: [ // les verbes que la collection contient :
         // la traduction du verbe, l'infinitif, le passé simple et le participe passé
         {fr: "faire", inf: "do", ps: "did", pp: "done"},
         {fr: "manger", inf: "eat", ps: "ate", pp: "eaten "},
         {fr: "boire", inf: "drink", ps: "drank", pp: "drunk"},
         ...
      ]
   },
   ...
]
```



#### interractions.js

Ce fichier s'occupper du l'interraction entre les fichiers de script JS; le style et les éléments de la page; et aussi le localStorage


`entries_localStorage` contient les noms et types des valeur dans LocalStorage

`loadFromLocalStorage(entries)` charge les valeurs du LocalStorage selon leur types (spécifié par entries) dans le global scope

`saveToLocalStorage(entry_name)` sauvegarde la valeur en fonction de son type

`initWithLocalStorage()` initialise les états des boutons en fonction de la session précédente



`displayBanks(banks)` crée un bouton HTML, permettant de selectionner une collection de verbes, afin de l'ajouter aux verbes à pratiquer dans la partie

`toggleBank(element, bank_name)` est la fonction onclick des boutons générés par `displayBanks(banks)`

`switchTheme(element, theme_name=null, play_sound=true)` est la fonction onclick du bouton de changement de thème, au démarrage elle est appelé par `initWithLocalStorage()` modifiant les paramètres par défaut

`selected_theme_name` & `themes` contiennent les themes

`switchVariableWithList(element, variable_name, switch_to_next=true, play_sound=true)`

 

#### match.js

`startPlaying()`

`startMatch()` switches to the game section & sets the score to 0

`quitMatch()` switches to the menu section & removes particles

`generate_match_questions(banks_selected)` generates an array full of questions depending on the banks selected

`showCurrentQuestion()` shows the correct elements and text

`showGameOver()` switches to the correct elements & plays winner or looser sounds

`showCorrection(question)` does a simple correction algorithm and displays it

`verifyAnswer()` handle feedback & transfer question from match_questions to match_answered_questions

`matchUpdate()` handle keys Enter & Escape, shows particles during gameover, updates particles

match_state = "question" or "correction" or "game_over"





#### main.js
loads sounds & selects elements into variables

contains `class FlyingEmoji`
contains `class Glitter`

then initializes `updateParticles(array)` & `drawParticles(array)` that do as they say





#### technique résumée pour la v3

```bash
project
├─ medias
│  ├─ ……….mp3
│  └─ ……….wav
├─ scripts
│  ├─ index.js
│  ├─ particles.js
│  ├─ play.js
│  └─ match.js
├─ style
│  ├─ base.css
│  ├─ utils.css
│  ├─ index.css
│  └─ play.css
├─ index.html
└─ play.html
```


















> [ ] expliquer toutes les variables
> [ ] Au lieu de mélanger la fonction onclick et la fonction désirée. Fait comme le startPlaying & startMatch.
> [ ] Have multiple pages and use localStorage



If any settings is changed in localhost/index, then reinitialise everything. So you'll be unable to go directly to localhost/play since banks_selected will be empty






# flux d'exécution de fonctions

1. `loadFromLocalStorage(entries)` charge les objets du LocalStorage dans le global scope
2. `initWithLocalStorage()` initialise les états des boutons en fonction des valeurs du LocalStorage
3. `start()` qui exécute `update()` en boucle

















# appels de fonctions imbriqués

1. `initWithLocalStorage()` initialise les états des boutons en fonction de la session précédente (utilisant le LocalStorage du navigateur)
2. `loadFromLocalStorage(entries)` c'est elle qui charge les valeurs du LocalStorage selon leur types (spécifié par entries) dans le global scope

`interractions.js/initWithLocalStorage()` appelle `interractions.js/loadFromLocalStorage(entries)` où la 1e initialise les états des boutons en fonction de ce que la 2e charge du LocalStorage







https://openclassrooms.com/fr/courses/6398056-ecrivez-la-documentation-technique-de-votre-projet













#### log

les elements "section" sont sencés être assez grands et rares je crois je devrais utiliser "div"










