# First project at GA - Tic Tac Bot

What you're about to view is a rough version of my first JavaScript project. There are bugs to be fixed, features to be added and UI to be improved. This section will get updated as I make those changes. 

In the meantime, play here - https://techworldhello.github.io/tic-tac-bot/

## Rules:

If you've never heard of Tic Tac Toe (a.k.a., Noughts & Crosses), what are you waiting for? Get playing!

But in case you'd like to know, here's a simple breakdown:

* select `Solo Fun` or `2 Players` to enter the game
* turns are alternated one to one
* get 3 grids in a row to win

# Initial plan of attack:

* create a board
* make grids clickable and assign colours to them
* create player turns
* store winning combos
* match played spots with winning combos
* declare winner/draw
* attempt 'AI' version

# Most difficult:

* game logic on matching the players' arrays to the nested winning array
* making all of the functions interact well and bug free after building both 1 player and 2 player mode (still working on this!)
* refactoring 🤔 

# Areas to improve:

* finish the score board component
* practice DRY code and refactoring
* make borders surrounding the grids unclickable
* fix AI's winning message
* build an unbeatable AI
* allow the user to be able to change mode after having selected one (without refreshing the page)