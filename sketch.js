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
  // Make it show images by creating them in the preload function, need to download or something???

  // Displaying limbo preview
  image(limboPreviewImage, limboPreviewX, limboPreviewY, limboPreviewWidthSize, limboPreviewHeightSize);

  // Displaying plinko preview
  image(plinkoPreviewImage, plinkoPreviewX, plinkoPreviewY, plinkoPreviewWidthSize, plinkoPreviewHeightSize);

  // Displaying mines preview
  image(minesPreviewImage, minesPreviewX, minesPreviewY, minesPreviewWidthSize, minesPreviewHeightSize);

  // Use the button thing instead of this probably
  if (mouseIsPressed && mouseX > limboPreviewX - windowWidth/10 && mouseX < limboPreviewX + windowWidth/10 && mouseY > limboPreviewY - windowHeight/10 && mouseY < limboPreviewY + windowHeight/10) {
    gameState = "limbo";
  }

}


function drawLimboGame() {
  // Setting variables for specifically the limbo game
  let betAmount;
  let targetMultiplier;


  //make it so that the other 2 previews use recursion to leave
}


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
