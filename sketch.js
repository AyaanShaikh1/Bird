const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bg ;
var bg1;
var pole;
var gameState = "play";


function preload() {  
bg1 = loadImage("sprites/bg.png");
g1 = loadImage("sprites/ground.png");
pipe1 = loadImage("sprites/pipe.png");
pipe2 = loadImage("sprites/pipe2.png");
bird1 = loadAnimation("sprites/frame_0.png","sprites/frame_1.png","sprites/frame_2.png","sprites/frame_3.png"
,"sprites/frame_4.png","sprites/frame_5.png","sprites/frame_6.png","sprites/frame_7.png","sprites/frame_8.png");
bird2 = loadAnimation("sprites/frame_0.png");
restarts  = loadImage("sprites/reset.png");
go = loadImage("sprites/gameover.png");

}

function setup(){
    var canvas = createCanvas(800,600);
    engine = Engine.create();
    world = engine.world;

    bg = createSprite(600,200);
    bg.addImage(bg1);

    ground = createSprite(400,545,600,30);
    ground.addImage(g1);
    ground.scale = 2;

    bird = createSprite(100,200);
    bird.addAnimation("flying",bird1);
    bird.addAnimation("fly",bird2);
    bird.scale = 0.4 ;

    polesGroup = new Group();
    poleGroup2 = new Group();  

    bird.debug = true;
    bird.setCollider("circle",0,0,30);

    gameover = createSprite(400,300);
    gameover.addImage(go);
    gameover.scale = 0.5;


    reseet  = createSprite(400,350);
    reseet.addImage(restarts);
    reseet.scale = 0.2;

    score = 0;

}

function draw(){
   
        background(0);
        drawSprites();
        fill("black");
        textSize(20)
        text("Score: "+score,400, 100 )
if(gameState === "play"){
   // reseting background
    if(bg.x < 0 ){
        bg.x = 600
    }
    // moving the background
    bg.velocityX = -5;

    // reseting ground
    if(ground.x < 0 ){
        ground.x = 400
        
    } 
    // moving the ground
    ground.velocityX = -5;

     // making the bird jump
    if(keyDown("space")){
        bird.velocityY = -1; 
     }

     // gravity
    bird.velocityY += 0.1 

    //spawning the poles
    spawnPoles();
    score = score+Math.round(frameCount/80)
     if(poleGroup2.isTouching(bird) || polesGroup.isTouching(bird) || ground.isTouching(bird)){
             gameState = "end";       
     }

     gameover.visible = false;
     reseet.visible = false;

        
     
}

else if(gameState === "end" ){
    //stopping the ground
    ground.velocityX = 0;

    // stopping the background
    bg.velocityX = 0;

    bird.changeAnimation("fly",bird2);

    // stopping the bird 
    bird.velocityY = 0;
    
    polesGroup.setVelocityXEach(0);
    poleGroup2.setVelocityXEach(0);
    
    gameover.visible = true;
    reseet.visible = true;

    polesGroup.destroyEach();
    poleGroup2.destroyEach();

    if(mousePressedOver(reseet)){

        reset();

        bird.y = 200;
        bird.changeAnimation("flying",bird1);
    }

}
                  

      
}

function  spawnPoles(){
if(frameCount% 150 === 0){
 pole = createSprite(800,random(350,450),20,120);
 pole.velocityX = -2;
 pole.addImage(pipe1);

 pole2 = createSprite(800,random(20,70),20,120);
pole2.velocityX = -2;
pole2.addImage(pipe2);

ground.depth = pole.depth;
ground.depth += 1;

polesGroup.add(pole);
poleGroup2.add(pole2);
}

}

function reset(){
gameState = "play"

}