var Game = require("./Game.js");






var gameStart = new Game();
gameStart.showFurry();
gameStart.showCoin();
gameStart.startGame();

document.addEventListener("keydown", function (event) {
        gameStart.turnFurry(event);
    });