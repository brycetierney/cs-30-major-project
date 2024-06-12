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
let nextNumber = 1.00;
let isBetPlaced = false;
let gameOver = false;
let winChance = 0;
let payout = 0;
let bank = 1000; // Initial bank amount



// html inputs
let betAmountInput, targetMultiplierInput;
let betButton;

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
  
  // Update canvas size on window resize
  window.addEventListener('resize', () => {
    resizeCanvas(windowWidth, windowHeight);
    updatePreviewSizesAndPositions();
  });

  // Creating the bet iunput location
  betAmountInput = createInput("");
  betAmountInput.position(windowWidth * 1/10, windowHeight * 1/3 + 20);
  betAmountInput.size(125);
  betAmountInput.input(updateValues);

  // Creating the target multiplier input location
  targetMultiplierInput = createInput("");
  targetMultiplierInput.position(windowWidth * 1/10, windowHeight * 1/2 + 20);
  targetMultiplierInput.size(125);
  targetMultiplierInput.input(updateValues);

  // Create betting buttons
  betButton = createButton('Bet');
  betButton.position(windowWidth * 1/10, windowHeight * 2/3 + 20);
  betButton.size(125);
  betButton.mousePressed(placeBet);

  // Initially hide inputs and button
  betAmountInput.hide();
  targetMultiplierInput.hide();
  betButton.hide();
}

// Place bet function
function placeBet() {
  if (betAmount <= bank && betAmount > 0) {
    bank -= betAmount;
    isBetPlaced = true;
    gameOver = false;
    displayedNumber = 1.00;
    nextNumber = random(1.0, 100.0); // Set the next number
    betAmountInput.hide();
    targetMultiplierInput.hide();
    betButton.hide();
  }
}

// Update values from input fields
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


// Draw home screen with game previews
function drawHomeScreen() {
  setGradient(0, 0, width, height, color(0, 128, 255), color(255, 255, 255));
  
  // Displaying game previews
  image(limboPreviewImage, limboPreviewX, limboPreviewY, limboPreviewWidthSize, limboPreviewHeightSize);
  image(plinkoPreviewImage, plinkoPreviewX, plinkoPreviewY, plinkoPreviewWidthSize, plinkoPreviewHeightSize);
  image(minesPreviewImage, minesPreviewX, minesPreviewY, minesPreviewWidthSize, minesPreviewHeightSize);
}

// Add a gradient for background
function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
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


// Draw Limbo game screen
function drawLimboGame() {
  setGradient(0, 0, width, height, color(255, 204, 0), color(255, 255, 255));

  textSize(32);
  textAlign(CENTER, CENTER);

  if (!isBetPlaced) {
    betAmountInput.show();
    targetMultiplierInput.show();
    betButton.show();

    // Display input fields and labels
    textSize(25);
    textAlign(LEFT);
    fill(0);
    text("Bet Amount:", windowWidth * 1/10, windowHeight * 1/3 - 30);
    text("Target Multiplier:", windowWidth * 1/10, windowHeight * 1/2 - 20);

    // Profit to win
    text("Profit to Win: $" + payout.toFixed(2), windowWidth * 1/4, windowHeight * 1/2 + 100);

    // Display number on the "big screen"
    fill(255);
    rect(windowWidth * 1/2 - 150, windowHeight * 1/3 - 50, 300, 200, 20);
    fill(0);
    textSize(50);
    text(displayedNumber.toFixed(2), windowWidth * 1/2, windowHeight * 1/3 + 50);

    // Target Multiplier
    textSize(20);
    textAlign(LEFT);
    text("Target Multiplier: " + targetMultiplier.toFixed(2), windowWidth * 1/2 - 150, windowHeight * 1/3 + 180);

    // Win Chance %
    textAlign(RIGHT);
    text("Win Chance: " + winChance.toFixed(2) + "%", windowWidth * 1/2 + 150, windowHeight * 1/3 + 180);

    // Bank Display
    textSize(25);
    textAlign(CENTER);
    text("Bank: $" + bank.toFixed(2), windowWidth * 1/2, windowHeight * 1/8);
    if (keyIsPressed && key === "Enter") {
      placeBet();
    }
  }
  else if (!gameOver) {
    displayedNumber = min(displayedNumber + 0.05, nextNumber); // Increment displayed number
    fill(255);
    rect(windowWidth * 1/2 - 150, windowHeight * 1/3 - 50, 300, 200, 20);
    fill(0);
    textSize(50);
    text(displayedNumber.toFixed(2), windowWidth * 1/2, windowHeight * 1/3 + 50);

    if (displayedNumber >= nextNumber) {
      gameOver = true;
      if (nextNumber >= targetMultiplier) {
        winSound.play();
        let winnings = betAmount * targetMultiplier;
        bank += winnings;
        text("You Win! " + targetMultiplier.toFixed(2) + " X " + targetMultiplier.toFixed(2) + "x", windowWidth * 1/2, windowHeight * 1/2 + 50);
      } else {
        text("You Lose...", windowWidth * 1/2, windowHeight * 1/2 + 50);
      }
    }
  } else {
    text("Displayed Number: " + displayedNumber.toFixed(2), width * 1/2, height * 1/4);
    text("Click to Play Again", width * 1/2, height * 1/2);
    if (mouseIsPressed) {
      isBetPlaced = false;
      betAmountInput.show();
      targetMultiplierInput.show();
      betButton.show();
    }
  }
}

// Update sizes and positions of game previews
function updatePreviewSizesAndPositions() {
  limboPreviewX = windowWidth * 1/6;
  limboPreviewY = windowHeight * 1/4;
  limboPreviewWidthSize = windowWidth * 1/6;
  limboPreviewHeightSize = windowHeight * 1/4;

  plinkoPreviewX = windowWidth * 1/2 - windowWidth * 1/12;
  plinkoPreviewY = windowHeight * 1/4;
  plinkoPreviewWidthSize = windowWidth * 1/6;
  plinkoPreviewHeightSize = windowHeight * 1/4;

  minesPreviewX = windowWidth * 5/6 - windowWidth * 1/6;
  minesPreviewY = windowHeight * 1/4;
  minesPreviewWidthSize = windowWidth * 1/6;
  minesPreviewHeightSize = windowHeight * 1/4;
}
