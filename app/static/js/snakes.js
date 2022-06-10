import { SnakeSegment, Snake } from './snake.js';

var currentWave = window.currentWave ;

function dist(x1, y1, x2, y2){
  var distance = Math.sqrt((Math.pow(x1 - x2,2))+(Math.pow(y1-y2,2)))
  return distance;
};

export class Speedster extends SnakeSegment{
  constructor(level,x,y,hp,atk,atkSpeed) {
    super("Speedster", "Blue", "CornflowerBlue", level, x, y, 80 + hp, 15 + atk, 3000 - atkSpeed*100*((level-1)*0.5));
  }

  shoot() {
    var c = document.getElementById('game');
    var ctx = c.getContext('2d');
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    currentWave = window.currentWave ;
    ctx.lineTo(currentWave.bugs[0].x, currentWave.bugs[0].y);
    currentWave.bugs[0].health -= this.atk;
    window.currentWave = currentWave ;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.0;
  }
}

export class Ranger extends SnakeSegment{
  constructor(level, x, y, hp, atk, atkSpeed){
    super("Ranger", "Green", "LawnGreen", level, x, y, 85 + hp, 10 + atk*((level-1)*0.5), 5000 - atkSpeed*100);
  }

  shoot() {
    var c = document.getElementById('game');
    var ctx = c.getContext('2d');
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    currentWave = window.currentWave ;
    ctx.lineTo(currentWave.bugs[0].x, currentWave.bugs[0].y);
    currentWave.bugs[0].health -= this.atk;
    window.currentWave = currentWave ;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.0;
  }
}

export class Supporter extends SnakeSegment{
  constructor(level, x, y, hp, atk){
    super("Supporter", "Purple", "MediumOrchid", level, x, y, 85 + hp, 15 + atk*((level-1)*0.2), 0);
  }
}

export class Fighter extends SnakeSegment{
  constructor(level, x, y, hp, atk){
    super("Fighter", "Yellow", "Gold", level, x, y, 150 + hp, 40 + atk*((level-1)*0.5), 0);
  }
}

export class Nuker extends SnakeSegment{
  constructor(level, x, y, hp, atk){
    super("Nuker", "Orange", "LightSalmon", level, x, y, 85 + hp, 15 + atk*((level-1)*0.5), 0);
  }

  blast(){
    x = wave.bugs[0].x;
    y = wave.bugs[0].y;
    for(bug in wave.bugs){
      if(dist(x,y, bug.x, bug.y) < 6){
        bug.health -= this.atk;
      }
    }
  }
}
