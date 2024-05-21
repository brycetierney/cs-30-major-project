# Major Project Proposal

## Description
- Online casino game center

## Needs to Have List
- Home screen where you can choose which game you would like to play
    - 3 seperate display screens that have images of Limbo, Plinko, and Mines
    - Takes you to whichever one you press
    - Plays a little sound effect with every mouse click, no matter where the mouse is or what it presses

- Inputs for all games:
a. Input for bet amount
b. Buttons next to the bet amount to half, double or max the bet

- Inputs for specific games: 
1. Limbo:
a. Target multilpier
b. 
c. you want to be the minimum number that the random number must be for the bet to win. ie: if the random number generated is above your chosen number, the bet amount is multiplied by a certain amount based on how likely it is to be above your chosen number.
- A randomizer for picking a number, (low number likely, high number unlikely)

1. Plinko:
a. Spawn in a pyramid of "pins"
b. Sound effect for when the ball hits the "pin"
c. Use p5play for "gravity"


3. Mines:
a. Create a 5x5 grid that is filled with a selected amount of mines (max 24), and the rest with gems
b. 
Every tile will be covered by a black sticker type thing
Once you click a tile, either a gem or mine will be revealed
If the tile reveals a gem:
    the bet multiplier (payout) will increase exponentially
If the tile reveals a mine:
    You lose your original bet amount and all the tiles are revealed


- Sound effects

## Nice to Have List
- Graph showing your gain/loss of money
- Bank account amount, universal between games(not real money)

- Limbo:
1. If you change the % chance of win, it will change the target multiplier, (and vice versa)

Plinko:
1. Sound effects that play a higher pitched sound the further away the ball goes from the center, (indicating you're headed towards a higher multiplier)
