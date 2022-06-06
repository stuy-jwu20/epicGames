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
    return false ;
  }
  else if (shopSegments[number][0] in snakeStorage) {
    if (snakeStorage[shopSegments[number][0]]["count"] == [3]) {
      error.innerHTML = "that snake is already maxed out idiot" ;
      return false ;
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
      return true ;
    }
  }
  else if (snakeStorage.length < maxPartySize) {
    gold =- shopSegments[number][2]
    snakeStorage[shopSegments[number][0]]["name"] = shopSegments[number][0]
    snakeStorage[shopSegments[number][0]]["class"] = shopSegments[number][1]
    snakeStorage[shopSegments[number][0]]["color"] = shopSegments[number][2]
    snakeStorage[shopSegments[number][0]]["count"] = [1] ;
    shopSegments[number] = randomSegment() ;
    return true ;
  }
  else {
    error.innerHTML = "you have no party space for more snakes idiot" ;
    return false ;
  }
}

function reroll() {
  shopSegments[0] = randomSegment() ;
  one.innerHTML = "Name: " + shopSegments[0][0]
  + "  Class: " + shopSegments[0][1] + "  Cost: " + shopSegments[0][3];
  one.setAttribute("color",shopSegments[0][2]) ;

  shopSegments[1] = randomSegment() ;
  two.innerHTML = "Name: " + shopSegments[1][0]
  + "  Class: " + shopSegments[1][1] + "  Cost: " + shopSegments[1][3];
  two.setAttribute("color",shopSegments[1][2]) ;

  shopSegments[2] = randomSegment() ;
  three.innerHTML = "Name: " + shopSegments[2][0]
  + "  Class: " + shopSegments[2][1] + "  Cost: " + shopSegments[2][3];
  three.setAttribute("color",shopSegments[2][2]) ;
}

function go() {
  localStorage.setItem('snakes',JSON.stringify(snakeStorage)) ;
  localStorage.setItem('gold',gold) ;
  document.getElementById("shop").style.display = "none";
  document.getElementById("game").style.display = "flex";
  localStorage.setItem('update',true) ;
}

var one = document.getElementById("one");
one.addEventListener("click",function(){
                                if (purchaseSegment(0)) {
                                  shopSegments[0] = randomSegment() ;
                                  one.innerHTML = "Name: " + shopSegments[0][0]
                                  + "  Class: " + shopSegments[0][1] + "  Cost: " + shopSegments[0][3];
                                  one.setAttribute("color",shopSegments[0][2]) ;
                                  } ;
                                }) ;

var two = document.getElementById("two");
two.addEventListener("click",function(){
                                if (purchaseSegment(1)) {
                                  shopSegments[1] = randomSegment() ;
                                  two.innerHTML = "Name: " + shopSegments[1][0]
                                  + "  Class: " + shopSegments[1][1] + "  Cost: " + shopSegments[1][3];
                                  two.setAttribute("color",shopSegments[1][2]) ;
                                  } ;
                                }) ;

var three = document.getElementById("three");
three.addEventListener("click",function(){
                                if (purchaseSegment(2)) {
                                  shopSegments[2] = randomSegment() ;
                                  three.innerHTML = "Name: " + shopSegments[2][0]
                                  + "  Class: " + shopSegments[2][1] + "  Cost: " + shopSegments[2][3];
                                  three.setAttribute("color",shopSegments[2][2]) ;
                                  } ;
                                }) ;

var rerollButton = document.getElementById("reroll");
rerollButton.addEventListener("click",reroll);


var goButton = document.getElementById("go");
goButton.addEventListener("click",go) ;