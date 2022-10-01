'use strict'
/* ============== Themes ============== */
const btnSwitch = document.querySelector('button.switch');
const slider = document.querySelector('.slider')
let themeElements = document.querySelectorAll('.main-theme'); 
let currentTheme = btnSwitch.dataset.theme;
/* Changing background color when user clicks on btnSwitch */
btnSwitch.addEventListener('click', () => {
  /* Finding out what is current theme and changing theme based on that */
  if (currentTheme === 'main') {
    switchTheme('main', 'sec') // main to sec
    slider.style.transform = "translateX(28px)"
  } else if (currentTheme === 'sec') {
    switchTheme('sec', 'tertiary') // sec to tertiary
    slider.style.transform = "translateX(56px)"
  } else if (currentTheme === 'tertiary') {
    switchTheme('tertiary', 'main') // tertiary to main
    slider.style.transform = "translateX(0px)"
  }
})
/* This function will change theme every time we call it */
function switchTheme(prevTheme,theme) {
  currentTheme = theme;
  btnSwitch.dataset.theme = theme;
  /* Iterating through each element and removing the previous theme adding the new one */
  themeElements.forEach(themeElement => {
    themeElement.classList.remove(`${prevTheme}-theme`);
    themeElement.classList.add(`${theme}-theme`);
  })
}
/* ============== Calculator ============== */
const keys = document.querySelectorAll('.key')
/* Calculator screen */
const preOperationEl = document.querySelector('.previous-operation');
const currentOperationEl = document.querySelector('.current-operation');
let operation;
let preOperation ;
let currentOperation;
let lastKeyIndex;
let lastKey;
let operationResult;
/* Keys click event */
let clickedKeyName;
keys.forEach(key => {
  key.addEventListener('click', () => {
    clickedKeyName = key.dataset.keyname;
    lastKeyIndex = currentOperationEl.textContent.length - 1;
    lastKey = currentOperationEl.textContent[lastKeyIndex];
    populateScreen(clickedKeyName);
  })
})
// Populate the screen with keys that are clicked
function populateScreen(clickedKey) {
  // If user enters more than allowed numbers
  if (currentOperationEl.textContent.length > 9) {
    currentOperationEl.style.fontSize = "2rem";
  }

  // When user enters more than
  if (clickedKey === '*' || clickedKey === '+' || clickedKey === '-' || clickedKey === '/' || clickedKey === '=') {

    /* Not allowing to have more than one operation in a row */
    if (lastKey !== ' ') {
      // Adding to pre operation
      preOperationEl.textContent += `${currentOperationEl.textContent} ${clickedKey}`;
      /* clearing out the pre operation */
      currentOperationEl.textContent = " ";
    }
    if (clickedKey === '=') {
      operation = preOperationEl.textContent
      /* Calculating the result */
      console.log(operation);
      operationResult = operate(operation)
      if (operationResult === Infinity) {
        operationResult ='WTF !^&*(*&^%%';
      }
      /* Showing the result */
      preOperationEl.textContent = ""
      currentOperationEl.textContent=operationResult;
    }
  }
  /* When user hits = */
  /* When user hits del button */
  else if (clickedKey === 'del') {
    currentOperationEl.textContent = currentOperationEl.textContent.slice(0,-1);
  } else if (clickedKey === 'reset') {
    reset();
  }
  else {
    currentOperationEl.textContent += clickedKey;
  }
}


/* This function will get a string as argument and act exactly like eval it will calculate the operation and return the result */
function operate(operation) {
  // turning operation into an array
  operation = operation.split(' ')

  // stores the result of operation
  let operationResult;
  // this loop will go through every element of the array and operates every * or / operation and shrinks the string down until there is no more * or / left
  while (operation.includes('/') || operation.includes('*')) {
    for (let i = 0; i < operation.length; i++) {
      if (operation[i] === '*') {
        operation[i] = operation[i + 1];
        operation[i] *= operation[i - 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      if (operation[i] === '/') {
        operation[i] = operation[i - 1] / operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
    }
  }
  // this loop will go through every element of the array and operates every - or + operation and shrinks the string down until there is no more - or + left
  while (operation.includes('+') || operation.includes('-')) {
    for (let i = 0; i < operation.length; i++) {
      if (operation[i] === '+') {
        operation[i + 1] = Number(operation[i + 1]);
        operation[i - 1] = Number(operation[i - 1]);
        operation[i] = operation[i + 1];
        operation[i] += operation[i - 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
      if (operation[i] === '-') {
        operation[i] = operation[i - 1];
        operation[i] -= operation[i + 1];
        operation.splice(i + 1, 1)
        operation.splice(i - 1, 1)
      }
    }
  }
  /* Checking to see if the result have a decimal point if so round it up to two decimal points for better readability else just set operation result to it's original value*/
  if (operation[0] % 1 !== 0) {
    operationResult = Math.round(operation[0] * 100) / 100;
  } else {
    operationResult = operation[0];
  }
  return operationResult;
}
/* This function will reset everything */
function reset() {
  operation = undefined;
  preOperation = undefined;
  currentOperation = undefined;
  lastKeyIndex = undefined;
  lastKey = undefined;
  operationResult = undefined;
  preOperationEl.textContent = ""
  currentOperationEl.textContent = "";
}