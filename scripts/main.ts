// THEME CORE
const themeToggler = document.getElementById('theme-toggler');
const themeTogglerControllers = document.getElementById(
  'theme-toggler-controllers'
).children;

// Assign on controller clicks
for (let i = 0; i < themeTogglerControllers.length; i++) {
  const controller = themeTogglerControllers[i];
  const theme = controller.getAttribute('theme');
  controller.addEventListener('click', () => {
    setTheme(theme);
    controller.classList.add('active');
  });
}

function initializeTheme() {
  let storageTheme = localStorage.getItem('theme');

  if (storageTheme === null) {
    localStorage.setItem('theme', 'light');
    storageTheme = 'light';
  }

  for (let i = 0; i < themeTogglerControllers.length; i++) {
    const controller = themeTogglerControllers[i];
    const controllerTheme = controller.getAttribute('theme');
    if (controllerTheme === storageTheme) {
      controller.classList.add('active');
      break;
    }
  }

  setTheme(storageTheme);
  document.body.setAttribute('currentTheme', storageTheme);
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

  // Save picked theme to local storage
  localStorage.setItem('theme', newTheme);

  // Remove active class from previous controller
  for (let i = 0; i < themeTogglerControllers.length; i++) {
    const controller = themeTogglerControllers[i];
    if (controller.classList.contains('active')) {
      controller.classList.remove('active');
      break;
    }
  }
}

initializeTheme();

// CALCULATOR CORE
let value = 0;
let valueStr = '';
let operationValue = 0;
let operationValueStr = '';
let currentOperation = '';
let afterResult = false;

const calculatorScreen = document.getElementById('calculator-screen');

function resetCalculator() {
  value = 0;
  valueStr = '0';
  operationValue = 0;
  operationValueStr = '';
  currentOperation = '';
  afterResult = true;
}

function newCharacter(character: string): void {
  if (afterResult || valueStr === '') {
    valueStr = '';
    valueStr = addNewCharacter(valueStr, character);
    valueStr = fixValueStr(valueStr);

    value = getValueFromStr(valueStr);
    afterResult = false;
  } else if (currentOperation === '') {
    valueStr = addNewCharacter(valueStr, character);
    valueStr = fixValueStr(valueStr);

    value = getValueFromStr(valueStr);
  } else {
    operationValueStr = addNewCharacter(operationValueStr, character);
    operationValueStr = fixValueStr(operationValueStr);

    operationValue = getValueFromStr(operationValueStr);
  }
}

function addNewCharacter(valueString: string, newCharacter: string): string {
  if (valueString === '0') {
    return newCharacter;
  }

  if (valueString.includes('.') && newCharacter === '.') {
    return valueString;
  }

  return valueString + newCharacter;
}

function fixValueStr(valueString: string): string {
  if (valueString.startsWith('.')) {
    return '0' + valueString;
  }
  return valueString;
}

function getValueFromStr(valueString: string): number {
  if (!valueString.endsWith('.')) {
    return parseFloat(valueString);
  } else {
    return parseFloat(valueString + '0');
  }
}

function backspace() {
  if (operationValue === 0 && currentOperation === '') {
    valueStr = valueStr.slice(0, valueStr.length - 1);
    valueStr = valueStr === '' ? '0' : valueStr;
  } else if (operationValue === 0 && currentOperation !== '') {
    currentOperation = '';
  } else {
    operationValueStr = operationValueStr.slice(
      0,
      operationValueStr.length - 1
    );
  }
}

function refreshScreen() {
  calculatorScreen.innerText = `${valueStr} ${currentOperation} ${operationValueStr}`;
}

function operation(operator: string) {
  let result: number;

  if (operationValue === 0) {
    currentOperation = operator;
  } else {
    switch (currentOperation) {
      case '+':
        result = value + operationValue;
        break;
      case '-':
        result = value - operationValue;
        break;
      case 'x':
        result = value * operationValue;
        break;
      case '/':
        result = value / operationValue;
        break;
      default:
        result = value;
    }
    value = result;
    valueStr = result.toString();

    operationValue = 0;
    operationValueStr = '';
  }

  afterResult = operator === '' ? true : false;

  currentOperation = operator;
}

const calculatorKeyboard = document.getElementById('calculator-keyboard');
for (let i = 0; i < calculatorKeyboard.children.length; i++) {
  const key = calculatorKeyboard.children[i];
  const keyRole = key.getAttribute('role');

  // Assign new character button role
  if (keyRole === 'newCharacter') {
    key.addEventListener('click', () => {
      const character = key.textContent;
      newCharacter(character);
    });
  }

  if (keyRole === 'reset') {
    key.addEventListener('click', () => {
      resetCalculator();
    });
  }

  if (keyRole === 'backspace') {
    key.addEventListener('click', () => {
      backspace();
    });
  }

  if (keyRole === 'operation') {
    key.addEventListener('click', () => {
      const operator = key.innerHTML;
      operation(operator);
    });
  }

  if (keyRole === 'result') {
    key.addEventListener('click', () => {
      operation('');
    });
  }

  key.addEventListener('click', () => {
    refreshScreen();
  });
}
