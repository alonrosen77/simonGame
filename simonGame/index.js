const arrayComp = [];
let arrayUser = [];
let count = 0;
//computer turn
document.addEventListener("keydown", async function computerMove(event) {
  if (event.key === `a`) {
    document.querySelector(".main-header").innerText = "computer turn";
    const randomNum = Math.floor(Math.random() * 4) + 1;
    arrayComp.push(randomNum);
    for (let i = 0; i < arrayComp.length; i++) {
      switch (arrayComp[i]) {
        case 1:
          clicked(document.querySelector(".red-button"));
          break;
        case 2:
          clicked(document.querySelector(".yellow-button"));
          break;
        case 3:
          clicked(document.querySelector(".green-button"));
          break;
        case 4:
          clicked(document.querySelector(".blue-button"));
          break;
      }
      await delay(1000);
    }
    //declaring user turn
    await delay(1000);
    changeTitle("your turn");
  }
});
//user turn
const allButtons = document.querySelectorAll('.buttons');
allButtons.forEach(button => {
  button.addEventListener("click", async function userTurn(event) {
    count++;
    const pressedButton = button;
    clicked(pressedButton);
    arrayUser.push(convertToNumber(pressedButton));
    if (count === arrayComp.length) {
      for (let i = 0; i < arrayComp.length; i++) {
        if (arrayComp[i] !== arrayUser[i]) {
          gameOver();
        } else if (i === arrayComp.length - 1 && arrayComp[i] === arrayUser[i]) {
          changeTitle("great job!");
          await delay(1000);
          changeTitle("to go to the next level press the a button");
        }
      }
      count = 0;
      arrayUser = [];
    }
  });
});

//function that convert buttons to numbers by their colors
function convertToNumber(button) {
  if (button.style.backgroundColor === "indianred")
    return 1;
  else if (button.style.backgroundColor === "lemonchiffon")
    return 2;
  else if (button.style.backgroundColor === "limegreen")
    return 3;
  else
    return 4;
}
// function that add features while the user and computer click buttons
function clicked(button) {
  const color = button.style.backgroundColor;
  if (button.classList.contains("red-button")) {
    button.style.backgroundColor = "indianred";
    const sound = document.createElement("audio");
    sound.setAttribute("src", "sounds/red.mp3");
    sound.play();
  } else if (button.classList.contains("yellow-button")) {

    button.style.backgroundColor = "lemonchiffon";
    const sound = document.createElement("audio");
    sound.setAttribute("src", "sounds/yellow.mp3");
    sound.play();
  } else if (button.classList.contains("green-button")) {
    button.style.backgroundColor = "limegreen";
    const sound = document.createElement("audio");
    sound.setAttribute("src", "sounds/green.mp3");
    sound.play();
  } else {
    button.style.backgroundColor = "mediumslateblue";
    const sound = document.createElement("audio");
    sound.setAttribute("src", "sounds/blue.mp3");
    sound.play();
  }
  returnToColor(500, button, color);
}
//another helpers
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
async function returnToColor(time, button, color) {
  await delay(time);
  button.style.backgroundColor = color;
}

function changeTitle(newTitle) {
  document.querySelector(".main-header").innerText = newTitle;
}
async function waitBetweenClicks() {
  await delay(1000);
}
async function gameOver() {
  changeTitle("game over!");
  const bodyColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "black";
  await delay(800);
  const sound = document.createElement("audio");
  sound.setAttribute("src", "sounds/wrong.mp3");
  sound.play();
  returnToColor(200, document.body, bodyColor);
  changeTitle("to play again press refresh");
}
