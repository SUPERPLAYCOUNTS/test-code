(function () {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = innerWidth;
    let h = canvas.height = innerHeight;
    const particles = [];

    const properties = {
        bgColor: 'rgba(15, 18, 24, 1)',
        particleFillColor: 'rgba(255, 255, 255, 1)',
        particleGlowColor: 'rgba(255, 255, 255, 0.8)',
        particleRadius: 2.5,
        particleCount: 70,
        particleMaxVelocity: 0.4,
        lineLength: 130,
        lineBaseColor: [0, 188, 212]
    };

    document.querySelector('body').appendChild(canvas);

    window.onresize = function () {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        }

        position() {
            if ((this.x + this.velocityX > w && this.velocityX > 0) || (this.x + this.velocityX < 0 && this.velocityX < 0)) {
                this.velocityX *= -1;
            }
            if ((this.y + this.velocityY > h && this.velocityY > 0) || (this.y + this.velocityY < 0 && this.velocityY < 0)) {
                this.velocityY *= -1;
            }
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();

            ctx.shadowBlur = 10;
            ctx.shadowColor = properties.particleGlowColor;

            ctx.fillStyle = properties.particleFillColor;
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';
        }
    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;

                length = Math.hypot(x2 - x1, y2 - y1);

                if (length < properties.lineLength) {
                    opacity = 1 - (length / properties.lineLength);
                    ctx.lineWidth = 0.3;
                    const [r, g, b] = properties.lineBaseColor;
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function reDrawParticles() {
        for (const particle of particles) {
            particle.position();
            particle.reDraw();
        }
    }

    function loop() {
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init() {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }
        loop();
    }

    init();

}());