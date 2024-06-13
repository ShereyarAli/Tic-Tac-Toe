let playerMove;
let compMove;
let temp =[],count = 0,draw = 0,i;
let playerWins = document.querySelector('.js-player-score');
let compwins = document.querySelector('.js-comp-score');
let resetScore = document.querySelector('.js-reset-score')
let compscoreValue = localStorage.getItem('Compscore') || 0
compwins.innerHTML = `Comp:${compscoreValue}`;
let playerscoreValue = localStorage.getItem('Playerscore') || 0
playerWins.innerHTML = `Player:${playerscoreValue}`;

document.querySelector('.js-x-btn').addEventListener('click',() => {
  playerMove = 'X';
  compMove = 'O';
  console.log(playerMove);
});
document.querySelector('.js-o-btn').addEventListener('click',() => {
  playerMove = 'O';
  compMove = 'X';
});
const restart = () => {
    document.querySelector('.js-restart').addEventListener('click',() => {
       location.reload()
    })
 }
  const winCondition = [
    ['cell1','cell2','cell3'],
    ['cell4','cell5','cell6'],
    ['cell7','cell8','cell9'],
    ['cell1','cell4','cell7'],
    ['cell2','cell5','cell8'],
    ['cell3','cell6','cell9'],
    ['cell1','cell5','cell9'],
    ['cell3','cell5','cell7']
]
const checkwinner = (move) => {
    let checkArray = []; 
    document.querySelectorAll('.cell').forEach((cell) => {
        if (cell.innerHTML === move) {
            checkArray.push(cell.id);          
        }   
    });
    for (let i = 0; i < winCondition.length; i++) {
        let winCombo = winCondition[i];
        let found = true;
        for (let j = 0; j < winCombo.length; j++) { 
            if (!checkArray.includes(winCombo[j])) {
                found = false;
                break;
            }
        }
        if (found) {
            playerMove = false;
            console.log(`${move} is the winner`);
            setTimeout(() => {location.reload()},1500);
            return true;
        }          
    }      
}
let score = {
playerScore:playerscoreValue,
compScore:compscoreValue
}
resetScore.addEventListener('click',() => {
localStorage.removeItem('Playerscore');
localStorage.removeItem('Compscore');
location.reload()
console.log('Hi')
})

function placeMoves() {
document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', () => {
        let compDecision;
        let compSpace;
        if (playerMove && cell.innerHTML === '') {
            cell.innerHTML = playerMove;  
            // Call checkwinner for player's move
            if (checkwinner(playerMove)) {
                score.playerScore++;
                console.log(score.playerScore)
                localStorage.setItem('Playerscore',score.playerScore);
                return; // Exit early if there's a winner
            }

            // Make computer's move
            do {
                if (count === 4) { break; }
                compDecision = Math.floor(Math.random() * 9) + 1;
                compSpace = document.getElementById(`cell${compDecision}`);
            } while (compSpace.innerHTML !== '');

            if (count < 4) {
                compSpace.innerHTML = compMove;
                count++;
            }

            // Call checkwinner for computer's move
            if (checkwinner(compMove)) {
                score.compScore++
                localStorage.setItem('Compscore',score.compScore);
                return; // Exit early if there's a winner
            }

            draw++;

            // Check for draw condition
            if (draw === 5 && !checkwinner()) {
                console.log('Game is draw');
                setTimeout(() => {location.reload()},1500)
                playerMove = false;
            }
            
        }
    });
});

}

restart();
placeMoves();

console.log(playerWins.innerHTML);
console.log(compwins);