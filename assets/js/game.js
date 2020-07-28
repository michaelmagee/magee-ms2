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

    constructor(gameName, gameLevelType, cardCount) {
        this.name = gameName;
        this.type = gameLevelType;
        this.cardCount = cardCount;
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
        console.log("Button3 Clicked");
    }
    button4Click() {
        console.log("Button4 Clicked");
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

        newBoard.addCards();

        newBoard.addAllListeners();
        return newBoard;
    }


/*   Temporary */
    dumpGame() {
        // Code to format/dump myself to the log.
        console.log(this);
    }
}