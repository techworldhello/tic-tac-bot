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

document.querySelector('.btn1-player').addEventListener('click', createBoardAI);
document.querySelector('.btn2-players').addEventListener('click', createBoardHuman);

function createBoardHuman() {
	document.querySelector('.blink-title').classList.remove('blink-title')
	board.forEach (elem => {
		elem.addEventListener('click', startGameHuman);
	});
}

function createBoardAI() {
	document.querySelector('.blink-title').classList.remove('blink-title')
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
		e.target.style.removeProperty('background-color');
	} else {
		e.target.classList.add('played');
		console.log(e.target)

		spotsPlayed.p1.push(e.target.id)
		e.target.style.opacity = 0.7;
		message.innerText = `AI's thinking..`;
		message.style.backgroundColor = 'lightblue';
		checkWinAI(spotsPlayed.p1);

		setTimeout(() => {
			const aiTarget = AITurn();
			if (aiTarget !== undefined) {
				aiTarget.style.opacity = 0.3;
				message.innerText = `player 1, your turn!`;
				message.style.backgroundColor = 'yellow';
				//adding back classlist to keep track
				aiTarget.classList.add('played');
				console.log(aiTarget.classList)
				checkWinAI(spotsPlayed.ai);
			}
		}, 600)
	}
	if (spotsPlayed.ai.length + spotsPlayed.p1.length + 1 == grids.length) {
		declareWinner('Draw!');
	}
}


function AITurn() { 
	// filter out classes containing 'played'
	const remainingSpots = Array.from(grids).filter(square => 
		!square.classList.contains('played')); 
	let randomSpots = Math.floor(Math.random() * remainingSpots.length);
	spotsPlayed.ai.push(remainingSpots[randomSpots].id);
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

function checkWinAI(playerArray) {
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
	           declareWinner(playerArray ? 'Humans rule!' : 'AI won!'); //fix!!!!
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
