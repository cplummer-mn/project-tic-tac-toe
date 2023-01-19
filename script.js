const GameBoard = (() => {
    
    let board = ['','','','','','','','',''];
    console.log("Initializing turn to X");
    let turn = "X";

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

    const newGame = () => {
        for(let i = 0; i < board.length;  i++) {
            board[i] = "";
        }
        DisplayController.updateBoard();
        GameBoard.turn = 'X';
    }

    const displayWin = (winner) => {
        console.log(winner + " HAS WON");
    }

    const displayTie = () => console.log("ITS A TIE GAME");

    return { board , turn , gridClick , newGame };
})();




const DisplayController = (() => {
    
    const gridSquares = document.getElementsByClassName('grid-square');

    const updateBoard = () => {
        console.log("Updating Game Board...");
        for(let i = 0; i < gridSquares.length; i++) {
            gridSquares[i].textContent = GameBoard.board[i];
        }
    }

    return{ updateBoard };
})();




const player = (letter) => {

    const changePlayerOneName = () => {
        let newName = prompt("Please enter player one's name");
        document.querySelector("#player-one-name").textContent = newName + ": X";
    }

    const changePlayerTwoName = () => {
        let newName = prompt("Please enter player two's name");
        document.querySelector("#player-two-name").textContent = newName + ": O";
    }

    return { letter , changePlayerOneName , changePlayerTwoName};
};



DisplayController.updateBoard();
const userPlayerOne = player('X');
const userPlayerTwo = player('O');


const gameGrid = document.getElementsByClassName("grid-square");
for(let i = 0; i <  gameGrid.length; i++) {
    gameGrid[i].addEventListener("click",GameBoard.gridClick);
}

const newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener('click',GameBoard.newGame);

const changeNameOneButton = document.getElementById("change-name-one");
changeNameOneButton.addEventListener('click',userPlayerOne.changePlayerOneName);

const changeNameTwoButton = document.getElementById("change-name-two");
changeNameTwoButton.addEventListener('click',userPlayerTwo.changePlayerTwoName);