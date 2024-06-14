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
let startTime; // Start time for animation

// HTML inputs and buttons
let betAmountInput, targetMultiplierInput, betButton, halfBetButton, doubleBetButton, halfMultiplierButton, doubleMultiplierButton;

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
  background(50)
  
  // Update canvas size on window resize
  window.addEventListener('resize', () => {
    resizeCanvas(windowWidth, windowHeight);
    updatePreviewSizesAndPositions();
    updateInputPositions();
  });

  // Creating the bet input location
  betAmountInput = createInput("");
  betAmountInput.size(100);
  betAmountInput.input(updateValues);

  // Creating the target multiplier input location
  targetMultiplierInput = createInput("");
  targetMultiplierInput.size(100);
  targetMultiplierInput.input(updateValues);

  // Creating the bet button
  betButton = createButton('Place Bet');
  betButton.size(100, 50);
  betButton.style('background-color', '#4CAF50'); // Green button
  betButton.style('color', 'white');
  betButton.mousePressed(placeBet);

  // Creating the 1/2 bet button
  halfBetButton = createButton('X1/2');
  halfBetButton.size(40, 40);
  halfBetButton.style('position', 'absolute');
  halfBetButton.mousePressed(halfBet);

  // Creating the X2 bet button
  doubleBetButton = createButton('X2');
  doubleBetButton.size(40, 40);
  doubleBetButton.style('position', 'absolute');
  doubleBetButton.mousePressed(doubleBet);

  // Creating the 1/2 multiplier button
  halfMultiplierButton = createButton('X1/2');
  halfMultiplierButton.size(40, 40);
  halfMultiplierButton.style('position', 'absolute');
  halfMultiplierButton.mousePressed(halfMultiplier);

  // Creating the X2 multiplier button
  doubleMultiplierButton = createButton('X2');
  doubleMultiplierButton.size(40, 40);
  doubleMultiplierButton.style('position', 'absolute');
  doubleMultiplierButton.mousePressed(doubleMultiplier);

  // Initially hide inputs and buttons
  hideInputsAndButtons();
}

function updateInputPositions() {
  // Positioning the inputs and buttons proportionately to a 1450x880 resolution
  betAmountInput.position(windowWidth * 0.3, windowHeight * 0.7);
  targetMultiplierInput.position(windowWidth * 0.3, windowHeight * 0.75);
  betButton.position(windowWidth * 0.55, windowHeight * 0.7);
  halfBetButton.position(windowWidth * 0.3 + 110, windowHeight * 0.7);
  doubleBetButton.position(windowWidth * 0.3 + 150, windowHeight * 0.7);
  halfMultiplierButton.position(windowWidth * 0.3 + 110, windowHeight * 0.75);
  doubleMultiplierButton.position(windowWidth * 0.3 + 150, windowHeight * 0.75);
}

// Hide all input elements and buttons
function hideInputsAndButtons() {
  betAmountInput.hide();
  targetMultiplierInput.hide();
  betButton.hide();
  halfBetButton.hide();
  doubleBetButton.hide();
  halfMultiplierButton.hide();
  doubleMultiplierButton.hide();
}

// Show all input elements and buttons
function showInputsAndButtons() {
  betAmountInput.show();
  targetMultiplierInput.show();
  betButton.show();
  halfBetButton.show();
  doubleBetButton.show();
  halfMultiplierButton.show();
  doubleMultiplierButton.show();
}

// Place bet function
function placeBet() {
  if (betAmount <= bank && betAmount > 0) {
    bank -= betAmount;
    isBetPlaced = true;
    gameOver = false;
    displayedNumber = 1.00;
    nextNumber = getRandomMultiplier(); // Set the next number
    startTime = millis(); // Record the start time for the animation
    hideInputsAndButtons();
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

// Halve the target multiplier
function halfMultiplier() {
  targetMultiplier = parseFloat(targetMultiplierInput.value()) || 1.0;
  targetMultiplier /= 2;
  targetMultiplierInput.value(targetMultiplier.toFixed(2));
  updateValues();
}

// Double the target multiplier
function doubleMultiplier() {
  targetMultiplier = parseFloat(targetMultiplierInput.value()) || 1.0;
  targetMultiplier *= 2;
  targetMultiplierInput.value(targetMultiplier.toFixed(2));
  updateValues();
}

// Get a random multiplier based on the specified chances
function getRandomMultiplier() {
  let rand = random(100);
  if (rand < 10) return random(1.10, 1.24);
  else if (rand < 20) return random(1.24, 1.41);
  else if (rand < 30) return random(1.41, 1.65);
  else if (rand < 40) return random(1.65, 1.98);
  else if (rand < 50) return random(1.98, 2.47);
  else if (rand < 60) return random(2.47, 3.30);
  else if (rand < 70) return random(3.30, 4.95);
  else if (rand < 80) return random(4.95, 9.90);
  else if (rand < 90) return random(9.90, 99.00);
  else return random(99.00, 1000.0);
}

// Draw function for different game states
function draw() {
  background(220); // Light grey background
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
  background(220);

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
    showInputsAndButtons();
  } else if (mouseX > plinkoPreviewX && mouseX < plinkoPreviewX + plinkoPreviewWidthSize &&
      mouseY > plinkoPreviewY && mouseY < plinkoPreviewY + plinkoPreviewHeightSize) {
    gameState = "plinko";
  } else if (mouseX > minesPreviewX && mouseX < minesPreviewX + minesPreviewWidthSize &&
      mouseY > minesPreviewY && mouseY < minesPreviewY + minesPreviewHeightSize) {
    gameState = "mines";
  }
}

// Draw the limbo game interface
function drawLimboGame() {
  // Draw Limbo title
  background(220);
  textSize(40);
  textAlign(CENTER);
  fill(0);
  text("Limbo", windowWidth * 0.5, windowHeight * 0.1);

  // Draw the screen
  fill(255);
  rect(windowWidth * 0.5 - 150, windowHeight * 0.3 - 50, 300, 200, 20);
  fill(0);
  textSize(50);
  text(displayedNumber.toFixed(2), windowWidth * 0.5, windowHeight * 0.3 + 50);
  


  if (!isBetPlaced) {
    // Show bet amount and target multiplier inputs
    betAmountInput.show();
    targetMultiplierInput.show();
    betButton.show();
    halfBetButton.show();
    doubleBetButton.show();
    halfMultiplierButton.show();
    doubleMultiplierButton.show();

    textSize(20);
    textAlign(RIGHT);
    text("Bet Amount:", windowWidth * 0.3 - 10, windowHeight * 0.7 + 10);
    text("Target Multiplier:", windowWidth * 0.3 - 10, windowHeight * 0.75 + 15);

    textSize(25);
    textAlign(CENTER);
    text("Payout: $" + payout.toFixed(2), windowWidth * 0.5, windowHeight * 0.85);
    text("Win Chance: " + winChance.toFixed(2) + "%", windowWidth * 0.5, windowHeight * 0.9);

    textSize(25);
    textAlign(CENTER);
    text("Bank: $" + bank.toFixed(2), windowWidth * 0.1, windowHeight * 0.1);

    // Check for enter key press to place bet
    if (keyIsPressed && key === "Enter") {
      placeBet();
    }
  }
  else if (!gameOver) {
    let elapsedTime = millis() - startTime;
    let progress = min(elapsedTime / 500, 1); // 500ms animation

    displayedNumber = lerp(1.00, nextNumber, progress);


    if (progress >= 1) {
      gameOver = true;
      if (nextNumber >= targetMultiplier) {
        winSound.play();
        let winnings = betAmount * targetMultiplier;
        bank += winnings;
        text((targetMultiplier.toFixed(2)) + " x " + targetMultiplier.toFixed(2), windowWidth * 0.5, windowHeight * 0.5);
      }
      else {
        text("You Lose...", windowWidth * 0.5, windowHeight * 0.5);
      }
    }
  }
    if (mouseIsPressed) {
      isBetPlaced = false;
      betAmountInput.show();
      targetMultiplierInput.show();
      betButton.show();
      halfBetButton.show();
      doubleBetButton.show();
      halfMultiplierButton.show();
      doubleMultiplierButton.show();
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
  limboPreviewX = windowWidth * 0.15;
  limboPreviewY = windowHeight * 0.25;
  limboPreviewWidthSize = windowWidth * 0.2;
  limboPreviewHeightSize = windowHeight * 0.3;

  // Update plinko preview sizes and positions
  plinkoPreviewX = windowWidth * 0.4 - windowWidth * 0.1;
  plinkoPreviewY = windowHeight * 0.25;
  plinkoPreviewWidthSize = windowWidth * 0.2;
  plinkoPreviewHeightSize = windowHeight * 0.3;

  // Update mines preview sizes and positions
  minesPreviewX = windowWidth * 0.75 - windowWidth * 0.1;
  minesPreviewY = windowHeight * 0.25;
  minesPreviewWidthSize = windowWidth * 0.2;
  minesPreviewHeightSize = windowHeight * 0.3;
}

