document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tipCalculator');
    const billTotalInput = document.getElementById('billTotal');
    const tipSlider = document.getElementById('tipSlider');
    const tipInput = document.getElementById('tipInput');
    const tipPercentageInput = document.getElementById('tipPercentage');
    const tipAmountInput = document.getElementById('tipAmount');
    const totalWithTipInput = document.getElementById('totalWithTip');
    const currencySelect = document.getElementById('currency');
    const errorMessage = document.getElementById('errorMessage');

    // Exchange rates (1 USD to other currencies)
    const exchangeRates = {
        USD: 1,
        EUR: 0.93,
        GBP: 0.82,
        JPY: 149.34,
        INR: 84.07
    };

    // Currency symbols
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        INR: '₹'
    };

    // Function to validate bill amount
    function isValidBillAmount(value) {
        return !isNaN(value) && value >= 0;
    }

    // Function to format currency
    function formatCurrency(amount, currency) {
        const symbol = currencySymbols[currency];
        const converted = amount * exchangeRates[currency];
        
        // Handle JPY differently (no decimal places)
        if (currency === 'JPY') {
            return `${symbol}${Math.round(converted)}`;
        }
        
        return `${symbol}${converted.toFixed(2)}`;
    }

    // Function to calculate tip
    function calculateTip() {
        const billAmount = parseFloat(billTotalInput.value);
        const tipPercentage = parseFloat(tipInput.value);
        const selectedCurrency = currencySelect.value;

        console.log("Bill Amount:", billAmount);
        console.log("Tip Percentage:", tipPercentage);
        console.log("Selected Currency:", selectedCurrency);

        if (!isValidBillAmount(billAmount)) {
            errorMessage.textContent = 'Please enter a valid positive number';
            tipPercentageInput.value = '';
            tipAmountInput.value = '';
            totalWithTipInput.value = '';
            return;
        }

        errorMessage.textContent = '';
        
        // Update tip percentage display
        tipPercentageInput.value = `${tipPercentage}%`;

        // Calculate tip amount
        const tipAmount = billAmount * (tipPercentage / 100);
        console.log("Calculated Tip Amount:", tipAmount);

        tipAmountInput.value = formatCurrency(tipAmount, selectedCurrency);

        // Calculate total with tip
        const totalWithTip = billAmount + tipAmount;
        console.log("Total with Tip:", totalWithTip);

        totalWithTipInput.value = formatCurrency(totalWithTip, selectedCurrency);
    }

    // Sync tip slider and number input
    function syncTipInputs(value) {
        tipSlider.value = value;
        tipInput.value = value;
        calculateTip();
    }

    // Event listeners
    tipSlider.addEventListener('input', () => syncTipInputs(tipSlider.value));
    tipInput.addEventListener('input', () => {
        let value = parseFloat(tipInput.value);
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        syncTipInputs(value);
    });

    billTotalInput.addEventListener('input', calculateTip);
    currencySelect.addEventListener('change', calculateTip);

    // Initial calculation
    calculateTip();
});
