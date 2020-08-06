/**
 * Represents a card.
 * @constructor
 * @param {Board} board - The Board object that "owns" the cards.
 * @param {string} type - The level type of the card.
 * @param {string} htmlID - The the HTML id of the card.
 * @param {string} cardvalue - The value of the card.
 * 
 * TODO: add getters and setters 
 */

class Card {

    constructor(board, type, htmlId, cardvalue) {
        this.board = board;
        this.type = type;
        this.htmlId = htmlId;
        this.valueID = `${htmlId}-value`;
        this.htmlElement;
        this.cardValue = cardvalue;
        this.innerHtml = `
        <div id=${this.htmlId} class="flip-card">
            <div class="flip-card-container">
                <div class="flip-card-back">
                    <h2 id=${this.valueID} class="flip-card-back-text">${this.cardValue}</h2> 
                </div>
                <div class="flip-card-front">
                    <h2 class="flip-card-front-text">?</h2> 
                </div>
            </div>
        </div>`;
    }

    /**
     * @method: getHTML
     * @returns {HTML}  html that represents this card on the board
     * Adds a card  
     */
    getHTML() {
        return this.innerHtml;
    }

}