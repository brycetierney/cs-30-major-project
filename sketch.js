// Steak Casino
// Bryce Tierney
// June something, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Setting variables. gameState starts as the homne screen and ETCCCCC
let gameState = "home";
let clickSound;
let winSound;

// Preview variables
let limboPreviewImage;
let plinkoPreviewImage;
let minesPreviewImage;

let limboPreviewX, limboPreviewY, limboPreviewWidthSize, limboPreviewHeightSize;
let plinkoPreviewX, plinkoPreviewY, plinkoPreviewWidthSize, plinkoPreviewHeightSize;
let minesPreviewX, minesPreviewY, minesPreviewWidthSize, minesPreviewHeightSize;

// Limbo game variables
let betAmount = 0;
let targetMultiplier = 1.0;
let displayedNumber = 1.00;
let isBetPlaced = false;
let gameOver = false;
let winChance = 0;
let payout = 0;
let bank = 1000; // Initial bank amount


// html inputs
let betAmountInput, targetMultiplierInput;


// Plinko game variables


// Mines game variables


// how to get sound, need to get a click mp3 sound and use preload ETCCCCC

// Loading sound files and images for the preview screens, ETCCCCC
function preload() {
  clickSound = loadSound("basicClick.mp3"); // Add what you need here ETCCCCC
  winSound = loadSound("melodyError.wav");

  limboPreviewImage = loadImage("limboPreview.avif");
  plinkoPreviewImage = loadImage("plinkoPreview.jpg");
  minesPreviewImage = loadImage("minesBryce.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  updatePreviewSizesAndPositions();
  window.addEventListener('resize', () => {
    resizeCanvas(windowWidth, windowHeight);
    updatePreviewSizesAndPositions();
  });

  // Create the input locations
  betAmountInput = createInput("");
  betAmountInput.position(windowWidth * 1/4, windowHeight * 1/2 - 50);
  betAmountInput.size(125);
  betAmountInput.input(updateValues);

  targetMultiplierInput = createInput("");
  targetMultiplierInput.position(windowWidth * 1/4, windowHeight * 1/2);
  targetMultiplierInput.size(125);
  targetMultiplierInput.input(updateValues);

  betAmountInput.hide();
  targetMultiplierInput.hide();
}

function updateValues() {
  betAmount = parseFloat(betAmountInput.value()) || 0;
  targetMultiplier = parseFloat(targetMultiplierInput.value()) || 1.0;
  winChance = (1 / targetMultiplier) * 100;
  payout = betAmount * targetMultiplier;

  if (betAmount > bank) {
    betAmount = bank;
    betAmountInput.value(bank);
  }
}


// Displaying whichever game you clicked, at the start it is homeScreen
function draw() {
  background(220);
  if (gameState === "home") {
    drawHomeScreen();
  }
  if (gameState === "limbo") {
    drawLimboGame();
  }
  if (gameState === "plinko") {
    drawPlinkoGame();
  }
  if (gameState === "mines") {
    drawMinesGame();
  }
}


function drawHomeScreen() {
  // setting gradient values
  setGradient(0, 0, width, height, color(0, 120, 255), color(255, 255, 255));

  // Displaying limbo preview
  image(limboPreviewImage, limboPreviewX, limboPreviewY, limboPreviewWidthSize, limboPreviewHeightSize);

  // Displaying plinko preview
  image(plinkoPreviewImage, plinkoPreviewX, plinkoPreviewY, plinkoPreviewWidthSize, plinkoPreviewHeightSize);

  // Displaying mines preview
  image(minesPreviewImage, minesPreviewX, minesPreviewY, minesPreviewWidthSize, minesPreviewHeightSize);
}

// Add the Max Liu special (a gradient)
function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c2, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}


// Determining if a game's preview has been pressed, if so, take you to that game's screen
function mousePressed() {
  if (mouseX > limboPreviewX && mouseX < limboPreviewX + limboPreviewWidthSize &&
      mouseY > limboPreviewY && mouseY < limboPreviewY + limboPreviewHeightSize) {
    gameState = "limbo";
  }
}


function drawLimboGame() {
  // Add Max Liu color
  setGradient(0, 0, width, height, color(255, 200, 0), color(255, 255, 255));

  textSize(32);
  textAlign(CENTER, CENTER);

  if (!isBetPlaced) {
    betAmountInput.show();
    targetMultiplierInput.show();

    textSize(25);
    textAlign(LEFT);
    text("Bet Amount:", windowWidth * 1/4 - 100, windowHeight * 1/2 - 30);
    text("Target Multiplier: " + displayedNumber.toFixed(2), windowWidth * 1/2, windowHeight * 1/2);
    text("Displayed Number: " + displayedNumber.toFixed(2), windowWidth * 1/2, windowHeight * 1/3);
    text("Win Chance : " + winChance.toFixed(2) + "%", windowHeight * 1/4, windowHeight * 1/2 + 70);
    text("Profit to Win: $" + payout.toFixed(2), windowWidth * 1/4, windowHeight * 1/2 + 100);
    text("Bank: $ " + bank.toFixed(2), windowWidth * 1/14, windowHeight * 1/10)

    textAlign(CENTER);
    textSize(50);
    text(displayedNumber.toFixed(2), windowWidth * 3/4, windowHeight * 1/2);

    if (keyIsPressed && key === "Enter") {
      if (betAmount <= bank && betAmount > 0) {
        bank -= betAmount;
        isBetPlaced = true;
        gameOver = false;
        displayedNumber = 1.00;
        betAmountInput.hide();
        targetMultiplierInput.hide();
      }
      else {
        textSize(25);
        fill(255, 0, 0);
        text("Imsufficient Funds :(", width * 1/2, height * 1/2 + 80);
        noFill();
      }
    }
  }
    else if (!gameOver) {
      displayedNumber += 0.01; // Simulating multiplier increase
      textSize(50);
      text(displayedNumber.toFixed(2), windowWidth * 3/4, windowHeight * 1/2);

    if (mouseIsPressed) {
      let nextNumber = random(1.0, 100.0);
      text("Next Number: " + nextNumber.toFixed(2), width * 1/2, height * 3/4);

      gameOver = true;
      if (nextNumber >= targetMultiplier) {
        winSound.play();
        let winnings = betAmount * targetMultiplier;
        bank += winnings;
        text("You Win! " + targetMultiplier.toFixed(2) + " X " + targetMultiplier.toFixed(2) + "x", width * 1/2, height * 1/2 + 50);
      }
      else {
        text("you lose...", width * 1/2, height * 1/2 + 50);
      }
    }
  }
  else {
    text("Displayed Number: " + displayedNumber.toFixed(2), width * 1/2, height * 1/4);
    text("Click to Play Again", width * 1/2, height * 1/2);
    if (mouseIsPressed) {
      isBetPlaced = false;
      betAmountInput.show();
      targetMultiplierInput.show();
    }
  }
}

//make it so that the other 2 previews use recursion to leave


function updatePreviewSizesAndPositions() {
  // Update limbo preview sizes and portions
  limboPreviewX = windowWidth * 1/4;
  limboPreviewY = windowHeight * 1/4;
  limboPreviewWidthSize = windowWidth * 1/4;
  limboPreviewHeightSize = windowHeight * 1/4;

  // Update limbo preview sizes and portions
  plinkoPreviewX = windowWidth * 0.6;
  plinkoPreviewY = windowHeight * 0.45;
  plinkoPreviewWidthSize = windowWidth * .35;
  plinkoPreviewHeightSize = windowHeight * .5;

  // Update limbo preview sizes and portions
  minesPreviewX = windowWidth * 1/4;
  minesPreviewY = windowHeight * 3/4;
  minesPreviewWidthSize = windowWidth * 1/4;
  minesPreviewHeightSize = windowHeight * 1/4;

}
