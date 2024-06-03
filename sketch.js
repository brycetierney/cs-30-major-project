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

// limboPreview x, y and size x and y
let limboPreviewImage;
let limboPreviewX = windowWidth * 1/4;
let limboPreviewY = windowHeight * 1/4;
let limboPreviewWidthSize = windowWidth * 1/4;
let limboPreviewHeightSize = windowHeight * 1/4;

// // Plinko preview x, y and size x and y
let plinkoPreviewImage;
let plinkoPreviewX = windowWidth * 3/4;
let plinkoPreviewY = windowHeight * 1/4;
let plinkoPreviewWidthSize = windowWidth * 1/4;
let plinkoPreviewHeightSize = windowHeight * 1/4;

// // Mines preview x, y and size x and y
let minesPreviewImage;
let minesPreviewX = windowWidth * 1/4;
let minesPreviewY = windowHeight * 3/4;
let minesPreviewWidthSize = windowWidth * 1/4;
let minesPreviewHeightSize = windowHeight * 1/4;


// how to get sound, need to get a click mp3 sound and use preload ETCCCCC

// Loading sound files and images for the preview screens, ETCCCCC
function preload() {
  clickSound = loadSound("basicClick.mp3"); // Add what you need here ETCCCCC
  winSound = loadSound("melodyError.wav");

  limboPreviewImage = loadImage("limboPreview.avif");
  plinkoPreviewImage = loadImage("plinkoPreview.jpg");
  minesPreviewImage = loadImage("minesPreview.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  let limboX = windowWidth * 1/4;
  let limboY = windowHeight * 1/4;

}