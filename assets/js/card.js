/**
 * Represents a card.
 * @constructor
 * @param {Board} board - The Board object that "owns" the cards.
 * @param {string} type - The level type of the card.
 * @param {string} htmlID - The the HTML id of the card.
 * @param {string} cardvalue - The value of the card.
 */

class Card {

    constructor(board, type, htmlId, cardvalue) {
        this.board = board;
        this.type = type;
        this.htmlId = htmlId;
        this.htmlElement;
        this.cardValue = cardvalue;
        this.innerHtml = `<div id = ${this.htmlId} class="card-inline-grid">
        <div class="card-front card"> <div class="card-value">
         <h2 class="card-value-text">${this.cardValue}</h2></div></div>
        <div class="card-back card"><h2 class="card-back-text">?</h2> </div></div>`;

        console.log("Constructor for Card completed: " + htmlId);
    }

    /**
 * Represents a card.
 * @returns {string} HTML - The  HTML id of the card.
 */

    getHTML() {
        return this.innerHtml;
    }


    /**
     * Card test method for developent.
     */
    hello() {
        console.log(`Hello from card ${this.htmlId}, and I'm ${this.type}  with a value of ${this.cardValue} !`);

    }
}