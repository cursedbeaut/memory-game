const GAME_NODE = document.querySelector("#game-board");
const WINNING_TEXT = document.querySelector("#victory-message");
const START_GAME_BUTTON = document.querySelector("#new-game-button");


const VISIBLE_CARD_CLASSNAME = "visible";
const CARD_FLIP_TIMEOUT_MS = 700;


const CARD_ELEMENTS = ["1", "2", "3", "4", "5", "6", '7', '8', '9', '10', '11'];
let CARDS_AMOUNT


// console.log(CARD_ELEMENTS);

let VISIBLE_CARDS = [];


// console.log(generateArrayWithPairs(CARD_ELEMENTS, CARDS_AMOUNT)); 

START_GAME_BUTTON.addEventListener("click", startGame);

function startGame() {
  // Очищаем игровое поле
  [GAME_NODE, WINNING_TEXT].forEach((element) => (element.innerHTML = ""));
  START_GAME_BUTTON.remove()
  CARDS_AMOUNT = Number(prompt('введи количество пар от 1 до 11 :)'));

  if (CARDS_AMOUNT > 11) {
    alert('столько нет :( введи число поменьше');
    startGame();
  } else if (CARDS_AMOUNT < 1) {
    alert('введи другое число');
    startGame();
  }

  const CARD_VALUES = generateArrayWithPairs(CARD_ELEMENTS, CARDS_AMOUNT);

  CARD_VALUES.forEach(renderCard);

  if (VISIBLE_CARDS.length === CARDS_AMOUNT * 2) {
    WINNING_TEXT.textContent = "ты меня нашёл, котёнок";
    document.body.append(START_GAME_BUTTON);
  }
}

function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length)
    let temp = arr[i]
    arr[i] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}

function generateArrayWithPairs(arr, count) {

  shuffle(arr)

  let newArr = []
  for (let i = 1; i <= count; i++) {
    newArr.push(arr[i-1], arr[i-1])
  }
  
  shuffle(newArr)

  return newArr
}

function renderCard(cardText = "") {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  cardFront.textContent = "?";
  cardBack.textContent = cardText;

  if(cardText === '1') {
    card.classList.add('red-shirt')
  }

  if(cardText === '2') {
    card.classList.add('tail')
  }

  if(cardText === '3') {
    card.classList.add('blowjob')
  }

  if(cardText === '4') {
    card.classList.add('mirror')
  }

  if(cardText === '5') {
    card.classList.add('blowjob2')
  }

  if(cardText === '6') {
    card.classList.add('bra')
  }

  if(cardText === '7') {
    card.classList.add('nipples')
  }

  if(cardText === '8') {
    card.classList.add('small-mirror')
  }

  if(cardText === '9') {
    card.classList.add('tail2')
  }

  if(cardText === '10') {
    card.classList.add('red-shirt2')
  }

  if(cardText === '11') {
    card.classList.add('mirror_tail')
  }

  

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  card.appendChild(cardInner);

  card.addEventListener("click", handleCardClick.bind(this, card));

  GAME_NODE.appendChild(card);
}

function handleCardClick(card) {
  // Не реагируем на нажатие на открытую карточку
  if (card.classList.contains(VISIBLE_CARD_CLASSNAME)) {
    return;
  }

  // Функция проверки выигрыша
  const checkVictory = () => {
    const visibleCardsNodes = document.querySelectorAll(
      `.${VISIBLE_CARD_CLASSNAME}`
    );

    // Если кол-во открытых карт равно общему кол-ву карт, то это победа

    const isVictory = visibleCardsNodes.length === CARDS_AMOUNT*2;
    const victoryMessage = "ты меня нашёл, котёнок";

    if (isVictory) {
      WINNING_TEXT.textContent = victoryMessage;
      document.body.append(START_GAME_BUTTON)
    }

  };

  // Проверяем на выигрыш после анимации открытия карты
  card
    .querySelector(".card-inner")
    .addEventListener("transitionend", checkVictory);

  // Добавляем карте класс visible, запуская анимацию поворота
  card.classList.add(VISIBLE_CARD_CLASSNAME);

  // Добавляем карту в массив открытых карт
  VISIBLE_CARDS.push(card);

  // Так как нам нужно проверять каждые 2 отрытые карты, делаем такое условие
  if (VISIBLE_CARDS.length % 2 !== 0) {
    return;
  }

  // Получаем последнюю и предпоследнюю открытые карты, чтобы проверять совпадают ли они
  const [prelastCard, lastCard] = VISIBLE_CARDS.slice(-2);

  // Если две последние открытые карты не совпадают, убираем их из массива открытых карт
  if (lastCard.textContent !== prelastCard.textContent) {
    VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);

    // Через 500 мс закрываем те карты, которые не совпали
    setTimeout(() => {
      [lastCard, prelastCard].forEach((card) =>
        card.classList.remove(VISIBLE_CARD_CLASSNAME)
      );
    }, CARD_FLIP_TIMEOUT_MS);
  }
}

startGame();

