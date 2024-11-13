const billInputElement = document.querySelector(".input-bill");
const peopleInputElement = document.querySelector(".input-people");
const tipAmountElement = document.getElementById("tip-per-person");
const totalAmountElement = document.getElementById("total-per-person");
const tipOptions = document.querySelectorAll(".tip-option");
const customTipInputElement = document.getElementById("tip-custom-input");
const resetButton = document.querySelector(".reset-button");  
const errorMessage = document.querySelector(".error-message");

billInputElement.addEventListener("input", updateBillAmount);
peopleInputElement.addEventListener("input", validatePeopleInput);
tipOptions.forEach(option => option.addEventListener("click", selectTipOption));
customTipInputElement.addEventListener("input", setCustomTip);
resetButton.addEventListener("click", resetCalculator);

let billAmount = 0.0;
let numberOfPeople = 1;
let tipPercentage = 0.15;

function updateBillAmount() {
  billAmount = parseFloat(billInputElement.value) || 0;
  calculateAndDisplay();
}

function calculateAndDisplay() {
  if (numberOfPeople >= 1) {
    let tipAmount = (billAmount * tipPercentage) / numberOfPeople;
    let totalAmount = (billAmount * (1 + tipPercentage)) / numberOfPeople;
    tipAmountElement.textContent = "$" + tipAmount.toFixed(2);
    totalAmountElement.textContent = "$" + totalAmount.toFixed(2);
  }
}

function selectTipOption(event) {
  tipOptions.forEach(option => option.classList.remove("active-option"));
  event.target.classList.add("active-option");
  tipPercentage = parseFloat(event.target.textContent) / 100;
  customTipInputElement.value = ""; // Reset custom tip input
  calculateAndDisplay();
}

function setCustomTip() {
  tipPercentage = parseFloat(customTipInputElement.value) / 100 || 0;
  tipOptions.forEach(option => option.classList.remove("active-option"));
  calculateAndDisplay();
}

function validatePeopleInput() {
  numberOfPeople = parseFloat(peopleInputElement.value);
  if (numberOfPeople < 1) {
    errorMessage.style.display = "block";
    peopleInputElement.style.border = "thick solid red";
  } else {
    errorMessage.style.display = "none";
    peopleInputElement.style.border = "none";
    calculateAndDisplay();
  }
}

function resetCalculator() {
  billInputElement.value = "0.0";
  peopleInputElement.value = "1";
  customTipInputElement.value = "";
  tipOptions.forEach(option => option.classList.remove("active-option"));
  tipOptions[2].classList.add("active-option");
  tipPercentage = 0.15;
  billAmount = 0.0;
  numberOfPeople = 1;
  tipAmountElement.textContent = "$0.00";
  totalAmountElement.textContent = "$0.00";
}

billInputElement.value = "0.0";
tipAmountElement.textContent = "$0.00";
totalAmountElement.textContent = "$0.00";
