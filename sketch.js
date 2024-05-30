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

// limboPreview x, y and size
let limboPreviewImage;
let limboPreviewX = width * 1/4;
let limboPreviewY = height * 1/4;
let limboPreviewSize = width * 1/4;

// // Plinko preview x, y and size
let plinkoPreviewImage;
let plinkoPreviewX = width * 3/4;
let plinkoPreviewY = height * 1/4;
let plinkoPreviewSize = width * 1/4;

// // Mines preview x, y and size
let minesPreviewImage;
let minesPreviewX = width * 1/4;
let minesPreviewY = height * 3/4;
let minesPreviewSize = width * 1/4;


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
    darwLimboGame();
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
  limboPreview(limboPreviewX, limboPreviewX, limboPreviewSize);

  // Displaying plinko preview
  plinkoPreview(plinkoPreviewX, plinkoPreviewY, plinkoPreviewSize);

  // Displaying mines preview
  minesPreview(minesPreviewX, minesPreviewY, minesPreviewSize);

  // Use the button thing instead of this probably
  if (mouseIsPressed && mouseX > limboPreviewX - width/10 && mouseX < limboPreviewX + width/10 && mouseY > limboPreviewY - height/10 && mouseY < limboPreviewY + height/10) {
    gameState = "limbo";
  }

}


function darwLimboGame() {
  // Setting variables for specifically the limbo game
  let betAmount;
  let targetMultiplier;
  let limboX = width/4;
  let limboY = height/4;

}