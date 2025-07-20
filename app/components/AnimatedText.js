"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 1,
  animation = "fadeInUp"
}) {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    let initialProps = {
      opacity: 0,
      y: 30,
      duration: duration,
      delay: delay,
      ease: "power3.out"
    };

    switch (animation) {
      case "fadeInUp":
        initialProps = { ...initialProps, y: 30 };
        break;
      case "fadeInDown":
        initialProps = { ...initialProps, y: -30 };
        break;
      case "fadeInLeft":
        initialProps = { ...initialProps, x: -30, y: 0 };
        break;
      case "fadeInRight":
        initialProps = { ...initialProps, x: 30, y: 0 };
        break;
      case "scaleIn":
        initialProps = { ...initialProps, scale: 0.9, y: 0 };
        break;
      default:
        initialProps = { ...initialProps, y: 30 };
    }

    gsap.fromTo(text, 
      initialProps,
      { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1,
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          end: "bottom 15%",
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
  }, [delay, duration, animation]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
} 