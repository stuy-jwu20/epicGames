export class waves{
  constructor(){
    bugs = [];
  };

  function addBug(bug){
    this.bugs.push(bug);
  };
}

function dist(x1, y1, x2, y2){
  var distance = Math.sqrt((Math.pow(x1 - x2,2))+(Math.pow(y1-y2,2)))
  return distance;
};

export class bugs{
  constructor(health, dmg, speed, size, color, x, y, lvl){
    this.health = health;
    this.atk = dmg;
    this.speed = speed,
    this.size = size;
    this.color = color;
    this.x = x;
    this.y = y;
    this.lvl = lvl;
  }

  function hit(){
    for(guy in snake) {
      if(dist(this.x, this.y, guy.x, guy.y) <= size){
        this.health -= guy.atk;
        guy.health -= this.atk;
      }
    }
  }
}

class roach extends bugs{
  constructor(x, y, lvl){
    super(60 * (lvl/5), 15 * (lvl/5), 2, 2, RED, x, y, lvl);
  };

  function setSpeed(speed){
    this.speed = speed;
  };

  function setHealth(hp){
    this.health = hp;
  };

  function charge(){
    this.speed += 4;

    setTimeout(() => {
      this.speed -= 4;
    }, 2000);
  };
}

class spitter extends bug{
  constructor(x, y, lvl){
    super(40 * (lvl/5), 20 * (lvl/5), 1, 2, BLUE, x, y, lvl);
  };

  function shoot(){
    pellet = new roach(this.x, this.y, 1)
    pellet.setHealth(1);
    pellet.setSpeed(10);
    wave.addBug(pellet)
  };
}
