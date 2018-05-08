/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

 //variables
const modal = document.querySelector('.modal');
const reload = document.querySelector('.reload');


//console.log(modal, reload, tokenStars, counterKeys, counterSelectors);


var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 1515; //actual position of canvas width 505;
    canvas.height = 1515; //actual position of canvas width 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */


         //true-false
         if (gameFinished()) {
                showModal();
                init();
                //console.log("==== Game is over ====");
                gamePrepare();
                reset();

            }


            win.requestAnimationFrame(main);


    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
            //console.log('+++++++++init++++++++');
            reset();
            lastTime = Date.now();
            main();



    }


    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        //checkCollisions();
    }

    //function checkCollisions(){
      // console.log(allEnemies);
   // }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {

        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        allOranges.forEach((orange) => {
            orange.update(dt);
            //console.log(this.orange);
        });
        allBlueGems.forEach((bluegem) => {
          bluegem.update(dt);
        });
        player.update();



    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/grass-block.png',   // Row 1 of 2 of secondgrass
                'images/water-block.png',   // Row 1 is 2 water
                'images/water-block.png',   // Row 2 is 2 water
                'images/grass-block.png',   // Row 1 of 2 of firstgrass
                'images/grass-block.png',   // Row 2 of 2 of firstgrass
                'images/grass-block.png',   // Row 3 is 2 water
                'images/grass-block.png',   // Row 3 is 2 water
                'images/stone-block.png',   // Row 1 of 4 of stone
                'images/stone-block.png',   // Row 2 of 4 of stone
                'images/stone-block.png',   // Row 3 of 4 of stone
                'images/stone-block.png',   // Row 4 of 4 of stone
                'images/grass-block.png',
                'images/grass-block.png',   // Row 2 is 2 water
                'images/grass-block.png',   // Row 1 of 2 of secondgrass
                'images/grass-block.png'    // Row 2 of 2 of secondgrass
            ],
            numRows = 15,//actual position 6
            numCols = 15, //actual position 5
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });




        allRocks.forEach((rock) => {
          rock.render();
          //console.log(`ROCK Y1 ${rock.y1}`);
          //console.log(`ROCK Y2 ${rock.y2}`);
         });


        //star render
        allStars.forEach((star) => {
          star.render();
          //console.log(this.star);
        });
        //stone render
        for(let selector of allSelectors){
            selector.render();
        }
        for(let orange of allOranges){
            orange.render();
            //console.log(this.orange);
        }
        for(let bluegem of allBlueGems){
            bluegem.render();
        }
        for(let key of allKeys){
            key.render();
        }
        //player.render();
        player.render();
        //console.log(`Player Y1 ${player.y1}`);
        //console.log(`Player Y2 ${player.y2}`);

    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        console.log('+++++++ reset+++++++');
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

        //generate Stars
        generateStars(-12);


        //the first range of gems by OY 54
        blueRandom(Math.round(Math.random()*5+0.5),1415, 54, -350);
        //the second range of gems by OY 880
        blueRandom(Math.round(Math.random()*5+0.5),1415, 880, -350);
        //the first range of oranges by OY 137
        orangeRandom(Math.round(Math.random()*5+0.5), -100, 137, 250);
        //the second range of oranges by OY 963
        orangeRandom(Math.round(Math.random()*5+0.5), -100, 963, 250);
        //generate rocks in two positions
        generateRocks(Math.round((Math.random()*3 + 0.5)), 42);
        //generateRocks(Math.round((Math.random()*5 + 5.5)), 132);
        //generateRocks(Math.round((Math.random()*5 + 0.5)), positionRockByOY.y2);// two rocks
        //generate stone in two positions
        generateSelector(Math.round((Math.random()*6 + 0.5)), 1);
        generateSelector(Math.round((Math.random()*6 + 0.5)), 2);
        //generateSelector(1, 1);
        generateKeys(Math.round(Math.random()*4+0.5),1);
        generateKeys(Math.round(Math.random()*4+0.5),2);

        //generate player
        player = new Player();// noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/enemy-bug_invert.png',
        'images/Rock.png',
        'images/Star.png',
        'images/Key.png',
        'images/Selector.png',
        'images/Gem Orange.png',
        'images/Gem Blue.png',
        'images/char-boy.png'
    ]);

    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

})(this);

 //content modal window
 let modalWindowContent = function(){
     document.querySelector('.counterStars').innerHTML = `Counter of stars ${counterStars}`;
     document.querySelector('.counterSelectors').innerHTML = `Counter of selectors ${counterSelectors}`;
     document.querySelector('.counterKeys').innerHTML = `Counter of keys ${counterKeys}`;
}

 //show modal window
let showModal = function(){
     modalWindowContent();
     modal.style.display = 'block';
}
 //hide modal window
let hideModal = function(){
     modal.style.display = "none";
 }

let gameFinished = function() {

        if (allStars.length == 0) return true;

        return false;
    }


let gamePrepare = function(){
    allStars.length = 0;
    allSelectors.length = 0;
    allOranges.length = 0;
    allEnemies.length = 0;
    allKeys.length = 0;
    allBlueGems.length = 0;
    allRocks.length = 0;
}
reload.addEventListener('click', (e)=>{
     hideModal();
});
