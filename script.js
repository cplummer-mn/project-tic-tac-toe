const GameBoard = (() => {
    
    let board = ['','','','','','','','',''];
    console.log("Initializing turn to X");
    var turn = "X";

    const advanceTurn = () => {
        if(GameBoard.turn === "X") {
            GameBoard.turn = "O";
        }
        else { 
            GameBoard.turn = "X";
        }
    }

    const gridClick = (event) => {
        let gridKey = event.target.getAttribute("key");

        if(board[gridKey] === "") {
            board[gridKey] = GameBoard.turn;
            DisplayController.updateBoard();
            advanceTurn();
            checkWin();
        }
        else return;
    }

    const checkWin = () => {
        
        if((board[0] === "X" && board[1] === "X" && board[2] === "X" ) ||
            (board[3] === "X" && board[4] === "X" && board[5] === "X" ) ||
            (board[6] === "X" && board[7] === "X" && board[8] === "X" )) {
                displayWin("X");
            }
        else if((board[0] === "X" && board[3] === "X" && board[6] === "X" ) ||
            (board[1] === "X" && board[4] === "X" && board[7] === "X" ) ||
            (board[2] === "X" && board[5] === "X" && board[8] === "X" )) {
                displayWin("X");
            }
        else if((board[0] === "X" && board[4] === "X" && board[8] === "X" ) ||
            (board[2] === "X" && board[4] === "X" && board[6] === "X" )) {
                displayWin("X");
            }

        else if((board[0] === "O" && board[1] === "O" && board[2] === "O" ) ||
            (board[3] === "O" && board[4] === "O" && board[5] === "O" ) ||
            (board[6] === "O" && board[7] === "O" && board[8] === "O" )) {
                displayWin("O");
            }
        else if((board[0] === "O" && board[3] === "O" && board[6] === "O" ) ||
            (board[1] === "O" && board[4] === "O" && board[7] === "O" ) ||
            (board[2] === "O" && board[5] === "O" && board[8] === "O" )) {
                displayWin("O");
            }
        else if((board[0] === "O" && board[4] === "O" && board[8] === "O" ) ||
            (board[2] === "O" && board[4] === "O" && board[6] === "O" )) {
                displayWin("O");
            }
        else if(!board.includes("")) {
            displayTie();
        }
        
        
    }

    const displayWin = (winner) => {
        console.log(winner + " HAS WON");
    }

    const displayTie = () => console.log("ITS A TIE GAME");

    return { board, turn, gridClick };
})();




const DisplayController = (() => {
    
    
    const updateBoard = () => {
        console.log("Updating Game Board...");
        const gridSquares = document.getElementsByClassName('grid-square');
        for(let i = 0; i < gridSquares.length; i++) {
            gridSquares[i].textContent = GameBoard.board[i];
        }
    }

    return{updateBoard};
})();




const player = (letter) => {


    
    return { letter };
};



DisplayController.updateBoard();
const userPlayerOne = player('X');

function gridClick(event) {
    console.log(event.target.getAttribute("key"));
}

const gameGrid = document.getElementsByClassName("grid-square");
for(let i = 0; i <  gameGrid.length; i++) {
    gameGrid[i].addEventListener("click",GameBoard.gridClick);
}