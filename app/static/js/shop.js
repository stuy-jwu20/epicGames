import { SnakeSegment, Snake } from './snake.js';

var snakeStorage = JSON.parse(localStorage.getItem('snakes')) ;
var maxPartySize = localStorage.getItem('maxPartySize') ;
var gold = localStorage.getItem('gold') ;


var rand1 = randomSegment() ;
var rand2 = randomSegment() ;
var rand3 = randomSegment() ;
var shopSegments = [rand1,rand2,rand3] ;

function counter(array,value) {
  var number = 0 ;
  for(var i=0;i<array.length;i++) {
    if (array[i] == value) number++ ;
  }
  return number ;
}

function randomSegment() {
  let rand = (Math.random() * 4) ;
  if (rand == 0) {
    return ['Ranger','Green','LawnGreen',3] ;
  }
  if (rand == 1) {
    return ['Rogue','Orange','LightSalmon',3] ;
  }
  if (rand == 2) {
    return ['Warrior','Yellow','Gold',3] ;
  }
  if (rand == 3) {
    return ['Mage','Blue','CornflowerBlue',3] ;
  }

}
var error = document.getElementById("error");

function purchaseSegment(number) {
  if (gold < shopSegments[number][2]) {
    error.innerHTML = "you're too broke to afford that snake idiot" ;
  }
  else if (shopSegments[number][0] in snakeStorage) {
    if (snakeStorage[shopSegments[number][0]]["count"] == [3]) {
      error.innerHTML = "that snake is already maxed out idiot" ;
    }
    else {
      gold =- shopSegments[number][2]
      snakeStorage[shopSegments[number][0]]["count"].push(1) ;
      if (counter(snakeStorage[shopSegments[number][0]]["count"],1) == 3) {
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        snakeStorage[shopSegments[number][0]]["count"].push(2)
      }
      if (counter(snakeStorage[shopSegments[0]]["count"],2) == 3) {
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        snakeStorage[shopSegments[number][0]]["count"].push(3)
      }
    }
  }
  else if (snakeStorage.length < maxPartySize) {
    gold =- shopSegments[number][2]
    snakeStorage[shopSegments[number][0]]["name"] = shopSegments[number][0]
    snakeStorage[shopSegments[number][0]]["class"] = shopSegments[number][1]
    snakeStorage[shopSegments[number][0]]["color"] = shopSegments[number][2]
    snakeStorage[shopSegments[number][0]]["count"] = [1] ;
  }
  else {
    error.innerHTML = "you have no party space for more snakes idiot" ;
  }
}

function go() {
  localStorage.setItem('snakes',JSON.stringify(snakeStorage)) ;
  localStorage.setItem('gold',gold) ;
  document.getElementById("shop").style.display = "none";
  document.getElementById("game").style.display = "flex";
  localStorage.setItem('update',true) ;
}

var one = document.getElementById("one");
one.addEventListener("click",function(){purchaseSegment(0)}) ;

var two = document.getElementById("two");
one.addEventListener("click",function(){purchaseSegment(1)}) ;

var three = document.getElementById("three");
one.addEventListener("click",function(){purchaseSegment(2)}) ;

var goButton = document.getElementById("go");
goButton.addEventListener("click",go) ;
