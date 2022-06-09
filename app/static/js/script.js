import { SnakeSegment, Snake } from './snake.js';

var c = document.getElementById('game'); // GET CANVAS
var ctx = c.getContext('2d');
var parent = document.getElementById("parent");
c.width = parent.offsetWidth;
c.height = window.innerHeight - (1.6 * parent.offsetHeight);
var waveNumber = 0 ;
var level = localStorage.getItem("level") ;
localStorage.setItem('active','game') ;


let first = new SnakeSegment('bill','nye','LawnGreen',1,200,100,100,10) ;
let second = new SnakeSegment('bill','nye','MediumTurquoise',1,160,100,100,10) ;
let third = new SnakeSegment('bill','nye','LightSalmon',1,120,100,100,10) ;
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
  var snakes = JSON.parse(localStorage.getItem('snakes')) ;
  var x = 600 ;
  for(var i in snakes) {
    var data = snakes[i] ;
    var temp = new SnakeSegment(data["name"],data["class"],data["color"],data["count"][0],x,100,100,10) ;
    x -= 40 ;
    newSnake.addSegment(temp) ;
  }
  console.log(newSnake);
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
  if (localStorage.getItem('update') == "true") {
    console.log("dasdasd") ;
    snake = snakeGenerate() ;
    localStorage.setItem('update',"false") ;
  }
  if (localStorage.getItem('active') == "game") {
    ctx.clearRect(0,0,2000,1000) ;
    snake.updateAngle() ;
    snake.moveSnake() ;
  }
  snake.displaySnake() ;

}
setInterval(display,10);

function endLevel() {
  localStorage.setItem("level",level+1) ;
  localStorage.setItem('active','shop') ;
  document.getElementById("shop").style.display = "flex";
  document.getElementById("game").style.display = "none";
}

let audio = new Audio("../static/assets/music/Trailer - Ember.ogg");

let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 100;
})
