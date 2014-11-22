var KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:   13,
    ESC:      27,
    SPACE:    32,
    PAGEUP:   33,
    PAGEDOWN: 34,
    END:      35,
    HOME:     36,
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
    INSERT:   45,
    DELETE:   46,
    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA:    192
  };

var MAXWIDTH = 800;

var players = [];
var playerid = 0;
var stage = {};

function init() {

    document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
    document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

    // initialize an instance of a pixi stage
    stage = new PIXI.Stage(0x66FF99);
 
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(MAXWIDTH, 400);
 
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
 
    requestAnimFrame( animate );

    createPlayers(2);
 
    function animate() {
 
        requestAnimFrame( animate );

        //bunny.rotation += 0.1;
 
        // render the stage   
        renderer.render(stage);
    }
}

function onKeyDown(event) {
    event.preventDefault();
    switch(event.keyCode) {
        case keys.LEFT:
            move(-1);
        case keys.RIGHT:
            move(1);
    }
}

function onkey(ev, key, pressed) {
    switch(key) {
        case KEY.LEFT:  
            move('left');
            ev.preventDefault(); 
            break;
        case KEY.RIGHT: 
            move('right');
            ev.preventDefault(); 
            break;
        case KEY.SPACE: 
            player.input.jump  = pressed; 
            ev.preventDefault(); 
            break;
    }
}

function move(direction) {
    if (direction === 'left') {
        if (players[playerid].position.x > 0) {
            players[playerid].position.x -= 4;   
        }
    }
    else if (direction === 'right') {
        if (players[playerid].position.x < MAXWIDTH) {
            players[playerid].position.x += 4;
        }
    }
}

function createPlayers(number) {

    var playerTexture = PIXI.Texture.fromImage("resources/bunny.png");

    for (var i = 0; i < number; i++) {
        player = new PIXI.Sprite(playerTexture);
     
        // define the players anchor point
        player.anchor.x = 0.5;
        player.anchor.y = 1.0;
     
        // set the players starting point
        player.position.x = Math.floor((Math.random() * MAXWIDTH) + 1);
        player.position.y = 400;

        players[i] = player;
     
        stage.addChild(player)
    }
}