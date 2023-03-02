//*=========================Setting time for the game==================
const time = document.getElementById("time-left");
const div = document.querySelector(".time-duration");
const playAgainBtn = document.getElementById("play-again");
const win=document.getElementById("win-status");
const lose=document.getElementById("lose-status");
let button;
//console.log(time);

//setting limit to 60 seconds
let countDownTimerId = setInterval(countDown, 1000);
let currentTime = 10;

function countDown() {
  currentTime--;
  time.textContent = currentTime;
  if (currentTime >= 0 && checkFlippedCards(allCards)) {
    win.style.display='block';
    clearInterval(countDownTimerId);
    time.style.display='none';
  } /*else {
   // console.log("loss");
   lose.style.display='block';
  }*/

  if (currentTime <= 0) {
    clearInterval(countDownTimerId);

    // clearInterval(timerId);
    //Adding Game over button if if specified time is over
    const h3 = document.createElement("h3");
    h3.classList.add("time-duration");
    h3.innerHTML = "Game over";
    h3.style.color="violet";
    time.innerHTML = h3.innerHTML;
    playAgainBtn.style.display = "block";
    // currentTime=10;
    //countDownTimerId;

    //playAgainBtn.style.display="none";
    //playAgain();
    // countDown();
    // playAgain();
    /*button = document.createElement("button");
    button.classList.add("time-duration");
    button.innerHTML = "play again";
    div.append(button);*/
    //replay(button) ----------------------------------------> not working
  }
}
playAgainBtn.addEventListener("click", reload);
function reload() {
  window.location.reload();
}

// button.addEventListener("click", playAgain);
// function playAgain()
//  {
//     console.log("working");
//     countDown();
//   }

// function replay(btn){
// btn.addEventListener('click',countDown);

// }
//*===============================Duplicating the cards==============
//Array.from to convert HTMLCollection into array to use concat method
const heartArray = Array.from(document.querySelectorAll(".cards"));
console.log(heartArray);
const main = document.querySelector(".game-layout");
heartArray.forEach((ele) => {
  console.dir(ele);
  let card = document.createElement("div");
  // Apply a cards class to that div
  card.classList.add("cards");

  //   card.classList.add("back");

  card.innerHTML = ele.innerHTML;
  card.dataset.framework = ele.dataset.framework;
  console.dir(card);
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
//immediately invoked function-> variables will be discarded after function is executed
(function shuffle() {
  allCards.forEach((heart) => {
    let randomPos = Math.floor(Math.random() * 12);
    heart.style.order = randomPos;
  });
})(); //self executing anonymous function

console.log(allCards);

//*===================Adding event listener to allImages=============
allCards.forEach((card) => card.addEventListener("click", flipTheCard));

let isFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
function flipTheCard() {
  let clicked = this;
  if (lockBoard) {
    return;
  }
  if (clicked === firstCard) {
    return;
  }
  //  this.classList.toggle("flip");

  clicked.classList.toggle("flip");

  if (!isFlipped) {
    isFlipped = true;
    firstCard = clicked;
    return;
    //console.log(isFlipped, firstCard);
  }

  secondCard = clicked;
  checkMatch();
}
//*====================Matching two hearts==========

function checkMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //matched
    disableCards();
  } else {
    unFlipCards();
  }
}
function disableCards() {
  firstCard.removeEventListener("click", flipTheCard);
  secondCard.removeEventListener("click", flipTheCard);
  reset();
}
//no match
function unFlipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1500);
}
function reset() {
  isFlipped = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

//logic for win state needs to go on top dont know where not working


function checkFlippedCards(arr) {
  arr = Array.from(arr);
 //console.log(arr);
 // console.log(arr.every((card) => card.classList.contains("flip")));
  return arr.every((card) => card.classList.contains("flip"));
}

// const allImages=document.querySelectorAll('.front','.back')
//  console.log(allImages);
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
