// ==========================
// Get HTML Elements
// ==========================

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

const playerScore = document.getElementById("playerScore");
const aiScore = document.getElementById("aiScore");
const drawScore = document.getElementById("drawScore");

// ==========================
// Variables
// ==========================

let board = ["","","","","","","","",""];

let gameRunning = true;

let player = "X";
let ai = "O";

let playerWins = 0;
let aiWins = 0;
let draws = 0;

// ==========================
// Winning Patterns
// ==========================

const winPatterns = [

[0,1,2],
[3,4,5],
[6,7,8],

[0,3,6],
[1,4,7],
[2,5,8],

[0,4,8],
[2,4,6]

];

// ==========================
// Cell Click
// ==========================

cells.forEach(cell => {

    cell.addEventListener("click", playerMove);

});

function playerMove(){

    const index = this.dataset.index;

    if(board[index] != "" || !gameRunning)
        return;

    board[index] = player;

    this.textContent = player;

    checkWinner();

    if(gameRunning){

        statusText.textContent = "AI Thinking...";

        setTimeout(aiMove,500);

    }

}

// ==========================
// AI Move
// ==========================

function aiMove(){

    let emptyCells = [];

    for(let i=0;i<board.length;i++){

        if(board[i]==""){

            emptyCells.push(i);

        }

    }

    if(emptyCells.length==0)
        return;

    let randomMove = emptyCells[Math.floor(Math.random()*emptyCells.length)];

    board[randomMove]=ai;

    cells[randomMove].textContent=ai;

    checkWinner();

    if(gameRunning){

        statusText.textContent="Your Turn";

    }

}

// ==========================
// Check Winner
// ==========================

function checkWinner(){

    let winner = null;

    winPatterns.forEach(pattern=>{

        let a=pattern[0];
        let b=pattern[1];
        let c=pattern[2];

        if(board[a]!="" &&
           board[a]==board[b] &&
           board[a]==board[c]){

            winner=board[a];

        }

    });

    if(winner=="X"){

        statusText.textContent="🎉 You Win!";

        playerWins++;

        playerScore.textContent=playerWins;

        gameRunning=false;

        return;

    }

    if(winner=="O"){

        statusText.textContent="🤖 AI Wins!";

        aiWins++;

        aiScore.textContent=aiWins;

        gameRunning=false;

        return;

    }

    if(!board.includes("")){

        statusText.textContent="🤝 Draw!";

        draws++;

        drawScore.textContent=draws;

        gameRunning=false;

    }

}

// ==========================
// Restart
// ==========================

restartBtn.addEventListener("click", resetBoard);

function resetBoard(){

    board=["","","","","","","","",""];

    cells.forEach(cell=>{

        cell.textContent="";

    });

    gameRunning=true;

    statusText.textContent="Your Turn";

}

// ==========================
// New Match
// ==========================

newGameBtn.addEventListener("click",()=>{

    playerWins=0;
    aiWins=0;
    draws=0;

    playerScore.textContent=0;
    aiScore.textContent=0;
    drawScore.textContent=0;

    resetBoard();

});