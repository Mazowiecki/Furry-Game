var Coin = require("./Coin.js");
var Furry = require("./Furry.js");



function Game(){
    this.board=document.querySelectorAll("#board div");
    this.furry=new Furry();
    this.coin=new Coin();
    this.score=0;
    var self = this;



    this.index = function(x,y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    };
    this.moveFurry = function () {
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left"){
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up"){
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down"){
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.hideVisibleFurry();
        this.showFurry();
        this.checkCoinCollision();

    };

    this.hideVisibleFurry=function(){
        document.querySelector(".furry").classList.remove("furry");
    };

    this.turnFurry = function(event) {
        switch (event.which) {
            case 39:
                this.furry.direction = 'right';
                break;
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }

        this.checkCoinCollision = function() {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                    this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin");
                    this.score = this.score + 1;
                    document.querySelector("#score strong").innerHTML=this.score;
                    this.coin = new Coin();
                    this.showCoin();
                }
            }
        };
        this.gameOver = function () {
            if ((this.furry.x < 0 || this.furry.x > 9)
                || (this.furry.y < 0 || this.furry.y > 9)) {
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry();
                alert("Koniec gry, ilość punktów: " + this.score);
            }
        };
        this.startGame = function () {
            this.idSetInterval = setInterval(function () {
                self.moveFurry();
            }, 250);
        };
}



module.exports = Game;