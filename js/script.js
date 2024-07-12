"use strict";

// Global object to store currency rates
const currencyRates = {
  timestamp: Date.now(),
  base: "EUR",
  date: new Date().toISOString().split("T")[0],
  rates: {},
};

// Function to insert a new currency rate (Base and Target)
const insertRate = (event) => {
  event.preventDefault();
  const baseCurrency = document
    .getElementById("baseCurrency")
    .value.toUpperCase();
  const targetCurrency = document
    .getElementById("targetCurrency")
    .value.toUpperCase();
  const rate = parseFloat(document.getElementById("rate").value);

  // Validation
  if (!baseCurrency || !targetCurrency || isNaN(rate)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Initialization of an object for baseCurrency if it does not exist
  if (!currencyRates.rates[baseCurrency]) {
    currencyRates.rates[baseCurrency] = {};
  }

  // Set the rate for the target currency within the base currency object
  currencyRates.rates[baseCurrency][targetCurrency] = rate;
  console.log("Rate inserted:");
  console.log(currencyRates);
};

// Function to convert a currency (From and To)
const convertCurrency = (event) => {
  event.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document
    .getElementById("fromCurrency")
    .value.toUpperCase();
  const toCurrency = document.getElementById("toCurrency").value.toUpperCase();

  // Validation
  if (isNaN(amount) || !fromCurrency || !toCurrency) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Conversion
  if (
    currencyRates.rates[fromCurrency] &&
    currencyRates.rates[fromCurrency][toCurrency]
  ) {
    const rate = currencyRates.rates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;
    document.getElementById(
      "conversionResult"
    ).textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
      2
    )} ${toCurrency}`;
    console.log("Conversion performed:");
    console.log({
      amount: amount,
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      convertedAmount: convertedAmount.toFixed(2),
    });
  } else {
    document.getElementById("conversionResult").textContent =
      "Rate not found for the specified conversion.";
    console.log(
      "Conversion error: Rate not found for",
      `${fromCurrency} to ${toCurrency}`
    );
  }
};

// Function to update an existing currency rate
const updateRate = (event) => {
  event.preventDefault();
  const baseCurrency = document
    .getElementById("updateBaseCurrency")
    .value.toUpperCase();
  const targetCurrency = document
    .getElementById("updateTargetCurrency")
    .value.toUpperCase();
  const newRate = parseFloat(document.getElementById("newRate").value);

  // Validation
  if (!baseCurrency || !targetCurrency || isNaN(newRate)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Updating the currency rate
  if (
    currencyRates.rates[baseCurrency] &&
    currencyRates.rates[baseCurrency][targetCurrency]
  ) {
    currencyRates.rates[baseCurrency][targetCurrency] = newRate;
    console.log("Rate updated:");
    console.log(currencyRates);
  } else {
    alert("Rate not found for the specified currencies.");
  }
};

document.getElementById("newRateForm").addEventListener("submit", insertRate);
document
  .getElementById("convertForm")
  .addEventListener("submit", convertCurrency);
document
  .getElementById("updateRateForm")
  .addEventListener("submit", updateRate);
