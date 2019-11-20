README

HTML, CSS, JavaScript

User stories:
User should be able to sign up, sign in, sign out, change password.
User should be able to start over in the middle of the game.
User should be able to restart a game when a game is over.
User should be able to pull up a game record with ID#, and all the game records.
User should be able to see if there's any error.
User should be able to play on mobile device.

wireframe: https://app.moqups.com/pZIClmFr9I/view

I started off with setting up layout using flex box. I had difficulty making things stay where I wanted, and things overlapped on top of each other as I adjust screen size. I used table to make a game board, and started working on game logics. Most difficult and time consuming part of this was making clicks put X and O alternatively. After that, I was having problem patching data to API, but I was able to solve this problem with help of a colleague. After working on CSS, I've been working on easy mode AI, and I was able to make computer place O inside empty box after user clicks a box to place X, but I was not able to merge this into master branch because computer's moves were not being patched to API. I also wasn't sure how to make the code work only when user clicks a button to play this mode.
