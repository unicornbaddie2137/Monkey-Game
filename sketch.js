
var monkey , monkey_running
var ground; 
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState = "play";
var survivalTime = 0;
var score = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  monkey = createSprite(50,380,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  
  
  ground = createSprite(200,390,400,20);
  ground.velocityX = -5;

  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background(255);
  
  
    if (ground.x < 200){
      ground.x = ground.width/2
    }
    monkey.collide(ground);
  


    monkey.velocityY = monkey.velocityY+0.8  
    if (gameState==="play")
    {
      if(keyDown("space") && monkey.y >= 159) 
      {
        monkey.velocityY = -12;
      }
      food();
      obstacle();
      
      textSize(20);
      survivalTime = Math.round(frameCount/50)
      text("Survival Time: "+survivalTime, 250,50);
      
      text("Score: "+ score,250,100 );
      
      if(FoodGroup.isTouching(monkey))
        {
          score++;  
          for (var i = 0; i < FoodGroup.length; i++) 
          {    
            if (FoodGroup[i].isTouching(monkey)) 
            {
              FoodGroup[i].destroy();
            }
          }
        }
    
    }
  
    if (obstacleGroup.isTouching(monkey))
      {
        gameState="end";
      }
  if (gameState=== "end")
    {
      textSize(45);
      fill("red");
      text("GAME OVER!!",75,50)
      
        
    }
  
  drawSprites();

  
  }

  function food()
  {
    if (frameCount%80===0)
      {
        var banana = createSprite(400,160,20,20);
        banana.y = Math.round(random(120,200));
        banana.addImage(bananaImage);
        banana.velocityX = -5;
        banana.lifetime = 80;
        banana.scale = 0.1;
        
        FoodGroup.add(banana);
      }
  }

  function obstacle()
  {
    if (frameCount%300===0)
      {
        var obstacles = createSprite(400,330,20,20);
        obstacles.addImage(obstacleImage);
        obstacles.velocityX = -5;
        obstacles.lifetime = 80;
        obstacles.scale = 0.3;
        obstacleGroup.add(obstacles);  
        obstacleGroup.debug = true;
      }

  }

  





