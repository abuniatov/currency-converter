"use strict";

  // Function to render the currency rates grid
  const renderRatesGrid = (gridId, rates) => {
    const ratesGrid = document.getElementById(gridId);
    ratesGrid.innerHTML = "";
    rates.forEach((rate) => {
      const rateItem = document.createElement("div");
      rateItem.className = "rate-item";
      rateItem.innerHTML = `
      <h3>${rate.base || "N/A"} to ${rate.target || "N/A"}</h3>
      <p>Rate: ${rate.rate || "N/A"}</p>
    `;
      ratesGrid.appendChild(rateItem);
    });
  };

  // Function to insert a new currency rate (Base and Target)
  const insertRate = (event, currencyRates) => {
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
    const existingRates = searchRate(currencyRates, baseCurrency, targetCurrency);
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
  const convertCurrency = (event, currencyRates) => {
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
    const rates = searchRate(currencyRates, fromCurrency, toCurrency);
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
  const updateRate = (event, currencyRates) => {
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
  const searchRate = (ratesArray, baseCurrency, targetCurrency) => {
    let results = [];
    if (baseCurrency && targetCurrency) {
      results = ratesArray.filter(
        (rate) => rate.base === baseCurrency && rate.target === targetCurrency
      );
    } else if (baseCurrency) {
      results = ratesArray.filter((rate) => rate.base === baseCurrency);
    } else if (targetCurrency) {
      results = ratesArray.filter((rate) => rate.target === targetCurrency);
    }
    return results;
  };

  // Function to handle the search form submission
  const handleSearch = (event, currencyRates) => {
    event.preventDefault();
    const baseCurrency = document
      .getElementById("searchBaseCurrency")
      .value.toUpperCase()
      .trim();
    const targetCurrency = document
      .getElementById("searchTargetCurrency")
      .value.toUpperCase()
      .trim();

    const results = searchRate(currencyRates, baseCurrency, targetCurrency);
    if (results.length > 0) {
      document.getElementById("searchResult").innerHTML = results
        .map((rate) => `${rate.base} to ${rate.target}: ${rate.rate}`)
        .join("<br>");
    } else {
      document.getElementById("searchResult").textContent = "No rates found.";
    }
  };

  // Function to show market announcement
  const showMarketAnnouncement = (message) => {
    const marketAnnouncement = document.getElementById("marketAnnouncement");
    marketAnnouncement.textContent = message;
    console.log(message);
  };

  // Function to get the next occurrence of a specific time
  const getNextOccurrence = (hour) => {
    const now = new Date();
    const nextOccurrence = new Date();
    nextOccurrence.setHours(hour, 0, 0, 0);

    if (now >= nextOccurrence) {
      nextOccurrence.setDate(now.getDate() + 1);
    }

    return nextOccurrence;
  };

  // Function to calculate the remaining time until the next occurrence
  const calculateRemainingTime = (targetTime) => {
    const now = new Date();
    const timeDifference = targetTime - now;
    const hours = Math.floor((timeDifference % 86400000) / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);
    return { hours, minutes, seconds };
  };

  // Function to update the market status
  const updateMarketStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const marketAnnouncement = document.getElementById("marketAnnouncement");

    if (currentHour >= 9 && currentHour < 17) {
      marketAnnouncement.textContent = "The market is now open!";
    } else {
      marketAnnouncement.textContent = "The market is now closed!";
    }
  };

  // Function to update the countdown timer
  const updateCountdownTimer = () => {
    const countdownElement = document.getElementById("countdownTimer");
    const nextMarketOpen = getNextOccurrence(9);
    const nextMarketClose = getNextOccurrence(17);
    const now = new Date();

    let targetTime;
    let message;

    if (now.getHours() >= 9 && now.getHours() < 17) {
      targetTime = nextMarketClose;
      message = "Time until market closes: ";
    } else {
      targetTime = nextMarketOpen;
      message = "Time until market opens: ";
    }

    const { hours, minutes, seconds } = calculateRemainingTime(targetTime);

    countdownElement.textContent = `${message} ${hours}h ${minutes}m ${seconds}s`;

    updateMarketStatus();
  };

  // Function to set market announcement timers
  const setMarketAnnouncementTimers = () => {
    // Update the countdown timer immediately
    updateCountdownTimer();

    // Update the countdown timer every second
    setInterval(updateCountdownTimer, 1000);
  };

// Function to initialize the application with the fetched data
const initializeApp = (currencyRates) => {
  document.getElementById("newRateForm").addEventListener("submit", (event) => insertRate(event, currencyRates));
  document.getElementById("convertForm").addEventListener("submit", (event) => convertCurrency(event, currencyRates));
  document.getElementById("updateRateForm").addEventListener("submit", (event) => updateRate(event, currencyRates));
  document.getElementById("searchForm").addEventListener("submit", (event) => handleSearch(event, currencyRates));

  renderRatesGrid("ratesGrid", currencyRates);
  setMarketAnnouncementTimers();
};

// Function to fetch data from the API and initialize the application
async function getData() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/abuniatov/abuniatov.github.io/main/data/currency-rates.json");
    const currencyRates = await response.json();

    initializeApp(currencyRates);
  } catch (error) {
    console.error("Error fetching currency rates data:", error);
  }
}

// Call the getData function to fetch data and initialize the application
getData();