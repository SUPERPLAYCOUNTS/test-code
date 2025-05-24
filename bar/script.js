document.addEventListener('DOMContentLoaded', () => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const startDateElement = document.getElementById('startDate');
    const endDateElement = document.getElementById('endDate');

    const start = new Date(startDateElement.dataset.timestamp).getTime();
    const end = new Date(endDateElement.dataset.timestamp).getTime();

    const formatDateForDisplay = (date) => {
        return `${twoDigits(date.getDate())} ${shortMonths[date.getMonth()]} ${date.getFullYear()}`;
    };
    startDateElement.textContent = formatDateForDisplay(new Date(start));
    endDateElement.textContent = formatDateForDisplay(new Date(end));

    const tableBody = document.querySelector(".milestones-table tbody");

    for (let i = 0; i <= 100; i++) {
        const row = document.createElement("tr");
        const percentCell = document.createElement("td");
        percentCell.innerText = i + "%";
        row.appendChild(percentCell);

        const dateCell = document.createElement("td");
        const milestoneDate = new Date(start + (end - start) * i / 100);
        dateCell.innerText = `${weekDays[milestoneDate.getDay()]} ${twoDigits(milestoneDate.getDate())} ${shortMonths[milestoneDate.getMonth()]} ${milestoneDate.getFullYear()} ${twoDigits(milestoneDate.getHours())}:${twoDigits(milestoneDate.getMinutes())}:${twoDigits(milestoneDate.getSeconds())}`;
        row.appendChild(dateCell);

        tableBody.appendChild(row);
    }

    const progressElement = document.querySelector(".progress");
    const timeLeftElement = document.querySelector("#timeLeft");
    const startedElement = document.querySelector("#started");
    const progressTextElement = document.querySelector("#progress");

    setInterval(() => {
        const now = Date.now();
        const elapsed = now - start;
        const total = end - start;
        let percentComplete;

        if (elapsed >= total) {
            percentComplete = 1;
            timeLeftElement.innerText = "Completed!";
            progressElement.classList.add('completed');
        } else if (elapsed < 0) {
            percentComplete = 0;
            timeLeftElement.innerText = getDuration(now, end + 1000);
        } else {
            percentComplete = elapsed / total;
            timeLeftElement.innerText = getDuration(now, end + 1000);
            progressElement.classList.remove('completed');
        }

        startedElement.innerText = (now < start) ? "Not yet started" : getDuration(start, now) + " ago";
        progressElement.style.width = `${Math.min(100, percentComplete * 100)}%`;
        progressTextElement.innerText = (Math.min(100, percentComplete * 100)).toFixed(8);
    }, 100);

    function twoDigits(num) {
        return (num < 10 ? "0" : "") + num;
    }

    function getDuration(startTime, endTime) {
        let diff = endTime - startTime;
        if (diff < 0) diff = 0;

        const secondsTotal = Math.floor(diff / 1000);
        if (secondsTotal === 0 && diff > 0) {
            return `${diff} ms`;
        }

        const days = Math.floor(secondsTotal / (60 * 60 * 24));
        const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
        const seconds = secondsTotal % 60;

        const duration = [];

        if (days > 0) {
            duration.push(`${days} day${days > 1 ? 's' : ''}`);
        }
        if (hours > 0) {
            duration.push(`${hours} hour${hours > 1 ? 's' : ''}`);
        }
        if (minutes > 0) {
            duration.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
        }
        if (seconds > 0 || duration.length === 0) {
            duration.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
        }

        return duration.join(" ");
    }
});