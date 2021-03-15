var bg , bgImage
var playerShip , playerShipImage
var shipImg1 , shipImg2 , shipImg3 , shipImg4 
var spaceShipGroup1 , spaceShipGroup2,spaceShipGroup3,spaceShipGroup4
var manImg1 , manImg2
var manGroup1 , manGroup2
var bullet , bulletImg,bulletGroup
var heartImg , heart1 , heart2 , heart3
var score =  0
var PLAY =  1
var END = 0
var gameState = PLAY
var life = 3
var gameOverImg,gameOver
var restartImg,restart

function preload(){

  bgImage = loadImage("images/sky.jpg")
  playerShipImage = loadImage("images/playerShip.png")
  shipImg1 = loadImage("images/ship1.png")
  shipImg2 = loadImage("images/ship2.png")
  shipImg3 = loadImage("images/ship3.png")
  shipImg4 = loadImage("images/ship4.png")
  manImg1 = loadImage("images/man1.png")
  manImg2 = loadImage("images/man2.png")
  bulletImg = loadImage("images/bullet.png")
  heartImg = loadImage("images/hearts.png")
  gameOverImg = loadImage("images/gameover.png")
  restartImg = loadImage("images/restart.png")
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2,height/2,width,height)
  bg.addImage(bgImage)
  bg.velocityY = 1;

  playerShip = createSprite(width/2,height-100 ,10,10)
  playerShip.scale = 0.25
  playerShip.addImage(playerShipImage)

  heart1 = createSprite(50,50,10,10)
  heart1.scale = 0.1
  heart1.addImage(heartImg)

  heart2 = createSprite(80,50,10,10)
  heart2.scale = 0.1
  heart2.addImage(heartImg)
  
  heart3 = createSprite(110,50,10,10)
  heart3.scale = 0.1
  heart3.addImage(heartImg)

  gameOver = createSprite(windowWidth/2,windowHeight/2 - 150,20,20)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false
  restart = createSprite(windowWidth/2,windowHeight/2 + 50 ,20,20)
  restart.addImage(restartImg)
  restart.scale = 0.5
  restart.visible = false

  spaceShipGroup1 = new Group()
  spaceShipGroup2 = new Group()
  spaceShipGroup3 = new Group()
  spaceShipGroup4 = new Group()
  manGroup1 = new Group()
  manGroup2 = new Group()
  bulletGroup = new Group()
}

function draw() {
  background(0)
  if(gameState === PLAY){

      if(bg.y > height){
        bg.y = bg.height/2
      } 

      if(keyDown("a")){
          playerShip.x = playerShip.x -7
      }
      if(keyDown("d")){
        playerShip.x = playerShip.x + 7
      }

      var selectShip = Math.round(random(1,4))
      
      if(frameCount % 200 ===0){
          if(selectShip === 1){
            spawnEnemyShip1()
          }
          else if(selectShip === 2){
            spawnEnemyShip2()
          }
          else if(selectShip === 3){
            spawnEnemyShip3()
          }
          else if(selectShip === 4){
            spawnEnemyShip4()
          }
      }

      var selectMan = Math.round(random(1,2))

      if(frameCount % 350 === 0){
          if(selectMan === 1){
            spawnMan1()
          }
          else if(selectMan === 2){
            spawnMan2()
          }
      }

      if(keyDown("shift")){
        spawnBullet()
      }

      if(bulletGroup.isTouching(spaceShipGroup1)){
        score += 1
        bulletGroup.destroyEach()
        spaceShipGroup1.destroyEach()
      }

      if(bulletGroup.isTouching(spaceShipGroup2)){
        score += 2
        bulletGroup.destroyEach()
        spaceShipGroup2.destroyEach()
      }

      if(bulletGroup.isTouching(spaceShipGroup3)){
        score += 2
        bulletGroup.destroyEach()
        spaceShipGroup3.destroyEach()
      }

      if(bulletGroup.isTouching(spaceShipGroup4)){
        score += 1
        bulletGroup.destroyEach()
        spaceShipGroup4.destroyEach()
      }


      if(playerShip.isTouching(manGroup1)){
        score += 5
        manGroup1.destroyEach()
      }

      if(playerShip.isTouching(manGroup2)){
        score += 5
        manGroup2.destroyEach()
      }

      if(bulletGroup.isTouching(manGroup1)){
        life -= 1
        bulletGroup.destroyEach()
          manGroup1.destroyEach()
          if(life === 2){
              heart3.visible = false
          }
          if(life === 1){
            heart3.visible = false
            heart2.visible = false
        }
        if(life === 0){
          heart3.visible = false
          heart2.visible = false
          heart1.visible = false
          gameState = END
      }
      }

      if(bulletGroup.isTouching(manGroup2)){
        life -= 1
        bulletGroup.destroyEach()
          manGroup2.destroyEach()
          if(life === 2){
            heart3.visible = false
        }
        if(life === 1){
          heart3.visible = false
          heart2.visible = false
      }
      if(life === 0){
        heart3.visible = false
        heart2.visible = false
        heart1.visible = false
        gameState = END
    }
      }
    }
    else if(gameState === END){
        bg.velocityY = 0
        gameOver.visible = true
        restart.visible = true

        spaceShipGroup1.setVelocityYEach(0)
        spaceShipGroup2.setVelocityYEach(0)
        spaceShipGroup3.setVelocityYEach(0)
        spaceShipGroup4.setVelocityYEach(0)
        bg.velocityY = 0
        manGroup1.setVelocityYEach(0)
        manGroup2.setVelocityYEach(0)
        spaceShipGroup1.setLifetimeEach(-1)
        spaceShipGroup2.setLifetimeEach(-1)
        spaceShipGroup3.setLifetimeEach(-1)
        spaceShipGroup4.setLifetimeEach(-1)
        manGroup1.setLifetimeEach(-1)
        manGroup2.setLifetimeEach(-1)

        if(mousePressedOver(restart)){
         reset()
        }

    }

  drawSprites();

  textSize(30)
  stroke("red")
  fill("lime")
  strokeWeight(3)
  text("Score: "+ score , 40,110)
}

function spawnEnemyShip1(){
 var ship1 =  createSprite(Math.round(random(100 , width - 100)), 0 , 23 , 23)
 var rand = Math.round(random(1,2))
 
  ship1.addImage(shipImg1)
 
 ship1.scale = 0.2;
  ship1.velocityY = 3;
  ship1.lifetime = height/3
  spaceShipGroup1.add(ship1)
}

function spawnEnemyShip2(){
  var ship2 =  createSprite(Math.round(random(100 , width - 100)), 0 , 23 , 23)
  
   ship2.addImage(shipImg2)
  
  ship2.scale = 0.2;
   ship2.velocityY = 7;
   ship2.lifetime = height/7
   spaceShipGroup2.add(ship2)
 }
 
 function spawnEnemyShip3(){
  var ship3 =  createSprite(Math.round(random(100 , width - 100)), 0 , 23 , 23)
 
   ship3.addImage(shipImg3)
  
  ship3.scale = 0.2;
   ship3.velocityY = 5;
   ship3.lifetime = height/5
   spaceShipGroup3.add(ship3)
 }

 function spawnEnemyShip4(){
  var ship4 =  createSprite(Math.round(random(100 , width - 100)), 0 , 23 , 23)
 
   ship4.addImage(shipImg4)
  
  ship4.scale = 0.2;
   ship4.velocityY = 3;
   ship4.lifetime = height/3
   spaceShipGroup4.add(ship4)
 }

function spawnMan1(){
  var man1 = createSprite(Math.round(random(100 , width - 100)), 0 , 23 , 23)
  man1.addImage(manImg1)
  man1.scale = 0.4;
  man1.velocityY = 2;
  man1.lifetime = height/2
  manGroup1.add(man1)
}

function spawnMan2(){
  var man2 = createSprite(Math.round(random(100 , width - 100)), 0 , 23 , 23)
  man2.addImage(manImg2)
  man2.scale = 0.4;
  man2.velocityY = 3;
  man2.lifetime = height/3
  manGroup2.add(man2)
}

function spawnBullet(){

  if(frameCount % 10 === 0){
  var bullet = createSprite(playerShip.x , playerShip.y , 10,10)
  bullet.addImage(bulletImg)
  bullet.scale = 0.2;
  bullet.velocityY = -5;
  bullet.lifetime = height/5
  bulletGroup.add(bullet)
  playerShip.depth = bullet.depth + 1
  }
}

function reset(){

  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  life = 3
  heart1.visible = true
  heart2.visible = true
  heart3.visible = true
  score = 0
  spaceShipGroup1.destroyEach()
  spaceShipGroup2.destroyEach()
  spaceShipGroup3.destroyEach()
  spaceShipGroup4.destroyEach()
  manGroup1.destroyEach()
  manGroup2.destroyEach()
  
}
