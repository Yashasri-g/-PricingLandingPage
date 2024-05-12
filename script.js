// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to the currency and unit select elements
    document.getElementById('currency').addEventListener('change', updatePrices);
    document.getElementById('unit').addEventListener('change', updatePrices);

    // Initial update to set the default values correctly on page load
    updatePrices();
});

function updatePrices() {
    var currency = document.getElementById('currency').value;
    var unit = document.getElementById('unit').value;
    var priceElements = document.querySelectorAll('.plan p[data-base-price]');

    priceElements.forEach(function(priceElement) {
        var basePrice = priceElement.getAttribute('data-base-price');
        if (basePrice !== "Custom") {
            var monthlyPriceUSD = parseFloat(basePrice);
            var convertedPrice = convertCurrency(monthlyPriceUSD, currency);
            var finalPrice = unit === 'year' ? convertedPrice * 12 : convertedPrice; // Adjust price if the unit is 'year'
            var symbol = getCurrencySymbol(currency);
            priceElement.textContent = `${symbol}${finalPrice.toFixed(2)}/${unit}`;
        }
    });
}

function convertCurrency(amount, currency) {
    // Exchange rates relative to USD; update these as needed or fetch dynamically if possible
    const rates = { USD: 1, EUR: 0.91, GBP: 0.77 };
    return amount * rates[currency];
}

function getCurrencySymbol(currency) {
    // Map of currency codes to currency symbols
    const symbols = {
        USD: '$',
        EUR: '€',
        GBP: '£'
    };
    return symbols[currency];
}
