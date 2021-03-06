/**
 * @class: Game
 * @classdesc: Represents a Game.   
 * @constructs
 * @param {string} gamename - The Game name.
 * @param {string} type - The level type of the card.
 * @param {string} cardcount - Number of cards in the game.
 * 
 * TODO: add getters and setters 
 */

class Game {

    constructor(gameName) {
        this.name = gameName;   // Not used yet, thinking of multiple games.  Just an ID

        this.gameType = "Easy"; // Default game type

        this.gameDuration = 0;  // Active game parameters for adding a board 
        this.gameCardCount = 0;
        this.gameCards = [];
        this.gameHints = 0;     // max hints for that game

        this.winCount = 0;
        this.lossCount = 0;

        // These are the "Constants" But I couldn't find a way to do constants in a class 

        // "Easy Game" - the startup default 
        this.easyType = "Easy";
        this.easyDuration = 60;  // 60 seconds for the easy game 
        this.easyCardCount = 12;
        this.easyCards = ["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"];
        this.easyHints = 3;

        // "Hard" game 
        this.hardType = "Hard";
        this.hardDuration = 90;  // 90 seconds for the Roman Numeral game 
        this.hardCardCount = 24;
        this.hardCards = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII",
            "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
        this.hardHints = 6;

        this.timer = null;

        // Set up a default game - will be redone, but it's a visual 
        this.board = this.addBoard();
        this.boardReady = true;

        this.addButtonListeners();
    }

    /**
     * @method: addButtonListeners  
     * Add various button listeners at game level 
     */
    addButtonListeners() {
        let button1 = document.getElementById("startButton");
        button1.addEventListener('click', () => {
            this.startButtonClick();
        });

        this.disable("#hintButton");  // disabled unless a card is in play. 


        /* keep gamelevel updated. 
        If user selects a new game type ( a Change ) via radio button, the gameboard is regenerated
        to provide a visual of the game surface */
        var radios = document.querySelectorAll('input[type=radio][name="gamelevel"]');
        radios.forEach(radio => radio.addEventListener('change', () => {
            this.gameType = radio.value;
            this.boardReady = false;
            this.board = this.addBoard();
            $("#startButton").html("Start");
        }));
    };

    /**
        * @method: startButtonClick  
        * Regenerates the board if required.
        * disables buttons that if clicked would be bad. 
        * Starts the game timer 
        */
    startButtonClick() {

        if (!this.boardReady) {
            this.board = this.addBoard();
        }

        this.disable("#startButton");
        this.disable("#easyRadio");
        this.disable("#hardRadio");
        this.disable("#hintButton");

        this.timer.startTimer(this.gameLost, this);
        this.board.gamestarted = true;
    }

    /**
    * @method: disable  
    * @param {elementID} element - an element (button of some type) to disable.
    * Wrapper to reduce some enable/disable of buttons.
    * lIt also adds opacity to the element for a clearer visial indication of state
    */
    disable(element) {
        $(element).attr("disabled", true);
        $(element).addClass("opaque");
    }

    /**
    * @method: enable  
    * @param {elementID} element - an element (button of some type) to enable.
    * It also removes opacity from the element for a clearer visial indication of state
    */
    enable(element) {
        $(element).attr("disabled", false);
        $(element).removeClass("opaque");
    }

    /**
        * @method: gameWon  
        * Called from within board to indicate that the user has won  
        * re-enables all of the buttons to allow a restart or game change. 
        */
    gameWon() {

        this.boardReady = false;                        // will render a new board
        this.winCount++;
        $("#win-count span").text(`${this.winCount}`);

        this.wiggleScore("#win-count", "wiggle2s", 2100);  // Wiggle 2 seconds

        setTimeout(() => {                  // 
            this.enable("#startButton");
            this.enable("#easyRadio");
            this.enable("#hardRadio");
            this.disable("#hintButton");
            $("#startButton").html("Restart");              // will allow a restart of same gamelevel
        }, 2100);

    }

    /**
        * @method: gameLost  
        * Called from within timer to indicate loss due to time completion  
        * re-enables all of the buttons to allow a restart or game change.
        * I could not get around the fact the the callback from the timer had it's 
        * own "this", so I was very limited on what could be done here.  
        * A hack is done within timer to do some of this stuff.  I's noted there 
        */

    gameLost() {
        // This is fired under the "this" of the timer, so is somethat useless  
        // $("#loss-count span").text(`${this.lossCount}`);
        $("#startButton").attr("disabled", false);
        $("#startButton").removeClass("opaque");

        $("#easyRadio").attr("disabled", false);
        $("#easyRadio").removeClass("opaque");

        $("#hardRadio").attr("disabled", false);
        $("#hardRadio").removeClass("opaque");

        $("#hintButton").attr("disabled", true);
        $("#hintButton").addClass("opaque");

        $("#startButton").html("Restart");
    }


    /**
* @method: wiggleCard
* 
* @param {Score ID}  - The score that needs to be wiggled.   
* @param {duration} ms of wiggle.
* Wiggle score area
*/
    wiggleScore(score, style, duration) {

        $(`${score}`).addClass(style);
        setTimeout(() => {
            $(`${score}`).removeClass(style);

        }, duration);
    }
    //  NOTE: need to figure out how to destroy stuff before creating new board
    /**
     * @method: addBoard  
     * @returns {Board}  Created board
     * set's existing board to null ( Good for garbage collection? ) 
     * Reset's the gameboard html
     * Instantiates a new board based on gaetype (now just easy/hard) 
     * Shuffles the cards and adds them to the board
     * Sets up listeners and timers
     */
    addBoard() {
        // Reset and create the Board 

        this.board = null;   // not sure if this sends all the previous games to garbage collection 

        document.getElementById("gameboard").innerHTML = "";
        document.getElementById("gameboard").innerText = "";

        if (this.gameType == "Easy") {

            this.gameDuration = this.easyDuration;
            this.gameCardCount = this.easyCardCount;
            this.gameCards = this.easyCards;
            this.gameHints = this.easyHints;
        } else {
            this.gameType == "Hard";
            this.gameDuration = this.hardDuration;
            this.gameCardCount = this.hardCardCount;
            this.gameCards = this.hardCards;
            this.gameHints = this.hardHints;
        }

        let newBoard = new Board(this, this.gameType, this.gameCardCount, this.gameHints);
        let shuffledCards = this.shuffle(this.gameCards);
        newBoard.addCards(shuffledCards);

        newBoard.addAllListeners();
        this.timer = new Timer(this.gameDuration, this);
        this.timer.resetTimer();
        this.timer.setHTML();

        return newBoard;
    }

    /**
        * @method: shuffle  
        * @param {array} array - The card valued in defined order.
        * @returns {array}  The shuffled cards 
        * See https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array   
        * I selected the Fisher-Yates (aka Knuth) Shuffle
        * logs before and after array during development
        */
    shuffle(array) {

        let m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

}