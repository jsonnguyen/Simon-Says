1. Define required constants
    1.1 - color object that stores color and its corresponding value which will be looked up onClick and generate pattern

2. Define required variables used to track the state of the game
    2.1 - pattern: stores current pattern player has to match
    2.2 - playerPattern: stores player pattern of current round and check if it matches pattern
    2.3 - highScore: stores player current high score
    2.4 - currentScore: stores current score
3. Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
    3.1. - Store the 4 elements to represent the colors on the page
4. Upon loading the app should:
    4.1 - Initialize the state variables
        4.1.1 - Initialize pattern to empty array
        4.1.2 - Initialize playerPattern to empty array
        4.1.3 - Initialize highScore to pattern.length
    4.2 Render those values to the page
        4.2.1 - iterate through pattern and "light" the colors accordingly
    4.3 Wait for the user to click start button
        4.3.1 - Use randomizer for 0-3 to pick a color from color object and push to pattern array for each round

5. Handle a player clicking a color
    5.1 - push the color to playerPattern
    5.2 - check playerPattern vs pattern

6. Handle a player clicking the replay button
    6.1 - clear pattern array and start game

7. Handle incorrect pattern
    7.1 - If currentScore > highScore then highScore = currentScore
    7.2 - Display play again button

