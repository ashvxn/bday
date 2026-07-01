import { useEffect, useRef } from 'react';

export const SparkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height; // start above screen
        this.size = Math.random() * 5 + 3.5;
        this.speedY = Math.random() * 0.7 + 0.35; // slow drift downwards
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.012;
        this.type = Math.random() > 0.45 ? 'petal' : 'gold'; // Red petal or gold dust
        this.opacity = Math.random() * 0.35 + 0.15;
        this.oscillation = Math.random() * 100;
        this.oscillationSpeed = Math.random() * 0.015 + 0.005;
      }

      update() {
        this.y += this.speedY;
        // Sway back and forth gently using sine wave
        this.oscillation += this.oscillationSpeed;
        this.x += Math.sin(this.oscillation) * 0.35 + this.speedX;
        this.angle += this.spin;

        // Reset when reaching bottom
        if (this.y > canvas.height + 20) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
          this.opacity = Math.random() * 0.35 + 0.15;
        }
        
        // Wrap sides
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.type === 'petal') {
          // Draw a soft, stylized crimson rose petal
          ctx.fillStyle = '#b91c1c'; // Rich crimson-red
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-this.size, -this.size * 1.4, -this.size * 1.4, this.size * 0.8, 0, this.size * 1.4);
          ctx.bezierCurveTo(this.size * 1.4, this.size * 0.8, this.size, -this.size * 1.4, 0, 0);
          ctx.fill();
        } else {
          // Draw a champagne-gold sparkles node
          ctx.shadowBlur = this.size * 1.5;
          ctx.shadowColor = '#d4af37'; // Rose gold / Gold
          ctx.fillStyle = '#eab308'; // Pure gold dust
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(45, Math.floor((canvas.width * canvas.height) / 32000));
      for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height; // distribute on screen initially
        particles.push(p);
      }
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
    />
  );
};
