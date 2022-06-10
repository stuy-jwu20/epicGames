import { SnakeSegment, Snake } from './snake.js';

var c = document.getElementById('game'); // GET CANVAS
var ctx = c.getContext('2d');
var parent = document.getElementById("parent");
c.width = parent.offsetWidth;
c.height = window.innerHeight - (1.6 * parent.offsetHeight);
var waveNumber = 0 ;
var level = parseInt(localStorage.getItem("level")) ;
localStorage.setItem('active','game') ;
var playSnakes;

class Waves {
  constructor(){
    bugs = [];
  };

  addBug(bug){
    this.bugs.push(bug);
  };
}


class Bugs {
  constructor(name,health, dmg, speed, size, color, x, y, lvl){
    this.name = name ;
    this.health = health;
    this.atk = dmg;
    this.speed = speed,
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;
    this.lvl = lvl;
  }

  move() {
    var target = snake.segments[(Math.floor(Math.random() * snake.segments.length-1))] ;
    this.x-target.x
  }

  collide() {
    for(segment in snake) {
      if(Math.sqrt((Math.pow(this.x - segment.x,2))+(Math.pow(this.y-segment.y,2))) <= this.size){
        this.health -= segment.atk;
        segment.health -= this.atk;
      }
    }
  }
}

class Roach extends Bugs{
  constructor(x, y, lvl){
    super(60 * (lvl/5), 15 * (lvl/5), 2, 2, RED, x, y, lvl);
  };

  setSpeed(speed){
    this.speed = speed;
  };

  setHealth(hp){
    this.health = hp;
  };

  charge(){
    this.speed += 4;

    setTimeout(() => {
      this.speed -= 4;
    }, 2000);
  };
}

class Spitter extends Bugs {
  constructor(x, y, lvl){
    super(40 * (lvl/5), 20 * (lvl/5), 1, 2, BLUE, x, y, lvl);
  };

  shoot() {
    pellet = new roach(this.x, this.y, 1)
    pellet.setHealth(1);
    pellet.setSpeed(10);
    wave.addBug(pellet)
  };
}


let snake = new Snake(2) ;

let colors = ['LawnGreen','LightSalmon','Gold','CornflowerBlue','MediumOrchid'] ;
var tempX = 600 ;
for(var i=0;i<(Math.floor(Math.random() * 5))+3;i++) {
  let temp = new SnakeSegment('epic','games',colors[(Math.floor(Math.random() * 5))],1,tempX,100,100,10) ;
  snake.addSegment(temp) ;
  tempX -= 40 ;
}
snake.segments[0].angle = 45 - Math.floor(Math.random() * 90)
if (snake.segments[0].angle < 0) {
  snake.segments[0].angle += 360 ;
}
snake.segments[1].turningPoints.push([snake.segments[0].x,snake.segments[0].y,snake.segments[0].angle]) ;

function keyDown(e) {
  var key = e.keyCode ;
  if (key == 82) {
    for(var i=1;i < (parseInt(localStorage.getItem('maxPartySize'))+1);i++) {
      document.getElementById("s"+i).innerHTML = '' ;
    }
    endLevel() ;
    localStorage.clear();
    localStorage.setItem('snakes',JSON.stringify({})) ;
    localStorage.setItem('maxPartySize',3) ;
    localStorage.setItem('gold',3) ;
    localStorage.setItem('level',1) ;
    localStorage.setItem('shopUpdate',"true") ;

  }
  if (key == 65) {
    snake.angleChange = -1 ;
  }
  if (key == 68) {
    snake.angleChange = 1 ;
  }
}

function snakeGenerate() {
  let newSnake = new Snake(2) ;
  playSnakes = newSnake;
  var snakes = JSON.parse(localStorage.getItem('snakes')) ;
  var x = 600 ;
  for(var i in snakes) {
    var data = snakes[i] ;
    var temp = new SnakeSegment(data["name"],data["class"],data["color"],data["count"][0],x,100,100,10) ;
    x -= 40 ;
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
  if (localStorage.getItem('gameUpdate') == "true") {
    snake = snakeGenerate() ;
    localStorage.setItem('gameUpdate',"false") ;
  }
  if (localStorage.getItem('active') == "game") {
    ctx.clearRect(0,0,2000,1000) ;
    ctx.fillStyle= "#3b3a3a";
    ctx.rect(0,0,2000,1000) ;
    ctx.fill();
    snake.updateAngle() ;
    snake.moveSnake() ;
  }
  snake.displaySnake() ;
  var hp = document.getElementById("snakeHP");
  hp.innerHTML = "";
  for (var i = 0; i < playSnakes.segments.length; i++) {
    hp.innerHTML += playSnakes.segments[i]["name"] + ": " + playSnakes.segments[i]["hp"] + " ";
  }
}
setInterval(display,10);

function endLevel() {
  localStorage.setItem("level",level+1) ;
  document.getElementById("game").style.display = "none";
  document.getElementById("game").style.opacity = "0%";
  document.getElementById("arena").style.display = "none";
  document.getElementById("arena").style.opacity = "0%";
  document.getElementById("body").classList.remove("transition");
  document.getElementById("waveText").classList.remove("transitionArena");
  document.getElementById("snakeHP").classList.remove("transitionArena");
  document.getElementById("restartText").style.display = "block";
  document.getElementById("restartText").classList.add("transitionRestart");
  setTimeout(() => {
    document.getElementById("shop").style.display = "flex";
    document.getElementById("shop").classList.add("transitionShop");
    document.getElementById("goldVar").style.display = "block";
    document.getElementById("goldVar").classList.add("transitionShop");
    document.getElementById("reroll").style.display = "block";
    document.getElementById("reroll").classList.add("transitionShop");
    document.getElementById("lock").style.display = "block";
    document.getElementById("lock").classList.add("transitionShop");
    document.getElementById("party").style.display = "block";
    document.getElementById("party").classList.add("transitionShop");
    document.getElementById("go").style.display = "block";
    document.getElementById("go").classList.add("transitionShop");
    document.getElementById("one").style.display = "block";
    document.getElementById("one").classList.add("transitionShop");
    document.getElementById("two").style.display = "block";
    document.getElementById("two").classList.add("transitionShop");
    document.getElementById("three").style.display = "block";
    document.getElementById("three").classList.add("transitionShop");
  }, "1500")
  document.getElementById("mt").style.display = "none";
  document.getElementById("arena").style.opacity = 1;
  localStorage.setItem('gold',Math.floor(parseInt(localStorage.getItem('gold'))/5)+parseInt(localStorage.getItem('gold'))+level+2-(Math.floor(Math.random() * Math.floor(level/2))))
  localStorage.setItem('active','shop') ;

}

let audio = new Audio("../static/assets/music/Trailer - Ember.ogg");

let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 100;
})
