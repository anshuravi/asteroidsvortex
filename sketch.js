

// Define the gameState variable & set it to the desired inital value.
let gameState = 'title';
let fontRegular;
let canvas;
let landscape;
let bgR = 100;
let bgG = 240;
let bgB = 100;
let vortex;
let portal;
var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
let timer = 30;
let bgImg;

var MARGIN = 40;
let noiseMax = 5;
let aoff = 0;
var inc = 0.1;
var scl = 10;
var cols, rows;
let picture=[];
let mr;


function preload (){
  vortex = loadImage('vortex.gif')
  portal = loadImage('portal.gif')
  landscape = loadImage('landscape1.jpg')
   fontRegular = loadFont('Play-Regular.ttf');
  time = loadImage('purplefire.gif')
    for(let i = 0; i < 8; i++){
    picture[i]=loadImage("images/image"+(i+1)+".jpg");
  }
   bulletImage = loadImage('asteroids_bullet.png');
  shipImage = loadImage('asteroids_ship0001.png');
  particleImage = loadImage('asteroids_particle.png');
  img = loadImage("firevortex.gif");
}
// Set up
function setup() {
  canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  frameRate(60);
  textFont(fontRegular);
  bgImg = landscape;

  ship = createSprite(width/2, height/2);
  ship.maxSpeed = 6;
  ship.friction = 0.98;
  ship.setCollider('circle', 0, 0, 20);

  ship.addImage('normal', shipImage);
  ship.addAnimation('thrust', 'asteroids_ship0002.png', 'asteroids_ship0007.png');

  asteroids = new Group();
  bullets = new Group();

  for(var i = 0; i<8; i++) {
    var ang = random(360);
    var px = width/2 + 1000 * cos(radians(ang));
    var py = height/2+ 1000 * sin(radians(ang));
    createAsteroid(3, px, py);
  }
}

/* The draw loop content is drawn depending on the current value
of gameState. The 'switch' function here is replacing what could
be an 'if-else' statement. */
function draw() {
  // The switch call expects to find a varible within the parentheses.
  switch (gameState) {
    /* Each 'screen' that you want should be defined with a word,
    this word will correspond to a 'case' as seen below. The case
    will be followed by all of functions you want within that screen
    and end with a 'break;'. */
    case 'title':
      titleScreen();
      break;
    case 'lvl1':
      gameStage1();
      break;
    case 'gameover':
      gameOver();
      break;
  }
}

/* Key release listener for starting game while on the title and game
over screens and changing the background color on the main game screen.
Here we can see how the variable 'gameState' gets changed to trigger a
new screen to be displayed. */
function keyReleased() {
  if (gameState === 'title' || gameState === 'gameover') {
    if (key === 's' || key === 'S' ) {
      gameState = 'lvl1';
      bgR = 100;
      bgG = 240;
      bgB = 100;
    }
  } else if (gameState === 'lvl1') {
    if (key === 's' || key === 'S' ) {

    } else if(key == "R" || key == "r"){
    mr = int(random(picture.length));
    bgImg = picture[mr];
    console.log(picture[mr]);
  }
  }

}

// Function for rendering the title screen.
function titleScreen() {
 background(portal);
      stroke(255);
  strokeWeight(4.5)
  fill(155, 66, 245);
  textSize(45);
  textAlign(CENTER);
  text('Asteroids of the Vortex', width*0.5, height*0.33);
  textSize(35);
  text('Press "S" To Start Game', width*0.5, height*0.66);
}

// Function for rendering the main game play screen.
function gameStage1() {
  background(bgImg);
  image(img, -20,-20);

  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 0) {
    gameState = 'gameover';
  }
function keyPressed(){

}
   textAlign(CENTER, CENTER);
  textSize(100);
  fill(155, 66, 245)
  stroke(255);
  strokeWeight(4.5)
  text(timer, width/2, height/2);
  stroke(255);
  fill(155, 66, 245);
  strokeWeight(4.5)
  textSize(50);
  textAlign(CENTER);
  text('Destroy the asteroids!', width*0.5, height*0.1);
  textSize(30);
  text('Press "X" to shoot!', width*0.5, height*0.2);
  textSize(30);
  text('Move with the arrow keys!', width*0.5, height*0.85);
  textSize(30);
  text('Press "R" to travel through time.', width*0.5, height*0.95);

  stroke(255);
  fill(255);

  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
    if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
    if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
    if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }

  asteroids.overlap(bullets, asteroidHit);

  ship.bounce(asteroids);

  if(keyDown(LEFT_ARROW))
    ship.rotation -= 4;
  if(keyDown(RIGHT_ARROW))
    ship.rotation += 4;
  if(keyDown(UP_ARROW))
  {
    ship.addSpeed(0.2, ship.rotation);
    ship.changeAnimation('thrust');
  }
  else
    ship.changeAnimation('normal');

  if(keyWentDown('x'))
  {
    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
    bullet.life = 30;
    bullets.add(bullet);
  }
  function asteroidHit(asteroid, bullet) {
  var newType = asteroid.type-1;

  if(newType>0) {
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
    createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }

  for(var i=0; i<10; i++) {
    var p = createSprite(bullet.position.x, bullet.position.y);
    p.addImage(particleImage);
    p.setSpeed(random(3, 5), random(360));
    p.friction = 0.95;
    p.life = 15;
  }

  bullet.remove();
  asteroid.remove();
}

  drawSprites();
}




// Function for rendering game over screen.
function gameOver() {
  background(portal);
  fill(155, 66, 245)
  stroke(255);
  strokeWeight(5)
  textSize(75);
  textAlign(CENTER);
  text('GAME OVER', width*0.5, height*0.55);
}
