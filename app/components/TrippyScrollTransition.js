"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrippyScrollTransition({ children, triggerSection }) {
  const [isTrippy, setIsTrippy] = useState(false);
  const containerRef = useRef(null);
  const trippyRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scrolling with longer duration
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // Setup scroll-triggered trippy effect - ONLY for about section
  useEffect(() => {
    if (!containerRef.current || triggerSection !== "about") return;

    const container = containerRef.current;
    const trippyOverlay = trippyRef.current;

    // Create scroll trigger for trippy effect - only between hero and about
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom", // Start when about section enters viewport
        end: "top top",      // End when about section reaches top (fully visible)
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Trigger trippy effect throughout the scroll between hero and about
          if (progress > 0.1 && progress < 0.9) {
            setIsTrippy(true);
            
            // Apply trippy transformations based on scroll progress
            const trippyIntensity = (progress - 0.1) / 0.8;
            
            gsap.set(trippyOverlay, {
              scale: 1 + trippyIntensity * 0.8,
              filter: `blur(${trippyIntensity * 30}px) brightness(${1 + trippyIntensity * 1.5})`,
            });
          } else {
            setIsTrippy(false);
            gsap.set(trippyOverlay, {
              scale: 1,
              filter: "blur(0px) brightness(1)",
            });
          }
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, [triggerSection]);

  // Floating elements for trippy effect
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Create floating elements
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 20,
      color: ['#3b82f6', '#8b5cf6', '#ec4899', '#ef4444', '#10b981'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[120vh]">
      {/* Trippy Overlay - Only show for about section */}
      {triggerSection === "about" && (
        <motion.div
          ref={trippyRef}
          className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${
            isTrippy ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Parallax Background Layers */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "conic-gradient(from 0deg at 20% 50%, #3b82f6 0deg, #8b5cf6 120deg, #ec4899 240deg, #3b82f6 360deg)",
                "conic-gradient(from 180deg at 80% 20%, #8b5cf6 0deg, #ec4899 120deg, #3b82f6 240deg, #8b5cf6 360deg)",
                "conic-gradient(from 90deg at 50% 80%, #ec4899 0deg, #3b82f6 120deg, #8b5cf6 240deg, #ec4899 360deg)",
                "conic-gradient(from 270deg at 10% 10%, #3b82f6 0deg, #ec4899 120deg, #8b5cf6 240deg, #3b82f6 360deg)"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Parallax Radial Gradients */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundImage: [
                "radial-gradient(circle at 30% 30%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 70%, #8b5cf6 0%, transparent 50%)",
                "radial-gradient(circle at 70% 30%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 30% 70%, #ec4899 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, #ec4899 0%, transparent 50%), radial-gradient(circle at 90% 10%, #3b82f6 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Parallax Floating Elements */}
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              initial={{ 
                x: element.x, 
                y: element.y, 
                scale: 0,
                opacity: 0 
              }}
              animate={{ 
                x: element.x + Math.sin(Date.now() * 0.001 + element.id) * 50,
                y: element.y + Math.cos(Date.now() * 0.001 + element.id) * 50,
                scale: 1,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute rounded-full blur-sm"
              style={{
                width: element.size,
                height: element.size,
                backgroundColor: element.color,
                filter: `blur(${Math.random() * 10}px)`
              }}
            />
          ))}
          
          {/* Parallax Hexagon Patterns */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 opacity-40"
          >
            {/* Parallax Hexagon Pattern */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-32 h-32"
              animate={{
                x: [0, 20, 0],
                y: [0, -15, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full border-2 border-blue-400" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
              <motion.div 
                className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-purple-400 transform -translate-x-1/2 -translate-y-1/2" 
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                animate={{
                  x: [0, -10, 0],
                  y: [0, 8, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.div 
              className="absolute top-3/4 right-1/4 w-24 h-24"
              animate={{
                x: [0, -25, 0],
                y: [0, 20, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full border-2 border-purple-400" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
              <motion.div 
                className="absolute top-1/2 left-1/2 w-12 h-12 border-2 border-pink-400 transform -translate-x-1/2 -translate-y-1/2" 
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                animate={{
                  x: [0, 12, 0],
                  y: [0, -6, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/4 left-1/2 w-40 h-40"
              animate={{
                x: [0, 30, 0],
                y: [0, -25, 0]
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full border-2 border-pink-400" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
              <motion.div 
                className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-blue-400 transform -translate-x-1/2 -translate-y-1/2" 
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                animate={{
                  x: [0, -15, 0],
                  y: [0, 12, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Parallax Wave Effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 opacity-30"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent"
              animate={{
                x: [0, -40, 0],
                y: [0, 25, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Parallax Particle System */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 30%, #3b82f6 1px, transparent 1px), radial-gradient(circle at 80% 70%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 50% 50%, #ec4899 1px, transparent 1px)",
              backgroundSize: "50px 50px, 30px 30px, 40px 40px"
            }}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 