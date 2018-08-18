var dictionary = ["GANDALF", "SAURON", "RIVENDELL", "HOBBITON", "SMEAGOL", "GOLLUM", "MORDOR", "LEGOLAS", "GIMLI", "SAMWISE", "MERIADOC", "PEREGRIN", "ENTMOOT", "UNDERHILL", "BOMBADIL", "LOTHLORIEN", "FRODO", "ARAGORN", "GALADRIEL", "BOROMIR", "FARAMIR", "EOWYN", "ISILDUR", "DENETHOR", "MITHRANDIR", "TREEBEARD", "NAZGUL", "THEODEN", "WORMTONGUE", "ATHELAS", "BUTTERBUR", "SHARKEY", "ELROND"];
var string;
var positions = [];
var currentWord;
var currentGuess;
var guessedLetters = [];
var hiddenWord = [];

function startGame() {
    document.getElementById("header-image").style.display = "block";
    document.getElementById("victory-image").style.display = "none";
    document.getElementById("defeat-image").style.display = "none";
    document.getElementById("victoryCry").style.display = "none";
    document.getElementById("defeatCry").style.display = "none";
    var guessesLeft = document.getElementById("numGuessesLeft");
    var guessedLettersArray = document.getElementById("guessLetters");
    guessesLeft.innerHTML = 10;
    guessedLettersArray.innerHTML = [];
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

function checkForVictory() {
    if(hiddenWord.indexOf(" _ ") === -1) {
        document.getElementById("victory-image").style.display = "block";
        document.getElementById("header-image").style.display = "none";
        document.getElementById("victoryCry").style.display = "block";
        var wins = document.getElementById("winsTotal");
        wins.innerHTML++;
        
    }
};

function defeat() {
    console.log("defeat");
    document.getElementById("defeat-image").style.display = "block";
    document.getElementById("defeatCry").style.display = "block";
    document.getElementById("header-image").style.display = "none";

};

function evaluateGuess() {
    if (currentWord.indexOf(currentGuess) > -1) {
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === currentGuess) {
                positions.push(i);
                for (var j = 0; j < positions.length; j++) {
                    hiddenWord[positions[j]] = currentGuess;
                    positions = [];
                }
            }
        }
    }

    else {
        (guessedLetters.push(currentGuess))
        var guessesLeft = document.getElementById("numGuessesLeft");
        guessesLeft.innerHTML--;
        if (guessesLeft.innerHTML == 0){
            defeat();
        }    
    }
    var guessedLettersArray = document.getElementById("guessLetters");
    guessedLettersArray.innerHTML = guessedLetters
    var fillInSpaces = document.getElementById("guessThisWord");
    fillInSpaces.innerHTML = hiddenWord;
    checkForVictory();
    
};

startGame();

document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        (currentGuess = event.keyCode);
        convert(currentGuess);
        evaluateGuess(currentGuess);
        }
    else if (event.keyCode === 32) {
        startGame();
    }
};