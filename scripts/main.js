// THEME CORE
var themeToggler = document.getElementById('theme-toggler');
var themeTogglerControllers = document.getElementById('theme-toggler-controllers').children;
var _loop_1 = function (controller) {
    var theme = controller.getAttribute('theme');
    controller.addEventListener('click', function () {
        setTheme(theme);
        controller.classList.add('active');
    });
};
// Assign on controller clicks
for (var _i = 0, themeTogglerControllers_1 = themeTogglerControllers; _i < themeTogglerControllers_1.length; _i++) {
    var controller = themeTogglerControllers_1[_i];
    _loop_1(controller);
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
    for (var _i = 0, themeTogglerControllers_2 = themeTogglerControllers; _i < themeTogglerControllers_2.length; _i++) {
        var controller = themeTogglerControllers_2[_i];
        if (controller.classList.contains('active')) {
            controller.classList.remove('active');
            break;
        }
    }
}
initializeTheme();
// CALCULATOR CORE
var value = '';
var operationValue = '';
var currentOperation = '';
var calculatorScreen = document.getElementById('calculator-screen');
function resetCalculator() {
    value = '';
    operationValue = '';
    currentOperation = '';
}
function newCharacter(character) {
    var lastOperationValueCharacter = operationValue[operationValue.length - 1];
    if (character === '.' && lastOperationValueCharacter === '.') {
        return;
    }
    operationValue += character;
}
function backspace() {
    operationValue = operationValue.slice(0, operationValue.length - 1);
}
function refreshScreen() {
    var text = value + currentOperation + operationValue;
    calculatorScreen.innerText = text === '' ? '0' : text;
}
function addValue() { }
function removeValue() { }
function multiplicateValue() { }
function divideValue() { }
// Refresh calculator screen whenever button is clicked
var calculatorKeyboard = document.getElementById('calculator-keyboard');
var _loop_2 = function (key) {
    var keyRole = key.getAttribute('role');
    // Assign new character button role
    if (keyRole === 'newCharacter') {
        key.addEventListener('click', function () {
            var character = key.innerHTML;
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
};
for (var _a = 0, _b = calculatorKeyboard.children; _a < _b.length; _a++) {
    var key = _b[_a];
    _loop_2(key);
}
