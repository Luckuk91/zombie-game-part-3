var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var zombieGroup;
var heart1,heart2,heart3,heart1Image,heart2Image,heart3Image;
var bulletsGroup;
var score = 0;



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png")

  heart1Image = loadImage("assets/heart_1.png")
  heart2Image = loadImage("assets/heart_2.png")
  heart3Image = loadImage("assets/heart_3.png")

  
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)



heart1 = createSprite(displayWidth-250,40,20,20);
heart1.addImage(heart1Image);
heart1.scale = 0.4;

heart2 = createSprite(displayWidth-200,40,20,20);
heart2.addImage(heart1Image);
heart2.scale = 0.4;

heart3 = createSprite(displayWidth-150,40,20,20);
heart3.addImage(heart1Image);
heart3.scale = 0.4;





 zombieGroup = new Group();
 
 bulletsGroup = new Group();


}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)

  var bullet = createSprite(player.x+50,player.y-30,10,10);
  bullet.velocityX = 10;
  bulletsGroup.add(bullet);
 

}

if(zombieGroup.isTouching(bulletsGroup)){
  for(var i = 0; i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletsGroup)){
      zombieGroup[i].destroy();
      bulletsGroup.destroyEach();
      score = score+2;
    }
  }
}

if(zombieGroup.isTouching(player)){
for(var i = 0; i<zombieGroup.length;i++){
if(zombieGroup[i].isTouching(player)){
zombieGroup[i].destroy();
}
}
}


enemy();

drawSprites();

text("score"+score,800,50);
if(score>5){
  textSize(100);
  text("you won the game", 400,400);
  
}


}

function enemy(){


  if(frameCount % 100 === 0){
 
  
  zombie = createSprite(random(500,1000),random(100,500),30,30);
  zombie.addImage(zombieImg);
  zombie.scale  = 0.2;

  zombie.velocityX = -2;

  zombie.debug = true;
  zombie.setCollider("rectangle",0,0,400,600);
  zombieGroup.add(zombie);
}

}

