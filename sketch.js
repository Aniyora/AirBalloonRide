var balloon, balloonImg;
var database;
var background;
var readPosition;


function preload(){
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonImg = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-02.png","images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png","images/Hot Air Ballon-04.png");

}

function setup() {
  createCanvas(1500,800);
  database = firebase.database();
  balloon = createSprite(400, 200, 150, 150);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.4;
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readHeight, showError);

}


function draw() {
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)){
  updateHeight(-10,0);
  balloon.addAnimation("balloon", balloonImg);
 }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("balloon", balloonImg);
    }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon,balloonImage2");
    balloon.scale=balloon.scale -0.05;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon,balloonImage2");
    balloon.scale=balloon.scale +0.05;
  }
  drawSprites();
  fill(0);
  stroke("blue");
  textSize(20);
  text("Use Arrow Keys to move the Hot Air Balloon", 40,40);
}


function updateHeight(x,y){
  console.log(x+" "+y);
 database.ref('balloon/height').set({
   'x' : height.x+x,
   'y' : height.y+y
   })
}
function readHeight(data){
    height=data.val();
    balloon.x=height.x;
    balloon.y=height.y;
 }

  function showError(){
  console.log("Error in wriing to the database");
  
   }