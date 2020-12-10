var player;
var level1;
var door1;
var level1Inside;
var gameState="start"
var edges=[];
var wall1
var walltop
var wallleft
var wallright
var walldown
var levelEnd
var photo
var bigtable
var smalltable
var photo
var sofa
var textBox
var foodGroup;
var score=0

function preload(){
sansUP=loadAnimation("sprites/sansUP1.png","sprites/sansUP2.png","sprites/sansUP3.png","sprites/sansUP4.png");
sansDOWN=loadAnimation("sprites/sansDOWN1.png","sprites/sansDOWN2.png","sprites/sansDOWN3.png","sprites/sansDOWN4.png");
sansLEFT=loadAnimation("sprites/sansLEFT1.png","sprites/sansLEFT2.png","sprites/sansLEFT3.png","sprites/sansLEFT4.png");
sansRIGHT=loadAnimation("sprites/sansRIGHT1.png","sprites/sansRIGHT2.png","sprites/sansRIGHT3.png","sprites/sansRIGHT4.png");
sansIDLE=loadImage("sprites/sansIDLE.png");
sansDOWNIDLE=loadAnimation("sprites/sansDOWN1.png");
sansUPIDLE=loadAnimation("sprites/sansUP1.png");
sansLEFTIDLE=loadAnimation("sprites/sansLEFT1.png");
sansRIGHTIDLE=loadAnimation("sprites/sansRIGHT1.png");
level1Outside=loadImage("sprites/level1.png");
level1Door=loadImage("sprites/door.png");
level1Inside=loadImage("sprites/level1Inside.png");
apple=loadImage("sprites/apple2.png");
banana=loadImage("sprites/banana2.png");
melon=loadImage("sprites/melon2.png");
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-110);
  player =createSprite(250,400,50,50);
  level1 =createSprite(700,150,500,500);
  door1 =createSprite(845,180,60,50);
  door1.addImage("level1Door",level1Door);
  level1.addImage("level1Outside",level1Outside);
  player.addAnimation("sansIDLE",sansIDLE);
  player.addAnimation("sansUP",sansUP);
  player.addAnimation("sansDOWN",sansDOWN);
  player.addAnimation("sansLEFT",sansLEFT);
  player.addAnimation("sansRIGHT",sansRIGHT);
  player.addAnimation("sansDOWNIDLE",sansDOWNIDLE);
  player.addAnimation("sansUPIDLE",sansUPIDLE);
  player.addAnimation("sansLEFTIDLE",sansLEFTIDLE);
  player.addAnimation("sansRIGHTIDLE",sansRIGHTIDLE);
  player.depth=level1.depth+1
  //level1.debug=true
  //player.debug=true
  //door1.debug=true
  level1.setCollider("rectangle",0,0,400,260)
  door1.setCollider("rectangle",-140,70,100,100)
  door1.scale=0.9
  player.scale=0.2
  wall1 =createSprite(displayWidth/1.34,450,displayWidth,200);
  walltop =createSprite(displayWidth/2,200,displayWidth,10);
  wallleft =createSprite(110,displayHeight/2,10,displayHeight);
  walldown =createSprite(displayWidth/2,displayHeight-200,displayWidth,5)
  photo =createSprite(1000,100,250,140)
  photo.setCollider("rectangle",0,0,200,250)
 // photo.debug=true
  table =createSprite(250,800,130,100);
  sofa =createSprite(770,800,600,200);
 foodGroup =new Group();
 
 
 
 //createSprite(x,y,width,height)
  walltop.visible=false
  wall1.visible=false
  wallleft.visible=false
  walldown.visible=false
  photo.visible=false
  table.visible=false
  sofa.visible=false
}

function draw() {
  background("white");  
  playerMovement();
  borderCreation();
  textSize(40);
  fill("blue")
  text("score:"+score,displayWidth-200,50)
if(gameState==="start"){
  stage1();
}
if(gameState==="level1Inside"){
  background(level1Inside);
  foodSpawn();
  stage2();
  text("score:"+score,displayWidth-200,50)
  for(var i=0; i<foodGroup.length; i=i+1){
    if(player.isTouching(foodGroup.get(i))){
      foodGroup.get(i).lifetime=0
      //gameState="end";
      score=score+1
    }
  }
}
if(score===10){
  gameState="end"
}
if(gameState==="end"){
background("black");
textSize(40);
text("GameOver",displayWidth/2,displayHeight/2);


}
  //console.log(World.mouseX+"---"+World.mouseY)
  drawSprites();
}

function borderCreation(){

edges = createEdgeSprites();
if (player.isTouching(edges[2]) || player.isTouching(edges[3]) || player.isTouching(edges[1])|| player.isTouching(edges[0])) {
  player.bounceOff(edges[2]);
  player.bounceOff(edges[3]);
  player.bounceOff(edges[0]);
  player.bounceOff(edges[1]);
}

}

function playerMovement(){

  if(keyDown("RIGHT_ARROW")){
    player.changeAnimation("sansRIGHT",sansRIGHT);
    player.velocityX=8
    player.velocityY=0
  }
  if(keyDown("LEFT_ARROW")){
    player.changeAnimation("sansLEFT",sansLEFT);
    player.velocityX=-8
    player.velocityY=0
  }
  if(keyDown("UP_ARROW")){
    player.changeAnimation("sansUP",sansUP);
    player.velocityX=0
    player.velocityY=-8
  }
  if(keyDown("DOWN_ARROW")){
    player.changeAnimation("sansDOWN",sansDOWN);
    player.velocityX=0
    player.velocityY=8
  }
  if(keyWentUp("RIGHT_ARROW")){
    player.velocityY=0
    player.velocityX=0
    player.changeAnimation("sansRIGHTIDLE",sansRIGHTIDLE);
  }
  if(keyWentUp("LEFT_ARROW")){
    player.velocityY=0
    player.velocityX=0
    player.changeAnimation("sansLEFTIDLE",sansLEFTIDLE);
  }
  if(keyWentUp("UP_ARROW")){
    player.velocityY=0
    player.velocityX=0
    player.changeAnimation("sansUPIDLE",sansUPIDLE);
  }
  if(keyWentUp("DOWN_ARROW")){
    player.velocityY=0
    player.velocityX=0
    player.changeAnimation("sansDOWNIDLE",sansDOWNIDLE);
  }
}

function stage1(){
  player.collide(level1);
  if(player.isTouching(door1)){
  //disable level1 one house and the door so the in side of the outside house shows
  gameState="level1Inside"
  level1.visible=false
  door1.visible=false

  }
}

function stage2(){
  player.collide(wall1);
  player.collide(walltop);
  player.collide(wallleft);
  player.collide(walldown);
  player.collide(table);
  player.collide(sofa);
}

function foodSpawn(){
if(frameCount%60===0){
    var food=createSprite(300,500,5,5);
    var randFood=Math.round(random(1,3));
    var randLocation=Math.round(round(1,2))
    if(randLocation===1){
    //upperPassage
      var randY=random(240,340);
      var randX=random(120,1770);
      food.x=randX
      food.y=randY
      }
    else if(randLocation===2){
      var randY=random(600,670);
      var randX=random(120,1550);
      food.x=randX
      food.y=randY
    }
      if(randFood===1){
      //apple
      food.addImage(apple);
      }
      else if(randFood===2){
      //banana
      food.addImage(banana);
      }
      else if(randFood===3){
      //melon
      food.addImage(melon);
      }
      food.lifetime=100;
      foodGroup.add(food);
}
}
