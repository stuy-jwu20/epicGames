import { SnakeSegment, Snake } from './snake.js';

class speedsters extends snakeSegment{
  constructor(level,x,y,hp,atk,atkSpeed) {
    super("speedster", "speedsters", "FFFF33", level, x, y, 80 + hp, 20 + atk, 20 - atkSpeed);
  }
}

class rangers extends snakeSegment{
  constructor(level, x, y, hp, atk){
    super("ranger", "rangers", "FFFF33", level, x, y, 85 + hp, 15 + atk, atkSpeed);
  }
}

class supporters extends snakeSegment{
  constructor(level, x, y, hp, atk){
    super("supporter", "supporters", "FFFF33", level, x, y, 85 + hp, 15 + atk, atkSpeed);
  }
}

class fighters extends snakeSegment{
  constructor(level, x, y, hp, atk){
    super("fighter", "fighters", "FFFF33", level, x, y, 85 + hp, 15 + atk, atkSpeed);
  }
}

class nukers extends snakeSegment{
  constructor(level, x, y, hp, atk){
    super("nuker", "nukers", "FFFF33", level, x, y, 85 + hp, 15 + atk, atkSpeed);
  }
}

class pellet{
  constructor(size, dmg){
    this.dmg = dmg;
    this.size = size;
  }
}
