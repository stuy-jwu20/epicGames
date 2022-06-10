import { SnakeSegment, Snake } from './snake.js';

function dist(x1, y1, x2, y2){
  var distance = Math.sqrt((Math.pow(x1 - x2,2))+(Math.pow(y1-y2,2)))
  return distance;
};

class speedsters extends snakeSegment{
  constructor(level,x,y,hp,atk,atkSpeed) {
    super("speedster", "speedsters", "FFFF33", level, x, y, 80 + hp, 20 + atk, 3000 - atkSpeed);
  }

  function shoot(){
    var c = document.getElementById('game');
    var ctx = c.getContext('2d');
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(wave.bugs[0].x, wave.bugs[0].y);
    wave.bugs[0].health -= atk;
  }
}

class rangers extends snakeSegment{
  constructor(level, x, y, hp, atk, atkSpeed){
    super("ranger", "rangers", "2C9200", level, x, y, 85 + hp, 15 + atk, 5000 - atkSpeed);
  }

  function shoot(){
    var c = document.getElementById('game');
    var ctx = c.getContext('2d');
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(wave.bugs[0].x, wave.bugs[0].y);
    wave.bugs[0].health -= atk;
  }
}

class supporters extends snakeSegment{
  constructor(level, x, y, hp, atk){
    super("supporter", "supporters", "25E1D4", level, x, y, 85 + hp, 15 + atk, 0);
  }
}

class fighters extends snakeSegment{
  constructor(level, x, y, hp, atk){
    super("fighter", "fighters", "FF4F00", level, x, y, 150 + hp, 30 + atk, 0);
  }
}

class nukers extends snakeSegment{
  constructor(level, x, y, hp, atk){
    super("nuker", "nukers", "FF005A", level, x, y, 85 + hp, 15 + atk, 0);
  }

  function blast(){
    x = wave.bugs[0].x;
    y = wave.bugs[0].y;
    for(bug in wave.bugs){
      if(dist(x,y, bug.x, bug.y) < 6){
        bug.health -= this.atk;
      }
    }
  }
}
