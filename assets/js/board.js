/**
 * @class: Board
 * @classdesc: Represents a Board.  Manages cards.
 * @constructs
 * @param {Game} game - The Game object parent.
 * @param {string} type - The level type of the card.
 * @param {string} cardcount - Number of cards in the game.
 * 
 */
class Board {

    constructor(game, type, cardcount) {
        this.game = game;
        this.type = type;
        this.cardCount = cardcount;
        this.cards = [];
        this.cardSetsUnmatched = 0;
        this.card1 = null;      // First card in challenge set 
        this.card2 = null;      // Second card in challenge set 
        this.matchInProcess = false;
        this.boardElement = document.getElementById("gameboard");

    }

    /**
     * @method: cardClick
     * @param {event} event - The card clicked.
     * Processes a card click event
     * for 1st card in set:
     * - flip it and disble listener to commit user to card
     * - set matchInProcess false to allow a second card to be selected
     * - return
     * for 2nd card in set: 
     * - set matchInProcess true to ignore devious clicks
     * - flip it
     */
    handleEvent(event) {

        if (this.matchInProcess) return;    // ignore clicks while card animation occurs

        let theCard = event.currentTarget;
        // If it's the first card clicked, just save it and disable it
        if (this.card1 === null) {
            this.card1 = theCard;
            this.cardFlip(theCard);
            this.card1.removeEventListener("click", this);
            this.matchInProcess == false;
            return;
        }


        // Since it's the second card, see if there's a match 
        // no need to remove the listener because matchInProcess is true.
        this.matchInProcess == true;
        this.card2 = theCard;               // save for now
        this.cardFlip(theCard);
        if (this.isMatch(this.card1, this.card2)) {

            //$("#" + this.card1.id).addClass("opaque-overlay-card");
            //$("#" + this.card2.id).addClass("opaque-overlay-card");
            this.card1.removeEventListener("click", this);
            this.card2.removeEventListener("click", this);
            this.card1 = null;
            this.card2 = null;
            this.matchInProcess == false;
            this.cardSetsUnmatched--;
            console.log("MATCHED");
        } else {
            console.log("NOPE");
            // Unwind  it

            setTimeout(() => {
                this.cardFlip(this.card1);
                this.cardFlip(this.card2);
                this.card1.addEventListener("click", this);
                this.card1 = null;
                this.card2 = null;
                this.matchInProcess == false;
            }, 1000);
        }





        /*
                event.currentTarget.removeEventListener("click", this);
                console.log(event);
                event.currentTarget.addEventListener("click", this);
        */
    }

    /**
     * @method: isMatch
     * @param {card} card1  - First of a potential pair.
     * @param {card} card2  - Second of a potential pair.
     * @returns {boolean}   - true if cards match
     * Processes a card click event
     */
    isMatch(card1, card2) {
        let card1ValueID = "#" + card1.id + "-value"; // document.getElementById(card1.id + "-value"); 
        let card2ValueID = "#" + card2.id + "-value" // document.getElementById(card2.id + "-value");
        let card1value = $(card1ValueID).text();
        let card2value = $(card2ValueID).text();

        let result = $(card1ValueID).text() == $(card2ValueID).text();

        return $(card1ValueID).text() == $(card2ValueID).text();
    }


    /**
     * @method: cardFlip
     * @param {event} event - The Game object parent.
     * Processes a card click event
     */
    cardFlip(clicked) {
        $(`#${clicked.id}`).toggleClass("click");
        $(`#${clicked.id}`).css("transform, rotateY(180deg)");
    }

    /**
 * @method: wiggle
 * 
 * @param {card} card - The card that needs to be wiggled.  Planned for Hints
 * 
 * Wiggle a card as a match hint
 */
    wiggle() {
        /*
        $("#card-easy-1").addClass("wiggle");
        */
    }

    /**
     * @method: getCardByID
     * 
     * @param {card} card - The card that needs to be wiggled.  Planned for Hints
     * @returns {text}  htmlID of card
     * Wiggle a card as a match hint
     */
    getCardByID(htmlId) {
        let foundCard = null;
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].htmlId == htmlId) {
                foundCard = this.cards[i];
                break;
            }
        }
        return foundCard;
    }

    /**
     * @method: addCard
     * 
     * @param {card} card - Creates a card instance
     * @returns {card}  card instance
     * Adds a card  
     */
    addCard(board, type, htmlId, cardValue) {
        let newCard = new Card(board, type, htmlId, cardValue);
        this.cards.push(newCard);
        return newCard;
    }

    /**
 * @method: addCards
 * @param {[shuffledCards]]} card values  - Shuffled array of cards
 * uses defined card count to create all new cards PARAMS TBD 
 */
    addCards(shuffledCards) {
        for (var i = 0; i < this.cardCount; i++) {
            let card = this.addCard(this, this.type, `card-${this.type}-${i}`, shuffledCards[i]);
            this.boardElement.innerHTML += card.getHTML();
            card.htmlElement = document.getElementById(card.htmlId);
        }
        this.cardSetsUnmatched = shuffledCards.length / 2;
    }

    /**
 * @method: addAllListeners
 * 
 * Adds all click listeners to all cards 
 
 */
    addAllListeners() {
        let htmlCards = Array.from(document.getElementsByClassName('flip-card'));

        htmlCards.forEach(card => {
            card.addEventListener('click', this);
        });

    }

};

