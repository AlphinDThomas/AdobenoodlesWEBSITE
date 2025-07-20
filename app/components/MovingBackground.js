"use client";
import { useEffect, useRef } from "react";

export default function MovingBackground({ type = "particles" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    let particles = [];
    let time = 0;

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Wave class
    class Wave {
      constructor(y, amplitude, frequency, speed) {
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height + 100) this.y = -100;
      }

      draw() {
        ctx.strokeStyle = `rgba(147, 51, 234, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const waveY = this.y + Math.sin(x * this.frequency + time * 0.01) * this.amplitude;
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        ctx.stroke();
      }
    }

    // Initialize particles
    if (type === "particles") {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    }

    // Initialize waves
    let waves = [];
    if (type === "waves") {
      for (let i = 0; i < 3; i++) {
        waves.push(new Wave(
          Math.random() * canvas.height,
          Math.random() * 50 + 20,
          Math.random() * 0.01 + 0.005,
          Math.random() * 0.5 + 0.2
        ));
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      if (type === "particles") {
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
      }

      if (type === "waves") {
        waves.forEach(wave => {
          wave.update();
          wave.draw();
        });
      }

      // Geometric shapes
      if (type === "geometric") {
        // Rotating triangles
        for (let i = 0; i < 5; i++) {
          const x = canvas.width / 2 + Math.cos(time + i) * 200;
          const y = canvas.height / 2 + Math.sin(time + i) * 200;
          
          ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + Math.sin(time + i) * 0.1})`;
          ctx.beginPath();
          ctx.moveTo(x, y - 20);
          ctx.lineTo(x - 15, y + 10);
          ctx.lineTo(x + 15, y + 10);
          ctx.closePath();
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
} 