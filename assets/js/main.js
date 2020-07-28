

/* initial setup and non-class related stuff.  
Document this 
*/ 

/* NOTE: at the moment, game is limited to 24 cards due to time constraints.
    The game is also limited to a single mode of Roman Numerals vs easy & hard
    Code to make it variable will be required */ 

let cardCount = 24;       
let ROMANNUMERALS = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",
    "I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];

let game = new Game("Game1", "RomaNum", cardCount, ROMANNUMERALS);

let board = game.addBoard(game, game.typetype, cardCount);

game.addButtonListeners(); 

$('.xcard .xcard-inner').click(function() {
    $(this).closest('.xcard').toggleClass('hover');
    $(this).css('transform, rotateY(180deg)');
});



console.log(game); 
