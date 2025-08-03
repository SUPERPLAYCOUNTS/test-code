document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://c94tmq-3000.csb.app/api/top';
    const UPDATE_INTERVAL_MS = 3000;
    const leftColumn = document.getElementById('column-left');
    const rightColumn = document.getElementById('column-right');

    const cardCache = {};

    async function fetchData() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`Network error`);
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch data:", error);
            return [];
        }
    }

    async function updateLeaderboard() {
        const initialPositions = {};
        Object.values(cardCache).forEach(info => {
            initialPositions[info.id] = info.element.getBoundingClientRect();
        });

        const data = await fetchData();
        const sortedData = data.sort((a, b) => b.clicks - a.clicks);
        
        sortedData.forEach((colorData, index) => {
            const rank = index + 1;
            const cardId = `card-${colorData.id}`;
            let cardInfo = cardCache[cardId];
            const targetColumn = rank <= 5 ? leftColumn : rightColumn;

            if (!cardInfo) {
                const cardElement = document.createElement('div');
                cardElement.id = cardId;
                cardElement.className = 'card';

                const rankNumber = document.createElement('div');
                rankNumber.className = 'rank-number';

                const odometerEl = document.createElement('div');
                odometerEl.className = 'odometer';

                cardElement.append(rankNumber, odometerEl);

                const odometerInstance = new Odometer({
                    el: odometerEl, theme: 'minimal', format: '(,ddd)'
                });

                cardInfo = cardCache[cardId] = {
                    id: cardId, element: cardElement, rankNumber, odometer: odometerInstance
                };
                
                targetColumn.appendChild(cardElement);
            }

            if (cardInfo.element.parentElement !== targetColumn) {
                targetColumn.appendChild(cardInfo.element);
            }

            const { element, rankNumber, odometer } = cardInfo;

            element.style.borderTopColor = colorData.hex;

            if (odometer.value !== 0 && odometer.value !== colorData.clicks) {
                element.style.setProperty('--glow-color', colorData.hex);
                element.classList.add('updated');
                setTimeout(() => element.classList.remove('updated'), 1000);
            }

            element.style.order = rank;
            rankNumber.textContent = rank;
            
            rankNumber.style.color = colorData.hex;

            odometer.update(colorData.clicks);
        });

        Object.values(cardCache).forEach(info => {
            const initialPos = initialPositions[info.id];
            if (!initialPos) return;

            const finalPos = info.element.getBoundingClientRect();
            const deltaY = initialPos.top - finalPos.top;
            
            if (Math.abs(deltaY) > 1) {
                info.element.style.transform = `translateY(${deltaY}px)`;
                info.element.style.transition = 'transform 0s';
                requestAnimationFrame(() => {
                    info.element.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
                    info.element.style.transform = 'translateY(0)';
                });
            }
        });
    }

    updateLeaderboard();
    setInterval(updateLeaderboard, UPDATE_INTERVAL_MS);
});
