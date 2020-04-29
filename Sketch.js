const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;
var box1,virus1,virus2;
var backgroundImg,platform;
var antivirus,slingshot;

var gameState = "onSling";

var score = 0;

var bg = "sprites/bg.png";

function preload(){
    getTime();
}

function preload(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150,305.300,170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    virus1 = new Virus(810,350);
    log1 = new Log(810,260,300,PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    virus2 = new Virus(810,220);

    log3 = new Log(810,180,300,PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150,PI/7);
    log5 = new Log(870,120,150,-PI/7);

    antivirus = new Antivirus(200,50);

    slingshot = new slingshot(antivirus.body,{x:200,y:50});

}
function draw(){
    background("white");
    Engine.update(engine);

    box1.display();
    box2.display();
    ground.display();
    virus1.display();
    log1.display();

    box3.display();
    box4.display();
    virus2.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    antivirus.display();
    platform.display();
    slingshot.display();

    virus1.score();
    virus2.score();

    textSize(24);
    fill("black")
    text("SCORE :"+ score,1000,50);

}
function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(antivirus.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && antivirus.body.speed < 1 || antivirus.body.speed > 25){
        antivirus.trajectory = [];
        Matter.Body.setPosition(antivirus.body,{x:200,y:50});
        slingshot.attach(antivirus.body);
        gameState = "onSling"
    }
}
async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var responseJSN = await response.json()
    var datetime = responseJSN.datetime;
    var hour = datetime.slice(11,13)
    console.log(hour)
    if(hour >= 6 && hour <= 19){
        bg = "sprites/bg.png"
    }
    else{
      bg = "bg2.jpg" 
    }
    backgroundImg = loadImage(bg);
    }