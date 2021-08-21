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

  bg_img = loadImage("./assets/background.png");

  var button;
}

function setup()  
{
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  wall1 = new Base (width -(width+20) , height-450 ,width/6,140);
  wall2 = new Base (width-20, height-450 ,width/6,140);

  bridge = new Bridge(width/60,{x:wall1.body.position.x -60 , y:(wall1.body.position.y - 50)})
  bridgeLink = new Link(bridge,wall2)

  for(var i = 0 ; i < 8; i++)
  {
    var x = random(100 , width-100);
    var y = random(-10,140);
    var stone = new Stones(x,y,60);
    stones.push(stone);
  }

  zombie = createSprite(0 , height - 110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 3;

  button = createImg("./assets/axe.png");
  button.position(width - 200, height / 2 - 50);
  button.size(150,150);

  button.mouseClicked(handleButtonPress,console.log('#'));
}

function draw() 
{
  background("green");
  

  Engine.update(engine);

  wall1.show();
  wall2.show();

  imageMode(CENTER);
  image(bg_img,width/2,height/2,width,height);

  for(var i = 0;i < stones.length; i ++)
  {
    stones[i].show();
  }

  bridge.show();

  if(zombie.position.x > width-100)
  {
    zombie.velocityX = -3;
    zombie.changeAnimation("righttoleft");
  }

  if(zombie.position.x < 100)
  {
    zombie.velocityX = 3;
    zombie.changeAnimation("lefttoright");
  }
  

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