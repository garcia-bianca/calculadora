const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

function calculate(expression) {
  try {
    return Function(`"use strict"; return (${expression})`)();
  } catch {
    return "Erro";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      currentInput = "";
      updateDisplay(currentInput);
      return;
    }

    if (value === "=") {
      const result = calculate(currentInput);
      currentInput = String(result);
      updateDisplay(currentInput);
      return;
    }

    currentInput += value;
    updateDisplay(currentInput);
  });
});