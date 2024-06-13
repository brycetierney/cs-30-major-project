// Steak Casino
// Bryce Tierney
// June something, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "home"; // Initial game state
let clickSound, winSound; // Sound variables

// Preview variables
let limboPreviewImage, plinkoPreviewImage, minesPreviewImage;
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

// HTML inputs and buttons
let betAmountInput, targetMultiplierInput, betButton, halfBetButton, doubleBetButton;

// Preload sound files and images for the preview screens
function preload() {
  clickSound = loadSound("basicClick.mp3");
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

  // Creating the bet input location
  betAmountInput = createInput("");
  betAmountInput.position(windowWidth * 0.1, windowHeight * 0.7);
  betAmountInput.size(100);
  betAmountInput.input(updateValues);

  // Creating the target multiplier input location
  targetMultiplierInput = createInput("");
  targetMultiplierInput.position(windowWidth * 0.3, windowHeight * 0.7);
  targetMultiplierInput.size(100);
  targetMultiplierInput.input(updateValues);

  // Creating the bet button
  betButton = createButton('Place Bet');
  betButton.position(windowWidth * 0.55, windowHeight * 0.7);
  betButton.size(100, 50);
  betButton.style('background-color', '#4CAF50'); // Green button
  betButton.style('color', 'white');
  betButton.mousePressed(placeBet);

  // Creating the 1/2 bet button
  halfBetButton = createButton('1/2');
  halfBetButton.position(windowWidth * 0.2, windowHeight * 0.7);
  halfBetButton.size(50, 50);
  halfBetButton.mousePressed(halfBet);

  // Creating the X2 bet button
  doubleBetButton = createButton('X2');
  doubleBetButton.position(windowWidth * 0.25, windowHeight * 0.7);
  doubleBetButton.size(50, 50);
  doubleBetButton.mousePressed(doubleBet);

  // Initially hide inputs and buttons
  betAmountInput.hide();
  targetMultiplierInput.hide();
  betButton.hide();
  halfBetButton.hide();
  doubleBetButton.hide();
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
    halfBetButton.hide();
    doubleBetButton.hide();
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

// Halve the bet amount
function halfBet() {
  betAmount = parseFloat(betAmountInput.value()) || 0;
  betAmount /= 2;
  betAmountInput.value(betAmount.toFixed(2));
  updateValues();
}

// Double the bet amount
function doubleBet() {
  betAmount = parseFloat(betAmountInput.value()) || 0;
  betAmount *= 2;
  betAmountInput.value(betAmount.toFixed(2));
  updateValues();
}

// Draw function for different game states
function draw() {
  background(200); // Set background to grey
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
  // Background color
  background(200);

  // Displaying game previews
  image(limboPreviewImage, limboPreviewX, limboPreviewY, limboPreviewWidthSize, limboPreviewHeightSize);
  image(plinkoPreviewImage, plinkoPreviewX, plinkoPreviewY, plinkoPreviewWidthSize, plinkoPreviewHeightSize);
  image(minesPreviewImage, minesPreviewX, minesPreviewY, minesPreviewWidthSize, minesPreviewHeightSize);

  textSize(50);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Select a Game", windowWidth / 2, windowHeight * 0.1);
}

// Determine if a game's preview has been clicked
function mousePressed() {
  if (mouseX > limboPreviewX && mouseX < limboPreviewX + limboPreviewWidthSize &&
      mouseY > limboPreviewY && mouseY < limboPreviewY + limboPreviewHeightSize) {
    gameState = "limbo";
  }
}

// Draw Limbo game screen
function drawLimboGame() {
  background(200); // Grey background

  textSize(32);
  textAlign(CENTER, CENTER);

  if (!isBetPlaced) {
    betAmountInput.show();
    targetMultiplierInput.show();
    betButton.show();
    halfBetButton.show();
    doubleBetButton.show();

    // Display input fields and labels
    textSize(25);
    textAlign(LEFT);
    fill(0);
    text("Bet Amount:", windowWidth * 0.1, windowHeight * 0.65 - 20);
    text("Target Multiplier:", windowWidth * 0.3, windowHeight * 0.65 - 20);

    // Profit to win
    text("Profit to Win: $" + payout.toFixed(2), windowWidth * 0.4, windowHeight * 0.8);

    // Display number on the "big screen"
    fill(255);
    rect(windowWidth * 0.5 - 150, windowHeight * 0.3 - 50, 300, 200, 20);
    fill(0);
    textSize(50);
    text(displayedNumber.toFixed(2), windowWidth * 0.5, windowHeight * 0.3 + 50);

    // Target Multiplier
    textSize(20);
    textAlign(LEFT);
    text("Target Multiplier: " + targetMultiplier.toFixed(2), windowWidth * 0.5 - 150, windowHeight * 0.3 + 180);

    // Win Chance %
    textAlign(RIGHT);
    text("Win Chance: " + winChance.toFixed(2) + "%", windowWidth * 0.5 + 150, windowHeight * 0.3 + 180);

    // Bank Display
    textSize(25);
    textAlign(CENTER);
    text("Bank: $" + bank.toFixed(2), windowWidth * 0.5, windowHeight * 0.1);

    if (keyIsPressed && key === "Enter") {
      placeBet();
    }
  } else if (!gameOver) {
    displayedNumber = min(displayedNumber + 0.05, nextNumber); // Increment displayed number
    fill(255);
    rect(windowWidth * 0.5 - 150, windowHeight * 0.3 - 50, 300, 200, 20);
    fill(0);
    textSize(50);
    text(displayedNumber.toFixed(2), windowWidth * 0.5, windowHeight * 0.3 + 50);

    if (displayedNumber >= nextNumber) {
      gameOver = true;
      if (nextNumber >= targetMultiplier) {
        winSound.play();
        let winnings = betAmount * targetMultiplier;
        bank += winnings;
        text("You Win! " + targetMultiplier.toFixed(2) + " x " + targetMultiplier.toFixed(2), windowWidth * 0.5, windowHeight * 0.5);
      } else {
        text("You Lose...", windowWidth * 0.5, windowHeight * 0.5);
      }
    }
  } else {
    text("Displayed Number: " + displayedNumber.toFixed(2), windowWidth * 0.5, windowHeight * 0.4);
    text("Click to Play Again", windowWidth * 0.5, windowHeight * 0.6);
    if (mouseIsPressed) {
      isBetPlaced = false;
      betAmountInput.show();
      targetMultiplierInput.show();
      betButton.show();
      halfBetButton.show();
      doubleBetButton.show();
    }
  }
}

// Placeholder for Plinko game
function drawPlinkoGame() {
  background(100);
  text("Plinko Game Coming Soon", windowWidth / 2, windowHeight / 2);
}

// Placeholder for Mines game
function drawMinesGame() {
  background(150);
  text("Mines Game Coming Soon", windowWidth / 2, windowHeight / 2);
}

// Update preview sizes and positions based on window size
function updatePreviewSizesAndPositions() {
  // Update limbo preview sizes and positions
  limboPreviewX = windowWidth * 1/6;
  limboPreviewY = windowHeight * 1/4;
  limboPreviewWidthSize = windowWidth * 1/6;
  limboPreviewHeightSize = windowHeight * 1/4;

  // Update plinko preview sizes and positions
  plinkoPreviewX = windowWidth * 1/2 - windowWidth * 1/12;
  plinkoPreviewY = windowHeight * 1/4;
  plinkoPreviewWidthSize = windowWidth * 1/6;
  plinkoPreviewHeightSize = windowHeight * 1/4;

  // Update mines preview sizes and positions
  minesPreviewX = windowWidth * 5/6 - windowWidth * 1/6;
  minesPreviewY = windowHeight * 1/4;
  minesPreviewWidthSize = windowWidth * 1/6;
  minesPreviewHeightSize = windowHeight * 1/4;
}
