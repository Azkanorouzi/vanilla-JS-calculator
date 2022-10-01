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
  if (currentOperationEl.textContent.length > 15) {
    currentOperationEl.textContent = currentOperationEl.textContent.slice(0,-1);
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
    operation = preOperationEl.textContent.split(" ");
    if (clickedKey === '=') {
      operation.pop();
      console.log(operation);
    }
  }
  /* When user hits = */
  /* When user hits del button */
  else if (clickedKey === 'del') {
    currentOperationEl.textContent = currentOperationEl.textContent.slice(0,-1);
  }
  else {
    currentOperationEl.textContent += clickedKey;
    number
  }
}

