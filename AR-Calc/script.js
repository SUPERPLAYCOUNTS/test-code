const formatSelect = document.getElementById('formatSelect');
const dimensionInput = document.getElementById('dimensionInput');
const dimensionTypeSelect = document.getElementById('dimensionType');
const outputText = document.getElementById('outputText');

function calculateDimensions() {
    const dimensionValue = parseInt(dimensionInput.value);
    const selectedFormat = formatSelect.value;
    const type = dimensionTypeSelect.value;

    if (isNaN(dimensionValue) || dimensionValue <= 0) {
        outputText.textContent = 'Please enter a valid positive number for the dimension.';
        return;
    }

    const parts = selectedFormat.split(':');
    const aspectWidth = parseFloat(parts[0]);
    const aspectHeight = parseFloat(parts[1]);

    let calculatedWidth, calculatedHeight;

    if (type === 'height') {
        calculatedHeight = dimensionValue;
        calculatedWidth = Math.round((dimensionValue * aspectWidth) / aspectHeight);
    } else {
        calculatedWidth = dimensionValue;
        calculatedHeight = Math.round((dimensionValue * aspectHeight) / aspectWidth);
    }

    if (isNaN(calculatedWidth) || isNaN(calculatedHeight)) {
        outputText.textContent = 'Error in calculation. Check format.';
        return;
    }

    outputText.textContent = `For ${selectedFormat} ratio: ${calculatedWidth}x${calculatedHeight}`;
}

dimensionInput.addEventListener('input', calculateDimensions);
formatSelect.addEventListener('change', calculateDimensions);
dimensionTypeSelect.addEventListener('change', calculateDimensions);

if (!dimensionInput.value) {
    outputText.textContent = 'Enter a dimension and select format...';
} else {
    calculateDimensions();
}