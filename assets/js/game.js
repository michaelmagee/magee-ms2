/**
 * @class: Game
 * @classdesc: Represents a Game.   
 * @constructs
 * @param {string} gamename - The Game name.
 * @param {string} type - The level type of the card.
 * @param {string} cardcount - Number of cards in the game.
 * 
 */

class Game {

    constructor(gameName) {
        this.name = gameName;

        this.winCount = 0;
        this.lossCount = 0;

        // These are the "Constants" But I couldn't fin a way to do constants in a class 

        // "Easy Game" - the startup default 
        this.easyType = "Easy";
        this.easyDuration = 60;  // 30 seconds for the Roman Numeral game 
        this.easyCardCount = 12;
        this.easyCards = ["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"];

        // "Hard" game 
        this.hardDuration = 90;  // 90 seconds for the Roman Numeral game 
        this.hardCardCount = 24;
        this.hardCards = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII",
            "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];


        /*         
        this.gameDuration = easyDuration;   // Default game 
        this.cardCount = easyCardCount;
        this.cardValues = easyCards;
        */

        this.timer = null;

        this.addButtonListeners();

        console.log("constructor for Game complete");
    }

    /**
     * @method: addButtonListeners  
     * Placeholder for adding various button listeners at game level 
     */
    addButtonListeners() {
        let button1 = document.getElementById("startButton");
        button1.addEventListener('click', () => {
            this.startButtonClick();
        });

    };


    /*
    just wire the buttons up at the game level for now   DOCUMENT THESE
    */
    startButtonClick() {

        this.board = null;   // not sure if this ends all the previous games to garbage collection 
        // $("#gameboard").innerHTML = "";   // Reset the gameboard html

        document.getElementById("gameboard").innerHTML = "";
        document.getElementById("gameboard").innerText = "";

        let type = "Easy";

        if (type == "Easy") {  // The radio button will be tested.     this.easyDuration
            this.board = this.addBoard(this.easyType, this.easyCardCount, this.easyCards, this.easyDuration);
        } else {
            this.board = this.addBoard(this.hardType, this.hardCardCount, this.hardCards, this.hardDuration);
        }

        this.timer.startTimer(this.gameLost, this);
        console.log("Game started");
    }


    gameWon() {
        this.winCount++;
        $("#win-count span").text(`${this.winCount}`);
        console.log("  Won that one!  ");
    }

    gameLost() {
        // This is fired under the "this" of the timer, so is somethat useless  
        // $("#loss-count span").text(`${this.lossCount}`);
        console.log("  Lost that one!  ");
    }

    //  NOTE: need to figure out how to destroy stuff before creating new board
    /**
 * @method: addBoard  
 * @returns {Board}  Created board
 * Creates a boards with cards and click listeners 
 */
    addBoard(gameType, cardCount, cardValues, gameDuration) {
        // Create the Board 
        let newBoard = new Board(this, gameType, cardCount);
        let shuffledCards = this.shuffle(cardValues);
        newBoard.addCards(shuffledCards);

        newBoard.addAllListeners();
        this.timer = new Timer(gameDuration);
        this.timer.resetTimer();
        this.timer.setHTML();

        return newBoard;
    }


    shuffle(array) {

        let m = array.length, t, i;

        console.log("Before Shuffle:" + array);

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        console.log("After Shuffle:" + array);
        return array;
    }

}