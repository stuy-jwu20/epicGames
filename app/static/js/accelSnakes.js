class speedsters extends snakeSegment{
  constructor(name, health, x, y) {
    super(name, "speedsters", "FFFF33", x, y, health);
  };
}

class maglev extends speedsters{
  constructor(health, x, y) {
    super("maglev", health, x, y);
  };
}
