# Eurovision Bingo

The bingo game is themed around the Eurovision Song Contest, and you can play it during the event. The theme however can be easealy changed on whatever (more about it bellow). Eurovision Bingo is an updated version of <a href="https://github.com/uuuuuvika/Bingooo">this bingo app</a> created by me as a technical challenge.

<img width="1440" alt="bd" src="https://user-images.githubusercontent.com/47716922/219062600-cb4784e1-d6f2-4f1e-adb8-79ce2e2927fd.png">

### How to Play
The objective of the game is to click all the cells in a single row, column, or diagonal to win. To start playing, simply <kbd><a href="https://uuuuuvika.github.io/bingo-fever/">CLICK HERE</a></kbd>. Then, follow these easy steps:

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
