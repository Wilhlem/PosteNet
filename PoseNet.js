let video;
let poseNet;
let eye1X, eye1Y, eye2X, eye2Y;
let angle = 2.0;
let offset = 300;
let scalar = 3.5;
let speed = 0.1;
let col = { 
  r: 255,
  g: 0,
  b: 0
};

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {

    eye1X = poses[0].pose.keypoints[1].position.x;
    eye1Y = poses[0].pose.keypoints[1].position.y;
    
    eye2X = poses[0].pose.keypoints[2].position.x;
    eye2Y = poses[0].pose.keypoints[2].position.y;
  }
}

function modelReady() {

}

function draw() {
  image(video, 0, 0);

  fill(255, 0, 0);
  eye(eye1X, eye1Y, 70, 1);
  eye(eye2X, eye2Y, 70, -1);
}

function eye(x, y, size, n) {
	let angle = frameCount * 0.1;
	fill(0);
	noStroke();
	ellipse(x, y, size, size);
	
	//fill(56);
	noStroke(5);
	ellipse(x+cos(angle*n)*size/5,    y+sin(angle*n)*size/5, size/2, size/2);
    col.r = random(250, 0);
    col.g = random(0, 250);
    col.b = random(250, 0);
    let eyeX = offset + cos(angle) * scalar;
    let eyeY = offset + sin(angle) * scalar;
    fill(col.r, col.g, col.b);
    noStroke();
    ellipse(x, y, 55, 15);
    angle += speed;
    scalar += speed;
}