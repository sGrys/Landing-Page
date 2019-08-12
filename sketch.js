let p = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < 100; i++) {
		p[i] = new Point();
	}
}
var distance;
function draw() {
	background(27, 54, 44);
	drawMatrix();
}

function drawMatrix(){
	for (let i = 0; i < 100; i++) {
		p[i].display();
		p[i].move();
	}
	p[0].setCoordinates(mouseX,mouseY);
	for (let i = 0; i < 99; i++) {
		for (let j = 0; j < 99; j++) {
			distance=calculateDistance(p[i].x, p[i].y, p[j + 1].x, p[j + 1].y);
			if (distance<100) {
				stroke(103, 78, 69,2500/distance);
				strokeWeight(8);
				line(p[i].x, p[i].y, p[j + 1].x, p[j + 1].y);
			}
		}
	}
}

function calculateDistance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function mouseClicked() {
	if(p[0].speed>0)
	{
		for (let i = 0; i < 100; i++) {
			p[i].setSpeedDirection(-0.5);
		}
	}
	else{
		for (let i = 0; i < 100; i++) {
			p[i].setSpeedDirection(0.5);
		}
	}
  }

class Point {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.speedX;
		this.speedY;
		this.speed=0.5;
		this.direction=random(0,2*Math.PI);
		this.diameter = 2;
	}
	setCoordinates( X, Y){
		this.x =X;
		this.y =Y
	}
	setSpeedDirection(value){
		this.speed=value;
	}
	display() {
		//ellipse(this.x, this.y, this.diameter, this.diameter);
	}
	move() {
		this.speedX=Math.cos(this.direction)*this.speed;
		this.speedY=Math.sin(this.direction)*this.speed;
		this.x=this.x+this.speedX;
		this.y=this.y+this.speedY;
		if(this.x>width || this.x<0 || this.y>height || this.y<0){
			this.direction=this.direction+Math.PI;
			//this.direction=this.direction-Math.PI+(4*Math.PI-2*this.direction);
		}
		this.direction=this.direction+random(-0.1,0.1);
	}
}