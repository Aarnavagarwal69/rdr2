var player, database;
var position;
var bg = "bg.jpg"
function preload(){
  horse=loadImage("horse.png")
  //getbackground();
}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(800,800);

  player = createSprite(250,250,10,10);
  player.shapeColor = "red";
  player.addImage("horse",horse);
  player.scale=0.1;

  var playerPosition = database.ref('rdd/position');
  playerPosition.on("value", readPosition, showError);
}

function draw(){
  background(backgroundImage);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    
    drawSprites();
  
}
function getbackground(){
  console.log(player.x);
  
}

function writePosition(x,y){
  database.ref('rdd/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  //console.log(position.x);
  player.x = position.x;
  player.y = position.y;

  if (player.x < 0){
    bg="bg.jpg"
  }
  else if (player.x > 800){
    bg="bg2.jpg"
  }
  else if (player.y > 800){
    bg="bg3.jpg"
  }
  else if (player.y < 0 ){
    bg="bg4.jpg"
  }
  backgroundImage=loadImage(bg)
  console.log(backgroundImage)
  //camera.position.x=hypnoticBall.x;
  //camera.position.y=hypnoticBall.y;
}

function showError(){
  console.log("Error in writing to the database");
}

