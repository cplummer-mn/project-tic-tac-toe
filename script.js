const GameBoard = (() => {
    
    let board = ['','','','','','','','',''];
    console.log("Initializing turn to X");
    let turn = "X";
    let gameMode =  "player";
    let moveFinished = true;

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
        moveFinished = false;
        if(board[gridKey] === "") {
            board[gridKey] = GameBoard.turn;
            DisplayController.updateBoard();
            advanceTurn();
            if(checkWin()) return;
            if(GameBoard.gameMode === "cpu") {
                cpuMove();
            }
        }
        else return;
    }

    const checkWin = () => {
        
        if((board[0] === "X" && board[1] === "X" && board[2] === "X" ) ||
            (board[3] === "X" && board[4] === "X" && board[5] === "X" ) ||
            (board[6] === "X" && board[7] === "X" && board[8] === "X" )) {
                displayWin("X");
                return true;
            }
        else if((board[0] === "X" && board[3] === "X" && board[6] === "X" ) ||
            (board[1] === "X" && board[4] === "X" && board[7] === "X" ) ||
            (board[2] === "X" && board[5] === "X" && board[8] === "X" )) {
                displayWin("X");
                return true;
            }
        else if((board[0] === "X" && board[4] === "X" && board[8] === "X" ) ||
            (board[2] === "X" && board[4] === "X" && board[6] === "X" )) {
                displayWin("X");
                return true;
            }

        else if((board[0] === "O" && board[1] === "O" && board[2] === "O" ) ||
            (board[3] === "O" && board[4] === "O" && board[5] === "O" ) ||
            (board[6] === "O" && board[7] === "O" && board[8] === "O" )) {
                displayWin("O");
                return true;
            }
        else if((board[0] === "O" && board[3] === "O" && board[6] === "O" ) ||
            (board[1] === "O" && board[4] === "O" && board[7] === "O" ) ||
            (board[2] === "O" && board[5] === "O" && board[8] === "O" )) {
                displayWin("O");
                return true;
            }
        else if((board[0] === "O" && board[4] === "O" && board[8] === "O" ) ||
            (board[2] === "O" && board[4] === "O" && board[6] === "O" )) {
                displayWin("O");
                return true;
            }
        else if(!board.includes("")) {
            displayWin();
            return true;
        }
        else return false;
        
        
    }

    const newGame = () => {
        for(let i = 0; i < board.length;  i++) {
            board[i] = "";
        }
        DisplayController.updateBoard();
        GameBoard.turn = 'X';
        moveFinished = true;
        document.getElementById("win-card").style.display = "none";
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
        console.log(randomMove);
        GameBoard.board[randomMove] = "O";
        DisplayController.updateBoard();
        advanceTurn();
        moveFinished = true;
        checkWin();
    }
    

    return { board , turn , gameMode , gridClick , newGame };
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
}

function hardButtonClicked() {
    hardButton.className = "button-clicked";
    easyButton.classList.remove("button-clicked");
}