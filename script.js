document.addEventListener("DOMContentLoaded", () => {
	// Elements
	const loader = document.querySelector(".mini-loader-content");
	const landingPage = document.getElementById("landing-page");
	const cells = document.querySelectorAll(".tic-cell");
	const resetBtn = document.getElementById("resetBtn");
	const resultText = document.getElementById("resultText");
	const resultModal = new bootstrap.Modal(document.getElementById("resultModal"));

	let currentPlayer = "X";
	let gameState = ["", "", "", "", "", "", "", "", ""];
	let gameActive = true;

	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	// Hide loader and show content
	setTimeout(() => {
		loader.style.display = "none";
		landingPage.classList.remove("hidden");
	}, 3000); // 3-second loader delay

	// Handle cell clicks
	function handleCellClick(event) {
		const clickedCell = event.target;
		const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

		if (gameState[clickedCellIndex] !== "" || !gameActive) {
			return;
		}

		gameState[clickedCellIndex] = currentPlayer;
		clickedCell.textContent = currentPlayer;
		clickedCell.classList.add("clicked");

		checkResult();
	}

	// Check for win or draw
	function checkResult() {
		let roundWon = false;

		for (let i = 0; i < winningConditions.length; i++) {
			const winCondition = winningConditions[i];
			const a = gameState[winCondition[0]];
			const b = gameState[winCondition[1]];
			const c = gameState[winCondition[2]];

			if (a === "" || b === "" || c === "") {
				continue;
			}

			if (a === b && b === c) {
				roundWon = true;
				highlightWinningCells(winCondition);
				break;
			}
		}

		if (roundWon) {
			gameActive = false;
			resultText.innerText = `Player ${currentPlayer} has won!`; // Update result text
			console.log(`Result text set to: Player ${currentPlayer} has won!`); // Debug log
			resultModal.show();
			return;
		}

		const roundDraw = !gameState.includes("");
		if (roundDraw) {
			gameActive = false;
			resultText.innerText = "Game ended in a draw!";
			console.log("Result text set to: Game ended in a draw!"); // Debug log
			resultModal.show();
			return;
		}

		currentPlayer = currentPlayer === "X" ? "O" : "X";
	}

	// Highlight winning cells
	function highlightWinningCells(winCondition) {
		winCondition.forEach((index) => {
			cells[index].classList.add("winning-cell");
		});
	}

	// Reset game
	function resetGame() {
		gameState = ["", "", "", "", "", "", "", "", ""];
		gameActive = true;
		currentPlayer = "X";
		cells.forEach((cell) => {
			cell.textContent = "";
			cell.classList.remove("clicked", "winning-cell");
		});
	}

	// Event Listeners
	cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
	resetBtn.addEventListener("click", resetGame);
});
