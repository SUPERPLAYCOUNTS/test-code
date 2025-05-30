async function fetchData() {
    try {
        const response = await fetch('https://api.superplaycounts.pp.ua/api/gc-user-counter/v8/clicks');
        const data = await response.json();

        const bannerElement = document.getElementById('banner');
        bannerElement.style.backgroundImage = `url(${data.user.find(item => item.value === "banner").count})`;

        const avatarElement = document.getElementById('avatar');
        avatarElement.src = data.user.find(item => item.value === "pfp").count;

        const nameElement = document.getElementById('name');
        nameElement.textContent = data.user.find(item => item.value === "name").count;

        const counterElement = document.getElementById('click-counter');
        const clicks = data.counts.find(item => item.value === "Clicks").count;
        counterElement.innerHTML = clicks;
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

fetchData();

setInterval(fetchData, 5000);