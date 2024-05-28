// Steak Casino
// Bryce Tierney
// June something, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Setting variables. gameState starts as the homne screen and ETCCCCC
let gameState = "home";
let clickSound;

// limboPreview x and y
let limboPreview;
let limboX = width * 1/4;
let limboY = height * 1/4;
let limboSize = width * 1/4;

// // Plinko preview x and y
let plinkoPreview;
let plinkoX = width * 3/4;
let plinkoY = height * 1/4;
let plinkoSize = width * 1/4;

// // Mines preview x and y
let minesPreview;
let minesX = width * 1/4;
let minesY = height * 3/4;
let minesSize = width * 1/4;


// how to get sound, need to get a click mp3 sound and use preload ETCCCCC

// Loading a sound file, images for the preview screens, ETCCCCC
function preload() {
  clickSound = loadSound("WHATEVER SOUND I need to load"); // Add what you need here ETCCCCC
  limboPreview = loadImage("limboPreview.avif");

  // plinkoPreview = loadImage("");
  // minesPreview = loadImage("");
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
  limboPreview(limboX, limboY, limboSize);

  // Displaying plinko preview
  plinkoPreview(plinkoX, plinkoY, plinkoSize);

  // Displaying mines preview
  minesPreview(minesX, minesY, minesSize);

  // Use the button thing instead of this probably
  if (mouseIsPressed && mouseX > limboX - width/10 && mouseX < limboX + width/10 && mouseY > limboY - height/10 && mouseY < limboY + height/10) {
    gameState = "limbo";
  }

}


function darwLimboGame() {
  // Setting variables for specifically the limbo game
  let betAmount;
  let targetMultiplier;
  // let limboX = width/4;
  // let limboY = height/4;

}