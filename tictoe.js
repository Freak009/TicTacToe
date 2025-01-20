const form = document.querySelector('.form');
const submitButton = document.getElementById('removeCard');
const gamecontainer=document.querySelector(".gamecontainer");
const player1=document.getElementById("player1");
const player2=document.getElementById("player2");
const error=document.getElementById("error-message");
const cells=document.querySelectorAll(".cell");
let playing='X';
let playername={'X':"",'O':""};
let gameOver=false;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];
document.addEventListener('DOMContentLoaded', () => {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      if(!player1.value || !player2.value)
      {
        error.textContent="Enter both player names";
        error.style.display='block';
      }
      else
      {
        playername['X']=player1.value;
        playername['O']=player2.value;
        form.classList.add('hidden');
        gamecontainer.style.display='block';
        gamecontainer.style.visibility='visible';
        error.style.display='none';
        document.querySelector('.gamecontainer').classList.remove('hidden');
        startGame();
    }
    });
  });

function startGame()
{
    cells.forEach(cell=>{
        cell.textContent="";
        cell.style.backgroundColor="";
        gameStatus.textContent="";
        cell.addEventListener('click',cellClick);
    });
}
function cellClick(event)
{
    const cell=event.target;
    if(cell.textContent==='')
    {
        cell.textContent=playing;
        if (playing === 'X') 
        {
            cell.style.color = "#ff3300";  // Red for X
        } else 
        {
            cell.style.color = "#3399ff";  // Blue for O
        }
        if (checkWinner()) {
            gameStatus.textContent = `${playername[playing]} wins!`;
            gameOver = true;
        } else if (checkDraw()) {
            gameStatus.textContent = "It's a draw!";
            gameOver = true;
        } else {
            playing = playing === 'X' ? 'O' : 'X';
        }
    }
}
function checkWinner() {
    // Check if there is a winner based on the winning combinations
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            // Highlight winning cells
            cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = "#00FF00";
            return true;
        }
    }
    return false;
}
function checkDraw() {
    // Check if all cells are filled and there's no winner
    return [...cells].every(cell => cell.textContent !== '') && !checkWinner();
}
const restart = document.getElementById("restart");
restart.textContent = "RESET";
restart.addEventListener('click', () => {
    startGame();});