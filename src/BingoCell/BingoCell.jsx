import './BingoCell.css';

function BingoCell({ index, onClick, quoteObj, darkMode, centralCellIndex }) {
    console.log(centralCellIndex)
    const className = (index === centralCellIndex
        ? "btn cell btn-rebecca central" 
        : darkMode && !quoteObj.isClicked
            ? "btn reversed cell"
            : (darkMode && quoteObj.isClicked
                ? "btn btn-rebecca-dark cell"
                : !darkMode && quoteObj.isClicked
                    ? "btn btn-rebecca cell"
                    : "btn cell"));
    return (
        <button className={className} onClick={onClick}>
            {quoteObj.quote}
        </button>

    )
}

export default BingoCell;