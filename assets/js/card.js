/**
 * Represents a card.
 * @constructor
 * @param {Board} board - The Board object that "owns" the cards.
 * @param {string} type - The level type of the card.
 * @param {string} htmlID - The the HTML id of the card.
 * @param {string} cardvalue - The value of the card.
 * 
 */

class Card {

    constructor(board, type, htmlId, cardvalue) {  // OK NOT to use settors for contructor params 
        this._board = board;
        this._type = type;
        this._htmlId = htmlId;
        this._valueID = "";        // use get/set because it's modified 
        this._htmlElement;
        this._cardValue = cardvalue;
        this._flipped = false;
        this._matched = false;
        this._innerHtml = "";  

        this.valueID = `${htmlId}-value`;
        this.innerHtml = `<div id=${htmlId} class="flip-card"><div class="flip-card-container"><div class="flip-card-back"><h2 id=${this.valueID} class="flip-card-back-text">${cardvalue}</h2> </div><div class="flip-card-front"><h2 class="flip-card-front-text">?</h2></div></div></div>`;
    }
 
    /**
 * @method: get innerHtml
 * @returns {HTML}  html that represents this card on the board
 */
    get innerHtml() {
        return this._innerHtml;
    }

    /**
* @method: set innerHtml
* @param {HTML}  html that represents this card on the board
* Set's the innerHtml value 
* Note: _ approach courtesy of https://coryrylan.com/blog/javascript-es6-class-syntax
            card.flipped = true;
            card.matched = false;
*/
    set innerHtml(newHtml) {
        this._innerHtml = newHtml;
    }


    /**
    * @method: get flipped
    * @returns {boolean}  indicates that card is flipped 
    */
    get flipped() {
        return this._flipped;
    }
    /**
    * @method: set flipped
    * @param {boolean}  true if card is flipped 
    */
    set flipped(bool) {
        this._flipped = bool;
    }

    /**
     * @method: get matched
     * @returns {boolean}  indicates that card is flipped 
     */
    get matched() {
        return this._matched;
    }

    /**
    * @method: set matched
    * @param {boolean}  true if card is flipped 
    */
    set matched(bool) {
        this._matched = bool;
    }

        /**
     * @method: get valueID
     * @returns {text}  HTML ID of the Value
     */
    get valueID() {
        return this._valueID;
    }
    /**
    * @method: set valueID
    * @param {text}  Value for the new ID
    */
    set valueID(value) {
        this._valueID = value;
    }

            /**
     * @method: get htmlID
     * @returns {text}  HTML ID of the Value
     */
    get htmlID() {
        return this._htmlId;
    }
    /**
    * @method: set valueID
    * @param {text}  Value for the new ID
    */
    set htmlID(htmlid) {
        this._htmlId = htmlid;
    }

     /**
     * @method: get cardValue
     * @returns {text}  Value of the card
     */
    get cardValue() {
        return this._cardValue;
    }
    /**
    * @method: set cardValue
    * @param {text}  Value for the new ID
    */
    set cardValue(value) {
        // No need for this
        return; 
    }

         /**
     * @method: get cardValue
     * @returns {text}  Value of the card
     */
    get cardHtmlElement() {
        return this._htmlElement;
    }
    /**
    * @method: set cardValue
    * @param {text}  Value for the new ID
    */
    set cardHtmlElement(element) {
        this._htmlElement = element;
        return; 
    }


}