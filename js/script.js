"use strict";

// Global object to store currency rates
// const currencyRates = {
//   timestamp: Date.now(),
//   base: "EUR",
//   date: new Date().toISOString().split("T")[0],
//   rates: {},
// };

// Global array to store currency rates
const currencyRates = [];

// Function to find a rate
const findRate = (base, target) => {
  return currencyRates.find(
    (rate) => rate.base === base && rate.target === target
  );
};

// Function to render the currency rates grid
const renderRatesGrid = () => {
  const ratesGrid = document.getElementById("ratesGrid");
  ratesGrid.innerHTML = "";
  currencyRates.forEach((rate) => {
    const rateItem = document.createElement("div");
    rateItem.className = "rate-item";
    rateItem.innerHTML = `
      <h3>${rate.base} to ${rate.target}</h3>
      <p>Rate: ${rate.rate}</p>
    `;
    ratesGrid.appendChild(rateItem);
  });
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
  const rate = parseFloat(document.getElementById("rate").value.trim());

  // Validation
  if (!baseCurrency || !targetCurrency || isNaN(rate)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Initialization of an object for baseCurrency if it does not exist
  // if (!currencyRates.rates[baseCurrency]) {
  //   currencyRates.rates[baseCurrency] = {};
  // }

  // Check if the rate already exists
  const existingRate = findRate(baseCurrency, targetCurrency);
  if (existingRate) {
    alert("Rate already exists. Please use the update form to modify it.");
    return;
  }

  // Set the rate for the target currency within the base currency object
  //   currencyRates.rates[baseCurrency][targetCurrency] = rate;
  //   console.log("Rate inserted:");
  //   console.log(currencyRates);
  // };

  // Add the new rate to the currencyRates array
  currencyRates.push({
    base: baseCurrency,
    target: targetCurrency,
    rate: rate,
  });
  console.log("Rate inserted:");
  console.log(currencyRates);

  // Render the updated rates grid
  renderRatesGrid();
};

// Function to convert a currency (From and To)
const convertCurrency = (event) => {
  event.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value.trim());
  const fromCurrency = document
    .getElementById("fromCurrency")
    .value.toUpperCase()
    .trim();
  const toCurrency = document
    .getElementById("toCurrency")
    .value.toUpperCase()
    .trim();

  // Validation
  if (isNaN(amount) || !fromCurrency || !toCurrency) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Conversion
//   if (
//     currencyRates.rates[fromCurrency] &&
//     currencyRates.rates[fromCurrency][toCurrency]
//   ) {
//     const rate = currencyRates.rates[fromCurrency][toCurrency];
//     const convertedAmount = amount * rate;
//     document.getElementById(
//       "conversionResult"
//     ).textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
//       2
//     )} ${toCurrency}`;
//     console.log("Conversion performed:");
//     console.log({
//       amount: amount,
//       fromCurrency: fromCurrency,
//       toCurrency: toCurrency,
//       convertedAmount: convertedAmount.toFixed(2),
//     });
//   } else {
//     document.getElementById("conversionResult").textContent =
//       "Rate not found for the specified conversion.";
//     console.log(
//       "Conversion error: Rate not found for",
//       `${fromCurrency} to ${toCurrency}`
//     );
//   }
// };

// Finding the rate for conversion
const rate = findRate(fromCurrency, toCurrency);
if (rate) {
  const convertedAmount = amount * rate.rate;
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
    "Rate for the specified conversion not found.";
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
    .value.toUpperCase()
    .trim();
  const targetCurrency = document
    .getElementById("updateTargetCurrency")
    .value.toUpperCase()
    .trim();
  const newRate = parseFloat(document.getElementById("newRate").value.trim());

  // Validation
  if (!baseCurrency || !targetCurrency || isNaN(newRate)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Updating the currency rate
//   if (
//     currencyRates.rates[baseCurrency] &&
//     currencyRates.rates[baseCurrency][targetCurrency]
//   ) {
//     currencyRates.rates[baseCurrency][targetCurrency] = newRate;
//     console.log("Rate updated:");
//     console.log(currencyRates);
//   } else {
//     alert("Rate not found for the specified currencies.");
//   }
// };

//  Finding the existing rate
const rateIndex = currencyRates.findIndex(
  (rate) => rate.base === baseCurrency && rate.target === targetCurrency
);

if (rateIndex !== -1) {
  currencyRates[rateIndex].rate = newRate;
  console.log("Rate updated:");
  console.log(currencyRates);

// Rendering the updated rates grid
renderRatesGrid();
} else {
  alert("Rate for the specified currencies not found.");
}
};

document.getElementById("newRateForm").addEventListener("submit", insertRate);
document
  .getElementById("convertForm")
  .addEventListener("submit", convertCurrency);
document
  .getElementById("updateRateForm")
  .addEventListener("submit", updateRate);

// Initial rendering of the rates grid
renderRatesGrid();