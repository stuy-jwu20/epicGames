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
