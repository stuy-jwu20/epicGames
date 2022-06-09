import { SnakeSegment, Snake } from './snake.js';

var snakeStorage ;
var party ;
var maxPartySize ;
var gold ;
var goldVar ;
var locked ;
var stage ;
var shopSegments = [] ;

function update(){
  if (localStorage.getItem("shopUpdate") == 'true') {
    snakeStorage = JSON.parse(localStorage.getItem('snakes')) ;
    party = document.getElementById("party") ;
    maxPartySize = parseInt(localStorage.getItem('maxPartySize')) ;
    gold = parseInt(localStorage.getItem('gold')) ;
    goldVar = document.getElementById("goldVar") ;
    locked = false ;
    document.getElementById("lock").style.color = "#749ecf" ;
    stage = document.getElementById("stageLevel");
    error.innerHTML = '' ;
    stage.innerHTML = "Stage "+localStorage.getItem("level") ;
    goldVar.innerHTML = "Shop - Gold: " + gold ;
    party.innerHTML = "Party: "+Object.keys(snakeStorage).length+"/"+maxPartySize ;

    shopSegments[0] = randomSegment() ;
    one.innerHTML = "Name: " + shopSegments[0][0]
    + "  Class: " + shopSegments[0][1] + "  Cost: " + shopSegments[0][3];
    one.style.color = shopSegments[0][2];

    shopSegments[1] = randomSegment() ;
    two.innerHTML = "Name: " + shopSegments[1][0]
    + "  Class: " + shopSegments[1][1] + "  Cost: " + shopSegments[1][3];
    two.style.color = shopSegments[1][2];

    shopSegments[2] = randomSegment() ;
    three.innerHTML = "Name: " + shopSegments[2][0]
    + "  Class: " + shopSegments[2][1] + "  Cost: " + shopSegments[2][3];
    three.style.color = shopSegments[2][2];

    localStorage.setItem("shopUpdate",'false') ;
  }
}
setInterval(update,10);

function counter(array,value) {
  var number = 0 ;
  for(var i=0;i<array.length;i++) {
    if (array[i] == value) number++ ;
  }
  return number ;
}

function randomSegment() {
  let rand = (Math.floor(Math.random() * 5)) ;
  if (rand == 0) {
    return ['Ranger','Green','LawnGreen',1] ;
  }
  if (rand == 1) {
    return ['Nuker','Orange','LightSalmon',1] ;
  }
  if (rand == 2) {
    return ['Fighter','Yellow','Gold',1] ;
  }
  if (rand == 3) {
    return ['Speedster','Blue','CornflowerBlue',1] ;
  }
  if (rand == 4) {
    return ['Supporter','Purple','MediumOrchid',1] ;
  }

}
var error = document.getElementById("error");

function purchaseSegment(number) {
  if (gold < shopSegments[number][3]) {
    error.innerHTML = "you're too broke to afford that snake idiot" ;
    return false ;
  }
  else if (shopSegments[number][0] in snakeStorage) {

    if (counter(snakeStorage[shopSegments[number][0]]["count"],3) >= 1) {
      error.innerHTML = "that snake is already maxed out idiot" ;
      return false ;
    }
    else {
      gold -= shopSegments[number][3] ;
      goldVar.innerHTML = "Shop - Gold: " + gold ;
      snakeStorage[shopSegments[number][0]]["count"].push(1) ;
      var index = (Object.keys(snakeStorage).indexOf(snakeStorage[shopSegments[number][0]]["name"])+1) ;
      if (counter(snakeStorage[shopSegments[number][0]]["count"],1) == 3) {
        var temp = document.getElementById("s"+index);
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        temp.removeChild(temp.lastChild);
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        temp.removeChild(temp.lastChild);
        snakeStorage[shopSegments[number][0]]["count"].pop() ;
        snakeStorage[shopSegments[number][0]]["count"].push(2);
        var buttonTemp = document.createElement("button") ;
        buttonTemp.id = "s"+index+snakeStorage[shopSegments[number][0]]["count"].length ;
        buttonTemp.innerHTML = snakeStorage[shopSegments[number][0]]["count"][0] ;
        buttonTemp.style.color = snakeStorage[shopSegments[number][0]]["color"];
        buttonTemp.style.paddingRight = "15px";
        temp.appendChild(buttonTemp);
        buttonTemp.addEventListener("click",function(){sell(""+buttonTemp.id.substring(1),buttonTemp.innerHTML)}) ;

        if (counter(snakeStorage[shopSegments[number][0]]["count"],2) == 3) {
          snakeStorage[shopSegments[number][0]]["count"].pop() ;
          temp.removeChild(temp.lastChild);
          snakeStorage[shopSegments[number][0]]["count"].pop() ;
          temp.removeChild(temp.lastChild);
          snakeStorage[shopSegments[number][0]]["count"].pop() ;
          temp.removeChild(temp.lastChild);
          snakeStorage[shopSegments[number][0]]["count"].push(3);
          buttonTemp = document.createElement("button") ;
          buttonTemp.id = "s"+index+snakeStorage[shopSegments[number][0]]["count"].length ;
          buttonTemp.innerHTML = snakeStorage[shopSegments[number][0]]["count"][0] ;
          buttonTemp.style.color = snakeStorage[shopSegments[number][0]]["color"];
          buttonTemp.style.paddingRight = "15px";
          temp.appendChild(buttonTemp);
          buttonTemp.addEventListener("click",function(){sell(""+buttonTemp.id.substring(1),buttonTemp.innerHTML)}) ;
        }

      }

      else {
        var temp = document.getElementById("s"+index);
        var buttonTemp = document.createElement("button") ;
        buttonTemp.id = "s"+index+snakeStorage[shopSegments[number][0]]["count"].length ;
        buttonTemp.innerHTML = 1 ;
        buttonTemp.style.color = snakeStorage[shopSegments[number][0]]["color"];
        buttonTemp.style.paddingRight = "15px";
        temp.appendChild(buttonTemp);
        buttonTemp.addEventListener("click",function(){sell(""+buttonTemp.id.substring(1),buttonTemp.innerHTML)}) ;
      }
      return true ;
    }
  }
  else if (Object.keys(snakeStorage).length < maxPartySize) {
    gold -= shopSegments[number][3] ;
    goldVar.innerHTML = "Shop - Gold: " + gold ;
    snakeStorage[shopSegments[number][0]] = {} ;
    snakeStorage[shopSegments[number][0]]["name"] = shopSegments[number][0] ;
    snakeStorage[shopSegments[number][0]]["class"] = shopSegments[number][1] ;
    snakeStorage[shopSegments[number][0]]["color"] = shopSegments[number][2] ;
    snakeStorage[shopSegments[number][0]]["count"] = [1] ;

    var temp = document.getElementById("s"+Object.keys(snakeStorage).length);
    var buttonTemp = document.createElement("button");
    buttonTemp.id = ("s"+Object.keys(snakeStorage).length+snakeStorage[shopSegments[number][0]]["count"].length)
    temp.innerHTML = snakeStorage[shopSegments[number][0]]["name"] + ": " ;
    buttonTemp.innerHTML = snakeStorage[shopSegments[number][0]]["count"] ;
    buttonTemp.style.color = snakeStorage[shopSegments[number][0]]["color"];
    buttonTemp.style.paddingRight = "15px";
    buttonTemp.addEventListener("click",function(){sell(""+buttonTemp.id.substring(1),buttonTemp.innerHTML)}) ;
    temp.appendChild(buttonTemp);

    shopSegments[number] = randomSegment() ;
    party.innerHTML = "Party: "+Object.keys(snakeStorage).length+"/"+maxPartySize ;
    return true ;
  }
  else {
    error.innerHTML = "you have no party space for more snakes idiot" ;
    return false ;
  }
}

function reroll() {
  if (gold > 2) {
    shopSegments[0] = randomSegment() ;
    one.innerHTML = "Name: " + shopSegments[0][0]
    + "  Class: " + shopSegments[0][1] + "  Cost: " + shopSegments[0][3];
    one.style.color = shopSegments[0][2];

    shopSegments[1] = randomSegment() ;
    two.innerHTML = "Name: " + shopSegments[1][0]
    + "  Class: " + shopSegments[1][1] + "  Cost: " + shopSegments[1][3];
    two.style.color = shopSegments[1][2];

    shopSegments[2] = randomSegment() ;
    three.innerHTML = "Name: " + shopSegments[2][0]
    + "  Class: " + shopSegments[2][1] + "  Cost: " + shopSegments[2][3];
    three.style.color = shopSegments[2][2];
    gold -= 2;
    goldVar.innerHTML = "Shop - Gold: " + gold ;
  }
  else {
    error.innerHTML = "you're too broke to refresh the shop idiot" ;
  }
}

function lock() {
  if (locked) {
    locked = false ;
    document.getElementById("lock").style.color = "#749ecf" ;
  }
  else {
    locked = true ;
    document.getElementById("lock").style.color = "#3c597a" ;
  }
}

function sell(index,value) {
  var parent = document.getElementById("s"+index[0]) ;
  var c = document.getElementById("s"+index) ;
  var s = parent.innerHTML.substring(0, parent.innerHTML.indexOf(':')) ;

  var count = snakeStorage[s]["count"] ; ;
  var temp = count.indexOf(parseInt(value));
  snakeStorage[s]["count"].splice(temp, 1);
  var children = Array.from(parent.children).slice(index[1]);
  parent.removeChild(c) ;
  for (var i in children) {
    document.getElementById(children[i].id).id = children[i].id.substring(0,2)+(parseInt(children[i].id.substring(2,3))-1) ;
  }
  if (c.innerHTML == '1') {
    gold += 1;
  }
  if (c.innerHTML == '2') {
    gold += 2;
  }
  if (c.innerHTML == '3') {
    gold += 8;
  }
  goldVar.innerHTML = "Shop - Gold: " + gold ;
  if (snakeStorage[s]["count"].length == 0) {

    delete snakeStorage[s];
    party.innerHTML = "Party: "+Object.keys(snakeStorage).length+"/"+maxPartySize ;

    for(var i=parseInt(index[0]);(i < maxPartySize+1);i++) {
      document.getElementById("s"+i).innerHTML = ''
      if (document.getElementById("s"+(parseInt(i)+1)).innerHTML == "") {
        break;
      }
      document.getElementById("s"+i).innerHTML = document.getElementById("s"+(parseInt(i)+1)).innerHTML.substring(0, document.getElementById("s"+((parseInt(i)+1))).innerHTML.indexOf(' ')+1) ;
      for (var j in Array.from(document.getElementById("s"+(parseInt(i)+1)).children)) {
        var newChild = document.createElement("button");
        newChild.innerHTML = document.getElementById("s"+(i+1)+((parseInt(j)+1))).innerHTML ;
        newChild.style.color = document.getElementById("s"+(i+1)+((parseInt(j)+1))).style.color;
        newChild.id = "s"+(i)+((parseInt(j)+1)) ;
        newChild.style.paddingRight = "15px";
        newChild.addEventListener("click",function(){sell(""+newChild.id.substring(1),newChild.innerHTML)}) ;
        document.getElementById("s"+i).appendChild(newChild) ;
      }

    }
  }
}

function transition() {
  document.getElementById("body").classList.remove("transition");
  document.getElementById("loadText").classList.remove("transitionLoad");
  document.getElementById("loadText").style.display = "none";
  document.getElementById("shop").style.display = "none";
  document.getElementById("goldVar").style.display = "none";
  document.getElementById("reroll").style.display = "none";
  document.getElementById("lock").style.display = "none";
  document.getElementById("party").style.display = "none";
  document.getElementById("go").style.display = "none";
  setTimeout(() => {
    document.getElementById("body").classList.add("transition");
    document.getElementById("loadText").style.display = "block";
    document.getElementById("loadText").classList.add("transitionLoad");
    document.getElementById("arena").style.display = "flex";
    document.getElementById("waveText").classList.add("transitionArena");
    document.getElementById("game").style.display = "flex";
    document.getElementById("game").classList.add("transitionCanvas");
  }, "100")
}

function go() {
  console.log("yes")
  if (Object.keys(snakeStorage).length > 0) {
    localStorage.setItem('snakes',JSON.stringify(snakeStorage)) ;
    localStorage.setItem('gold',gold) ;
    document.getElementById("shop").style.display = "none";
    document.getElementById("game").style.display = "flex";
    localStorage.setItem('gameUpdate',"true") ;
    localStorage.setItem('active','game') ;
    if (!(locked)) {
      shopSegments[0] = randomSegment() ;
      one.innerHTML = "Name: " + shopSegments[0][0]
      + "  Class: " + shopSegments[0][1] + "  Cost: " + shopSegments[0][3];
      one.style.color = shopSegments[0][2];

      shopSegments[1] = randomSegment() ;
      two.innerHTML = "Name: " + shopSegments[1][0]
      + "  Class: " + shopSegments[1][1] + "  Cost: " + shopSegments[1][3];
      two.style.color = shopSegments[1][2];

      shopSegments[2] = randomSegment() ;
      three.innerHTML = "Name: " + shopSegments[2][0]
      + "  Class: " + shopSegments[2][1] + "  Cost: " + shopSegments[2][3];
      three.style.color = shopSegments[2][2];
    }
    transition();
  }
  else {
    error.innerHTML = "you need at least one snake idiot" ;
  }
}

var one = document.getElementById("one");
one.addEventListener("click",function(){
                                if (purchaseSegment(0)) {
                                  shopSegments[0] = randomSegment() ;
                                  one.innerHTML = "Name: " + shopSegments[0][0]
                                  + "  Class: " + shopSegments[0][1] + "  Cost: " + shopSegments[0][3];
                                  one.style.color = shopSegments[0][2];
                                  } ;
                                }) ;

var two = document.getElementById("two");
two.addEventListener("click",function(){
                                if (purchaseSegment(1)) {
                                  shopSegments[1] = randomSegment() ;
                                  two.innerHTML = "Name: " + shopSegments[1][0]
                                  + "  Class: " + shopSegments[1][1] + "  Cost: " + shopSegments[1][3];
                                  two.style.color = shopSegments[1][2];
                                  } ;
                                }) ;

var three = document.getElementById("three");
three.addEventListener("click",function(){
                                if (purchaseSegment(2)) {
                                  shopSegments[2] = randomSegment() ;
                                  three.innerHTML = "Name: " + shopSegments[2][0]
                                  + "  Class: " + shopSegments[2][1] + "  Cost: " + shopSegments[2][3];
                                  three.setAttribute("color",shopSegments[2][2]) ;
                                  three.style.color = shopSegments[2][2];
                                  } ;
                                }) ;

var rerollButton = document.getElementById("reroll");
rerollButton.addEventListener("click",reroll);

var lockButton = document.getElementById("lock");
lockButton.addEventListener("click",lock);

var goButton = document.getElementById("go");
goButton.addEventListener("click",go) ;
