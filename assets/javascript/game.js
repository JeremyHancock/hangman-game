// Defines all variables
var dictionary = [
    "GANDALF",
    "SAURON",
    "RIVENDELL",
    "HOBBITON",
    "SMEAGOL",
    "GOLLUM",
    "MORDOR",
    "LEGOLAS",
    "GIMLI",
    "SAMWISE",
    "MERIADOC",
    "PEREGRIN",
    "ENTMOOT",
    "UNDERHILL",
    "BOMBADIL",
    "LOTHLORIEN",
    "FRODO",
    "ARAGORN",
    "GALADRIEL",
    "BOROMIR",
    "FARAMIR",
    "EOWYN",
    "ISILDUR",
    "DENETHOR",
    "MITHRANDIR",
    "TREEBEARD",
    "NAZGUL",
    "THEODEN",
    "WORMTONGUE",
    "ATHELAS",
    "BUTTERBUR",
    "SHARKEY",
    "ELROND"
];
var dictionaryImages = [
    "assets/images/gandalf.png",
    "assets/images/Sauron.jpg",
    "assets/images/rivendell.jpg",
    "assets/images/hobbiton.jpg",
    "assets/images/smeagol.jpg",
    "assets/images/gollum.jpg",
    "assets/images/mordor.jpg",
    "assets/images/legolas.jpg",
    "assets/images/gimli.jpg",
    "assets/images/samwise.jpg",
    "assets/images/merry.jpg",
    "assets/images/pippin.jpg",
    "assets/images/entmoot.jpg",
    "assets/images/underhill.jpg",
    "assets/images/bombadil.jpg",
    "assets/images/lothlorien.jpg",
    "assets/images/frodo.jpg",
    "assets/images/aragorn.png",
    "assets/images/galadriel.jpg",
    "assets/images/boromir.jpg",
    "assets/images/faramir.jpg",
    "assets/images/eowyn.jpg",
    "assets/images/isildur.png",
    "assets/images/denethor.jpg",
    "assets/images/mithrandir.jpg",
    "assets/images/treebeard.jpg",
    "assets/images/nazgul.jpg",
    "assets/images/thoden.jpg",
    "assets/images/wormtongue.jpg",
    "assets/images/athelas.jpg",
    "assets/images/butterbur.jpg",
    "assets/images/sharkey.jpg",
    "assets/images/elrond.jpg"
]
var string;
var positions = [];
var currentWord;
var currentImage;
var currentGuess;
var guessedLetters = [];
var hiddenWord = [];
var guessesLeft = document.getElementById("numGuessesLeft");
var victory = false;

//This function is run any time the space bar is pressed and when the page first loads
function startGame() {
    //It calls IDs from the HTML, hiding pictures that will be shown for victory and defeat, and showing the header image
    document.getElementById("header-image").style.display = "block";
    document.getElementById("victory-image").style.display = "none";
    document.getElementById("defeat-image").style.display = "none";
    document.getElementById("victoryCry").style.display = "none";
    document.getElementById("defeatCry").style.display = "none";
    //It also empties arrays and resets guesses left for start of the new game
    victory = false;
    var guessedLettersArray = document.getElementById("guessLetters");
    guessesLeft.innerHTML = 10;
    guessedLettersArray.innerHTML = [];
    guessedLetters = [];
    hiddenWord = [];
    positions = [];
    currentImage;
    //Here, it selects a word randomly from the available words in dictionary and sets the currentWord
    currentWord = Math.floor(Math.random() * (dictionary.length));
    currentImage = (dictionaryImages[currentWord]);
    currentWord = (dictionary[currentWord]);
    //this puts an underscore in hiddenWord in place of each character from currentWord
    for (var i = 0; i < currentWord.length; i++) {
        hiddenWord.push(" _ ");

    }

    //puts the underscores from hiddenWord in the user-visible, guessThisWord
    var hiddenWordMarks = document.getElementById("guessThisWord");
    hiddenWordMarks.innerHTML = hiddenWord.join("");
};
//converts currentGuess from the key code to a string, which is always a single letter
function convert() {
    currentGuess = String.fromCharCode(currentGuess);
};
//Checks to see if the hiddenword still contains _ If it doesn't, it displays the victory image and text and hides the header image. It also adds one to the #winsTotal.
function checkForVictory() {
    if (hiddenWord.indexOf(" _ ") === -1) {
        document.getElementById("victory-image").src = currentImage;
        document.getElementById("victory-image").style.display = "block";
        document.getElementById("header-image").style.display = "none";
        document.getElementById("victoryCry").style.display = "block";
        var wins = document.getElementById("winsTotal");
        victory = true;
        wins.innerHTML++;
    }
};
//When called, this hides the header-image and displays the defeat-image and text.
function defeat() {
    document.getElementById("defeat-image").style.display = "block";
    document.getElementById("defeatCry").style.display = "block";
    document.getElementById("header-image").style.display = "none";
};
//Most of the magic is happening here.
function evaluateGuess() {
    //it compares the single character in currentGuess to each character of the currentWord
    if (currentWord.indexOf(currentGuess) > -1) {
        for (var i = 0; i < currentWord.length; i++) {
            //if any character of currentWord matches currentGuess it moves that index number to positions
            if (currentWord[i] === currentGuess) {
                positions.push(i);
                //this places currentGuess in the index number of hiddenWord indentified by the index numbers in positions (I think. OR something like that that makes it work.)
                for (var j = 0; j < positions.length; j++) {
                    hiddenWord[positions[j]] = currentGuess;
                    positions = [];
                }
            }
        }
    }
    //if currentGuess doesn't match any character in currentWord currentGuess is pushed to the guessedLetters variable and guessesLeft is reduced by one
    else {
        guessedLetters.push(currentGuess)
        guessesLeft.innerHTML--;
    }
    //if guessesLeft equals zero it runs the defeat function
    if (guessesLeft.innerHTML <= 0) {
        defeat();
    }

//the player visible elements are updated here and the checkForVictory function is run.
var guessedLettersArray = document.getElementById("guessLetters");
guessedLettersArray.innerHTML = guessedLetters
var fillInSpaces = document.getElementById("guessThisWord");
fillInSpaces.innerHTML = hiddenWord.join("");
checkForVictory();

};
//This function is the first thing run when the page loads up
startGame();
//This event is triggered when a letter is keyed. It assigns that key code to currentGuess and runs the convert and evaluateGuess functions with currentGuess
document.onkeyup = function (event) {

    if (victory == false && guessesLeft.innerHTML > 0 && event.keyCode >= 65 && event.keyCode <= 90) {
        (currentGuess = event.keyCode);
        convert(currentGuess);
        evaluateGuess(currentGuess);
    }
    //This separates the space bar with its own event, running the startGame function.
    else if (event.keyCode === 32) {
        startGame();
    }
};
