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

    constructor(gameName, gameLevelType, cardCount, cardValues, gameDuration) {
        this.name = gameName;
        this.type = gameLevelType;
        this.cardCount = cardCount;
        this.cardValues = cardValues;
        this.gameDuration = gameDuration;
        this.timer= new Timer(gameDuration);
        this.board = this.addBoard(this, gameLevelType, cardCount);
        this.winCount = 0;
        this.loseCount = 0; 
        console.log("constructor for Game complete");
    }

    /**
     * @method: addButtonListeners  
     * Placeholder for adding various button listeners at game level 
     */
    addButtonListeners() {
        let button1 = document.getElementById("button1");
        button1.addEventListener('click', () => {
            this.button1Click();
        });
        let button2 = document.getElementById("button2");
        button2.addEventListener('click', () => {
            this.button2Click();
        });
        let button3 = document.getElementById("button3");
        button3.addEventListener('click', () => {
            this.button3Click();
        });
        let button4 = document.getElementById("button4");
        button4.addEventListener('click', () => {
            this.button4Click();
        });
    };


    /*
    just wire the buttons up at the game level for now   DOCUMENT THESE
    */
    button1Click() {
        console.log("Button1 Clicked");
    }
    button2Click() {
        console.log("Button2 Clicked");
    }
    button3Click() {
        this.timer.stopTimer(); 
        console.log("Button3 Clicked");
    }
    button4Click() {
        this.timer.resetTimer();        
        this.timer.setHTML();

        this.timer.startTimer(this.gameLost);
        console.log("Timer started");
    }

    gameWon() {
        this.winCount++;
        console.log("  Won that one!  ");
    }

    gameLost() {
        this.loseCount++; 
        console.log("  Lost that one!  ");
    }

    //  NOTE: need to figure out how to destroy stuff before creating new board
    /**
 * @method: addBoard  
 * @returns {Board}  Created board
 * Creates a boards with cards and click listeners 
 */
    addBoard() {
        // Create the Board 
        let newBoard = new Board(this, this.type, this.cardCount);
        let shuffledCards = this.shuffle(this.cardValues);
        newBoard.addCards(shuffledCards);

        newBoard.addAllListeners();
        this.timer.resetTimer();        
        this.timer.setHTML();

        this.timer.startTimer(this.gameLost);
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