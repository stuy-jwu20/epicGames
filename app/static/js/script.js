var c = document.getElementById("canvas"); // GET CANVAS
var ctx = c.getContext('2d');

class SnakeSegment {
  constructor(name,type,color,x,y,hp) {
    this.name = name ;
    this.type = type ;
    this.color = color ;
    this.x = x ;
    this.y = y ;
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
    this.segments.append(snakeSegment)
  }
  moveSnake() {
    xy = this.segments[0].getXY() ;
    this.segments[0].move(xy[0]+Math.Cos(this.angle*(Math.PI/180)))
  }


}
