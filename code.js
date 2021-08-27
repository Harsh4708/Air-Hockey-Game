var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["90166fb2-75c9-4e58-aa02-efbc64de90a7"],"propsByKey":{"90166fb2-75c9-4e58-aa02-efbc64de90a7":{"name":"ball","categories":["sports"],"frameCount":1,"frameSize":{"x":393,"y":394},"looping":true,"frameDelay":2,"jsonLastModified":"2021-01-05 19:36:17 UTC","pngLastModified":"2021-01-05 19:36:28 UTC","version":"_voB8z1tybHuDAKJb3XrVhG9nCoFKaj.","sourceUrl":"assets/api/v1/animation-library/gamelab/_voB8z1tybHuDAKJb3XrVhG9nCoFKaj./category_sports/soccer_yellow.png","sourceSize":{"x":393,"y":394},"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/api/v1/animation-library/gamelab/_voB8z1tybHuDAKJb3XrVhG9nCoFKaj./category_sports/soccer_yellow.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//creating net for goal
var net1 = createSprite(200, 20,100,20);
net1.shapeColor="black";
var net2 = createSprite(200,380,100,20);
net2.shapeColor="black";

//creating player and computer
var computer = createSprite(200, 45,60,12);
computer.shapeColor="red";
var player = createSprite(200, 355,60,12);
player.shapeColor="blue";

//creating ball
var ball = createSprite(200, 200,20,20);
ball.setAnimation("ball");
ball.scale=0.08;

//score 
var computerScore=0;
var playerScore=0;

var gameState="serve";

function draw() {
  background("white");
  
  //creating edges
  createEdgeSprites();
  
  //make sprites bounce off and collide
  ball.bounceOff(computer);
  ball.bounceOff(player);
  ball.bounceOff(rightEdge);
  ball.bounceOff(leftEdge);   


  //creating line loop
  for (var num = 0; num < 400; num=num+30) {
    line(num, 200, num+20, 200);
  }
  
  if (gameState=="serve") {
    
  //press enter to start text
  textSize(25);
  fill("yellow");
  text(" Press ENTER To Start ", 80, 150);

 

  }
  
  if (gameState=="play") {
  //controls to computer and player 
  player.x=World.mouseX;
  computer.x=ball.x;
  
  
  //score counting
  if (ball.isTouching(net1)) {
    playerScore=playerScore+1;
    ball.x=200;
    ball.y=200;
    ball.velocityX=0;
    ball.velocityY=0;
    
  }
  
    if (ball.isTouching(net2)) {
    computerScore=computerScore+1;
    ball.x=200;
    ball.y=200;
    ball.velocityX=0;
    ball.velocityY=0;
  }
  
  if (playerScore==10 || computerScore==10) {
  textSize(30);
    fill("yellow");
    text("Game Over", 120, 150);
    gameState="end";
  }
  }
   
if (gameState=="end") {
  ball.velocityX=0;
  ball.velocityY=0;
  player.velocityX=0;
  player.velocityY=0;
}

//exception command which can be put outside game state
if (ball.isTouching(bottomEdge)) {
    ball.x=200;
    ball.y=200;
    ball.velocityX=0;
    ball.velocityY=0;
  }
  
   //press enter to start
  if (keyDown("ENTER")) {
    ball.velocityX=-7;
    ball.velocityY=7;
    gameState="play";
  }

//score  
 textSize(25);
 fill("black");
text(playerScore, 20, 230);
text(computerScore, 20, 190); 
 
 
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
