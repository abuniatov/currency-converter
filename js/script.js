"use strict";

// Global array to store currency rates
const currencyRates = [];

// Function to find a rate
const findRate = (base, target) => {
  return currencyRates.find(
    (rate) => rate.base === base && rate.target === target
  );
};

// Function to render the currency rates grid
const renderRatesGrid = (gridId, rates) => {
  const ratesGrid = document.getElementById(gridId);
  ratesGrid.innerHTML = "";
  rates.forEach((rate) => {
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

  // Check if the rate already exists
  const existingRate = findRate(baseCurrency, targetCurrency);
  if (existingRate) {
    alert("Rate already exists. Please use the update form to modify it.");
    return;
  }

  // Add the new rate to the currencyRates array
  currencyRates.push({
    base: baseCurrency,
    target: targetCurrency,
    rate: rate,
  });
  console.log("Rate inserted:");
  console.log(currencyRates);

  // Render the updated rates grid
  renderRatesGrid("ratesGrid", currencyRates);
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

  //  Finding the existing rate
  const rateIndex = currencyRates.findIndex(
    (rate) => rate.base === baseCurrency && rate.target === targetCurrency
  );

  if (rateIndex !== -1) {
    currencyRates[rateIndex].rate = newRate;
    console.log("Rate updated:");
    console.log(currencyRates);

    // Rendering the updated rates grid
    renderRatesGrid("ratesGrid", currencyRates);
  } else {
    alert("Rate for the specified currencies not found.");
  }
};

// Function to search for a currency rate based on base and/or target currency
const searchRate = (baseCurrency, targetCurrency) => {
  let results = [];
  if (baseCurrency && targetCurrency) {
    results = currencyRates.filter(
      (rate) => rate.base === baseCurrency && rate.target === targetCurrency
    );
  } else if (baseCurrency) {
    results = currencyRates.filter((rate) => rate.base === baseCurrency);
  } else if (targetCurrency) {
    results = currencyRates.filter((rate) => rate.target === targetCurrency);
  }
  return results;
};

// Function to handle the search form submission
const handleSearch = (event) => {
  event.preventDefault();
  const baseCurrency = document
    .getElementById("searchBaseCurrency")
    .value.toUpperCase()
    .trim();
  const targetCurrency = document
    .getElementById("searchTargetCurrency")
    .value.toUpperCase()
    .trim();

  const results = searchRate(baseCurrency, targetCurrency);
  if (results.length > 0) {
    document.getElementById("searchResult").innerHTML = results
      .map((rate) => `${rate.base} to ${rate.target}: ${rate.rate}`)
      .join("<br>");
  } else {
    document.getElementById("searchResult").textContent = "No rates found.";
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
renderRatesGrid("ratesGrid", currencyRates);
