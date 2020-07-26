/* 
Class: Board
This class will hold all of the functionality that is closely related to the card and it's oeration

*/

class Board {

    constructor(game, type, cardcount) {
        this.game = game;
        this.type = type;
        this.cardCount = cardcount;
        this.cards = [];
        this.boardElement = document.getElementById("game-board");
        console.log("constructor for Board completed ");
    }

    cardFlip(event) {
        let clickedCard = this.getCardByID(event.id);
        let hasittest = event.classList.contains("wiggle");
        let nopetest = event.classList.contains("gum");
        this.wiggle();
        console.log("Clicked: " + clickedCard.innerHtml);
    }

    wiggle() {
        $("#card-easy-1").addClass("wiggle");
        $("#card-easy-2").addClass("wiggle");
        console.log("wiggling on");
        setTimeout(() => {
            $("card-easy-1").removeClass("wiggle");
            $("card-easy-2").removeClass("wiggle");
        }, 700);
        console.log("wiggling off");
    }

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


    addCard(board, type, htmlId, cardValue) {
        let newCard = new Card(board, type, htmlId, cardValue);
        this.cards.push(newCard);
        return newCard;
    }

    addCards() {

        for (var i = 1; i <= this.cardCount; i++) {
            let card = this.addCard(this, this.type, `card-${this.type}-${i}`, `Value-${i}`);
            this.boardElement.innerHTML += card.getHTML();
            card.htmlElement = document.getElementById(card.htmlId);
            card.hello();
        }

    }


    addAllListeners() {
        let htmlCards = Array.from(document.getElementsByClassName('card-inline-grid'));
        htmlCards.forEach(card => {
            card.addEventListener('click', () => {
                this.cardFlip(card);
            });
        });

        /*
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


