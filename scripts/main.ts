// THEME CORE
const themeToggler = document.getElementById('theme-toggler');
const themeTogglerControllers = document.getElementById(
  'theme-toggler-controllers'
).children;

// Assign on controller clicks
for (const controller of themeTogglerControllers) {
  const theme = controller.getAttribute('theme');
  controller.addEventListener('click', () => {
    setTheme(theme);
    controller.classList.add('active');
  });
}

function initializeTheme() {
  const controller = themeTogglerControllers[0];
  const theme = controller.getAttribute('theme');
  setTheme(theme);
  document.body.setAttribute('currentTheme', theme);
  controller.classList.add('active');
}

function setTheme(newTheme: string): void {
  // Toggle theme class and attribute on body
  const currentTheme = document.body.getAttribute('currentTheme');
  if (currentTheme !== undefined && currentTheme !== null) {
    document.body.classList.toggle(currentTheme);
  }

  // Add new theme class and attribute to body
  document.body.setAttribute('currentTheme', newTheme);
  document.body.classList.add(newTheme);

  // Remove active class from previous controller
  for (const controller of themeTogglerControllers) {
    if (controller.classList.contains('active')) {
      controller.classList.remove('active');
      break;
    }
  }
}

initializeTheme();

// CALCULATOR CORE
let value = '';
let operationValue = '';
let currentOperation = '';

const calculatorScreen = document.getElementById('calculator-screen');

function resetCalculator() {
  value = '';
  operationValue = '';
  currentOperation = '';
}

function newCharacter(character: string): void {
  const lastOperationValueCharacter = operationValue[operationValue.length - 1];
  if (character === '.' && lastOperationValueCharacter === '.') {
    return;
  }

  operationValue += character;
}

function backspace() {
  operationValue = operationValue.slice(0, operationValue.length - 1);
}

function refreshScreen() {
  const text = value + currentOperation + operationValue;
  calculatorScreen.innerText = text === '' ? '0' : text;
}

function addValue() {}

function removeValue() {}

function multiplicateValue() {}

function divideValue() {}

// Refresh calculator screen whenever button is clicked
const calculatorKeyboard = document.getElementById('calculator-keyboard');
for (const key of calculatorKeyboard.children) {
  const keyRole = key.getAttribute('role');

  // Assign new character button role
  if (keyRole === 'newCharacter') {
    key.addEventListener('click', () => {
      const character = key.innerHTML;
      newCharacter(character);
    });
  }

  if (keyRole === 'reset') {
    key.addEventListener('click', resetCalculator);
  }

  if (keyRole === 'backspace') {
    key.addEventListener('click', backspace);
  }

  // Assign screen refreshing
  key.addEventListener('click', refreshScreen);
}
