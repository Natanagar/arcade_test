const enemies = 3;
const playerList = [
'images/char-boy.png',
'images/char-cat-girls.png',
'images/char-horn-girl.png',
'images/char-pink-girl.png',
'images/char-princess-gilr.png'
];

let allEnemies = [],
    dt,
    speed,
    player,
    image,
    ctx;

// Enemies our player must avoid
// Variables applied to each of our instances go here,
// we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
class Enemy{
    constructor(sprite, x,y, speed){
        this, sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;//context
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (){
        this.x += dt * this.speed;
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    }
    // Draw the enemy on the screen, required method for game
    render(){
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}



class Player extends Enemy{

    update(){

    }
    render(){
        console.log(this);
        super.render();
        //console.log(player);
    }


    handleInput(){

    }

}
player = new Player(this.sprite = 'images/char-boy.png', 200, 200);
let enemy = new Enemy(this.sprite, 40, 40, 0);
allEnemies.push(enemy);
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
