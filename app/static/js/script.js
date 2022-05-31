var c = document.querySelector('canvas'); // GET CANVAS
var ctx = c.getContext('2d');

ctx.canvas.width = window.innerWidth-10;
ctx.canvas.height = window.innerHeight-10;

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
    this.turningPoints = [] ;
    this.hp = hp ;
    this.angle = 0 ;
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
  constructor(snakeSegment,speed) {
    this.segments = [snakeSegment] ;
    this.speed = speed ;
  }
  addSegment(snakeSegment) {
    this.segments.push(snakeSegment) ;
  }
  moveSnake() {

    for(var i=0; i<this.segments.length;i++) {
        var angle = this.segments[i].angle ;
        var xy = this.segments[i].getXY() ;
        this.segments[i].move(xy[0]+this.speed*Math.cos(angle*(Math.PI/180)),xy[1]+this.speed*Math.sin(angle*(Math.PI/180))) ;
    }
  }
  updateAngle() {

    if (angleChange != 0) {

      this.segments[0].angle += angleChange ;
      if (this.segments[0].angle >= 360) {
        this.segments[0].angle -= 360 ;
      }
      if (this.segments[0].angle < 0) {
        this.segments[0].angle += 360 ;
      }
      this.segments[0].angle = this.segments[0].angle % 360 ;
      if (this.segments.length > 1) {
        this.segments[1].turningPoints.push([this.segments[0].x,this.segments[0].y,this.segments[0].angle]) ;
      }
    }

    if ((this.segments[0].x < 30) | (this.segments[0].x > 1870)) {
      console.log(this.segments[0].angle) ;
      var angle = this.segments[0].angle ;
      var x = -1 * Math.cos(angle*(Math.PI/180)) ;
      var y = Math.sin(angle*(Math.PI/180)) ;
      var tan = y / x ;
      angle = Math.atan(tan)*(180/Math.PI) % 360;
      if ((this.segments[0].angle < 90) | (this.segments[0].angle > 270)) {
        angle += 180 ;
      }
      this.segments[0].angle = angle ;
      if (this.segments[0].angle < 0) {
        this.segments[0].angle += 360 ;
      }
      console.log(this.segments[0].angle) ;
      if (this.segments.length > 1) {
        this.segments[1].turningPoints.push([this.segments[0].x,this.segments[0].y,this.segments[0].angle]) ;
      }
    }

    if (this.segments.length > 1) {
      for(var i=1; i<this.segments.length;i++) {
        var segment = this.segments[i] ;
        if (segment.turningPoints.length > 0) {
          if ((segment.turningPoints[0][0] == segment.x) & (segment.turningPoints[0][1] == segment.y)) {

            var temp = segment.turningPoints.shift() ;
            if (i != this.segments.length-1) {
              this.segments[i+1].turningPoints.push(temp) ;
            }
            this.segments[i].angle = temp[2] ;
          }
        }
      }
    }

  }
  displaySnake() {
    for(var i=0; i<this.segments.length;i++) {
      var segment = this.segments[i] ;
      ctx.beginPath();
      ctx.arc(segment.x, segment.y, 30, 0, 2 * Math.PI);
      ctx.fillStyle = segment.color ;
      ctx.fill();
      ctx.stroke();
    }
  }


}
let first = new SnakeSegment('bill','nye','LawnGreen',200,100,100) ;
let second = new SnakeSegment('bill','nye','MediumTurquoise',140,100,100) ;
let third = new SnakeSegment('bill','nye','LightSalmon',80,100,100) ;
let snake = new Snake(first,2) ;
snake.addSegment(second) ;
snake.addSegment(third) ;


function display() {
  ctx.clearRect(0,0,2000,1000) ;
  snake.updateAngle() ;
  snake.moveSnake() ;
  snake.displaySnake() ;

}
setInterval(display, 10);
