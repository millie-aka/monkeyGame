
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var bananaScore=0;
var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("forestMerge2.png");
  monkeyStill_image=loadAnimation("sprite_0.png");

 
 
}



function setup() {
  
  createCanvas(600,400);
  
   ground=createSprite(300,200,300,400);
  

  ground.addImage("ground",groundImage);
   //ground.scale=0.8;
  ground.x=ground.width/2;
  ground.y=100;
  //ground.debug=true;
  
 
  
  invisibleGround=createSprite(300,385,600,20);
  invisibleGround.visible = false;
  
  
  
  monkey = createSprite(70,250,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("monkey still",monkeyStill_image);
  monkey.scale=0.25;
  monkey.debug=true;
  
 
  obstaclesGroup = new Group();
  bananasGroup = new Group();

  
}


function draw() {
  
  background(200);
  
  if(gameState=="play"){
    
    score=Math.ceil((frameCount/getFrameRate()));
    
      ground.velocityX=-10;
   
  if(keyDown("space") && monkey.y>=297 ){
    
    monkey.velocityY=-15;
    
  }
  monkey.velocityY=monkey.velocityY+0.5;
    
  if(ground.x<0){
    
    ground.x=ground.width/2;
    
  }
    
  
  
    
    
  myBanana=spawnBananas();
    
    //console.log("myBanana:"+myBanana);
    
    if(myBanana!=0){
      
      myBanana.debug=true;
      
      console.log("Banana lifetime:"+banana.lifetime);  
      
         if(bananasGroup.isTouching(monkey)){
      
      bananaScore+=1;    
            
      console.log("Banana score:"+bananaScore);  
           
      myBanana.lifetime = 0;  
      console.log("banana after life:"+myBanana.lifetime);       
    }
        
    }
    
 spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
      
      gameState="over";
      
    }
    
  }
  
  else if(gameState=="over"){
    
    ground.velocityX=0;
    monkey.velocityY=0;
    
    bananasGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    bananasGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    monkey.changeAnimation("monkey still",monkeyStill_image);
    
    
  }
  

  
  
  
  monkey.collide(invisibleGround);
  

  
  drawSprites(); 
  
  fill("white");
  textSize(15);
  text("Survival Time: "+score,450,50);
   text("Bananas: "+bananaScore,450,70);
  
  
}

function spawnBananas(){
  
  num = Math.round(random(60,100));
  
  
   if(frameCount % num == 0){
    
    banana = createSprite(700,Math.round(random(30,170)),10,10);
    banana.addImage(bananaImage);
    banana.scale=0.4;
    banana.velocityX=-10;
    banana.scale=0.2;
      
    banana.lifetime=80;
    bananasGroup.add(banana);
     
    return banana; 
    
  }
  
  return 0;
  
}

function spawnObstacles(){
  
  num = Math.round(random(60,150));
  
    if(num%10<5){
       num1=Math.floor(num / 10) * 10;
       
  }
  
  else{
       num1=Math.ceil(num / 10) * 10;
       
  }
  
  if(frameCount % num1 == 0){
    
    obstacle = createSprite(700,380,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.4;
    obstacle.velocityX=-10;
    
    obstacle.setCollider("rectangle",0,0,100,100);
    obstacle.debug=true;
    obstacle.lifetime=80;
    obstaclesGroup.add(obstacle);
  
    
  }
  
}




