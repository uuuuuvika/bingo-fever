import './BingoCell.css';

function BingoCell({ index, onClick, quoteObj, darkMode }) {
    const className = (index === "22"
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