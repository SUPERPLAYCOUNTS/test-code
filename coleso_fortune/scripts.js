const wheel = document.querySelector('.wheel');
const spinBtn = document.querySelector('.spinBtn');
const wheelInputs = document.getElementById('wheelInputs');
const updateWheelBtn = document.getElementById('updateWheelBtn');

let currentRotation = 0;
let currentWheelItems = [];
const defaultColors = ["#db7093", "#20b2aa", "#d63e92", "#daa520", "#ff340f", "#ff7f50", "#3cb371", "#4169e1"];
const SPIN_DURATION = 5000;

function generateWheel(items) {
    wheel.innerHTML = '';
    currentWheelItems = items.map(item => item.trim()).filter(item => item !== "");

    if (currentWheelItems.length === 0) {
        const emptySegment = document.createElement('div');
        emptySegment.classList.add('number');
        emptySegment.style.setProperty('--clr', '#cccccc');
        emptySegment.style.transform = `rotate(0deg)`; 
        const span = document.createElement('span');
        span.textContent = 'Пусто';
        emptySegment.appendChild(span);
        wheel.appendChild(emptySegment);
        return;
    }

    const numSegments = currentWheelItems.length;
    const segmentAngle = 360 / numSegments;

    currentWheelItems.forEach((text, index) => {
        const segment = document.createElement('div');
        segment.classList.add('number');
        
        segment.style.setProperty('--clr', defaultColors[index % defaultColors.length]);
        
        segment.style.setProperty('--i', index + 1); 
        segment.style.transform = `rotate(${segmentAngle * index}deg)`;
        
        if (numSegments !== 8) {
            const clipAngle = segmentAngle / 2;
        }


        const span = document.createElement('span');
        span.textContent = text;
        span.style.transform = `rotate(${segmentAngle / 2}deg)`; 
        if (text.length > 8) {
            span.style.fontSize = "1em";
        }
         if (text.length > 12) {
            span.style.fontSize = "0.8em";
        }


        segment.appendChild(span);
        wheel.appendChild(segment);
    });
}

spinBtn.onclick = function() {
    if (currentWheelItems.length === 0) {
        alert("The wheel is empty! Add values.");
        return;
    }
    if (spinBtn.disabled) return;

    spinBtn.disabled = true;
    spinBtn.style.pointerEvents = 'none';

    const numSegments = currentWheelItems.length;
    const segmentAngle = 360 / numSegments;

    const randomIndex = Math.floor(Math.random() * numSegments);
    const winningValue = currentWheelItems[randomIndex];

    const angleToCenterOfWinningSegment = (randomIndex * segmentAngle) + (segmentAngle / 2);
    
    const randomSpins = (Math.floor(Math.random() * 5) + 5) * 360;
    
    let desiredRotation = -angleToCenterOfWinningSegment + (segmentAngle/2);

    currentRotation += randomSpins + desiredRotation;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        spinBtn.disabled = false;
        spinBtn.style.pointerEvents = 'auto';
    }, SPIN_DURATION);
}

updateWheelBtn.onclick = function() {
    const inputText = wheelInputs.value;
    const itemsArray = inputText.split(',').map(item => item.trim()).filter(item => item);
    if (itemsArray.length > 0) {
        generateWheel(itemsArray);
    } else {
        generateWheel([]);
        alert("Please enter at least one value.");
    }
}

generateWheel(wheelInputs.value.split(','));