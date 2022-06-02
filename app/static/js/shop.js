import { SnakeSegment, Snake } from './snake.js';

var c2 = document.getElementById('shop'); // GET CANVAS
var ctx2 = c2.getContext('2d');
var parent = document.getElementById("parent");
c2.width = parent.offsetWidth;
c2.height = window.innerHeight - (1.6 * parent.offsetHeight);
let classList = ['Warrior','Archer','Mage','Healer'] ;

function randomSegment() {
  let rand = (Math.random() * 4) ;
  if (rand == 0) {
    var temp = new SnakeSegment('bill','Archer','LawnGreen',200,100,100) ;
    return temp ;
  }

}
