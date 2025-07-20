"use client";
import { useEffect, useRef } from "react";

export default function FloatingElements() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating elements
    const elements = [
      { type: "circle", color: "rgba(59, 130, 246, 0.1)", size: 100, speed: 0.5 },
      { type: "square", color: "rgba(147, 51, 234, 0.1)", size: 80, speed: 0.3 },
      { type: "triangle", color: "rgba(236, 72, 153, 0.1)", size: 120, speed: 0.7 },
      { type: "circle", color: "rgba(34, 197, 94, 0.1)", size: 60, speed: 0.4 },
      { type: "square", color: "rgba(251, 146, 60, 0.1)", size: 90, speed: 0.6 }
    ];

    elements.forEach((element, index) => {
      const div = document.createElement("div");
      div.className = "absolute pointer-events-none";
      div.style.cssText = `
        width: ${element.size}px;
        height: ${element.size}px;
        background: ${element.color};
        border-radius: ${element.type === "circle" ? "50%" : element.type === "triangle" ? "0" : "8px"};
        transform: rotate(${Math.random() * 360}deg);
        animation: float-${index} 20s infinite linear;
        z-index: 0;
      `;

      // Add keyframe animation
      const style = document.createElement("style");
      style.textContent = `
        @keyframes float-${index} {
          0% {
            transform: translate(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px) rotate(0deg);
          }
          25% {
            transform: translate(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px) rotate(90deg);
          }
          50% {
            transform: translate(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px) rotate(180deg);
          }
          75% {
            transform: translate(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px) rotate(270deg);
          }
          100% {
            transform: translate(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px) rotate(360deg);
          }
        }
      `;
      document.head.appendChild(style);
      container.appendChild(div);
    });

    return () => {
      // Cleanup
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
} 