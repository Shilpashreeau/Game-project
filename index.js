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
