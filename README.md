# Eurovision Bingo

The bingo game is themed around the Eurovision Song Contest, and you can play it during the event. The theme however can be easealy changed on whatever (more about it below).

<img width="1439" alt="dd" src="https://user-images.githubusercontent.com/47716922/221993457-15ebd796-9941-41bb-8af9-bc697f60b911.png">

### How to Play
The objective of the game is to click all the cells in a single row, column, or diagonal to win. To start playing just <kbd><a href="https://uuuuuvika.github.io/bingo-fever/">CLICK HERE</a></kbd> and follow these easy steps:

- Whenever something from the board happens - click on corresponding cell to mark it as "clicked".
- Continue clicking cells until you have a row, column, or diagonal of clicked cells.
- Once you have a winning combination, shout "Bingo!" and enjoy your victory.
- You can have multiple bingos.

### Setup
- Fork this repo
- Clone this repo

If you running it locally, this app allows you to create a bingo board of any size by changing the ```ROWS``` and ```COLUMNS``` constants in the ```App.js``` file. 
```  JavaScript
const ROWS = 5;
const COLUMNS = 5;
```
Depending on the size of your grid, you might want to adjust the height and width of CSS grid a bit to fit your needs. 

Another cool thing, that you can easily modify the theme of the bingo by adjusting the ```quote.json``` file. If you are using an odd grid, you will also need to customize the text value of the central cell in ```App.js``` file to match the name of your theme:
```  JavaScript
useEffect(() => {
  let startingBoard = [];
  let cells;
  if (ROWS % 2 !== 0) {
    // shuffle & insert the central cell for odd grids
    cells = quotes.sort(() => Math.random() - 0.5).slice(0, ROWS * COLUMNS - 1).map(quote => {
      return { quote: quote, isClicked: false }
    });
    // Change the central cell quote
    cells.splice((ROWS * COLUMNS - 1) / 2, 0, { quote: "NEW QUOTE HERE", isClicked: true });
  }
  // ... the rest of the code remains the same
}, []);
```
