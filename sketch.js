//CREATED BY AADI GOLECHA ON 16 AUGUST 
// ZOMBIE CRUSH GAME

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base, wall1, wall2;
var bridge, bridgeLink;

var zombie1, zombie2, zombie3, zombie4;
var zombie;

var bgimg;
var stones = [];

function preload()
{
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  bgimg = loadImage("./assets/background.png");

  var breakButton;
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  
  //base = new Base (windowWidth/2, windowHeight-20 ,windowWidth,20);
  push();
  fill(115, 75, 26);
  wall1 = new Base (width -(width+20) , height-200 ,width/6,140);
  wall2 = new Base (width-20, height-200 ,width/6,140);
  pop();
  push();
  fill("red");
  bridge = new Bridge(width/60,{x:wall1.body.position.x -60 , y:(wall1.body.position.y - 50)})
  bridgeLink = new Link(bridge,wall2)
  pop();

  for(var i = 0 ; i < 8; i++)
  {
    var x = random(width/2 - 200 , width/2 + 200);
    var y = random(-10,140);
    var stone = new Stones(x,y,60);
    stones.push(stone);
  }

  zombie = createSprite(0 , height - 110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 3;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakButton");

  breakButton.mouseClicked(handleButtonPress,console.log('#'));
}

function draw() 
{
  background("green");
  Engine.update(engine);


  for(var i = 0;i < stones.length; i ++)
  {
    stones[i].show();
  }

  //base.show();
  wall1.show();
  wall2.show();
  bridge.show();

  drawSprites();

}

function handleButtonPress()
{
  bridgeLink.detach();
  console.log('join');
  setTimeout(()=> 
  {
    bridge.break();
    console.log('in time')
  }, 1500);
}