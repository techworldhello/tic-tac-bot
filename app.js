const message = document.querySelector('#message');
const board = document.querySelectorAll('.board');
const grids = document.querySelectorAll('.grid');
const player1 = 'Player 1'; //human in 1 player mode
const player2 = 'Player 2';
//let isSolo = false; // set to false on other mode
const AI = 'AI';

const spotsPlayed = {
	p1: [],
	p2: [],
	ai: []
}

// run .map(num => num.toString()) on ai array
// or run .map(str => Number(str)) on all other arrays

const scoreDiv = document.querySelector('#scoreBoard');

const scores = {
	p1: 0,
	p2: 0
}

const winCombos = [
	['1', '2', '3'],
	['4', '5', '6'],
	['7', '8', '9'],
	['1', '4', '7'],
	['2', '5', '8'],
	['3', '6', '9'],
	['1', '5', '9'],
	['3', '5', '7']
];

const aiWinCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];


document.querySelector('.btn1-player').addEventListener('click', createBoardAI);
document.querySelector('.btn2-players').addEventListener('click', createBoardHuman);

function createBoardHuman() {
	board.forEach (elem => {
		elem.addEventListener('click', startGameHuman);
	});
}

function createBoardAI() {
	board.forEach (elem => {
		elem.addEventListener('click', startGameAI);
	});
}


function startGameHuman(e) {
	if (e.target.classList.contains('played')) {
		e.target.style.removeProperty('background-color')
		return;
	} else {
		e.target.classList.add('played');
		console.log(e.target)

		playerTurns(playerTurnCount++, player1, player2);
		if (playerTurnCount % 2) {
			spotsPlayed.p1.push(e.target.id)
			e.target.style.opacity = 0.7;
			checkWin(spotsPlayed.p1);
		} else {
			spotsPlayed.p2.push(e.target.id)
			e.target.style.opacity = 0.3;
			checkWin(spotsPlayed.p2);
		}
	}
	if (playerTurnCount == grids.length) {
		declareWinner('Draw!')
	}
}


function startGameAI(e) {
	if (e.target.classList.contains('played')) {
		e.target.style.removeProperty('background-color')

	} else {
		e.target.classList.add('played');
		console.log(e.target)

		//playerTurns(playerTurnCount++, player1, AI);
		spotsPlayed.p1.push(e.target.id)
		e.target.style.opacity = 0.7;
		checkWin(spotsPlayed.p1); 

		const aiTarget = AITurn();
		if (aiTarget !== undefined) {
			aiTarget.style.opacity = 0.3;
			//adding back classlist to keep track
			aiTarget.classList.add('played');
			checkWinAI();
		}
	}
	if (document.querySelectorAll('.played').length == grids.length) {
		declareWinner('Draw!');
	}
}


function AITurn() { 
	// filter out classes containing 'played'
	const remainingSpots = Array.from(grids).filter(square => 
		!square.classList.contains('played')); 
	let randomSpots = Math.floor(Math.random() * (remainingSpots.length + 1));
	spotsPlayed.ai.push(randomSpots);
	return remainingSpots[randomSpots];
}


let playerTurnCount = 0;

function playerTurns(playerTurnCount, p1, p2) {
	if (playerTurnCount % 2) { 		
		message.innerText = p1 + ', go for it';
		message.style.backgroundColor = 'lightblue';
	} else {
		message.innerText = p2 + ', your turn';
		message.style.backgroundColor = 'yellow';
	}
}


function declareWinner (msg) {
	document.querySelector('#notification').style.display = 'block';
	document.querySelector('#notification #text').innerHTML = msg;
	board.forEach (elem => {
		elem.removeEventListener('click', createBoardHuman, false);
	});
	setTimeout(() => {
		document.querySelector('#notification').style.display = 'none';
		replay(); 
	}, 3000);
}


function checkWin(playerArray) {
    let gameWon = false;
    winCombos.forEach( win => {
		let turns = 0;
		win.forEach (elem => {
			if (playerArray.indexOf(elem) > -1) {
				turns++;
			}
			if (turns === 3) {
				gameWon = true;
				//updateScores(playerTurnCount % 2 ? player1 : player2, playerTurnCount % 2 ? scores.p1 : scores.p2);
	            declareWinner(playerTurnCount % 2 ? player1 + ' congrats!' : player2 + ' yay!');
			}
		});
	})
}

function checkWinAI() {
    let gameWon = false;
    aiWinCombos.forEach( win => {
		let turns = 0;
		win.forEach (elem => {
			if (spotsPlayed.ai.indexOf(elem) > -1) {
				turns++;
			}
			if (turns === 3) {
				gameWon = true;
				//updateScores(playerTurnCount % 2 ? player1 : player2, playerTurnCount % 2 ? scores.p1 : scores.p2);
	            declareWinner(playerTurnCount % 2 ? 'AI won!' : ' Human congrats!');
			}
		});
	})
}


function updateScores(player, playScore) {
	return scoreDiv.innerHTML = player + ' your new score is: ' + playScore++;
}

function replay() {
	location.reload();
}
