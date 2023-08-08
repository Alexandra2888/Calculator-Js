//select DOM elements
const links = document.querySelectorAll("link");
const toggleBtn = document.querySelectorAll("input");
const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");


let prevOperand = prevOperandText.innerText;
let currentOperand = currentOperandText.innerText;
let operation;

//function to change theme
themeChange = (i) => {
  if (i === "0") {
    links[2].setAttribute("href", "");
  } else {
    links[2].setAttribute("href", `css/theme${i}.css`);
  }
};

//reset
reset = () => {
  prevOperand = "";
  currentOperand = "";
  operation = undefined;
};

//delete an operand
deleteOperand = () => {
  currentOperand = currentOperand.toString().slice(0, -1);
};

//add a number
addNumber = (number) => {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
};

operationSelection = (operate) => {
  if (currentOperandText === "") return;
  if (prevOperandText !== "") {
    calculatorOperation();
  }
  operation = operate;
  prevOperand = currentOperand;
  currentOperand = "";
};

calculatorOperation = () => {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "×":
      result = prev * current;
      break;

    case "/":
      if (current === 0) {
        shakeCalculator();
        return;
      }
      result = prev / current;
      break;

    default:
      return;
  }

  currentOperand = result;
  operation = undefined;
  prevOperand = "";
  prevOperandText.innerText = "";
};

displayNum = () => {
  if (currentOperand === "") {
    currentOperandText.innerText = "0";
  } else {
    currentOperandText.innerText = currentOperand.toLocaleString("en");
  }

  if (operation !== undefined) {
    prevOperandText.innerText = `${prevOperand} ${operation.toString("en")}`;
  } else {
    prevOperandText.innerText = prevOperand;
  }
};

//add shake function
shakeCalculator = () => {
  const calculator = document.querySelector(".calculator"); 
  calculator.classList.add("shake");
  setTimeout(() => {
    calculator.classList.remove("shake");
  }, 1000); 
};



//add event listeners
toggleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    themeChange(btn.value);
  });
});

resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});

deleteBtn.addEventListener("click", () => {
  deleteOperand();
  displayNum();
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    addNumber(operand.innerText);
    displayNum();
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    operationSelection(btn.innerText);
    displayNum();
  });
});

resultBtn.addEventListener("click", () => {
  calculatorOperation();
  displayNum();
});

// add event listener for keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  switch (key) {
    case "Backspace":
      deleteOperand();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      operationSelection(key);
      break;
    case "Enter":
      calculatorOperation();
      break;
    case "Escape":
      reset();
      break;
    default:
      if (!isNaN(key) || key === ".") {
        addNumber(key);
      }
      break;
  }

  displayNum();
});
