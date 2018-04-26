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
    maxGameboard,
    counterLife = 5,
    counterCollision = 0,
    maxPosition = {
        x : 404,
        y : 600
    }; //actual position y 400

    //ctx;


// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
class Enemy{
    constructor(x, y, speed){
        this.sprite = 'images/enemy-bug.png';
        this.setEnemyY(y);
        this.setEnemyX(x);
        this.speed = speed;
    }

    setEnemyY(y){
        // Enemy's Y coordinate stays the same during the game run
        this.y = y;
        this.y1 = this.y + 78;
        this.y2 = this.y1 + 66;
    }

    setEnemyX(x){
        this.x = x;
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 2;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 96;
    }

    checkCoordinats(x,y,speed){
        if (this.x >=520){
            this.x = -100;
            this.speed = Math.round((Math.random()*250) + (Math.random()*100)); //actual version
            //console.log("enemy came out for edge");
        }
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        // Enemy moves only to the right, y coordinate stays the same.
        this.setEnemyX(this.x + dt * this.speed);
        this.checkCoordinats();

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
        this.setPlayerCoordinates(x,y);
        this.dx = 0;
        this.dy = 0;
        this.counterLife = counterLife;
        this.counterCollision = counterCollision;
    }

    setPlayerCoordinates(x,y){
        this.x = x;
        this.y = y;
        // (x1,y1) - left upper point of the boy figure
        this.x1 = this.x + 19;
        this.y1 = this.y + 80;// actual position +64
        // (x2,y2) - left upper point of the boy figure
        this.x2 = this.x1 + 68;
        this.y2 = this.y1 + 61;// actual height +75
    }

    getNewPosition(position, maxGameboard){
        //console.log(allowedKeys);
    if (position == this.x){
        maxGameboard = maxPosition.x;
    } else {
        maxGameboard = maxPosition.y;
    }

        if (position<= -80 || position >= maxGameboard){

            this.x = 300;
            this.y = 575;

        }
    }
    checkContactWithWater(x,y){

        if(this.y < 42){
            console.log('contact with water');
            counterLife += 1;
            //console.log(counterLife);
            this.x = 300;
            this.y = 375;
            return counterLife;
        }
    }

    checkCollisionSideByPlayer(){
        //console.log(player.x1, player.x2);
        for(let enemy of allEnemies){
          // Here was the error !!!!!
          //if(!(enemy.x2 < this.x1 || enemy.x2 > this.x2)){
            if(!(enemy.x2 < this.x1 || enemy.x1 > this.x2)){
                if(!(enemy.y2 < this.y1 || enemy.y1 > this.y2)){
                    //console.log(`enemy__x2: ${Math.round(enemy.x2)} >= ${Math.round(this.x1)} :player_x1`);
                    //console.log(``);
                    //console.log(`player_x2: ${Math.round(this.x2)} >= ${Math.round(enemy.x1)} :enemy__x1`);
                    //console.log(``);
                    console.log('================================================')
                    this.setPlayerCoordinates(200,575);
                }

            }
        }
    }

    update(){
        this.setPlayerCoordinates(this.x + this.dx,this.y + this.dy);
        this.checkContactWithWater();
        this.getNewPosition(this.x, maxPosition.x);
        this.getNewPosition(this.y, maxPosition.y);
        this.checkCollisionSideByPlayer();
        this.dx = 0;
        this.dy = 0;
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
//add to gamefield Stone
class Stone {
    constructor(x,y,sprite){
        this.sprite = 'images/stone-block.png';
        this.setStoneOX(x);
        this.setStoneOY(y);
   }

    setStoneOX(x){
        this.x = x;
        this.x1 = this.x+4;  //actual position of figure stone by OX
        this.x2 = this.x+93;
    }

    setStoneOY(y){
        this.y = y;
        this.y1 = this.x+58;  //actual position of fige stone by OY
        this.y2 = this.y+103;
    }


    render(){
        //console.log(this.sprite);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
player = new Player(300, 575);
let enemy = new Enemy(-100, 300, 150);
let enemy2 = new Enemy(-100, 140, 100);
let enemy3 = new Enemy(-100, 220, 250);
let enemy4 = new Enemy(-100, 380, 300);

let stone = new Stone(106, 48);

//let enemy = new Enemy(150, 150, 0);
allEnemies.push(enemy);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
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
