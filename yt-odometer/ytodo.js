const mainOdometerElement = document.getElementById('main');
let currentSubCount = 0;

const channelId = window.location.href.split('?')[1] || 'UCX6OQ3DkcsbYNE6H8uQQuVA';
const apiUrl = 'https://mixerno.space/api/youtube-channel-counter/user/';

function getSubscriberCount() {
    fetch(apiUrl + channelId)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data && data.counts && data.counts[0] && typeof data.counts[0].count !== 'undefined') {
                const newSubCount = parseInt(data.counts[0].count, 10);
                if (newSubCount !== currentSubCount) {
                    currentSubCount = newSubCount;
                    if (mainOdometerElement) {
                        mainOdometerElement.innerHTML = currentSubCount;
                    }
                }
            } else {
                console.error('Unexpected data structure from API:', data);
                if (mainOdometerElement) mainOdometerElement.innerHTML = "Error";
            }
        })
        .catch(error => {
            console.error('Error fetching subscriber count:', error);
            if (mainOdometerElement) mainOdometerElement.innerHTML = "N/A";
        });
}

getSubscriberCount();

setInterval(getSubscriberCount, 2500);