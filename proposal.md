# Major Project Proposal

## Description
- Online casino game center

## Needs to Have List
- Home screen where you can choose which game you would like to play
    - 3 seperate display screens that have images of Limbo, Plinko, and Mines
    - You will be taken to whichever one you press
    - Plays a little sound effect with every mouse click, no matter where the mouse is or what it presses
- 

- Needed for all games:
    - Input for bet amount as well as buttons next to the bet amount to half, double or max the bet

1. Limbo:
a. Input for target multilpier
b. 
c. you want to be the minimum number that the random number must be for the bet to win. ie: if the random number generated is above your chosen number, the bet amount is multiplied by a certain amount based on how likely it is to be above your chosen number.
- A randomizer for picking a number, (low number is likely, high number is less likely)


1. Plinko:
a. Spawn in a pyramid of arranged "pins"
b. Sound effect for when the ball hits the "pin"
c. Use p5play for "gravity"


3. Mines:
a. Create a 5x5 grid that is filled with a selected amount of mines (max 24), and the rest with gems
b. Every tile will be covered by a black sticker type thing
c. Once you click a tile, either a gem or mine will be revealed
d. If the tile reveals a mine:
    End the game, remove the tiles covering the squares revealing all uncovered squares, and no payout is returned 
    You lose your original bet amount and all the tiles are revealed
e. Increase the multiplier of your bet exponentially if the tile reveals a gem:


- Sound effects

## Nice to Have List
- Bank account that is universal between games
- Graph showing your gain/loss of money

1. Limbo:
a. If you change the % chance of win, it will change the target multiplier, (and vice versa)

2. Plinko:
b. Sound effects that play a higher pitched sound the further away the ball goes from the center, (indicating you're headed towards a higher multiplier)

3. Mines:
a. Animation that wiggles a bit before it removes the tile