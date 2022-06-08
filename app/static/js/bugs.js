export class bugs{
  constructor(health, dmg, speed, size, color){
    this.health = health;
    this.dmg = dmg;
    this.speed = speed,
    this.size = size;
    this.color = color;
  }
}

class roach extends bugs{
  constructor(lvl){
    super(60 * (lvl/5), 15 * (lvl/5), 2, 2, RED);
  }

  function hit(){
    for(guy in snake) {
      
    }
  }
}
