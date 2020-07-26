/* 
Class: Game
This class will hold all of the functionality that is closely related to the entire Game and it's oeration

*/

class Game {

    constructor(gameName, gameLevelType, cardCount) {
        this.name = gameName;
        this.type = gameLevelType;
        this.cardCount = cardCount;
        console.log("constructor for Game complete");
    }


    //  need to figure out how to destroy stuff before creating new board
    addBoard() {
        // Create the Board 
        let newBoard = new Board(this, this.type, this.cardCount);

        newBoard.addCards();

        newBoard.addAllListeners(); 
        return newBoard;
    }

    dumpGame() {
        // Code to format/dump myself to the log.
        console.log(this);
    }
}