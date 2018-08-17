var dictionary = ["GANDALF", "SAURON", "RIVENDALE", "HOBBITON", "SMEAGOL", "GOLLUM", "MORDOR", "LEGOLAS", "GIMLI", "SAMWISE", "MERIADOC", "PEREGRIN", "ENTMOOT", "UNDERHILL", "BOMBADIL", "LOTHLORIEN", "FRODO", "ARAGORN", "GALADRIEL", "BOROMIR", "FARAMIR", "EOWYN", "ISILDUR", "DENETHOR", "MITHRANDIR", "TREEBEARD", "NAZGUL", "THEODEN", "WORMTONGUE", "ATHELAS", "BUTTERBUR", "SHARKEY", "ELROND"];
var string;
var positions = [];
var currentWord;
var currentGuess;
var guessedLetters = [];
var guessesLeft = 0;
var wins = 0;
var hiddenWord = [];
//var guessedLetters = document.getElementById("guessLetters");
//var wins = document.getElementById("winsTotal");
//var hiddenWord = document.getElementById("guessThisWord");

function startGame() {
    var guessesLeft = document.getElementById("numGuessesLeft");
    guessesLeft.innerHTML = 10;
    guessedLetters = [];
    hiddenWord = [];
    positions = [];
    currentWord = Math.floor(Math.random() * (dictionary.length));
    currentWord = (dictionary[currentWord]);
    for (var i = 0; i < currentWord.length; i++) {
        hiddenWord.push(" _ ");

    }
    var hiddenWordMarks = document.getElementById("guessThisWord");
    hiddenWordMarks.innerHTML = hiddenWord;
};

function convert() {
    currentGuess = String.fromCharCode(currentGuess);
};

function evaluateGuess() {
    if (currentWord.indexOf(currentGuess) > -1) {
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === currentGuess) {
                positions.push(i);
                for (var j = 0; j < positions.length; j++) {
                    hiddenWord[positions[j]] = currentGuess;
                }
            }
        }
    }
    
    else {
            (guessedLetters.push(currentGuess))
            var guessesLeft = document.getElementById("numGuessesLeft");
            guessesLeft.innerHTML--;
        }
    
    var guessedLettersArray = document.getElementById("guessLetters");
    guessedLettersArray.innerHTML = guessedLetters
    var fillInSpaces = document.getElementById("guessThisWord");
    fillInSpaces.innerHTML = hiddenWord;
    if (hiddenWord === currentWord) {
        youwin();
    }
};



startGame();

document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        currentGuess = event.keyCode;
        convert(currentGuess);
        evaluateGuess(currentGuess);
    }

    else if (event.keyCode === 32) {
        startGame();
    }
};
