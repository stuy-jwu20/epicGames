import { SnakeSegment, Snake } from './snake.js';

var c2 = document.getElementById('shop'); // GET CANVAS
var ctx2 = c2.getContext('2d');
var parent = document.getElementById("parent");
c2.width = parent.offsetWidth;
c2.height = window.innerHeight - (1.6 * parent.offsetHeight);

var snakeStorage = JSON.parse(localStorage.getItem('snakes')) ;
var partySize = localStorage.getItem('partySize') ;


var rand1 = randomSegment() ;
var rand2 = randomSegment() ;
var rand3 = randomSegment() ;
var shopSegments = [[rand1[0],rand1[1],5],[rand2[0],rand2[1],5],[rand3[0],rand3[1],5]] ;

function randomSegment() {
  let rand = (Math.random() * 4) ;
  if (rand == 0) {
    return ['Ranger','LawnGreen'] ;
  }
  if (rand == 1) {
    return ['Rogue','LightSalmon'] ;
  }
  if (rand == 2) {
    return ['Warrior','Gold'] ;
  }
  if (rand == 3) {
    return ['Mage','CornflowerBlue'] ;
  }

}

var one = document.getElementById("one");
function purchaseSegment1() {
  if (shopSegments[1][0] in snakeStorage) {

  }
  else if (snakeStorage.length < partySize) {
    snakeStorage
  }
}




function display() {
  if (localStorage.getItem('active') == 'shop') {
    ctx2.font = "30px Arial";
    ctx2.fillText("test shop",100,100);
  }
}
setInterval(display,10);
