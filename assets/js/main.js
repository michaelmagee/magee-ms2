
let cardCount = 24;      // Test with 8 for now

let game = new Game("Game1", "easy", cardCount);

let board = game.addBoard(game, game.typetype, cardCount);



$('.xcard .xcard-inner').click(function() {
    $(this).closest('.xcard').toggleClass('hover');
    $(this).css('transform, rotateY(180deg)');
});

console.log(game); 
