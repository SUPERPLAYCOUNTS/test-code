document.addEventListener('DOMContentLoaded', () => {
    const startValueInput = document.getElementById('startValue');
    const endValueInput = document.getElementById('endValue');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const slider = document.getElementById('slider');
    const sliderValuePercentageDisplay = document.getElementById('sliderValuePercentage');
    const currentValueDisplay = document.getElementById('currentValue');
    const currentDateDisplay = document.getElementById('currentDate');

    function updateOutput() {
        const startValue = parseFloat(startValueInput.value) || 0;
        const endValue = parseFloat(endValueInput.value) || 0;
        const percentage = parseFloat(slider.value) / 100;

        if (sliderValuePercentageDisplay) {
            sliderValuePercentageDisplay.textContent = slider.value;
        }

        const currentValue = startValue + percentage * (endValue - startValue);
        currentValueDisplay.textContent = currentValue.toFixed(2);

        const startDateStr = startDateInput.value;
        const endDateStr = endDateInput.value;

        if (startDateStr && endDateStr) {
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);

            if (startDate <= endDate) {
                const totalTime = endDate.getTime() - startDate.getTime();
                if (!isNaN(totalTime) && isFinite(totalTime)) {
                    const currentTime = startDate.getTime() + percentage * totalTime;
                    const currentDate = new Date(currentTime);
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    currentDateDisplay.textContent = `${year}-${month}-${day}`;
                } else {
                    currentDateDisplay.textContent = '-';
                }
            } else {
                currentDateDisplay.textContent = 'Invalid date range';
            }
        } else {
            currentDateDisplay.textContent = '-';
        }
    }

    [startValueInput, endValueInput, startDateInput, endDateInput, slider].forEach(inputElement => {
        if (inputElement) {
            inputElement.addEventListener('input', updateOutput);
        }
    });
    updateOutput();
});