const cards = document.querySelectorAll('.card');

let lockedBoard = false;

let hasFlippedCard = false;
let firstCard;
let secondCard;

function flipCard() {
	if (lockedBoard) return;
	if (this === firstCard) return;

	this.classList.toggle('flip');
	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
	} else {
		hasFlippedCard = false;
		secondCard = this;

		if(firstCard.dataset.name === secondCard.dataset.name) {
			firstCard.removeEventListener('click', flipCard);
			secondCard.removeEventListener('click', flipCard);
			resetBoard();
		} else {
			lockedBoard = true;
			setTimeout(() => {
				firstCard.classList.remove('flip');
				secondCard.classList.remove('flip');
				resetBoard();
			}, 1500);
		}
	}
}

function resetBoard () {
	[hasFlippedCard, lockedBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	})
})();

cards.forEach(card => {
	card.addEventListener('click', flipCard)
});