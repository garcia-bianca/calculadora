const display = document.querySelector("#display");
const buttons = document.querySelector(".buttons");

let currentInput = "";

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function appendValue(value) {
  if (display.textContent === "Erro") {
    currentInput = "";
  }

  if (value === ".") {
    const parts = currentInput.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
  }

  currentInput += value;
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  try {
    if (!currentInput) return;

    const result = eval(currentInput);

    if (result === undefined || Number.isNaN(result)) {
      currentInput = "";
      display.textContent = "Erro";
      return;
    }

    currentInput = String(result);
    updateDisplay();
  } catch {
    currentInput = "";
    display.textContent = "Erro";
  }
}

buttons.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const value = button.dataset.value;

  if (value === "C") {
    clearDisplay();
    return;
  }

  if (value === "DEL") {
    deleteLast();
    return;
  }

  if (value === "=") {
    calculateResult();
    return;
  }

  appendValue(value);
});

document.addEventListener("keydown", (event) => {
  const allowedKeys = "0123456789+-*/.";

  if (allowedKeys.includes(event.key)) {
    appendValue(event.key);
  }

  if (event.key === "Enter") {
    event.preventDefault();
    calculateResult();
  }

  if (event.key === "Backspace") {
    deleteLast();
  }

  if (event.key === "Escape") {
    clearDisplay();
  }
});

updateDisplay();