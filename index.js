//*=========================Setting time for the game==================
const time = document.getElementById("time-left");
//console.log(time);
//setting limit to 30 seconds
let currentTime = 30;
let timerId = null;
function countDown() {
  currentTime--;
  time.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
  }
}

let countDownTimerId = setInterval(countDown, 1000);
//*===============================Duplicating the cards==============
//Array.from to convert HTMLCollection into array to use concat method
const heartArray = Array.from(document.querySelectorAll(".cards"));
console.log(heartArray);

//const duplicateHeartArray=heartArray.concat(heartArray);
//console.log(duplicateHeartArray);
const main = document.querySelector(".game-layout");
heartArray.forEach((ele) => {
  let card = document.createElement("div");
  // Apply a cards class to that div
  card.classList.add("cards");
 
  //   card.classList.add("back");

  card.innerHTML = ele.innerHTML;
  console.log(card);
  // Append the div to the main
  main.appendChild(card);
});
console.log(main);
// const div=document.createElement('div');
// div.setAttribute('class','cards');

//main.appendChild(ele);
// main.append(div);
//console.log(mainHeartArray);
//main.append(section);

//*=========================Randomizing the cards=================
let allCards = document.querySelectorAll(".cards");

function shuffle() {
  allCards.forEach((heart) => {
    let randomPos = Math.floor(Math.random() * 12);
    heart.style.order = randomPos;
  });
}
shuffle();
console.log(allCards);

// const allImages=document.querySelectorAll('.front','.back')
//  console.log(allImages);
//*===================Adding event listener to allImages=============
allCards.forEach(card => card.addEventListener('click', flipTheCard));
// allCards.forEach((heart) => {
//   heart.addEventListener("click", function (event) {
    // let clicked = event.target;
    //console.dir(clicked);
    //toggle-if the class is there remove it else add it
    // clicked.classList.toggle("flip");
    //flipTheCard(clicked);

    //trying to add border not working
    // if (clicked.classList !== ".front" && clicked.classList !== ".back") {
    //   return;
    // }
    // clicked.classList.add(".selected");
//   });
// });
// let allCards = document.querySelectorAll('.cards');

// function flipCard() {
//   this.classList.toggle('flip');
// }

// cards.forEach(card => card.addEventListener('click', flipCard));

//*=========== two choices====================

let isFlipped = false;
let firstCard, secondCard;
function flipTheCard() {
  //  this.classList.toggle("flip");
  let clicked=this;
  clicked.classList.toggle("flip");
 
  if (!isFlipped) {
    isFlipped = true;
    firstCard = clicked;
    //console.log(isFlipped, firstCard);
  } else {
    isFlipped=false;
    secondCard=clicked;
  }
  //*====================Matching two hearts==========
  if(firstCard.dataset.framework===secondCard.dataset.framework){

//matched
firstCard.removeEventListener('click',flipTheCard);
secondCard.removeEventListener('click',flipTheCard);
}
}

//*====================Matching two hearts==========
