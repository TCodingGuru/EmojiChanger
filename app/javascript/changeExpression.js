document.addEventListener("DOMContentLoaded", () => {
    const expressions = ["images/happy.png", "images/sad.png", "images/neutral.png"];
    let cards = [...expressions, ...expressions];
    let flippedCards = [], matchedPairs = 0, moves = 0;

    const board = document.querySelector("#gameBoard");
    const movesDisplay = document.querySelector("#moves");
    const messageDisplay = document.querySelector("#message");
    const restartButton = document.querySelector("#restartButton");

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    // Creates a card element
    const createCard = (expression) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.expression = expression;

        const frontFace = document.createElement("img");
        frontFace.src = expression;
        frontFace.classList.add("card-front");

        const backFace = document.createElement("img");
        backFace.src = "images/card-back.png";
        backFace.classList.add("card-back");

        card.append(frontFace, backFace);
        card.addEventListener("click", () => flipCard(card));

        return card;
    };

    const createBoard = () => {
        [flippedCards, matchedPairs, moves] = [[], 0, 0];
        movesDisplay.textContent = `Moves: ${moves}`;
        messageDisplay.textContent = "Find all matching pairs!";
        board.innerHTML = "";
        shuffle(cards).forEach(expression => board.append(createCard(expression)));
    };

    const flipCard = (card) => {
        if (flippedCards.length < 2 && !card.classList.contains("matched") && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) checkMatch();
        }
    };

    const checkMatch = () => {
        const [card1, card2] = flippedCards;
        const [expression1, expression2] = [card1.dataset.expression, card2.dataset.expression];

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
        movesDisplay.textContent = `Moves: ${moves}`;

        if (matchedPairs === expressions.length) {
            messageDisplay.textContent = `🎉 You won in ${moves} moves!`;
        }
    };

    restartButton.addEventListener("click", createBoard);

    createBoard(); 
});
