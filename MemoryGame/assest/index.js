const memoryBoard = document.querySelector(".memory-board");
const epicodeCoverImage = "/assest/src/epicode.png";
let cards = [
  "/assest/src/html.png",
  "/assest/src/css.png",
  "/assest/src/react.png",
  "/assest/src/angular.png",
  "/assest/src/java.png",
  "/assest/src/node.png",
  "/assest/src/js.png",
  "/assest/src/ts.png",
  "/assest/src/Bootstrap.jpeg",
  "/assest/src/sass.png",
  "/assest/src/springboot.png",
  "/assest/src/sql.png",
];
let openedCards = [];
let matchedPairs = 0;
let timer;
let timeRemaining = 60;
const timerDisplay = document.querySelector(".timer");
let isTimerRunning = false;

cards = cards.concat(cards);

cards = shuffleArray(cards);

cards.forEach((cardPath) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-face", "card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-face", "card-back");

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  cardImage.src = epicodeCoverImage;
  cardImage.alt = "Card Image";

  cardFront.style.backgroundImage = `url(${cardPath})`;

  cardBack.appendChild(cardImage);
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardElement.appendChild(cardInner);

  cardElement.addEventListener("click", () => flipCard(cardElement));
  memoryBoard.appendChild(cardElement);
});

function flipCard(card) {
  if (
    openedCards.length < 2 &&
    !openedCards.includes(card) &&
    !card.classList.contains("matched")
  ) {
    card.classList.add("flipped");
    openedCards.push(card);

    if (!isTimerRunning) {
      startTimer();
      isTimerRunning = true;
    }

    if (openedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = openedCards;

  const img1 = card1.querySelector(".card-front").style.backgroundImage;
  const img2 = card2.querySelector(".card-front").style.backgroundImage;

  if (img1 === img2) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;

    if (matchedPairs === cards.length / 2) {
      stopTimer();
      alert("Hai vinto!");
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  openedCards = [];

  if (matchedPairs === cards.length / 2) {
    stopTimer();
  }
}

function startTimer() {
  timer = setInterval(function () {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    timerDisplay.textContent = `${formattedTime}`;

    if (timeRemaining === 0) {
      stopTimer();
      alert("Tempo scaduto! Hai perso.");
      resetGame();
    }
    timeRemaining--;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isTimerRunning = false;
}

function resetGame() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.remove("flipped", "matched");
  });

  openedCards = [];
  matchedPairs = 0;
  timeRemaining = 60;
  timerDisplay.textContent = `01:00`;

  cards = shuffleArray(cards);
  cards.forEach((card) => {
    memoryBoard.appendChild(card);
  });
  isTimerRunning = false;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
