(function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(canvas);
        resizeCanvas();
        initAnimation();
    });

    let w = window.innerWidth;
    let h = window.innerHeight;

    const particles = [];
    const properties = {
        bgColor: 'rgba(17, 17, 19, 1)',
        particleColor: 'rgba(255, 40, 40, 1)',
        particleRadius: 3,
        particleCount: 60,
        particleMaxVelocity: 0.5,
        lineLength: 150,
        lineWidth: 0.5
    };

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.velocityX = (Math.random() * (properties.particleMaxVelocity * 2)) - properties.particleMaxVelocity;
            this.velocityY = (Math.random() * (properties.particleMaxVelocity * 2)) - properties.particleMaxVelocity;
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
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
    }

    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distSquared = dx * dx + dy * dy;

                if (distSquared < properties.lineLength * properties.lineLength) {
                    const length = Math.sqrt(distSquared);
                    const opacity = 1 - (length / properties.lineLength);

                    ctx.lineWidth = properties.lineWidth;
                    ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
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

    function initAnimation() {
        particles.length = 0;
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }
        if (!animationFrameId) {
            loop();
        }
    }

    let animationFrameId = null;
}());