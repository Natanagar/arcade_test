const modal = document.querySelector('.modal');
const reload = document.querySelector('.reload');
console.log(reload);

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
    allKeys = [],
    allSelectors = [],
    allOranges = [],
    allBlueGems = [],
    maxGameboard,
    counterLife = 5,
    counterCollision = 0,
    counterStars = 0,
    counterRock = 0,
    counterSelectors = 0,
    counterKeys = 0;
    makeCollision = true,
    maxPosition = {
        x : 1506,
        y : 1205
    }; //actual position y 400
    startPlayerPosition = {
        x : 703,
        y : 1130
    };
    playerStepSize = {
        x : 101,
        y : 83
    };
    selectorZone = {
        y1 : 380,
        y2 : 497
    }


// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
class Enemy{
    constructor(x, y, speed){
        this.sprite = 'images/enemy-bug.png';
        this.setY(y);
        this.setX(x);
        this.speed = speed;
    }

    setY(y){
        // Enemy's Y coordinate stays the same during the game run
        this.y = y;
        this.y1 = this.y + 78;
        this.y2 = this.y1 + 66;
    }

    setX(x){
        this.x = x;
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 2;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 96;
    }

    returnOnBoardIfOut(){
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
        this.setX(this.x + dt * this.speed);
        this.returnOnBoardIfOut();

    }
    // Draw the enemy on the screen, required method for game
    render(){
        //console.log(this.sprite);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }

//player
class Player {
    constructor(){
        // actual char-boy.png figure width = 68 px, height = 75 px
        this.sprite = 'images/char-boy.png';
        this.goToStartPosition();
        this.dx = 0;
        this.dy = 0;
        this.counterLife = counterLife;
        this.counterCollision = counterCollision;
    }

    moveTo(x,y){
        this.x = x;
        this.y = y;
        // (x1,y1) - left upper point of the boy figure
        this.x1 = this.x + 19;
        this.y1 = this.y + 80;// actual position +64
        // (x2,y2) - left upper point of the boy figure
        this.x2 = this.x1 + 68;
        this.y2 = this.y1 + 61;// actual height +75
    }

    goToStartPosition() {
        this.moveTo(startPlayerPosition.x,startPlayerPosition.y);
    }

    ifOutOfBoardGoToStartPosition(){
        if(this.x< -80 || this.x > maxPosition.x || this.y< -80 || this.y > maxPosition.y){
            this.goToStartPosition();
        }
    }

    ifCollisionOccuredWith(opponent) {
        if(!((opponent.x2 < this.x1 || opponent.x1 > this.x2)||(opponent.y2 < this.y1 || opponent.y1 > this.y2))){
                  return true;
        }
        return false;
    }

    //check collision with oranges
    checkCollisionWithOrange(){
        //check coordinates with orange range 137 range 963

            //console.log('==============Zone with Orange=================');
           for(orange of allOranges){
            if(this.ifCollisionOccuredWith(orange)) {
                  console.log('====Collision with orange ====');
                    this.goToStartPosition();

            }
        }
    }


    //check collision with selectors
    checkCollisionWithSelectors() {
        if(this.y > selectorZone.y1 && this.y < selectorZone.y2) {
            console.log('====Zone with selectors ====');

                for(selector of allSelectors) {
                    if(this.ifCollisionOccuredWith(selector)) {
                        console.log('Collision with Selector occured.');

                        counterSelectors +=100;
                        //this.setPlayerCoordinates(703,1130);
                        let index = allSelectors.indexOf(selector);
                        console.log(`index to delete:' ${index}`);
                        selector.clear(index);
                        console.dir(allSelectors);
                        break;
                    }
                }
        }
    }

    //check collision with key
    checkCollisionWithKeys(){
        if(this.y >= 166 && this.y<= 332){
            console.log ('======================= player in the zone with keys');
        for(key of allKeys) {
            if(this.ifCollisionOccuredWith(key)) {
                    console.log('====Collision with key ====');
                    counterKeys+=100;
                    let index = allKeys.indexOf(key);
                    console.log(`index to delete:' ${index}`);
                    key.clear(index);
                    console.dir(allSelectors);
                    break;

                    //this.goToStartPosition();


                }

           }
        }
    }
    //check collision with blue gems
    checkCollisionWithBlueGems(x,y) {
        for(bluegem of allBlueGems) {
            if(this.ifCollisionOccuredWith(bluegem)){
                  console.log('====Collision with bluegem ====');
                    this.goToStartPosition();
              }
          }
    }

    checkZoneWithOrangeBlue(x,y){
        if (this.y > 839 && this.y < 1005){
            console.log(' 839 and 1005 contact with water');
            console.log ('=======================');
            this.checkCollisionWithOrange();
            this.checkCollisionWithBlueGems();

        } else if(this.y > 42 && this.y < 208){
            console.log(`player OY coordinates ${this.y}`);
            console.log(`player y1 ${this.y1}`);
            console.log(`player y2 ${this.y2}`);
            //this.checkCollisionWithRock();
            //this.checkCollisionWithOrange();
            //this.checkCollisionWithBlueGems();
        } //update actual coordinats for water blocks 42(1/2 height block)

    }
    checkCollisionWithStar(){
        if(this.y1 >=-2 && this.y1 <= 83){
            for(star of allStars){
                console.log('=======Zone with Star===========');
                    if(this.ifCollisionOccuredWith(star)) {
                        console.log('=========Collision with Star============');
                        counterStars+=200;
                        let index = allStars.indexOf(star);
                        console.log(`index to delete:' ${index}`);
                        star.clear(index);
                        console.dir(allStars);
                        break;


                }

            }

        }
    }
    checkEndOfGame(){
        //console.log(` Array with star (length) ${allStars.length}`);
       if(allStars.length == 0){
            //console.log(`========show modal window=======`);
            modal.style.display = 'block';
        }
    }
    checkCollisionWithRock(){
        for(rock of allRocks){
            if(this.ifCollisionOccuredWith(rock)){
                console.log('=======collision with rocks==========');
                } else {
                console.log(`========== this is not a collision===========`);
                this.goToStartPosition();

            }
        }

    }

    checkCollisionSideByPlayer(){
        //console.log(player.x1, player.x2);
        for(let enemy of allEnemies){
          // Here was the error !!!!!
          //if(!(enemy.x2 < this.x1 || enemy.x2 > this.x2)){
            if(this.ifCollisionOccuredWith(enemy)){
                    console.log('================================================');
                    this.goToStartPosition();

            }
        }
    }

    update(){

        this.moveTo(this.x + this.dx,this.y + this.dy);
        this.checkEndOfGame();
        this.checkCollisionWithKeys();
        this.checkCollisionWithSelectors();
        this.checkZoneWithOrangeBlue();
        this.ifOutOfBoardGoToStartPosition();
        //this.getNewPosition(this.y, maxPosition.y);
        this.checkCollisionSideByPlayer();
        this.checkCollisionWithStar();
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
            this.dy -= playerStepSize.y;
        } else if(true && allowedKeys == "down"){
            this.dy += playerStepSize.y;
        } else if(true && allowedKeys == "left"){
            this.dx -= playerStepSize.x;
        } else if (true && allowedKeys == "right"){
            this.dx += playerStepSize.x;
        }
    }

}



//add to gamefield Selector
class Selector {
    constructor(x,y){
        this.setSelectorX(x);
        this.setSelectorY(y);
        this.sprite = 'images/Selector.png';
   }

   setSelectorX(x){
        this.x = x;
        this.x1 = this.x+1;  //actual position of figure stone by OX
        this.x2 = this.x1+100;
    }

    setSelectorY(y){
        this.y = y;
        this.y1 = this.y+90;  //actual position of fige stone by OY
        this.y2 = this.y1+80;
    }


    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    clear(index){
        console.log('Trying to clear Selector...');
        allSelectors.splice(index,1);
    }
}


class Key {
    constructor(x, y){
        this.sprite = 'images/Key.png';
        this.setKeyY(y);
        this.setKeyX(x);
    }
     setKeyY(y){
        // Enemy's Y coordinate stays the same during the game run
        this.y = y;
        this.y1 = this.y + 58;
        this.y2 = this.y1 + 84;
    }

    setKeyX(x){
        this.x = x;
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 30;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 41;

    }


    render(){
        //console.log (this.ctx);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    clear(index){
        console.log('Trying to clear Key...');
        allKeys.splice(index,1);
    }

}
let generateKeys = function(maximumNumberOfItems, positionY){
    if(positionY===1){
            firstYCoordinate = 230;
        } else if(positionY===2){firstYCoordinate = 306};
    for(let i=0; i<maximumNumberOfItems; i++){
        firstXCoordinate = (Math.round(Math.random()*15)*101);
        key = new Key(firstXCoordinate, firstYCoordinate);
        allKeys.push(key);
    }

};

generateKeys(Math.round(Math.random()*4+0.5),1);
generateKeys(Math.round(Math.random()*4+0.5),2);


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
    clear(index){
          console.log('Trying to clear Star...');
            allStars.splice(index,1);
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

//generateStars(1, -2);


player = new Player();
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

//generate selector
let generateSelector = function(maximumNumberOfItems, positionOY){
    if(positionOY===1){
            firstYCoordinate = 374;
        }
    else if(positionOY===2){firstYCoordinate = 457};
    for(let i=0; i<maximumNumberOfItems; i++){
        firstXCoordinate = (Math.round(Math.random()*15)*101);
        selector = new Selector(firstXCoordinate, firstYCoordinate);
        allSelectors.push(selector);
    }

};
//generate stone in two positions
generateSelector(Math.round((Math.random()*6 + 0.5)), 1);
generateSelector(Math.round((Math.random()*6 + 0.5)), 2);
//generateSelector(1, 1);

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

class Rock {
    constructor(x, y, speed){
        this.sprite = 'images/Rock.png';
        this.setRockX(x);
        this.setRockY(y);

    }
    setRockY(y){
        // Gemss Y coordinate stays the same during the game run
        this.y = y;
        this.y1 = this.y + 69;
        this.y2 = this.y1 + 86;
    }

    setRockX(x){
        this.x = x;
        // (x1,y1) - left upper point of the bug figure
        this.x1 = this.x + 9;
        // (x2,y2) - right lower point of the bug figure
        this.x2 = this.x1 + 85;
    }
    render(){
        //console.log (this.ctx);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}
//generate rocks
let generateRocks = function(maximumNumberOfItems, positionOY){
    if(positionOY===1){
            firstYCoordinate = 42;// get coordinates by Oy
        }
    else if(positionOY===2){firstYCoordinate = 132}; //get coordinates by OY
    for(let i=0; i<maximumNumberOfItems; i++){
        firstXCoordinate = (Math.round(Math.random()*15)*101);
        rock = new Rock(firstXCoordinate, firstYCoordinate);
        allRocks.push(rock);
    }

};
//generate rocks in two positions
generateRocks(Math.round((Math.random() + 0.5)), 2);
generateRocks(Math.round((Math.random() + 0.5)), 2);// two rocks
//generateRocks(Math.round((Math.random()*6 + 4.5)), 1);
//generateRocks(Math.round((Math.random()*6 + 4.5)), 2);
//generateSelector(1, 1);


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

let toGoStart = function(event){
    alert('Hura!');
    let pressElement = event.target;
    let newElement = pressElement.parentElement.parentElement;
    console.log(newElement);
    newElement.classList.ad('hide');
    //console.log(reload);


    //modal.style.display = "none";
    //console.log("=====Go to start=========");// Todo...
};
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

reload.addEventListener('click', toGoStart);
