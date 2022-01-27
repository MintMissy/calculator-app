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
