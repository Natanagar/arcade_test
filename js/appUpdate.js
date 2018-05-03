const modal = document.querySelector('.modal');

const playerList = [
'images/char-boy.png',
'images/char-cat-girls.png',
'images/char-horn-girl.png',
'images/char-pink-girl.png',
'images/char-princess-girl.png'
];

let allEnemies = [],
    allRocks = [],
    allStars = [],
    allStones = [],
    allOranges = [],
    allBlueGems = [],
    bluegem,
    sprite,
    orange,
    stone,
    rock,
    star,
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
    counterStars,
    counterRock,
    counterStones,
    makeCollision = true,
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

//player
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

    getNewPosition(position, maxGameboard, speed){
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


    //check collision with Rocks
    checkCollisionWithRock(){
        for(rock of allRocks){
            if((rock.x2 < this.x1 || rock.x1 > this.x2)&&(rock.y2 < this.y1 || rock.y1 > this.y2)){
                  console.log('====Collision with rocks ====');
                    this.clearRect(this.x, this.y);
                    counterRock += 50;
                    console.log(counterRock);
              }
        }
    }

    checkCollisionWithOrange(x,y){
        for(orange of allOranges){
            if((orange.x2 < this.x1 || orange.x1 > this.x2)||(orange.y2 < this.y1 || orange.y1 > this.y2)){
                  console.log('====Collision with orange ====');
                    //this.setPlayerCoordinates(703,1130);
              }
          }
    }

    checkCollisionWithStones(){
        for(stone of allStones){
            if(!(stone.x2 < this.x1 || stone.x1 > this.x2)){
                if(!(stone.y2 < this.y1 || stone.y1 > this.y2)){
                    console.log('====Collision with stone ====');
                    counterStones +=100;
                    makeCollision = true;

              }
          }
        else makeCollision = false;

        //else this.setPlayerCoordinates(703,1130);
    }
    return makeCollision;
}



    checkCollisionWithBlueGems(x,y) {
        for(bluegem of allBlueGems) {
            if((bluegem.x2 < this.x1 || bluegem.x1 > this.x2)||(bluegem.y2 < this.y1 || bluegem.y1 > this.y2)){
                  console.log('====Collision with bluegem ====');
                    //this.setPlayerCoordinates(703,1130);
              }
          }
    }
    checkContactWithWater(x,y){
        if (this.y > 839 && this.y < 1005){
            console.log(' 839 and 1005 contact with water');
            console.log ('=======================');

        } else if(this.y > 42 && this.y < 208){ //update actual coordinats for water blocks 42(1/2 height block)
            console.log('===========Contact with water');
            if (this.y> 42 && this.y <125 ){
                this.checkCollisionWithBlueGems();
            } else if (this.y >=125 && this.y < 208){
                this.checkCollisionWithOrange();

            }

            counterLife += 1;
            //console.log(counterLife);
            //return to first position of player
            //this.x = 703;
            //this.y = 1130;
            return counterLife;
        } else if(this.y > 374 && this.y<539){
            console.log ('======================= contact with water');
            console.log('374 and 539');
            this.checkCollisionWithStones();
            if (makeCollision == false){
                    this.setPlayerCoordinates(703,1130);
                }
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
    constructor(x,y){
        this.setStoneX(x);
        this.setStoneY(y);
        this.sprite = 'images/Selector.png';
   }

   setStoneX(x){
        this.x = x;
        this.x1 = this.x+4;  //actual position of figure stone by OX
        this.x2 = this.x1+93;
    }

    setStoneY(y){
        this.y = y;
        this.y1 = this.x+58;  //actual position of fige stone by OY
        this.y2 = this.y1+103;
    }


    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    clear(){
        ctx.clearRect(Resources.get(this.sprite), this.x, this.y);
    }
}


class Rock {
    constructor(x, y){
        this.sprite = 'images/Rock.png';
        this.setRockY(y);
        this.setRockX(x);
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
let generateRock = function(maximumNumberOfItems, positionY){
    if(positionY===1){
            firstYCoordinate = 230;
        } else if(positionY===2){firstYCoordinate = 306};
    for(let i=0; i<maximumNumberOfItems; i++){
        firstXCoordinate = (Math.round(Math.random()*15)*101);
        rock = new Rock(firstXCoordinate, firstYCoordinate);
        allRocks.push(rock);
    }

};

generateRock(Math.round(Math.random()*4+0.5),Math.round((Math.random()*2 + 0.5)));
generateRock(Math.round(Math.random()*4+0.5),Math.round((Math.random()*2 + 0.5)));


class Star{
        constructor(x,y){
            this.sprite = 'images/Star.png';
            this.setStarY(y);
            this.setStarX(x);
        }
     setStarY(y){
        // Enemy's Y coordinate stays the same during the game run
        this.y = y;
        this.y1 = this.y + 65;
        this.y2 = this.y1 + 92;
    }

    setStarX(x){
        this.x = x;
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 5;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 92;

    }

    render(){
        //console.log (this.ctx);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}
let generateStars = function(maximumNumberOfItems, firstYCoordinate){
    for(let i=0; i<maximumNumberOfItems; i++){
        let firstXCoordinate = (Math.round((Math.random()*15))*101);
        star = new Star(firstXCoordinate, firstYCoordinate);
        allStars.push(star);
    }
};
generateStars(Math.round(Math.random()*5+0.5), -2);


player = new Player(703, 1130);
let generateEnemies = function(){

    //generate new enemies
    let enemy = new Enemy(-100, 801, 350);
    let enemy2 = new Enemy(-100, 561, 275);
    let enemy3 = new Enemy(-100, 626, 400);
    let enemy4 = new Enemy(-100, 712, 300);
    let enemy5 = new Enemy(-100, 795, 400);
    let enemy6 = new Enemy(1505, 712, -350);
    let enemy7 = new Enemy(1505, 546, -450);

    //add to allEnemies array
    allEnemies.push(enemy);
    allEnemies.push(enemy2);
    allEnemies.push(enemy3);
    allEnemies.push(enemy4);
    allEnemies.push(enemy5);
    allEnemies.push(enemy6);
    allEnemies.push(enemy7);
}();
//generate stones
let generateStone = function(maximumNumberOfItems, positionOY){
    if(positionOY===1){
            firstYCoordinate = 374;
        } else if(positionOY===2){firstYCoordinate = 457};
    for(let i=0; i<maximumNumberOfItems; i++){
        firstXCoordinate = (Math.round(Math.random()*15)*101);
        stone = new Stone(firstXCoordinate, firstYCoordinate);
        allStones.push(stone);
    }

};
//generate stone in two positions
generateStone(Math.round((Math.random()*6 + 0.5)), 1);
generateStone(Math.round((Math.random()*6 + 0.5)), 2);


class Orange {
    constructor(x, y, speed){
        this.sprite = 'images/Gem Orange.png';
        this.setOrangeX(x);
        this.setOrangeY(y);
        this.speed = speed;
    }
    setOrangeY(y){
        // Gemss Y coordinate stays the same during the game run
        this.y = y;
        this.y1 = this.y + 58;
        this.y2 = this.y1 + 104;
    }

    setOrangeX(x){
        this.x = x;
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 3;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 95;
    }

    checkCoordinats(x,y,speed){
        if (this.x >=1506){
            //this.speed = -this.speed;
            this.x = -100;
        }
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        // Orange moves only to the right, y coordinate stays the same.
        this.setOrangeX(this.x + (dt * this.speed));
        this.checkCoordinats();
        //console.log(this.x, dt, this.speed);

    }
    // Draw the enemy on the screen, required method for game
    render(){
        //console.log(this.sprite);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class BlueGem {
    constructor(x, y, speed){
        this.sprite = 'images/Gem Blue.png';
        this.setBlueGemX(x);
        this.setBlueGemY(y);
        this.speed = speed;
    }
    setBlueGemY(y){
        // Gemss Y coordinate stays the same during the game run
        this.y = y;
        this.y1 = this.y + 58;
        this.y2 = this.y1 + 104;
    }

    setBlueGemX(x){
        this.x = x;
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 3;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 95;
    }

    checkCoordinats(x,y,speed){
        if (this.x <= -100){
            this.x = 1415;
        }
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        // Orange moves only to the right, y coordinate stays the same.
        this.setBlueGemX(this.x + (dt * this.speed));
        this.checkCoordinats();
        //console.log(this.x, dt, this.speed);

    }
    // Draw the enemy on the screen, required method for game
    render(){
        //console.log(this.sprite);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

let orangeRandom = function(maximumNumberOfItems,firstXCoordinate, firstYCoordinate, speed){
    for(let i=0; i<maximumNumberOfItems; i++){
        orange = new Orange(firstXCoordinate, firstYCoordinate, speed);
        allOranges.push(orange);
        firstXCoordinate += 100;
    }
};
//the first range of oranges by OY 137
orangeRandom(Math.round(Math.random()*5+0.5), -100, 137, 250);
//the second range of oranges by OY 963
orangeRandom(Math.round(Math.random()*5+0.5), -100, 963, 250);


let blueRandom = function(maximumNumberOfItems,firstXCoordinate, firstYCoordinate, speed){
    for(let i=0; i<maximumNumberOfItems; i++){
        bluegem = new BlueGem(firstXCoordinate, firstYCoordinate, speed);
        allBlueGems.push(bluegem);
        firstXCoordinate += -100;
    }
};
//the first range of gems by OY 54
blueRandom(Math.round(Math.random()*5+0.5),1415, 54, -350);
//the second range of gems by OY 880
blueRandom(Math.round(Math.random()*5+0.5),1415, 880, -350);


let scorePanel = function(){
    let panel = document.createElement('div');
    let panelLife = document.createElement('span');
    let panelStars = document.createElement('span');
    let panelRocks = document.createElement('span');
    let panelStones = document.createElement('span');
    panelLife.classList.add('counter');
    panelStars.classList.add('counter');
    panelRocks.classList.add('counter');
    panelStones.classList.add('counter');
    panelLife.innerHTML = `'counter of life' ${counterLife}`;
    panelStars.innerHTML=`'counter of stars' ${counterStars}`;
    panelRocks.innerHTML=`'counter of rock' ${counterRock}`;
    panelStones.innerHTML=`'counter of selectors' ${counterStones}`;
    panel.classList.add('score');
    modal.appendChild(panel);
    modal.appendChild(panelLife);

}();

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
