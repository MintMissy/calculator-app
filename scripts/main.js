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
