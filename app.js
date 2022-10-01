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
let preOperation ;
let currentOperation;
/* Keys click event */
keys.forEach(key => {
  key.addEventListener('click', () => {
    console.log(key.dataset.key);
  })
})