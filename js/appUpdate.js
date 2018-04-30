const enemiesSprite = [
    'images/enemy-bug.png',
    'images/enemy-bug_invert.png'
];
console.dir(enemiesSprite);
const playerList = [
'images/char-boy.png',
'images/char-cat-girls.png',
'images/char-horn-girl.png',
'images/char-pink-girl.png',
'images/char-princess-girl.png'
];

let allEnemies = [],
    allRocks = [],
    rock,
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
        x : 1506,
        y : 1205
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
        if (this.x >=1506){
            this.x = -100;
            this.speed = Math.round((Math.random()*250) + (Math.random()*250)); //actual version
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

            this.x = 703;
            this.y = 1130;

        }
    }
    checkCollisionWithRock(){
        for(rock of allRocks){
            if((rock.x2 < this.x1 || rock.x1 > this.x2)||(rock.y2 < this.y1 || rock.y1 > this.y2)){
                  console.log('====Collision with rocks ====');
                    //this.setPlayerCoordinates(703,1130);
              }
        }
    }
    checkContactWithWater(x,y){
        if (this.y > 839 && this.y < 1005){
            console.log(' 839 and 1005');
            console.log ('=======================');

        } else if(this.y < 125 && this.y > 42){ //update actual coordinats for water blocks 42(1/2 height block)
            console.log('42 and 125');
            //checkcollision with rocks
            this.checkCollisionWithRock();
            counterLife += 1;
            //console.log(counterLife);
            //return to first position of player
            this.x = 703;
            this.y = 1130;
            return counterLife;
        } else if(this.y > 374 && this.y<457){
            console.log ('=======================');
            console.log('374 and 457');

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
                    this.setPlayerCoordinates(703,1130);
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

class Rock {
    constructor(x, y, speed){
        this.sprite = 'images/Rock.png';
        this.setRockY(y);
        this.setRockX(x);
        this.speed = 20;


    }
     setRockY(y){
        // Enemy's Y coordinate stays the same during the game run
        this.y = y;
        this.y1 = this.y + 67;
        this.y2 = this.y1 + 155;
    }

    setRockX(x){
        this.x = x;
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 9;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 92;

    }


    render(){
        //console.log (this.ctx);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

}
player = new Player(703, 1130);
let enemy = new Enemy(enemiesSprite[0],-100, 801, 350);
let enemy2 = new Enemy(-100, 561, 275);
let enemy3 = new Enemy(-100, 626, 400);
let enemy4 = new Enemy(-100, 712, 300);
let enemy5 = new Enemy(1505, 712, -350);

let stone = new Stone(106, 48);
let generateRock = function(rock,x,y){
    //number of quantity rocks
    let rockAmount = Math.round(Math.random()*3+7.5);
    //console.log(`rock amount ${rockAmount}`);
    let newXCoordinates, newYCoordinates, positionY;
    //OX coordinats from 0 till 1465
    //OY coordinats or 42 or 125;
    for (let i = 0; i<rockAmount; i++) {
        newXCoordinates = (Math.round((Math.random()*15))*101);
        positionY = Math.round((Math.random()*2 + 0.5));
        if (positionY===1){
            newYCoordinates = 42
        } else newYCoordinates = 125;
        //console.log(newXCoordinates);
        rock = new Rock(newXCoordinates,newYCoordinates);
        allRocks.push(rock);
    }
    return allRocks;

}();


allEnemies.push(enemy);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);


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
