export class SnakeSegment {
  constructor(name,type,color,level,x,y,hp,atk) {
    this.name = name ;
    this.type = type ;
    this.color = color ;
    this.level = level ;
    this.x = x ;
    this.y = y ;
    this.turningPoints = [] ;
    this.hp = hp ;
    this.atk = atk;
    this.angle = 0 ;
  }
  getXY() {
    return [this.x,this.y] ;
  }
  move(x,y) {
    this.x = x ;
    this.y = y ;
  }
}

export class Snake {
  // var classes =

  constructor(speed) {
    this.segments = [] ;
    this.speed = speed ;
    this.angleChange = 0;
    this.healthBuff = 0;
    this.atkBuff = 0;
    this.atkSpeedBuff = 0;
    this.classes = { speedsters: 0,
                     supporters: 0,
                     rangers: 0,
                     fighters: 0,
                     nukers: 0
                   };
  }

  addSegment(snakeSegment) {
    this.segments.push(snakeSegment) ;
  }
  moveSnake() {
    for(var i=0; i<this.segments.length;i++) {
        var angle = this.segments[i].angle ;
        var xy = this.segments[i].getXY() ;
        this.segments[i].move(xy[0]+this.speed*Math.cos(angle*(Math.PI/180)),xy[1]+this.speed*Math.sin(angle*(Math.PI/180))) ;
    }

  }

  partySyn() {
     for (key in classes.keys()) {
       classes[key] = 0;
     }
     for (const seg in this.segments) {
       classes[seg.type] += 1;
     }
   }

  checkBuff(){
    this.speed = 2;
    this.healthBuff = 0;
    this.atkBuff = 0;
    this.atkSpeedBuff = 0;
    if (this.classes[speedsters] > 0) {
      this.atkSpeedBuff = 4;
      this.speed = 3;
    }
    if (this.classes[speedsters] > 2) {
      this.atkSpeedBuff = 8;
      this.speed = 5;
    }
    if (this.classes[supporters] > 0) {
      this.healthBuff = 20;
    }
    if (this.classes[supporters] > 2) {
      this.healthBuff = 50;
    }
    if (this.classes[rangers] > 0) {
      this.atkSpeedBuff = 3;
      this.atkBuff = 5;
    }
    if (this.classes[rangers] > 2) {
      this.atkSpeedBuff = 4;
      this.atkBuff = 15;
    }
    if (this.classes[fighters] > 0) {
      this.healthBuff = 10;
      this.atkBuff = 5;
    }
    if (this.classes[fighters] > 2) {
      this.healthBuff = 25;
      this.atkBuff = 15;
    }
    if (this.classes[nukers] > 0) {
      this.atkBuff = 10;
    }
    if (this.classes[nukers] > 2) {
      this.atkBuff = 25;
    }
  }

  updateAngle() {

    if (this.angleChange != 0) {

      this.segments[0].angle += this.angleChange ;
      if (this.segments[0].angle >= 360) {
        this.segments[0].angle -= 360 ;
      }
      if (this.segments[0].angle < 0) {
        this.segments[0].angle += 360 ;
      }
      this.segments[0].angle = this.segments[0].angle % 360 ;
      if (this.segments.length > 1) {
        this.segments[1].turningPoints.push([this.segments[0].x,this.segments[0].y,this.segments[0].angle]) ;
      }
    }
    var c = document.getElementById('game');
    if ((this.segments[0].x < 20) | (this.segments[0].x > c.width-20)) {
      var angle = this.segments[0].angle ;
      var x = -1 * Math.cos(angle*(Math.PI/180)) ;
      var y = Math.sin(angle*(Math.PI/180)) ;
      var tan = y / x ;
      angle = Math.round(Math.atan(tan)*(180/Math.PI)) % 360;

      if (angle < 0) {
        angle += 360 ;
      }
      if ((this.segments[0].angle < 90) | (this.segments[0].angle > 270)) {
        angle += 180 ;
        angle = angle % 360 ;
      }

      this.segments[0].angle = angle ;

      if (this.segments.length > 1) {
        this.segments[1].turningPoints.push([this.segments[0].x,this.segments[0].y,this.segments[0].angle]) ;
      }
    }

    if ((this.segments[0].y < 20) | (this.segments[0].y > c.height-20)) {
      var angle = this.segments[0].angle ;
      var x = Math.cos(angle*(Math.PI/180)) ;
      var y = -1 * Math.sin(angle*(Math.PI/180)) ;
      var tan = y / x ;
      angle = Math.round(Math.atan(tan)*(180/Math.PI)) % 360;
      if (angle < 0) {
        angle += 360 ;
      }
      if ((this.segments[0].angle > 90) & (this.segments[0].angle <= 270)) {
        angle += 180 ;
        angle = angle % 360 ;
      }
      this.segments[0].angle = angle ;

      if (this.segments.length > 1) {
        this.segments[1].turningPoints.push([this.segments[0].x,this.segments[0].y,this.segments[0].angle]) ;
      }
    }


    if (this.segments.length > 1) {
      for(var i=1; i<this.segments.length;i++) {
        var segment = this.segments[i] ;

        if (segment.turningPoints.length > 1) {

          if ((segment.turningPoints[0][0] == segment.x) & (segment.turningPoints[0][1] == segment.y)) {

            var temp = segment.turningPoints.shift() ;
            if (i != this.segments.length-1) {
              this.segments[i+1].turningPoints.push(temp) ;
            }
            this.segments[i].angle = temp[2] ;
          }

        }

        if (segment.turningPoints.length > 0) {

          if ((segment.turningPoints[0][0] == segment.x) & (segment.turningPoints[0][1] == segment.y)) {

            var temp = segment.turningPoints.shift() ;
            if (i != this.segments.length-1) {
              this.segments[i+1].turningPoints.push(temp) ;
            }
            this.segments[i].angle = temp[2] ;
          }

        }

      }
    }

  }
  displaySnake() {
    var c = document.getElementById('game'); // GET CANVAS
    var ctx = c.getContext('2d');
    for(var i=0; i<this.segments.length;i++) {
      var segment = this.segments[i] ;
      ctx.beginPath();
      ctx.arc(segment.x, segment.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = segment.color ;
      ctx.fill();
      ctx.stroke();
    }
    // debug
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
  }


}
