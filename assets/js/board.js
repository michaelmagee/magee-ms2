/**
 * @class: Board
 * @classdesc: Represents a Board.  Manages cards.
 * @constructs
 * @param {Game} game - The Game object parent.
 * @param {string} type - The level type of the card.
 * @param {string} cardcount - Number of cards in the game.
 * 
 * TODO: add getters and setters
 */
class Board {

    constructor(game, type, cardcount, hintsAllowed) {
        this.game = game;
        this.type = type;
        this.cardCount = cardcount;
        this.cards = [];
        this.cardSetsUnmatched = 0;
        this.card1 = null;          // First card in challenge set 
        this.card2 = null;          // Second card in challenge set 
        this.hintMatchCard = null;      // Hint card - the match of card1 
        this.hintDecoyCard = null;      // Random card for second of hint pair 

        this.matchInProcess = false;
        this.hintInProcess = false;
        this.GameOver = false; 
        this.hintsAvailable = hintsAllowed; // each game has some hints 
        $("#hint-count span").text(`${this.hintsAvailable}`);
        this.boardElement = document.getElementById("gameboard");
        this.gamestarted = false;

    }

    /**
     * @method: handleEvent
     * @param {event} event - The card clicked.
     * Processes a card click event
     * for 1st card in set:
     * - flip it and disble listener to commit user to card
     * - set matchInProcess false to allow a second card to be selected
     * - indicate card is flipped 
     * - return
     * for 2nd card in set: 
     * - set matchInProcess true to ignore devious clicks
     * - flip it
     * - indicate card is flipped 
     * 
     * - Compare the values for a match and if true indicate both are matched & wiggle them.
     * - if not indicate they arr not flipped, flip them back and unlock them
     * 
     */
    handleEvent(event) {

        if (this.matchInProcess || !this.gamestarted || this.GameOver) return;    // ignore clicks while card animation occurs & clock inactive

        if (event.currentTarget.id == "hintButton") {
            this.displayHint();     // User clicked on Hint.  Process it. 
            return;
        }

        let theCard = event.currentTarget;
        // If it's the first card clicked, just save it and disable it  Enable the hint button if valid 
        if (this.card1 === null) {
            this.card1 = theCard;
            this.cardFlip(theCard);
            this.card1.removeEventListener("click", this);
            this.getCardByID(this.card1.id).flipped = true;
            this.matchInProcess = false;

            // enable the hint button if we have some left and there are 2 or more pairs unmatched
            if (this.cardSetsUnmatched > 1 && this.hintsAvailable > 0) {
                $("#hintButton").attr("disabled", false);
            }

            return;
        }


        /* Since it's the second card, see if there's a match 
           no need to remove the listener because matchInProcess is true.
           If a HINT  is in process, this means that we need to unwind the hint 
           and process the click. 
        */ 
        if (this.hintInProcess) {
            this.hintInProcess = false; 
            $(`#${this.hintMatchCard.htmlID}`).removeClass( "wiggle3s");
            $(`#${this.hintDecoyCard.htmlID}`).removeClass("wiggle3s");
        }

        this.matchInProcess = true;
        this.card2 = theCard;               // save for now
        $("#hintButton").attr("disabled", true);  // Hint is off the table 
        this.cardFlip(theCard);
        this.getCardByID(this.card2.id).flipped = true;

        // Process a match 
        if (this.isMatch(this.card1, this.card2)) {
            // consider opaque style here  
            this.card1.removeEventListener("click", this);   // These cards no longer clickable
            this.card2.removeEventListener("click", this);

            this.getCardByID(this.card1.id).matched = true;
            this.getCardByID(this.card2.id).matched = true;

            this.wiggle(this.card1, this.card2, "wiggle1s", 1100);  // Wiggle 1 second
            setTimeout(() => {                  // 
                this.card1 = null;
                this.card2 = null;
                this.matchInProcess = false;
                this.cardSetsUnmatched--;
                if (this.cardSetsUnmatched == 0) {      // Won the GAME!
                    this.game.timer.stopTimer();
                    this.SetGameOver; 
                    this.game.gameWon();
                }
            }, 1300);
        } else {
            // Not a match.  
            // Unwind it by flipping both cards back 
            setTimeout(() => {
                this.cardFlip(this.card1);
                this.cardFlip(this.card2);
                this.getCardByID(this.card1.id).flipped = false;
                this.getCardByID(this.card2.id).flipped = false;
                this.card1.addEventListener("click", this);
                this.card1 = null;
                this.card2 = null;
                this.matchInProcess = false;
            }, 900);
        }

    }

    /**
     * @method: isMatch
     * @param {card} card1  - First of a potential pair.
     * @param {card} card2  - Second of a potential pair.
     * @returns {boolean}   - true if cards match
     * Processes a card click event
     */
    isMatch(card1, card2) {

        let card1ValueID = `#${card1.id}-value`;
        let card2ValueID = `#${card2.id}-value`;

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
 * @param {card} card - The card that needs to be wiggled.  Planned for Hints and emphasis 
 * @param {card} card - The card that needs to be wiggled.  Planned for Hints and emphasis 
 * @param {duration} ms of wiggle.
 * Wiggle a pair of cards.  Can be used for a hint or as a match indication
 */
    wiggle(card1, card2, style, duration) {

        $(`#${card2.id}`).addClass(style);
        $(`#${card1.id}`).addClass(style);
        setTimeout(() => {
            $(`#${card1.id}`).removeClass(style);
            $(`#${card2.id}`).removeClass(style);
        }, duration);
    }


    /**
     * @method: displayHint
     * We have this.card1 flipped
     * We need to obtain the match for it and select an eligble card at random to present with it. 
     * 

     */
    displayHint() {
        this.hintsAvailable--;
        $("#hint-count span").text(`${this.hintsAvailable}`);
        if (this.hintsavailable == 0) {
            $("#hintButton").attr("disabled", true);  // Hint is off the table  
        }

        this.hintInProcess = true;
        let card1Value = this.getCardByID(this.card1.id).cardValue;
        this.hintMatchCard = this.getCardByValue(this.card1.id, card1Value);
        this.hintDecoyCard = this.getDecoyCard(card1Value);

        // Now that we have match and decoy, wiggle them for up to 
        this.wiggle(this.hintMatchCard.cardHtmlElement, this.hintDecoyCard.cardHtmlElement, "wiggle3s", 3100);  // Wiggle 3 seconds

        setTimeout(() => {
            // if  a card has been selected then don't unwind anything
            if (this.hintInProcess == false) {
                this.hintMatchCard = null;
                this.hintDecoyCard = null;
                this.hintMatchCard = false;
                this.hintDecoyCard = false;
            }
        }, 2900);

    }

    /**
     * @method: getDecoyCard
     * 
     * @param {card} card - The card that needs to be wiggled.  Planned for Hints
     * @returns {text}  htmlID of card
     * Wiggle a card as a match hint
     */
    getDecoyCard(flippedCardValue) {
        // First filter the array to remove non candidate cards
        let eligbleCards = this.cards.filter(card => {
            if (card.matched || card.cardValue == flippedCardValue) {
                return false;
            } else return true;
        })
        return this.randomCard(eligbleCards);
    }



    /**
     * @method: getCardByValue
     * 
     * @param {card} card - The card that needs to be wiggled.  Planned for Hints
     * @returns {text}  htmlID of card
     * Wiggle a card as a match hint  //(!this.cards[i].htmlID == flippedCardID) &&
     */
    getCardByValue(flippedCardID, flippedCardValue) {
        let foundCard = null;
        for (var i = 0; i < this.cards.length; i++) {
            if ((this.cards[i].cardValue == flippedCardValue) && (this.cards[i].htmlID != flippedCardID)) {
                foundCard = this.cards[i];
                break;
            }
        }
        return foundCard;
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
            if (this.cards[i].htmlID == htmlId) {
                foundCard = this.cards[i];
                break;
            }
        }
        return foundCard;
    }

    /**
        * @method: randomCard  
        * @param {array} array - The card valued in defined order.
        * @returns {card}  The first card in the random array  
        * See description of shuffle in game.js
        */
    randomCard(array) {

        let m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array[0];     // return the first card of the random order array 
    }

  /**
     * @method: setGameOver
     * 
     * Sets game over to prevent further event processing until restart 
     */
    setGameOver() {
        this.GameOver = true;
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
    * @param {[shuffledCards]]} card values  - Shuffled array of card values
    * Instantiates a card for each of the shuffled values 
    * appends that card's html to the board html
    */
    addCards(shuffledCards) {
        for (var i = 0; i < this.cardCount; i++) {
            let card = this.addCard(this, this.type, `card-${this.type}-${i}`, shuffledCards[i]);

            this.boardElement.innerHTML += card.innerHtml;
            card.cardHtmlElement = document.getElementById(card.htmlID);
        }
        this.cardSetsUnmatched = shuffledCards.length / 2;  // Set number of pairs to match
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
        
        // Add the Hint Button Listener
        document.getElementById("hintButton").addEventListener('click', this);

    }

};

