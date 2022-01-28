// THEME CORE
var themeToggler = document.getElementById('theme-toggler');
var themeTogglerControllers = document.getElementById('theme-toggler-controllers').children;
var _loop_1 = function (i) {
    var controller = themeTogglerControllers[i];
    var theme = controller.getAttribute('theme');
    controller.addEventListener('click', function () {
        setTheme(theme);
        controller.classList.add('active');
    });
};
// Assign on controller clicks
for (var i = 0; i < themeTogglerControllers.length; i++) {
    _loop_1(i);
}
function initializeTheme() {
    var controller = themeTogglerControllers[0];
    var theme = controller.getAttribute('theme');
    setTheme(theme);
    document.body.setAttribute('currentTheme', theme);
    controller.classList.add('active');
}
function setTheme(newTheme) {
    // Toggle theme class and attribute on body
    var currentTheme = document.body.getAttribute('currentTheme');
    if (currentTheme !== undefined && currentTheme !== null) {
        document.body.classList.toggle(currentTheme);
    }
    // Add new theme class and attribute to body
    document.body.setAttribute('currentTheme', newTheme);
    document.body.classList.add(newTheme);
    // Remove active class from previous controller
    for (var i = 0; i < themeTogglerControllers.length; i++) {
        var controller = themeTogglerControllers[i];
        if (controller.classList.contains('active')) {
            controller.classList.remove('active');
            break;
        }
    }
}
initializeTheme();
// CALCULATOR CORE
var value = 0;
var valueStr = '';
var operationValue = 0;
var operationValueStr = '';
var currentOperation = '';
var afterResult = false;
var calculatorScreen = document.getElementById('calculator-screen');
function resetCalculator() {
    value = 0;
    valueStr = '0';
    operationValue = 0;
    operationValueStr = '';
    currentOperation = '';
    afterResult = true;
}
function newCharacter(character) {
    if (afterResult || valueStr === '') {
        valueStr = '';
        valueStr = addNewCharacter(valueStr, character);
        valueStr = fixValueStr(valueStr);
        value = getValueFromStr(valueStr);
        afterResult = false;
    }
    else if (currentOperation === '') {
        valueStr = addNewCharacter(valueStr, character);
        valueStr = fixValueStr(valueStr);
        value = getValueFromStr(valueStr);
    }
    else {
        operationValueStr = addNewCharacter(operationValueStr, character);
        operationValueStr = fixValueStr(operationValueStr);
        operationValue = getValueFromStr(operationValueStr);
    }
}
function addNewCharacter(valueString, newCharacter) {
    if (valueString === '0') {
        return newCharacter;
    }
    if (valueString.includes('.') && newCharacter === '.') {
        return valueString;
    }
    return valueString + newCharacter;
}
function fixValueStr(valueString) {
    if (valueString.startsWith('.')) {
        return '0' + valueString;
    }
    return valueString;
}
function getValueFromStr(valueString) {
    if (!valueString.endsWith('.')) {
        return parseFloat(valueString);
    }
    else {
        return parseFloat(valueString + '0');
    }
}
function backspace() {
    if (operationValue === 0 && currentOperation === '') {
        valueStr = valueStr.slice(0, valueStr.length - 1);
        valueStr = valueStr === '' ? '0' : valueStr;
    }
    else if (operationValue === 0 && currentOperation !== '') {
        currentOperation = '';
    }
    else {
        operationValueStr = operationValueStr.slice(0, operationValueStr.length - 1);
    }
}
function refreshScreen() {
    calculatorScreen.innerText = "".concat(valueStr, " ").concat(currentOperation, " ").concat(operationValueStr);
}
function operation(operator) {
    var result;
    if (operationValue === 0) {
        currentOperation = operator;
    }
    else {
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
var calculatorKeyboard = document.getElementById('calculator-keyboard');
var _loop_2 = function (i) {
    var key = calculatorKeyboard.children[i];
    var keyRole = key.getAttribute('role');
    // Assign new character button role
    if (keyRole === 'newCharacter') {
        key.addEventListener('click', function () {
            var character = key.textContent;
            newCharacter(character);
        });
    }
    if (keyRole === 'reset') {
        key.addEventListener('click', function () {
            resetCalculator();
        });
    }
    if (keyRole === 'backspace') {
        key.addEventListener('click', function () {
            backspace();
        });
    }
    if (keyRole === 'operation') {
        key.addEventListener('click', function () {
            var operator = key.innerHTML;
            operation(operator);
        });
    }
    if (keyRole === 'result') {
        key.addEventListener('click', function () {
            operation('');
        });
    }
    key.addEventListener('click', function () {
        refreshScreen();
    });
};
for (var i = 0; i < calculatorKeyboard.children.length; i++) {
    _loop_2(i);
}
