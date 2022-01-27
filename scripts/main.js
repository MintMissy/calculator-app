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
var operationValue = 0;
var currentOperation = '';
var afterResult = false;
var calculatorScreen = document.getElementById('calculator-screen');
function resetCalculator() {
    value = 0;
    operationValue = 0;
    currentOperation = '';
    var afterResult = false;
}
function newCharacter(character) {
    if (afterResult || value === 0) {
        value = parseFloat(character);
        afterResult = false;
    }
    else if (currentOperation === '') {
        var previousValue = value.toString();
        value = parseFloat(previousValue + character);
    }
    else {
        var previousValue = operationValue.toString();
        operationValue = parseFloat(previousValue + character);
    }
}
function backspace() {
    if (operationValue === 0 && currentOperation === '') {
        value = removeLastNumber(value);
    }
    else if (operationValue === 0 && currentOperation !== '') {
        currentOperation = '';
    }
    else {
        operationValue = removeLastNumber(operationValue);
    }
}
function removeLastNumber(_number) {
    var numberStr = _number.toString();
    _number = parseFloat(numberStr.slice(0, numberStr.length - 1));
    return isNaN(_number) ? 0 : _number;
}
function refreshScreen() {
    var secondValue = operationValue === 0 ? '' : operationValue.toString();
    calculatorScreen.innerText = "".concat(value, " ").concat(currentOperation, " ").concat(secondValue);
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
        operationValue = 0;
    }
    afterResult = operator === '' ? true : false;
    currentOperation = operator;
    refreshScreen();
}
var calculatorKeyboard = document.getElementById('calculator-keyboard');
var _loop_2 = function (i) {
    var key = calculatorKeyboard.children[i];
    var keyRole = key.getAttribute('role');
    // Assign new character button role
    if (keyRole === 'newCharacter') {
        key.addEventListener('click', function () {
            var character = key.innerHTML;
            newCharacter(character);
            refreshScreen();
        });
    }
    if (keyRole === 'reset') {
        key.addEventListener('click', function () {
            resetCalculator();
            refreshScreen();
        });
    }
    if (keyRole === 'backspace') {
        key.addEventListener('click', function () {
            backspace();
            refreshScreen();
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
};
for (var i = 0; i < calculatorKeyboard.children.length; i++) {
    _loop_2(i);
}
