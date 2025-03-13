document.addEventListener("DOMContentLoaded", function () {
    const expressions = ["images/happy.png", "images/sad.png", "images/neutral.png"];
    let cards = [...expressions, ...expressions];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;

    const board = document.querySelector("#gameBoard");
    const movesDisplay = document.querySelector("#moves");
    const messageDisplay = document.querySelector("#message");
    const restartButton = document.querySelector("#restartButton");

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    //reset game
    function createBoard() {
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        movesDisplay.textContent = `Moves: ${moves}`;
        messageDisplay.textContent = "Find all matching pairs!";

        board.innerHTML = "";

        // Shuffle cards
        let shuffledCards = shuffle(cards);

        shuffledCards.forEach(expression => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.dataset.expression = expression;

            let frontFace = document.createElement("img");
            frontFace.src = expression;
            frontFace.classList.add("card-front");

            let backFace = document.createElement("img");
            backFace.src = "images/card-back.png"; 
            backFace.classList.add("card-back");

            card.appendChild(frontFace);
            card.appendChild(backFace);
            board.appendChild(card);

            card.addEventListener("click", () => flipCard(card));
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains("matched") && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    function checkMatch() {
        let [card1, card2] = flippedCards;
        let expression1 = card1.dataset.expression;
        let expression2 = card2.dataset.expression;

        if (expression1 === expression2) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedPairs++;
            messageDisplay.textContent = "✅ Match found!";
        } else {
            messageDisplay.textContent = "❌ No match! Try again.";
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
            }, 1000);
        }

        flippedCards = [];
        moves++;
        updateUI();

        if (matchedPairs === expressions.length) {
            messageDisplay.textContent = `🎉 You won in ${moves} moves!`;
        }
    }

    function updateUI() {
        movesDisplay.textContent = `Moves: ${moves}`;
    }

    restartButton.addEventListener("click", function () {
        createBoard();
    });

    // create board when page loads
    createBoard();
});
