var c = document.querySelector('canvas'); // GET CANVAS
var ctx = c.getContext('2d');

angleChange = 0

function keyDown(e) {
  key = e.keyCode ;
  if (key == 65) {
    angleChange = -1 ;
  }
  if (key == 68) {
    angleChange = 1 ;
  }
}

function keyUp(e) {
  key = e.keyCode ;
  if (key == 65) {
    angleChange = 0 ;
  }
  if (key == 68) {
    angleChange = 0 ;
  }
}

document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);

class SnakeSegment {
  constructor(name,type,color,x,y,hp) {
    this.name = name ;
    this.type = type ;
    this.color = color ;
    this.x = x ;
    this.y = y ;
    this.lastX = x ;
    this.lastY = y ;
    this.hp = hp ;
  }
  getXY() {
    return [this.x,this.y] ;
  }
  move(x,y) {
    this.x = x ;
    this.y = y ;
  }
}

class Snake {
  constructor(snakeSegment,angle,speed) {
    this.segments = [snakeSegment] ;
    this.angle = angle ;
    this.speed = speed ;
  }
  addSegment(snakeSegment) {
    this.segments.push(snakeSegment) ;
  }
  moveSnake() {
    for(var i=0; i<this.segments.length;i++) {
      this.segments[i].lastX = this.segments[i].x ;
      this.segments[i].lastY = this.segments[i].y ;
    }
    var xy = this.segments[0].getXY() ;
    this.segments[0].move(xy[0]+Math.cos(this.angle*(Math.PI/180)),xy[1]+Math.sin(this.angle*(Math.PI/180))) ;
    for(var i=1; i<this.segments.length;i++) {
      this.segments[i].move(this.segments[i-1].lastX,this.segments[i-1].lastY) ;
    }
  }
  updateAngle() {
    this.angle += angleChange ;
  }
  displaySnake() {
    for(var i=0; i<this.segments.length;i++) {
      var segment = this.segments[i] ;
      ctx.beginPath();
      ctx.arc(segment.x, segment.y, 50, 0, 2 * Math.PI);
      ctx.fillStyle = segment.color ;
      ctx.fill();
    }
  }


}
let first = new SnakeSegment('bill','nye','green',100,100,100) ;
let second = new SnakeSegment('bill','nye','blue',75,100,100) ;
let snake = new Snake(first,0,2) ;
snake.addSegment(second) ;

function display() {
  ctx.clearRect(0,0,2000,1000) ;
  snake.updateAngle() ;
  snake.moveSnake() ;
  snake.displaySnake() ;
}
setInterval(display, 10);
