// Steak
// Bryce Tierney
// June something, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Setting variables. gameState starts as the homne screen and
let gameState = "home";
let betAmount;
let targetMultiplier = 2.00;
// how to get sound, need to get a click mp3 sound and use preload

// Loading a sound file, images for the preview screens, 
function preload() {
  sound = loadsound("WHATEVER SOUND I need to load");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Setting gameState based off which game you chose to play, starting originally as homeScreen
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
  // Eventually make it show images in preload function instead of just having coloured squares
  fill(0);
  square(width/4, height/8, width/4)

  // Use the button thing instead of this probably

}


function mousePressed() {
  if (mousePressed && mosue 
}