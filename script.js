const GameBoard = (() => {
    
    let board = ['','','','','','','','',''];
    console.log("Initializing turn to X");
    let turn = "X";
    let gameMode =  "player";
    let moveFinished = true;
    let difficulty = 'easy';

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
        if(!moveFinished) return;
        if(board[gridKey] === "") {
            board[gridKey] = GameBoard.turn;
            DisplayController.updateBoard();
            advanceTurn();
            if(checkWin()) return;
            if(GameBoard.gameMode === "cpu") {
                moveFinished = false;
                if(GameBoard.difficulty == 'easy') {
                    cpuMove();
                }
                else if(GameBoard.difficulty == 'hard') {
                    cpuMoveHard();
                }
            }
        }
        else return;
         
    }

    const checkWin = () => {
        let winningCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        for(let comb of winningCombs) {
            if (
                GameBoard.board[comb[0]] == GameBoard.board[comb[1]] 
                &&
                GameBoard.board[comb[1]] == GameBoard.board[comb[2]]
                &&
                GameBoard.board[comb[0]] != ""
            ) {
                console.log(GameBoard.board[comb[0]] + 'is winner');
                displayWin(GameBoard.board[comb[0]]);
                
                for(let i = 0; i < 3; i++) {
                    document.getElementById(comb[i]).classList.add('highlighted');
                }
                return true;
            }
        }
        if(!GameBoard.board.includes("")) {
            console.log('is a tie');
            displayWin();
            return true;
        }
        

    }

    const newGame = () => {
        for(let i = 0; i < board.length;  i++) {
            board[i] = "";
        }
        DisplayController.updateBoard();
        GameBoard.turn = 'X';
        moveFinished = true;
        document.getElementById("win-card").style.display = "none";
        const gridSquares = document.getElementsByClassName('grid-square');
        console.log(gridSquares);
        for(square of gridSquares) {
            square.classList.remove('highlighted');
        }
    }

    const displayWin = (winner) => {
        console.log(winner + " HAS WON");
        const winCard = document.getElementById("win-card");
        winCard.style.display = "flex";
        const winnerText = document.getElementById("winner-text");
        if(winner === "X") {
            winnerText.textContent = userPlayerOne.name + " has won!";
        }
        else if(winner === "O") {
            winnerText.textContent = userPlayerTwo.name + " has won!";
        }
        else {
            winnerText.textContent = "Tie Game!";
        }

    }

    const delay = ms => new Promise(res => setTimeout(res,ms));

    const cpuMove = async () => {
        await delay(500);
        console.log("computer move!");
        var emptySquares = [];
        for(let i = 0; i < GameBoard.board.length; i++) {
            if(GameBoard.board[i] === "") {
                emptySquares.push(i);
            }
        }
        var randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        GameBoard.board[randomMove] = "O";
        DisplayController.updateBoard();
        advanceTurn();
        moveFinished = true;
        checkWin();
    }

    const cpuMoveHard = async () => {
        await delay(500);
        console.log("computer move!");
        let moveToMake = findBestMove(GameBoard.board);
        GameBoard.board[moveToMake] = 'O';
        DisplayController.updateBoard();
        advanceTurn();
        moveFinished = true;
        checkWin();
    }

    const isMovesLeft = (boardArray) => {
        if(boardArray.includes("")) {
            return true;
        }
        return false;
    }

    const evaluate = (b) => {
        let winningCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        for(let comb of winningCombs) {
            if (
                b[comb[0]] == b[comb[1]] 
                &&
                b[comb[1]] == b[comb[2]]
                &&
                b[comb[0]] != ""
            ) {
                if(b[comb[0]] == 'O') {
                    return +10;
                }
                else return -10;
            }
        }
        return 0;

    }

    const minimax = (boardArray, depth, isMax) => {
        let score = evaluate(boardArray);
        if(score == 10) return score;
        if(score == -10) return score; 
        if(isMovesLeft(boardArray) == false) return 0;

        if(isMax) {
            let best = -1000;

            // Go through entire array
            for(let i = 0; i < boardArray.length; i++) {
                if(boardArray[i] == '') {
                    boardArray[i] = 'O';
                    best = Math.max(best, minimax(boardArray, depth + 1, !isMax));
                    boardArray[i] = '';
                }
            }
            return best;
        }

        else {
            let best = 1000;

            // Go through entire array
            for(let i = 0; i < boardArray.length; i++) {
                if(boardArray[i] == '') {
                    boardArray[i] = 'X';
                    best = Math.min(best, minimax(boardArray, depth + 1, !isMax));
                    boardArray[i] = '';
                }
            }
            return best;
        }
    }

    const findBestMove = (boardArray) => {
        let bestVal = -1000;
        let bestMove = 1;

        for(let i = 0; i < boardArray.length; i++) {
            if(boardArray[i] == '') {
                boardArray[i] = 'O';
                let moveVal = minimax(boardArray, 0, false);
                boardArray[i] = '';
                if(moveVal > bestVal){
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
        return bestMove;
    }
    

    return { board , turn , gameMode , difficulty , gridClick , newGame };
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




const player = (letter,name) => {

    const changePlayerOneName = () => {
        let newName = prompt("Please enter player one's name");
        userPlayerOne.name = newName;
        document.querySelector("#player-one-name").textContent = newName + ": X";
    }

    const changePlayerTwoName = () => {
        let newName = prompt("Please enter player two's name");
        userPlayerTwo.name = newName;
        document.querySelector("#player-two-name").textContent = newName + ": O";
    }

    return { name ,letter , changePlayerOneName , changePlayerTwoName};
};



DisplayController.updateBoard();
const userPlayerOne = player('X',"Player One");
const userPlayerTwo = player('O',"Player Two");


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

const winnerCardNewGameButton = document.getElementById("play-again-button");
winnerCardNewGameButton.addEventListener('click',GameBoard.newGame);

const playerVsPlayerButton = document.getElementById("player-vs-player-button");
playerVsPlayerButton.addEventListener('click',playerVsplayerClicked);

const playerVsCpuButton = document.getElementById("player-vs-cpu-button");
playerVsCpuButton.addEventListener("click",playerVsCpuClicked);

const easyButton = document.getElementById("easy-button");
const hardButton = document.getElementById("hard-button");

easyButton.addEventListener('click',easyButtonClicked);
hardButton.addEventListener('click',hardButtonClicked);

function playerVsplayerClicked() {
    playerVsPlayerButton.className = "button-clicked";
    playerVsCpuButton.classList.remove("button-clicked");
    GameBoard.gameMode = "player";
    userPlayerTwo.name = "Player Two";
    document.querySelector("#player-two-name").textContent = "Player Two: O";
    GameBoard.newGame();
}

function playerVsCpuClicked() {
    playerVsCpuButton.className = "button-clicked";
    playerVsPlayerButton.classList.remove("button-clicked");
    GameBoard.gameMode = "cpu";
    userPlayerTwo.name = "CPU";
    document.querySelector("#player-two-name").textContent = "CPU: O";
    GameBoard.newGame();
}

function easyButtonClicked() {
    easyButton.className = "button-clicked";
    hardButton.classList.remove("button-clicked");
    GameBoard.difficulty = 'easy';
}

function hardButtonClicked() {
    hardButton.className = "button-clicked";
    easyButton.classList.remove("button-clicked");
    GameBoard.difficulty = 'hard';
}
