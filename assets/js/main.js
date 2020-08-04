

/* initial setup and non-class related stuff.  
Document this 
*/ 

/* NOTE: at the moment, game is limited to 24 cards due to time constraints.
    The game is also limited to a single mode of Roman Numerals vs easy & hard
    Code to make it variable will be required */ 
let hardDuration = 90;  // 90 seconds for the Roman Numeral game 
let cardCount = 24;       
let ROMANNUMERALS = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",
    "I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];

let easyDuration = 60;  // 30 seconds for the Roman Numeral game 
let easyCardCount = 12;       
let easyCards = ["1","2","3","4","5","6","1","2","3","4","5","6"];

//let game = new Game("Game1", "RomaNum", easyCardCount, ROMANNUMERALS, hardDuration);
let game = new Game("Game1", "Easy", easyCardCount, easyCards, easyDuration);  

// let board = game.addBoard(game, game.typetype, cardCount);

game.addButtonListeners(); 


