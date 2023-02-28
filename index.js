//Setting time for the game
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

//Array.from to convert HTMLCollection into array to use concat method
const heartArray=Array.from(document.getElementsByTagName('img'));
console.log(heartArray);

const duplicateHeartArray=cardsArray.concat(cardsArray);
console.log(duplicateHeartArray);