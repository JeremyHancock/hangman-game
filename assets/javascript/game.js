// Defines all global variables
var dictionary = ["GANDALF", "SAURON", "RIVENDELL", "HOBBITON", "SMEAGOL", "GOLLUM", "MORDOR", "LEGOLAS", "GIMLI", "SAMWISE", "MERIADOC", "PEREGRIN", "ENTMOOT", "UNDERHILL", "BOMBADIL", "LOTHLORIEN", "FRODO", "ARAGORN", "GALADRIEL", "BOROMIR", "FARAMIR", "EOWYN", "ISILDUR", "DENETHOR", "MITHRANDIR", "TREEBEARD", "NAZGUL", "THEODEN", "WORMTONGUE", "ATHELAS", "BUTTERBUR", "SHARKEY", "ELROND"];
var string;
var positions = [];
var currentWord;
var currentGuess;
var guessedLetters = [];
var hiddenWord = [];

//This function is run any time the space bar is pressed and when the page first loads
function startGame() {
    //It calls IDs from the HTML, hiding pictures that will be shown for victory and defeat, and showing the header image
    document.getElementById("header-image").style.display = "block";
    document.getElementById("victory-image").style.display = "none";
    document.getElementById("defeat-image").style.display = "none";
    document.getElementById("victoryCry").style.display = "none";
    document.getElementById("defeatCry").style.display = "none";
    //It also empties arrays and resets guesses left for start of the new game
    var guessesLeft = document.getElementById("numGuessesLeft");
    var guessedLettersArray = document.getElementById("guessLetters");
    guessesLeft.innerHTML = 10;
    guessedLettersArray.innerHTML = [];
    guessedLetters = [];
    hiddenWord = [];
    positions = [];
    //Here, it selects a word randomly from the available words in dictionary and sets the currentWord
    currentWord = Math.floor(Math.random() * (dictionary.length));
    currentWord = (dictionary[currentWord]);
    //this puts an underscore in hiddenWord in place of each character from currentWord
    for (var i = 0; i < currentWord.length; i++) {
        hiddenWord.push(" _ ");

    }
    //puts the underscores from hiddenWord in the user-visible, guessThisWord
    var hiddenWordMarks = document.getElementById("guessThisWord");
    hiddenWordMarks.innerHTML = hiddenWord;
};
    //converts currentGuess from the key code to a string, which is always a single letter
function convert() {
    currentGuess = String.fromCharCode(currentGuess);
};
//Checks to see if the hiddenword still contains _ If it doesn't, it displays the victory image and text and hides the header image. It also adds one to the #winsTotal.
function checkForVictory() {
    if(hiddenWord.indexOf(" _ ") === -1) {
        document.getElementById("victory-image").style.display = "block";
        document.getElementById("header-image").style.display = "none";
        document.getElementById("victoryCry").style.display = "block";
        var wins = document.getElementById("winsTotal");
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
        (guessedLetters.push(currentGuess))
        var guessesLeft = document.getElementById("numGuessesLeft");
        guessesLeft.innerHTML--;
        //if guessesLeft equals zero it runs the defeat function
        if (guessesLeft.innerHTML == 0){
            defeat();
        }    
    }
    //the player visible elements are updated here and the checkForVictory function is run.
    var guessedLettersArray = document.getElementById("guessLetters");
    guessedLettersArray.innerHTML = guessedLetters
    var fillInSpaces = document.getElementById("guessThisWord");
    fillInSpaces.innerHTML = hiddenWord;
    checkForVictory();
    
};
//This function is the first thing run when the page loads up
startGame();
//This event is triggered when a letter is keyed. It assigns that key code to currentGuess and runs the convert and evaluateGuess functions with currentGuess
document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        (currentGuess = event.keyCode);
        convert(currentGuess);
        evaluateGuess(currentGuess);
        }
        //This separates the space bar with its own event, running the startGame function.
    else if (event.keyCode === 32) {
        startGame();
    }
};
