import { SnakeSegment, Snake } from './snake.js';

function dist(x1, y1, x2, y2){
  var distance = Math.sqrt((Math.pow(x1 - x2,2))+(Math.pow(y1-y2,2)))
  return distance;
};

class speedsters extends snakeSegment{
  constructor(name,level,x,y,hp,atk,atkSpeed) {
    super(name, "speedsters", "FFFF33", level, x, y, 80 + hp, 20 + atk, 3000 - atkSpeed);
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

class runner extends speedsters{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("runner", level, x, y, hp, atk, atkSpeed);
  }
}

class maglev extends speedsters{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("maglev", level, x, y, hp, atk, atkSpeed);
  }
}

class charger extends speedsters{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("charger", level, x, y, hp, atk, atkSpeed);
  }
}

class rangers extends snakeSegment{
  constructor(name, level, x, y, hp, atk, atkSpeed){
    super(name, "rangers", "2C9200", level, x, y, 85 + hp, 15 + atk, 5000 - atkSpeed);
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

class sniper extends rangers{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("sniper", level, x, y, hp, atk, atkSpeed);
  }
}

class archer extends rangers{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("archer", level, x, y, hp, atk, atkSpeed);
  }
}

class deadeye extends rangers{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("deadeye", level, x, y, hp, atk, atkSpeed);
  }
}

class supporters extends snakeSegment{
  constructor(name, level, x, y, hp, atk){
    super(name, "supporters", "25E1D4", level, x, y, 85 + hp, 15 + atk, 0);
  }
}

class healer extends supporters{
  constructor(level,x,y,hp,atk){
    super("healer", level, x, y, hp, atk);
  }
}

class priest extends supporters{
  constructor(level,x,y,hp,atk){
    super("priest", level, x, y, hp, atk);
  }
}

class cultist extends supporters{
  constructor(level,x,y,hp,atk){
    super("cultist", level, x, y, hp, atk);
  }
}

class fighters extends snakeSegment{
  constructor(level, x, y, hp, atk){
    super("fighter", "fighters", "FF4F00", level, x, y, 150 + hp, 30 + atk, 0);
  }
}

class boxer extends fighters{
  constructor(level,x,y,hp,atk){
    super("boxer", level, x, y, hp, atk);
  }
}

class knight extends fighters{
  constructor(level,x,y,hp,atk){
    super("knight", level, x, y, hp, atk);
  }
}

class warrior extends fighters{
  constructor(level,x,y,hp,atk){
    super("warrior", level, x, y, hp, atk);
  }
}

class nukers extends snakeSegment{
  constructor(name, level, x, y, hp, atk, atkspeed){
    super(name, "nukers", "FF005A", level, x, y, 85 + hp, 20 + atk, 6500 - atkSpeed);
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

class boomer extends nukers{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("boomer", level, x, y, hp, atk, atkSpeed);
  }
}

class blaster extends nukers{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("blaster", level, x, y, hp, atk, atkSpeed);
  }
}

class breaker extends nukers{
  constructor(level,x,y,hp,atk,atkSpeed){
    super("breakers", level, x, y, hp, atk, atkSpeed);
  }
}
