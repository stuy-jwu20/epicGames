import { SnakeSegment, Snake } from './snake.js';
import { Speedster, Fighter, Nuker, Ranger, Supporter} from './snakes.js';

var c = document.getElementById('game'); // GET CANVAS
var ctx = c.getContext('2d');
var parent = document.getElementById("parent");
c.width = parent.offsetWidth;
c.height = window.innerHeight - (1.6 * parent.offsetHeight);
var waveNumber = 0 ;
var level = parseInt(localStorage.getItem("level")) ;
localStorage.setItem('active','game') ;
var currentWave = window.currentWave;
var restart = false ;
var enemyMoving = false ;
var snakes ;

class Wave {
  constructor(){
    this.bugs = [];
  }

  addBug(bug){
    this.bugs.push(bug);
  }

}

function waveGeneration() {
  var tempWave = new Wave() ;
  var locations = [[50,30],[50,c.height-30],[c.width-50,30],[c.width-50,c.height-30]] ;
  for(var i=0;i<level*2+10;i++) {
    var rand = Math.floor(Math.random() * 4) ;
    var tempBug = new Bug('bug',40+(level*20),10+(level*2),2,7,'LightCoral',locations[rand][0]-30+Math.floor(Math.random() * 60),locations[rand][1]-20+Math.floor(Math.random() * 40),level) ;
    tempWave.addBug(tempBug) ;
    if (level > 1 && (Math.floor(Math.random() * 4) == 0)) {
      var temp = new Spitter(locations[rand][0]-30+Math.floor(Math.random() * 60),locations[rand][1]-20+Math.floor(Math.random() * 40),level) ;
      tempWave.addBug(temp) ;
    }
  }
  return tempWave ;
}

class Bug {
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
    var targetSegment = snake.segments[(Math.floor(Math.random() * (snake.segments.length-1)))] ;
    var angle = Math.atan2( this.y - targetSegment.y, this.x - targetSegment.x ) * ( 180 / Math.PI ) - 180 ;
    if (angle < 0) {
      angle += 360 ;
    }
    this.x += Math.cos((angle-60+Math.floor(Math.random()*120))*(Math.PI/180))*this.speed * 1.2 ;
    this.y += Math.sin((angle-60+Math.floor(Math.random()*120))*(Math.PI/180))*this.speed * 1.2 ;

  }

  collide() {
    for(var segment in snake.segments) {
      if (Math.sqrt((Math.pow(this.x - snake.segments[segment].x,2))+(Math.pow(this.y-snake.segments[segment].y,2))) <= 20) {
        this.health -= snake.segments[segment].atk+snake.atkBuff;
        if (!(snake.segments[segment].invincible)) {
          snake.segments[segment].hp -= this.atk;
          //snake.segments[segment].hp -= 200
          snake.segments[segment].invincible = true ;
        }
      }
    }
  }

  displayBug() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color ;
    ctx.fill();
    ctx.stroke();
  }

}

class Roach extends Bug {
  constructor(x, y, lvl){
    super("roach", 60 * (lvl/5), 15 * (lvl/5), 2, 2, RED, x, y, lvl);
  };

  setSpeed(speed){
    this.speed = speed;
  };

  setHealth(hp){
    this.health = hp;
  };

  charge(){
    if(this.health > 30){
      this.speed += 4;

      setTimeout(() => {
        this.speed -= 4;
      }, 2000);
    };
  }
}

class Spitter extends Bug {
  constructor(x, y, lvl){
    super("spitter", 40 * (lvl/5), 20 * (lvl/5), 1, 2, BLUE, x, y, lvl);
  };

  shoot() {
    pellet = new Roach(this.x, this.y, 1)
    pellet.setHealth(1);
    pellet.setSpeed(10);
    currentWave.addBug(pellet)
    window.currentWave = currentWave ;
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
  if (key == 82 && localStorage.getItem("active") == "game" && localStorage.getItem("snakes") != "{}") {
    restart = true;
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
  } else if (key == 82 && localStorage.getItem("active") == "shop") {
    for(var i=1;i < (parseInt(localStorage.getItem('maxPartySize'))+1);i++) {
      document.getElementById("s"+i).innerHTML = '' ;
    }
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
  var snakes = JSON.parse(localStorage.getItem('snakes')) ;
  var x = 600 ;
  var newSnake = new Snake(2);
  for(var i in snakes) {
    var data = snakes[i] ;

    var temp ;
    if (data["name"] == "Speedster") {
      temp = new Speedster(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }
    if (data["name"] == "Ranger") {
      temp = new Ranger(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }
    if (data["name"] == "Nuker") {
      temp = new Nuker(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }

    if (data["name"] == "Supporter") {
      temp = new Supporter(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }

    if (data["name"] == "Fighter") {
      temp = new Fighter(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }
    if (data["name"] == "Runner") {
      temp = new Speedster(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }
    if (data["name"] == "Sniper") {
      temp = new Ranger(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }
    if (data["name"] == "Blaster") {
      temp = new Nuker(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }

    if (data["name"] == "Healer") {
      temp = new Supporter(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }

    if (data["name"] == "Guard") {
      temp = new Fighter(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }if (data["name"] == "Maglev") {
      temp = new Speedster(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }
    if (data["name"] == "Deadeye") {
      temp = new Ranger(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }
    if (data["name"] == "Boomer") {
      temp = new Nuker(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }

    if (data["name"] == "Cultist") {
      temp = new Supporter(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }

    if (data["name"] == "Knight") {
      temp = new Fighter(data["count"][0],x,100,100,100,10) ;
      newSnake.addSegment(temp) ;
    }
    x -= 40 ;
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
    snakes = JSON.parse(localStorage.getItem('snakes')) ;

    snake = snakeGenerate() ;
    for (var i = 0; i < snake.segments.length; i++){
      if (snake.segments[i].type == "Green" || snake.segments[i].type == "Blue") {
        var a = snake.segments[i] ;
        setInterval(function(){if (enemyMoving) {a.shoot();}}, snake.segments[i].atkSpeed);
      }
    }
    waveNumber = 1 ;
    document.getElementById("waveText").innerHTML = "Wave: "+waveNumber+"/"+"4 | Press 'A' or 'D' to move!" ;
    localStorage.setItem('gameUpdate',"false") ;
    setTimeout(function(){currentWave=waveGeneration(); window.currentWave = currentWave ; enemyMoving = true ;},3000) ;
  }
  if (localStorage.getItem('active') == "game") {
    var totalHP = 0;
    for (var i=0;i<snake.segments.length;i++) {
      totalHP += snake.segments[i]["hp"] ;
      if (snake.segments[i].hp <= 0) {
        delete snakes[snake.segments[i].name] ;
        console.log(snake.segments[i].name) ;
        for (var j=i;j<snake.segments.length-1;j++) {
          var tempX = snake.segments[j].x ;
          var tempY = snake.segments[j].y ;
          snake.segments[i] = snake.segments[i+1] ;
          snake.segments[i].x = tempX ;
          snake.segments[i].y = tempY ;
        }
        snake.segments.pop() ;
      }
    }
    if (totalHP <= 0) {
      document.getElementById("deathScreen").style.display = "block";
    }
    ctx.clearRect(0,0,2000,1000) ;
    ctx.fillStyle= "#3b3a3a";
    ctx.rect(0,0,2000,1000) ;
    ctx.fill();
    snake.updateAngle() ;
    snake.moveSnake() ;
    if (enemyMoving) {
      currentWave = window.currentWave ;
      for (var bug=0;bug<currentWave.bugs.length;bug++) {
        currentWave.bugs[bug].displayBug();
        if (currentWave.bugs[bug].health <= 0) {
          currentWave.bugs.splice(bug,1) ;
          bug-- ;
          window.currentWave = currentWave ;
        }
      }
      currentWave = window.currentWave ;

      for (var i = 0; i < snake.segments.length; i++) {

      }

      if (currentWave.bugs.length == 0) {
        if (waveNumber <= 3) {
          waveNumber++ ;
          document.getElementById("waveText").innerHTML = "Wave: "+waveNumber+"/"+"4" ;
          currentWave = waveGeneration();
          window.currentWave = currentWave ;

        }
        else {
          enemyMoving = false ;
          endLevel();
        }
      }
    }
  }
  snake.displaySnake() ;
  var hp = document.getElementById("snakeHP");
  hp.innerHTML = "";
  for (var i = 0; i < snake.segments.length; i++) {
    hp.innerHTML += snake.segments[i]["name"] + ": " + snake.segments[i]["hp"] + " ";
  }
}
setInterval(display,10);

function enemyMove() {
  if (enemyMoving) {
    currentWave = window.currentWave ;
    for (var bug=0;bug<currentWave.bugs.length;bug++) {
      currentWave.bugs[bug].move();
    }
    window.currentWave = currentWave ;
  }
}

setInterval(enemyMove,30);

function spit(){
  if (enemyMoving) {
    currentWave = window.currentWave ;
    for (var bug=0;bug<currentWave.bugs.length;bug++) {
      if (currentWave.bugs[bug].name == "spitter") {
        currentWave.bugs[bug].shoot();
      }
    }
    window.currentWave = currentWave ;
  }
}

setInterval(spit, 5000);

function enemyCollide() {

  if (enemyMoving) {
    for (var i=0; i<snake.segments.length; i++) {
      if (snake.segments[i].invincible) {
        snake.segments[i].invincible = false ;
      }
    }
    currentWave = window.currentWave ;
    for (var bug=0;bug<currentWave.bugs.length;bug++) {
      currentWave.bugs[bug].collide();
    }
    window.currentWave = currentWave ;
  }
}

setInterval(enemyCollide,400);

function regenerate() {
  if (enemyMoving) {
    for (var i=0; i<snake.segments.length; i++) {
      if (snake.segments[i].hp  < snake.segments[i].maxhp+snake.healthBuff) {
        snake.segments[i].hp += 2 ;
      }
    }
  }
}

setInterval(regenerate,1500) ;

function endLevel() {
  enemyMoving = false ;
  localStorage.setItem("level",parseInt(localStorage.getItem("level"))+1) ;
  localStorage.setItem('snakes',JSON.stringify(snakes)) ;
  document.getElementById("game").style.display = "none";
  document.getElementById("game").style.opacity = "0%";
  document.getElementById("arena").style.display = "none";
  document.getElementById("arena").style.opacity = "0%";
  document.getElementById("body").classList.remove("transition");
  document.getElementById("waveText").classList.remove("transitionArena");
  document.getElementById("snakeHP").classList.remove("transitionArena");
  if (restart == true) {
    document.getElementById("restartText").style.display = "block";
    document.getElementById("restartText").classList.add("transitionRestart");
  }
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
    if (restart == true) {
      document.getElementById("restartText").style.display = "none";
      document.getElementById("restartText").classList.remove("transitionRestart");
      restart = false;
    }

  }, "1500")
  document.getElementById("mt").style.display = "none";
  document.getElementById("arena").style.opacity = 1;
  localStorage.setItem('gold',Math.floor(parseInt(localStorage.getItem('gold'))/5)+parseInt(localStorage.getItem('gold'))+level+5-(Math.floor(Math.random() * Math.floor(level/2))))
  localStorage.setItem('active','shop') ;
  localStorage.setItem("shopUpdate", 'true') ;
  if (parseInt(localStorage.getItem('maxPartySize')) < 5) {
    localStorage.setItem('maxPartySize',parseInt(localStorage.getItem('maxPartySize'))+1) ;
  }
  document.getElementById('waveReached').defaultValue = localStorage.getItem("level");
  document.getElementById("stageMessage").innerHTML = "Stage Reached: " + localStorage.getItem("level");
}
