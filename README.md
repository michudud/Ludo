# Ludo

One of the most popular strategy board game for 2-4 players.
User can choose wheather to play with other players locally or duel with AI on three different levels of difficulty.

## Features

- Possibility to choose who plays (Player, AI, None) (min: 2, max: 4)
- Possibility to choose difficulty level
  - Easy - algorithm will try to choose the worst possible move
  - Medium - random move from possible moves
  - Hard - algorithm will try to choose the best possible move
- Possibility to roll the dice and check available moves
- Move pawns around board
- Continue or restart game after one of the players win

## Rules

- Random player starts the game
- To leave a base you need to throw a six on the dice
- After throwing six on the dice player has additional round
- You can have multiple pawns on the same field but not on house fields
- You can capture opponents
- You are safe on your starting field

### How to open

- Install: `npm install`
- Run: `npm start`

- Compile SASS after changes in .scss files `npm run compile:sass`

### Stack

- JavaScript
- React
- Redux
- HTML
- CSS / SCSS
