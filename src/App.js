import { useEffect, useState } from 'react';
import './App.css';
import BingoCell from './BingoCell/BingoCell';
import quotes from './quotes.json';
import checkVictory from './checkVictory';
import * as Tone from 'tone';
import clickSound from './Assets/psi-004.wav';
import victorySound from './Assets/psi-009.wav';
import playSound from './makeSound';

// make a square grid up to 6 rows
// (more is currently impossible due to Bootstap greed limitations,
// can be fixed with costume CSS)(any more is not possible at present due to limitations with Bootstrap's grid, 
// however this can be resolved by using custom CSS)
// depending on the size of your grid, you might want to adjust the height and width of CSS grid a bit to fit your needs.
const ROWS = 5;
const COLUMNS = 5;

function getDefaultMode() {
  const savedMode = localStorage.getItem('mode');
  return savedMode === 'true' ? true : false;
}

function App() {

  const [board, setBoard] = useState(null);
  const [numWinningCombinations, setNumWinningCombinations] = useState(0);
  const [mute, setMute] = useState(true);
  const [darkMode, setDarkMode] = useState(getDefaultMode());

  useEffect(() => {
    let startingBoard = [];
    let cells;
    if (ROWS % 2 !== 0) { // shuffle & insert the central cell for odd grids
      cells = quotes.sort(() => Math.random() - 0.5).slice(0, ROWS * COLUMNS - 1).map(quote => { 
        return { quote: quote, isClicked: false }
      });
      cells.splice((ROWS * COLUMNS - 1) / 2, 0, { quote: "EUROVISION BINGO", isClicked: true });
    }
    else { // shuffle for even grids
      cells = quotes.sort(() => Math.random() - 0.5).slice(0, ROWS * COLUMNS).map(quote => {
        return { quote: quote, isClicked: false }
      });
    }
    for (let i = 0; i < cells.length; i += ROWS) { // split cells into rows and put them in 2D array                                                 
      startingBoard.push(cells.slice(i, i + ROWS));
    }
    setBoard(startingBoard);
  }, []);

  useEffect(() => {
    setNumWinningCombinations(checkVictory(board));
  }, [board]);

  useEffect(() => { // play victory sound                                                                               
    if (numWinningCombinations !== 0 && !mute) {
      playSound(victorySound);
    }
  }, [numWinningCombinations]);

  useEffect(() => {
    localStorage.setItem('mode', darkMode);
  }, [darkMode]);

  function handleClick(row, col) {
    board[row][col].isClicked = true;
    setBoard([...board]);
    if (!mute) {
      playSound(clickSound);
    }
  }

  async function handleSound() { // mute-unmute
    await Tone.start();
    setMute(!mute);
  }

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className={numWinningCombinations === 0 ? 'container text-center grid' : 'container text-center winning-buzz'} key={numWinningCombinations}>
        <div className={`row row-cols-${ROWS}`}>
          {board ? board.flatMap(function (innerArray, row) {
            return innerArray.map(function (quoteObj, col) {
              return (
                <BingoCell
                  key={'' + row + col}
                  index={'' + row + col}
                  centralCellIndex={'' + ((ROWS - 1) / 2) + ((ROWS - 1) / 2)}
                  quoteObj={quoteObj}
                  darkMode={darkMode}
                  onClick={() => { handleClick(row, col) }}>
                </BingoCell>
              )
            })
          }) : null}
        </div>
        <button className={darkMode ? 'btn bottom-light bottom' : 'btn bottom'} onClick={() => { setDarkMode(!darkMode) }}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        <button className={darkMode ? 'btn bottom-light bottom' : 'btn bottom'} onClick={handleSound}>{mute ? 'Turn On Sound' : 'Mute Sound'}</button>
        <button className={darkMode ? 'btn bottom-light bottom' : 'btn bottom'} onClick={() => { window.location.reload(false) }}>New Board</button>
      </div>
    </div>
  );
}

export default App;