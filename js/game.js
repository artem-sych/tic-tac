const arrField = document.querySelectorAll('.playing__field');
let arrResult = ['', '', '', '', '', '', '', '', ''];
let arrResultGame = ['', '', '', '', '', '', '', '', '', ''];
let nextTurn = 'cross';
let randomEmptyField;
let randomEmptyIndex;
let finishStatus = '';
let statusWin = ''; //кто выйграл крестик или нолик
let isGameEnd = false;



//сброс стилей 
function clearFeald() {
  for (let i = 0; i < arrResult.length; i++) {
    arrResult[i] = '';
    arrResultGame[i] = '';
    if (arrField[i].classList.contains('cross')) {
      arrField[i].classList.remove('cross');
    }
    if (arrField[i].classList.contains('circle')) {
      arrField[i].classList.remove('circle');
    }
  }
  nextTurn = 'cross';
  isGameEnd = false;
}

clearFeald();



// повесли листенер на все поля, проверка по нажатию есть ли класс или нет, если нет, добавляем и переключаем
for (let i = 0; i < arrField.length; i++) {
  arrField[i].addEventListener("click", () => {
    if (arrField[i].classList.contains('cross') ||
      arrField[i].classList.contains('circle')) {
      arrField[i].classList.add('alertRepeat');
      setTimeout(() => arrField[i].classList.remove('alertRepeat'), 500);
    } else {
      arrResult[i] = nextTurn;
      turnValue();
      updateField(arrResult, arrField);
      cheackDraw();
    }
    let winner = calculateWinner(arrResult);
    if (winner.length === 3) {
      isGameEnd = true;
      if (nextTurn === 'cross') {
        console.log('WIN circle');
      } else {
        console.log('WIN cross');
      }
      setTimeout(clearFeald, 1000);
    }
    if (isGameEnd === false) {
      nextMoveAI();
      console.log(nextTurn);
    }
  });
}




//проверка массива на пустые значения
function cheackDraw() {
  if (!arrResult.includes('') && (finishStatus !== 'x' || finishStatus !== 'o')) {
    finishStatus = 'draw';
    isGameEnd = true;
    console.log('ничья');
    setTimeout(clearFeald, 1000);
  }
}

//замена значений в массивах
function updateField(arr, subArr) {
  arr.forEach((el, index) => {
    if (el !== '') {
      subArr[index].classList.add(el);
    }
  });
}

//переключение nextTurn крестик/нолик
function turnValue() {
  nextTurn = (nextTurn === 'cross') ? 'circle' : 'cross';
}


//проверка победителя
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let arr = [];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      arr = [...lines[i]];
    }
  }

  return arr;
}

//очень не умный АI
function nextMoveAI() {
  if (arrResult[4] === '') {
    arrResult[4] = nextTurn;
  } else {
    arrayRandElement(arrResult);
    arrResult[randomEmptyIndex] = nextTurn;
  }
  updateField(arrResult, arrField);
  turnValue();
}



//рандомный индекс пустой клекти в массиве arrResult
function arrayRandElement(arr) {
  let freeIndex = [];
  let element = '';
  let idx = arr.indexOf(element);
  while (idx != -1) {
    freeIndex.push(idx);
    idx = arr.indexOf(element, idx + 1);
  }
  let rand = Math.floor(Math.random() * freeIndex.length);
  randomEmptyIndex = freeIndex[rand];
  return randomEmptyIndex;
}