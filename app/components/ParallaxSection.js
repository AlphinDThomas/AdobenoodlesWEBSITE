"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MovingBackground from "./MovingBackground";
import FloatingElements from "./FloatingElements";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection({ 
  children, 
  className = "", 
  bgColor = "from-slate-900 to-slate-800",
  backgroundType = "particles"
}) {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;

    if (!text) return;

    // Simple text animation only
    gsap.fromTo(text, 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      // Clean up ScrollTriggers for this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === text) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${bgColor} py-24 px-4`}
      style={{ marginBottom: 0 }}
    >
      {/* Moving Background */}
      <MovingBackground type={backgroundType} />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      <div 
        ref={textRef}
        className={`relative z-10 max-w-6xl mx-auto w-full ${className}`}
      >
        {children}
      </div>
    </section>
  );
} 