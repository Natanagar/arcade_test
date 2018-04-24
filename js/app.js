const enemies = 3;
const playerList = [
'images/char-boy.png',
'images/char-cat-girls.png',
'images/char-horn-girl.png',
'images/char-pink-girl.png',
'images/char-princess-girl.png'
];

let allEnemies = [],
    dt,
    speed,
    player,
    image,
    dx,
    dy,
    firstPosition,
    deltaPosition,
    maxGameboard
    maxPosition = {
        x : 404,
        y : 400
    };

    //ctx;


// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
class Enemy{
    constructor(x, y, speed){
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.calculateEnemyCoordinates();
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    calculateEnemyCoordinates(){
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 2;
        this.y1 = this.y + 78;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 96;
        this.y2 = this.y1 + 66;
    }
    update (dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.speed;
        this.calculateEnemyCoordinates();

    }
    // Draw the enemy on the screen, required method for game
    render(){
        //console.log(this.sprite);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }



class Player {
    constructor(x, y){
        // actual char-boy.png figure width = 68 px, height = 75 px
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.calculatePlayerCoordinates();
        this.dx = 0;
        this.dy = 0;
    }

    calculatePlayerCoordinates(){
       // (x1,y1) - left upper point of the boy figure
        this.x1 = this.x + 19;
        this.y1 = this.y + 64;
        // (x2,y2) - left upper point of the boy figure
        this.x2 = this.x1 + 68;
        this.y2 = this.y1 + 75;
    }

    getNewPosition(position, maxGameboard){
        //console.log(allowedKeys);
    if (position == this.x){
        maxGameboard = maxPosition.x;
    } else {
        maxGameboard = maxPosition.y;
    }

        if (position<= -80 || position >= maxGameboard){
            this.x = 200;
            this.y = 375;

        }
    }

    checkCollisionSideByPlayer(){
        //console.log(player.x1, player.x2);
        for(let enemy of allEnemies){
            if(!(enemy.x2 < this.x1 || enemy.x1 > this.x2)){
                if (!(enemy.y2 < this.y1 || enemy.y1 > this.y2)){
                    console.log("Collision");
                    this.x = 200;
                    this.y = 375;
                    this.calculatePlayerCoordinates();
                }
            }
            //console.log (enemy.x1);
        }

    }



    update(){
        //this.x += dt * this.speed

        this.x += this.dx;
        this.y += this.dy;
        this.getNewPosition(this.x, maxPosition.x);
        this.getNewPosition(this.y, maxPosition.y);

        this.dx = 0;
        this.dy = 0;
        this.calculatePlayerCoordinates();
        this.checkCollisionSideByPlayer();
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }


    handleInput(allowedKeys){
        // player's movement
        // if allowedKeys = 37, move to left
        //console.log(allowedKeys);
        if(true && allowedKeys == "up"){
            this.dy += -83;
        } else if(true && allowedKeys == "down"){
            this.dy += 83;
        } else if(true && allowedKeys == "left"){
            this.dx += -101;
        } else if (true && allowedKeys == "right"){
            this.dx += 101;
        }
    }

}
player = new Player(200, 375);
let enemy = new Enemy(-100, 50, 50);
let enemy2 = new Enemy(-100, 140, 100);
let enemy3 = new Enemy(-100, 220, 250);
//let enemy = new Enemy(150, 150, 0);
allEnemies.push(enemy);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
//player.render();


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
