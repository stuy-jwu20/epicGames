import { SnakeSegment, Snake } from './snake.js';

var c = document.getElementById('game'); // GET CANVAS
var ctx = c.getContext('2d');
var parent = document.getElementById("parent");
c.width = parent.offsetWidth;
c.height = window.innerHeight - (1.6 * parent.offsetHeight);
var waveNumber = 0 ;
localStorage.setItem('active','game') ;


let first = new SnakeSegment('bill','nye','LawnGreen',200,100,100) ;
let second = new SnakeSegment('bill','nye','MediumTurquoise',140,100,100) ;
let third = new SnakeSegment('bill','nye','LightSalmon',80,100,100) ;
let snake = new Snake(first,2) ;
snake.addSegment(second) ;
snake.addSegment(third) ;

function keyDown(e) {
  var key = e.keyCode ;
  if (key == 65) {
    snake.angleChange = -1 ;
  }
  if (key == 68) {
    snake.angleChange = 1 ;
  }
}

function keyUp(e) {
  var key = e.keyCode ;
  if (key == 65) {
    snake.angleChange = 0 ;
  }
  if (key == 68) {
    snake.angleChange = 0 ;
  }
}

document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);

function display() {
  if (localStorage.getItem('active') == 'game') {
    ctx.clearRect(0,0,2000,1000) ;
    snake.updateAngle() ;
    snake.moveSnake() ;
  }
  snake.displaySnake() ;

}
setInterval(display,10);
