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
        this.boardElement = document.getElementById("gameboard");
        console.log("constructor for Board completed ");                /* Remove  */
    }

/**
 * @method: cardFlip
 * @param {event} event - The Game object parent.
 * Processes a card click event
 */
    cardFlip(event) {
        $(`#${event.id}`).toggleClass("click");
        $(`#${event.id}`).css("transform, rotateY(180deg)");

        console.log("Clicked: " + event.id);
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
 * 
 * uses defined card count to create all new cards PARAMS TBD 
 */
    addCards() {
        for (var i = 1; i <= this.cardCount; i++) {
            let card = this.addCard(this, this.type, `card-${this.type}-${i}`, `V-${i}`);
            this.boardElement.innerHTML += card.getHTML();
            card.htmlElement = document.getElementById(card.htmlId);
            card.hello();
        }

    }

    /**
 * @method: addAllListeners
 * 
 * Adds all click listers to the cards 
 * Note the was listenrs needed to be associated.  
 */
    addAllListeners() {
        let htmlCards = Array.from(document.getElementsByClassName('flip-card'));
        htmlCards.forEach(card => {
            card.addEventListener('click', () => {
                this.cardFlip(card);
            });
        });

        /*  CLEAN UP.  This was all of the unsuccessful attempst to add an event listener to a 2 deep level class.  
        Document this 

        this.cards.forEach(card => {
            card.htmlElement.addEventListener('click', () => {
                card.board.cardFlip(card);
            });
        });
     
        let index = 0;
        for (index = 0; index < this.cards.length; index++) {
            this.cards[index].htmlElement.addEventListener('click', this.cardFlip);
        }
            */

        //this.cards.forEach(function(thecard) {

        // https://stackoverflow.com/questions/30446622/es6-class-access-to-this-with-addeventlistener-applied-on-method
        // card.htmlElement.addEventListener('click', this.cardFlip);
        // card.htmlElement.addEventListener('click', ev => cardFlip(ev));
        //card.htmlElement.addEventListener('click', evt => console.log(evt));
        //card.htmlElement.addEventListener('click', this.cardFlip.bind(this));

        //this.cardFlip() = this.cardFlip.bind(this);
        // thecard.htmlElement.addEventListener('click', this.cardFlip);

        // });

    }

}


