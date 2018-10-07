const message = document.querySelector('#message');
const board = document.querySelectorAll('.board');
const grids = document.querySelectorAll('.grid');
const aiMusic = new Audio('sounds/ClowningAround.mp3');
const humanMusic = new Audio('sounds/ElevatorMusic.mp3');
const player1 = 'Player 1';
const player2 = 'Player 2';
const AI = 'AI';

const spotsPlayed = {
	p1: [],
	p2: [],
	ai: []
}

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

document.querySelector('.btn2-players').addEventListener('click', createBoardHuman);
document.querySelector('.btn1-player').addEventListener('click', createBoardAI);

function createBoardHuman() {
	document.querySelector('.blink-title').classList.remove('blink-title');
	humanMusic.play();
	board.forEach (elem => {
		elem.addEventListener('click', startGameHuman);
	});
}

function createBoardAI() {
	document.querySelector('.blink-title').classList.remove('blink-title');
	aiMusic.play()
	board.forEach (elem => {
		elem.addEventListener('click', startGameAI);
	});
}

function startGameHuman(e) {
	if (e.target.classList.contains('played')) {
		return;
	} else {
		e.target.classList.add('played');
		// console.log(e.target)

		twoPlayerTurns(playerTurnCount++, player1, player2);
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
		return;
	} else {
		e.target.classList.add('played');
		// console.log(e.target)

		spotsPlayed.p1.push(e.target.id)
		e.target.style.opacity = 0.7;
		message.innerText = `AI's thinking..`;
		message.style.backgroundColor = 'lightblue';
		checkWin(spotsPlayed.p1)

		setTimeout(() => {
			const aiTarget = aiTurn();
			if (aiTarget !== undefined) {
				aiTarget.style.opacity = 0.3;
				message.innerText = `player 1, your turn!`;
				message.style.backgroundColor = 'yellow';

				//adding back classlist to keep track
				aiTarget.classList.add('played');
				checkWin(spotsPlayed.ai);
			}
		}, 600)
	}
	if (spotsPlayed.ai.length + spotsPlayed.p1.length == grids.length) {
		declareWinner('Draw!');
	}
}


function aiTurn() { 
	const remainingSpots = Array.from(grids).filter(square => 
		!square.classList.contains('played')); 
	let randomSpots = Math.floor(Math.random() * remainingSpots.length);
	spotsPlayed.ai.push(remainingSpots[randomSpots].id);
	return remainingSpots[randomSpots];
}


let playerTurnCount = 0;

function twoPlayerTurns(playerTurnCount, p1, p2) {
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
	if (createBoardHuman) {
		board.forEach (elem => {				
			elem.removeEventListener('click', createBoardHuman);
		});
	} else {
		board.forEach (elem => {
			elem.removeEventListener('click', createBoardAI);
		});
	}
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
				// updateScores(playerTurnCount % 2 ? player1 : player2, playerTurnCount % 2 ? scores.p1 : scores.p2);
				declareWinner(playerTurnCount % 2 ? player1 + ' congrats!' : player2 + ' yay!');
				// 1p mode displaying one player's congrats msg only
			}
		});
	})
}


function updateScores(player, playScore) {
	if (player1) {
		return document.querySelector('#p1-scores').innerHTML = `${player}  scores ${playScore + 1}`;
	} else {
		return document.querySelector('#p2-scores').innerHTML = `${player}  scores ${playScore + 1}`;
	}
}

function replay() {
	playerTurnCount = 0;
	message.innerText = 'Get ready to rebattle!';
	message.style.backgroundColor = 'lightblue';
	setTimeout(() => {
		message.innerText = 'Aaaannnnd go!';
		message.style.backgroundColor = 'yellow';
	}, 1000)
	for (score in spotsPlayed) {
		if (spotsPlayed.hasOwnProperty(score)) {
			spotsPlayed[score] = [];
		}
	}
	grids.forEach (elem => {
		elem.classList.remove('played');
		elem.style.opacity = 1;
		elem.addEventListener('click', createBoardHuman);
		elem.addEventListener('click', createBoardAI);
	});
	//wont reset to allow players to reselect mode, fix!
}

