const rates = {
    USD: 1.00,
    JPY: 149.34,
    INR: 84.07
};

const symbols = {
    USD: '$',
    JPY: '¥',
    INR: '₹'
};

const billTotal = document.getElementById('billTotal');
const currencySelect = document.getElementById('currencySelect');
const tipSlider = document.getElementById('tipSlider');
const tipPercentage = document.getElementById('tipPercentage');
const convertedTip = document.getElementById('convertedTip');
const convertedTotal = document.getElementById('convertedTotal');

function calculateTip() {
    const bill = parseFloat(billTotal.value) || 0;
    const tipPercent = parseInt(tipSlider.value) || 0;
    const selectedCurrency = currencySelect.value;
    const rate = rates[selectedCurrency];
    const symbol = symbols[selectedCurrency];

    const tipAmount = bill * (tipPercent / 100);
    const totalBill = bill + tipAmount;

    const convertedTipAmount = tipAmount * rate;
    const convertedTotalAmount = totalBill * rate;

    tipPercentage.textContent = `${tipPercent}%`;
    
    if (selectedCurrency === 'JPY') {
        convertedTip.textContent = `${symbol} ${Math.round(convertedTipAmount)}`;
        convertedTotal.textContent = `${symbol} ${Math.round(convertedTotalAmount)}`;
    } else {
        convertedTip.textContent = `${symbol} ${convertedTipAmount.toFixed(2)}`;
        convertedTotal.textContent = `${symbol} ${convertedTotalAmount.toFixed(2)}`;
    }
}

// Add input validation
billTotal.addEventListener('input', function(e) {
    if (e.target.value < 0) e.target.value = 0;
});

billTotal.addEventListener('input', calculateTip);
currencySelect.addEventListener('change', calculateTip);
tipSlider.addEventListener('input', calculateTip);

// Initial calculation
calculateTip();