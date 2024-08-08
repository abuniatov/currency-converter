"use strict";

// Global array to store currency rates
const currencyRates = [];

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
  const existingRates = searchRate(baseCurrency, targetCurrency);
  if (existingRates.length > 0) {
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

  // Find the rate for conversion
  const rates = searchRate(fromCurrency, toCurrency);
  if (rates.length > 0) {
    const rate = rates[0].rate;
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

  // Find the existing rate
  const rateIndex = currencyRates.findIndex(
    (rate) => rate.base === baseCurrency && rate.target === targetCurrency
  );

  if (rateIndex !== -1) {
    currencyRates[rateIndex].rate = newRate;
    console.log("Rate updated:");
    console.log(currencyRates);

    // Render the updated rates grid
    renderRatesGrid("ratesGrid", currencyRates);
  } else {
    alert("Rate not found for the specified currencies.");
  }
};

// Function to search for currency rates based on base and/or target currency
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

// const calculateTimeDelay = (time) => {
//   const now = new Date();
//   const targetTime = new Date(time);
//   const delay = targetTime - now;
//   return delay;
// };

// Function to calculate time delay of a specific time
// const calculateDelay = (time) => {
//   const now = new Date();
//   const targetTime = new Date();

//   targetTime.setHours(time, 0, 0, 0);

//   if (now > targetTime) {
//     targetTime.setDate(now.getDate() + 1);
//   }

//   return targetTime - now;
// };

// Function to set market opening and closing times
// const setMarketTimes = () => {
//   const marketOpeningTime = 9;
//   const marketClosingTime = 17;

//   const openingDelay = calculateDelay(marketOpeningTime);
//   const closingDelay = calculateDelay(marketClosingTime);

//   setTimeout(() => {
//     document.getElementById("marketAnnouncement").textContent =
//       "Market is open!";
//   }, openingDelay);

//   setTimeout(() => {
//     document.getElementById("marketAnnouncement").textContent =
//       "Market is closed!";
//   }, closingDelay);
// };

// Function to show market announcement
const showMarketAnnouncement = (message) => {
  const marketAnnouncement = document.getElementById("marketAnnouncement");
  marketAnnouncement.textContent = message;
  console.log(message);
};

// Function to get the next occurance of a specific time
const getNextOccurrence = (hour) => {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(time, 0, 0, 0);

  if (now >= nextOccurrence) {
    nextOccurrence.setDate(now.getDate() + 1);
  }

  return nextOccurrence;
};

document.getElementById("newRateForm").addEventListener("submit", insertRate);
document
  .getElementById("convertForm")
  .addEventListener("submit", convertCurrency);
document
  .getElementById("updateRateForm")
  .addEventListener("submit", updateRate);
document.getElementById("searchForm").addEventListener("submit", handleSearch);

// Initial render of the rates grid
renderRatesGrid("ratesGrid", currencyRates);
