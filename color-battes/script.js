async function fetchData(endpoint) {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
}

async function createCard(cardId, colorData, index) {
    const container = document.getElementById('cardContainer');
    const container2 = document.getElementById('cardContainer_2');

    const existingCard = document.getElementById(cardId);

    if (existingCard) {
        try {
            existingCard.style.backgroundColor = colorData.hex;
            const odometerValue = colorData.clicks;
            const odometerElement = existingCard.querySelector('.odometer');
            odometerElement.innerHTML = odometerValue;
            const od = new Odometer({
                el: odometerElement,
                value: odometerValue,
                theme: 'minimal',
                duration: 2000
            });
            od.update(odometerValue);
            existingCard.dataset.clicks = odometerValue;
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = cardId;

        const odometer = document.createElement('div');
        odometer.className = `odometer ${colorData.id}`;
        odometer.innerHTML = '0';

        const numContainer = document.createElement('div');
        numContainer.className = 'num-container';

        const num = document.createElement('div');
        num.className = 'num';
        num.id = `num_${index + 1}`;
        num.innerHTML = index + 1;
        numContainer.appendChild(num);

        card.appendChild(odometer);
        card.appendChild(numContainer);

        if (container.children.length < 5) {
            container.appendChild(card);
        } else {
            container2.appendChild(card);
        }

        try {
            card.style.backgroundColor = colorData.hex;
            const odometerValue = colorData.clicks;
            const od = new Odometer({
                el: odometer,
                value: odometerValue,
                theme: 'minimal',
                duration: 2000
            });
            od.update(odometerValue);
            card.dataset.clicks = odometerValue;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

async function fetchDataAndCreateCards() {
    try {
        const data = await fetchData('https://color-battles.up.railway.app/api/top');
        data.forEach((color, index) => {
            createCard(`card_${color.id}`, color, index);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndCreateCards();
setInterval(fetchDataAndCreateCards, 3000);
