//Open and connect socket
let socket = io();
//Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

let video;

function setup() {
  createCanvas(windowWidth, windowHeight)
  video = createCapture(VIDEO); 
  video.size(200, windowHeight);
  //hide DOM element of video
  video.hide();

  //Listen for messages named 'data' from the server
  socket.on('data', function(obj) {
    console.log(obj);
    drawPos(obj);
  });
}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);  
}

//Expects an object with x and y properties
//draw image where mouse is
function drawPos(pos) {
  //no background so get trails/repeats
  image (video, pos.x, pos.y);
  //each time place video higher up (subtract from mouseY)
  mouseY= mouseY-1;
}

function mouseMoved() {
  //Grab mouse position
  let mousePos = { x: mouseX, y: mouseY };
  //Send mouse position object to the server
  socket.emit('data', mousePos);
}

//NEXT
//dissect how animation is done
//try p5 with multiple iamges that allow update
//how to do this with many objects
//animation that runs during the draw loop
//updtae position of images every frame
//share updates via emit
//V2 various users
//NEED encrypt as https 


//from https://editor.p5js.org/maria_maciak_/sketches/3_SsjYetu