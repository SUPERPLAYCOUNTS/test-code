const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#ff004c', '#ff00ff', '#00fff8', '#00ff9d', '#ad00ff'];
let particlesArray;

class Particle {
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = dirX;
        this.directionY = dirY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particlesArray = [];

    let numberOfParticles = (canvas.height * canvas.width) / 10000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let dirX = (Math.random() * 0.3) - 0.15;
        let dirY = (Math.random() * 0.3) - 0.15;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

function connect() {
    ctx.shadowBlur = 0;

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.sqrt((particlesArray[a].x - particlesArray[b].x) ** 2 + (particlesArray[a].y - particlesArray[b].y) ** 2);

            if (distance < (canvas.width / 10)) {
                const opacity = 1 - (distance / (canvas.width / 10));
                ctx.strokeStyle = `rgba(${parseInt(particlesArray[a].color.slice(1,3),16)},
                                        ${parseInt(particlesArray[a].color.slice(3,5),16)},
                                        ${parseInt(particlesArray[a].color.slice(5,7),16)},
                                        ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particlesArray.forEach(p => p.update());
    connect();
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

const clickCounter = document.getElementById('click-count');

const od = new Odometer({
    el: clickCounter,
    value: 0,
    format: '(,ddd)'
});

async function fetchClicks() {
    try {
        const response = await fetch('https://corsproxy.io/?https://alesclicker.vercel.app/api/clicks');
        const data = await response.json();
        od.update(data.exactClicks);
    } catch (error) {
        console.error('Error while retrieving data:', error);
    }
}

fetchClicks();
setInterval(fetchClicks, 5000);