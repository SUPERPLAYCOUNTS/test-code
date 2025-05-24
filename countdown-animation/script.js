const targetDate = new Date("2035-01-01T00:00:00").getTime();

let digitPixelHeight = 0;
let intervalId = null;
const digitStates = new Map();

function setupDigits() {
    const digitElements = document.querySelectorAll('.digit');
    if (digitElements.length === 0) {
        console.error("No .digit elements found for configuration.");
        return false;
    }

    const firstDigitComputedStyle = window.getComputedStyle(digitElements[0]);
    digitPixelHeight = parseFloat(firstDigitComputedStyle.height);

    if (!digitPixelHeight || digitPixelHeight <= 0) {
        console.error("Failed to determine the height of the digit (digitPixelHeight). Check CSS: .digit height and font-size.");
        const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
        const digitCssFontSize = getComputedStyle(document.documentElement).getPropertyValue('--digit-font-size').trim();
        const digitCssHeight = getComputedStyle(document.documentElement).getPropertyValue('--digit-height').trim();

        if (digitCssFontSize.endsWith('em') && digitCssHeight.endsWith('em')) {
            const digitEmSize = parseFloat(digitCssFontSize);
            const digitHeightEmFactor = parseFloat(digitCssHeight);
            const digitActualFontSize = digitEmSize * rootFontSize;
            digitPixelHeight = digitHeightEmFactor * digitActualFontSize;
            console.warn(`The height of the digit is approximately calculated using CSS variables. ${digitPixelHeight}px`);
        }
        if (!digitPixelHeight || digitPixelHeight <= 0) {
            console.error("The backup calculation of the height also failed. The timer animation is not possible.");
            return false;
        }
    }

    digitElements.forEach(digit => {
        if (digit.querySelector('.digit-roller')) {
            digit.innerHTML = '';
        }
        const roller = document.createElement('div');
        roller.className = 'digit-roller';


        const prev9 = document.createElement('span');
        prev9.className = 'num';
        prev9.textContent = '9';
        roller.appendChild(prev9);

        for (let i = 0; i < 10; i++) {
            const numSpan = document.createElement('span');
            numSpan.className = 'num';
            numSpan.textContent = i;
            roller.appendChild(numSpan);
        }

        const next0 = document.createElement('span');
        next0.className = 'num';
        next0.textContent = '0';
        roller.appendChild(next0);

        digit.appendChild(roller);

        digitStates.set(digit, { currentValue: -1, isAnimating: false, transitionEndHandler: null });
    });
    return true;
}

function updateDigit(digitElement, newLogicalNumber) {
    const roller = digitElement.querySelector('.digit-roller');
    if (!roller) {
        console.error("Element .digit-roller not found for:", digitElement);
        return;
    }
    if (isNaN(newLogicalNumber) || newLogicalNumber < 0 || newLogicalNumber > 9) {
        console.warn(`Incorrect value for the digit (${newLogicalNumber}). Set to 0.`);
        newLogicalNumber = 0;
    }
    if (!digitPixelHeight || digitPixelHeight <= 0) {
        console.error("Incorrect value for digitPixelHeight; animation is not possible.");
        return;
    }

    let state = digitStates.get(digitElement);
    if (!state) {
        console.error("State for the digit not found, reinitialization.", digitElement);
        state = { currentValue: -1, isAnimating: false, transitionEndHandler: null };
        digitStates.set(digitElement, state);
    }

    const previousVisualNumber = state.currentValue;

    if (previousVisualNumber === newLogicalNumber && previousVisualNumber !== -1) {
        return;
    }

    if (state.isAnimating && state.transitionEndHandler) {
        roller.removeEventListener('transitionend', state.transitionEndHandler);
        roller.removeEventListener('transitioncancel', state.transitionEndHandler);
    }
    state.isAnimating = true;

    let targetTransformY;
    const isInitialCall = previousVisualNumber === -1;


    if (isInitialCall) {
        targetTransformY = -(newLogicalNumber + 1) * digitPixelHeight;
        roller.style.transition = 'none';
        roller.style.transform = `translateY(${targetTransformY}px)`;
        roller.offsetHeight;
        roller.style.transition = '';
        state.currentValue = newLogicalNumber;
        state.isAnimating = false;
        return;
    }

    if (previousVisualNumber === 0 && newLogicalNumber === 9) {
        targetTransformY = 0;
    } else if (previousVisualNumber === 9 && newLogicalNumber === 0) {
        targetTransformY = -(11 * digitPixelHeight);
    } else {
        targetTransformY = -(newLogicalNumber + 1) * digitPixelHeight;
    }

    roller.style.transform = `translateY(${targetTransformY}px)`;

    state.transitionEndHandler = () => {
        roller.removeEventListener('transitionend', state.transitionEndHandler);
        roller.removeEventListener('transitioncancel', state.transitionEndHandler);

        let canonicalTranslateY;
        let needsSnap = false;

        if (previousVisualNumber === 0 && newLogicalNumber === 9) {
            canonicalTranslateY = -(newLogicalNumber + 1) * digitPixelHeight;
            needsSnap = true;
        } else if (previousVisualNumber === 9 && newLogicalNumber === 0) {
            canonicalTranslateY = -(newLogicalNumber + 1) * digitPixelHeight;
            needsSnap = true;
        }

        if (needsSnap) {
            roller.style.transition = 'none';
            roller.style.transform = `translateY(${canonicalTranslateY}px)`;
            roller.offsetHeight;
            roller.style.transition = '';
        }
        state.currentValue = newLogicalNumber;
        state.isAnimating = false;
    };
    roller.addEventListener('transitionend', state.transitionEndHandler);
    roller.addEventListener('transitioncancel', state.transitionEndHandler);
}

function updateDigitGroup(selector, newValue) {
    const digitSpansContainer = document.getElementById(selector);
    if (!digitSpansContainer) return;
    const digitSpans = digitSpansContainer.querySelectorAll('.digit');
    if (digitSpans.length === 0) return;

    const valueString = String(newValue).padStart(digitSpans.length, '0');

    for (let i = 0; i < digitSpans.length; i++) {
        const digitValue = i < valueString.length ? parseInt(valueString[i], 10) : 0;
        updateDigit(digitSpans[i], digitValue);
    }
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(intervalId);
        intervalId = null;
        console.log("The countdown is complete!");
        updateDigitGroup('days', 0);
        updateDigitGroup('hours', 0);
        updateDigitGroup('minutes', 0);
        updateDigitGroup('seconds', 0);
        const titleElement = document.querySelector('.countdown-title');
        if (titleElement) titleElement.textContent = "Event Started!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateDigitGroup('days', days);
    updateDigitGroup('hours', hours);
    updateDigitGroup('minutes', minutes);
    updateDigitGroup('seconds', seconds);
}

document.addEventListener('DOMContentLoaded', () => {
    if (setupDigits()) {
        updateCountdown();
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(updateCountdown, 1000);
    } else {
        console.error("Failed to initialize the timer digits.");
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) countdownElement.innerHTML = "<p style='color:red;'>Error loading timer. Check the console.</p>";
    }
});