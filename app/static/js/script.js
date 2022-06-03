import { SnakeSegment, Snake } from './snake.js';

var c = document.getElementById('game'); // GET CANVAS
var ctx = c.getContext('2d');
var parent = document.getElementById("parent");
c.width = parent.offsetWidth;
c.height = window.innerHeight - (1.6 * parent.offsetHeight);
var waveNumber = 0 ;
localStorage.setItem('active','game') ;


let first = new SnakeSegment('bill','nye','LawnGreen',1,200,100,100) ;
let second = new SnakeSegment('bill','nye','MediumTurquoise',1,140,100,100) ;
let third = new SnakeSegment('bill','nye','LightSalmon',1,80,100,100) ;
let snake = new Snake(2) ;
snake.addSegment(first) ;
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

function snakeGenerate() {
  let newSnake = new Snake(2) ;
  snakes = JSON.parse(localStorage.getItem('snakes')) ;
  var x = 600 ;
  for(var i in snakes) {
    var data = snakes[i] ;
    var temp = new SnakeSegment(data["name"],data["class"],data["color"],data["count"][0],x,500) ;
    x -= 60 ;
    newSnake.addSegment(temp) ;
  }
  return newSnake ;
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
  if (localStorage.getItem('update') == true) {
    snake = snakeGenerate() ;
    localStorage.setItem('update',false) ;
  }
  if (localStorage.getItem('active') == 'game') {
    ctx.clearRect(0,0,2000,1000) ;
    snake.updateAngle() ;
    snake.moveSnake() ;
  }
  snake.displaySnake() ;

}
setInterval(display,10);

let audio = new Audio("http://21273.live.streamtheworld.com/LOS40_DANCE.mp3");

let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 100;
})
