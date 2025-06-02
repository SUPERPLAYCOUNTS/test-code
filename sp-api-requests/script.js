const odometerElement = document.getElementById('odometer');
const apiUrl = 'https://api-superplaycounts.onrender.com/api/requests';

let previousValue = 0;

async function fetchDataAndUpdateOdometer() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.totalapirequests) {
            const newValue = data.totalapirequests;

            if (newValue > previousValue) {
                odometerElement.style.color = window.odometerOptions.upColor;
            } else if (newValue < previousValue) {
                odometerElement.style.color = window.odometerOptions.downColor;
            }

            odometerElement.innerHTML = newValue;
            previousValue = newValue;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

setInterval(fetchDataAndUpdateOdometer, 4000);
fetchDataAndUpdateOdometer();