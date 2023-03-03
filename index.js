//*=========================Setting time for the game==================
const time = document.getElementById("time-left");
const div = document.querySelector(".time-duration");
const playAgainBtn = document.getElementById("play-again");
const win = document.getElementById("win-status");
const lose = document.getElementById("lose-status");
const main = document.querySelector(".game-layout");
let button;

//setting time limit to 60 seconds
let currentTime = 100;
let countDownTimerId = setInterval(countDown, 1000);

function countDown() {
  currentTime--;
  time.textContent = currentTime;
  if (currentTime >= 0 && checkFlippedCards(allCards)) {
    win.style.display = "block";
    clearInterval(countDownTimerId);
    time.style.display = "none";
  } /*else {
   // console.log("loss");
   lose.style.display='block';
  }*/

  if (currentTime <= 0) {
    //restarts the timer 
    clearInterval(countDownTimerId);

   //Adding Game over if specified time is over
    const h3 = document.createElement("h3");
    h3.classList.add("time-duration");
        h3.innerHTML = "Game over";
    //h3.style.color = "#AD7BE9";
    time.innerHTML = h3.innerHTML;
    playAgainBtn.style.display = "block";
          }
}

//*==========================Play again====================
playAgainBtn.addEventListener("click", reload);
function reload() {
  window.location.reload();
}

//*===============================Duplicating the cards==============
//Array.from to convert HTMLCollection into array 
const heartArray = Array.from(document.querySelectorAll(".cards"));
heartArray.forEach((ele) => {
  let card = document.createElement("div");
  // Apply a cards class to created div
  card.classList.add("cards");
  card.innerHTML = ele.innerHTML;
  card.dataset.framework = ele.dataset.framework;
  // Append the div to the main
  main.appendChild(card);
});
//console.log(main);

//*=========================Randomizing the cards=================
let allCards = document.querySelectorAll(".cards");
//immediately invoked function-> variables will be discarded after function is executed
(function shuffle() {
  allCards.forEach((heart) => {
    let randomPos = Math.floor(Math.random() * 12);
    heart.style.order = randomPos;
  });
})(); //self executing anonymous function
//console.log(allCards);

//*===================Adding event listener to all the images=============
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

  clicked.classList.toggle("flip");

  if (!isFlipped) {
    isFlipped = true;
    firstCard = clicked;
    return;
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
//function that checks if the cards flipped belongs to class flip.
function checkFlippedCards(arr) {
  arr = Array.from(arr);
  //console.log(arr.every((card) => card.classList.contains("flip")));
  return arr.every((card) => card.classList.contains("flip"));
}

