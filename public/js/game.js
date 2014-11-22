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

var maxWidth = 800;
var maxHeight = 400;
var maxJumpHeight = 120;
var floorLevel = 26;

var players = [];
var playerid = 0;
var otherid = 1;
var stage = {};

function init() {

    document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
    document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

    // initialize an instance of a pixi stage
    stage = new PIXI.Stage(0x66FF99);
 
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(maxWidth, maxHeight);
 
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    var backgroundTexture = PIXI.Texture.fromImage("resources/clouds.jpg");
    background = new PIXI.TilingSprite(backgroundTexture, maxWidth, maxHeight);
    stage.addChild(background);

    var floorTexture = PIXI.Texture.fromImage("resources/floor.png");
    floor = new PIXI.TilingSprite(floorTexture, maxWidth, floorLevel);
    floor.tileScale.x = 0.125;
    floor.tileScale.y = 0.125;
    floor.position.y = maxHeight - floorLevel;

    //floor.scale.y = 0.5;
    //floor.anchor.y = 380;
    console.log(floor);
    stage.addChild(floor);

    requestAnimFrame( animate );
    
    connect();
    

    createPlayers(2);

    
 
    function animate() {
        
        calculateMovements();
        requestAnimFrame( animate );


        //bunny.rotation += 0.1;
 
        // render the stage   
        renderer.render(stage);
    }
}

function calculateMovements() {
    for (var i = 0; i < players.length; i++) {
        var tempX = players[i].position.x;
        var tempY = players[i].position.y;

        if (players[i].moving !== false) {
            if (players[i].moving === 'left') {
                if (players[i].position.x > 0) {
                    players[i].position.x -= 2;
                }
            }
            else if (players[i].moving === 'right') {
                if (players[i].position.x < maxWidth) {
                    players[i].position.x += 2;
                }
            }
        }
        if (players[i].jump !== false) {
            if (players[i].jump === 'up') {
                if (players[i].jumpHeight < maxJumpHeight) {
                    players[i].position.y -= 3;
                    players[i].jumpHeight += 3;
                }
                else {
                    players[i].jump = 'down';
                }
            }
            else if (players[i].jump === 'down') {
                if (players[i].jumpHeight > 0) {
                    players[i].position.y += 3;
                    players[i].jumpHeight -= 3;
                }
                else {
                    players[i].jump = false;
                }
            }
        }
        if (i === playerid) {
            if (tempX !== players[i].position.x || tempY !== players[i].position.y) {
                sendPlayerData(playerid,players[0].position.x,players[0].position.y);
            }
        }
    }
}

function onkey(ev, key, pressed) {
    switch(key) {
        case KEY.LEFT:  
            if (pressed) {
                players[playerid].moving = 'left';
            }
            else {
                players[playerid].moving = false;
            }
            ev.preventDefault(); 
            break;
        case KEY.RIGHT: 
            if (pressed) {
                players[playerid].moving = 'right';
            }
            else {
                players[playerid].moving = false;
            }
            ev.preventDefault(); 
            break;
        case KEY.SPACE:
            if (players[playerid].jump === false) {
                players[playerid].jump = 'up';    
            }
            ev.preventDefault(); 
            break;
    }
    //sendPlayerData(playerid,players[0].position.x,players[0].position.y);
           
}

function move(player, direction) {
    if (direction === 'left') {
        if (players[player].position.x > 0) {
            players[player].moving = 'left';
            //players[player].position.x -= 4;   
        }
    }
    else if (direction === 'right') {
        if (players[player].position.x < maxWidth) {
            //players[player].position.x += 4;
            players[player].moving = 'right';
        }
    }
    
   // sendPlayerData(player,players[player].position.x,players[player].position.y);
}

function sendUpdatedMovement() {
    data = {
        player: {
            id : playerid,
            x : players[playerid].x,
            y : players[playerid].x
        }
    }
    // send players[playerid]
}

function updateMovement(player) {
    players[player.id].position.x = player.x;
    players[player.id].position.y = player.y;
}

function createPlayers(number) {

    var playerTexture = PIXI.Texture.fromImage("resources/bunny.png");

    for (var i = 0; i < number; i++) {
        player = new PIXI.Sprite(playerTexture);
     
        // define the players anchor point
        player.anchor.x = 0.5;
        player.anchor.y = 1.0;
     
        // set the players starting point
        player.position.x = Math.floor((Math.random() * maxWidth) + 1);
        player.position.y = maxHeight - floorLevel;

        player.jumpHeight = 0;
        player.jump = false;
        player.moving = false;

        players[i] = player;
     
        stage.addChild(player)
    }
}



function updateOtherPlayers(playerData) {
  console.log(playerData);
  players[otherid].position.x = playerData.player.x;
  players[otherid].position.y = playerData.player.y;
}

