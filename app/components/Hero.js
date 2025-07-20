"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

function ChromaticText({ children }) {
  const ref = useRef();
  const [offset, setOffset] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 16,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 16,
      active: true
    });
  };
  const handleMouseLeave = () => setOffset({ x: 0, y: 0, active: false });

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        display: "inline-block",
        fontWeight: 900,
        fontSize: "min(12vw, 120px)",
        letterSpacing: "-0.04em",
        lineHeight: 1,
        color: "#fff",
        cursor: "pointer",
        userSelect: "none",
        transition: "color 0.2s"
      }}
    >
      {/* Main text */}
      <span style={{
        position: "relative",
        zIndex: 2,
        color: "#fff",
        transition: "color 0.2s"
      }}>
        {children}
      </span>
      {/* RGB split layers */}
      {offset.active && (
        <>
          <span style={{
            position: "absolute",
            left: 0, top: 0, zIndex: 1,
            color: "red",
            opacity: 0.5,
            pointerEvents: "none",
            filter: "blur(1.5px)",
            transform: `translate(${offset.x}px, ${-offset.y}px)`
          }}>{children}</span>
          <span style={{
            position: "absolute",
            left: 0, top: 0, zIndex: 1,
            color: "lime",
            opacity: 0.5,
            pointerEvents: "none",
            filter: "blur(1.5px)",
            transform: `translate(${-offset.x}px, ${offset.y}px)`
          }}>{children}</span>
          <span style={{
            position: "absolute",
            left: 0, top: 0, zIndex: 1,
            color: "cyan",
            opacity: 0.5,
            pointerEvents: "none",
            filter: "blur(1.5px)",
            transform: `translate(${-offset.x * 0.5}px, ${-offset.y * 0.5}px)`
          }}>{children}</span>
        </>
      )}
    </span>
  );
}

function Typewriter({
  text = "",
  afterDeleteText = "",
  speed = 60,
  pause = 1000,
  deleteSpeed = 24,
  deleteTo = null,
  className = ""
}) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing, pause, deleting, typing2, pause2, deletingAll
  const [deleteToState, setDeleteToState] = useState(deleteTo !== null ? deleteTo : Math.floor(text.length / 2));

  useEffect(() => {
    let timeout;
    if (phase === "typing") {
      if (index < text.length) {
        timeout = setTimeout(() => {
          setDisplayed((d) => d + text[index]);
          setIndex((i) => i + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => setPhase("pause"), pause);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), pause);
    } else if (phase === "deleting") {
      if (displayed.length > deleteToState) {
        timeout = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, deleteSpeed);
      } else {
        timeout = setTimeout(() => setPhase("typing2"), pause / 2);
      }
    } else if (phase === "typing2") {
      if (displayed.length < deleteToState + afterDeleteText.length) {
        timeout = setTimeout(() => {
          setDisplayed(
            text.slice(0, deleteToState) +
              afterDeleteText.slice(0, displayed.length - deleteToState + 1)
          );
        }, speed);
      } else {
        timeout = setTimeout(() => setPhase("pause2"), pause);
      }
    } else if (phase === "pause2") {
      timeout = setTimeout(() => setPhase("deletingAll"), pause);
    } else if (phase === "deletingAll") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, deleteSpeed);
      } else {
        timeout = setTimeout(() => {
          setIndex(0);
          setPhase("typing");
        }, pause / 2);
      }
    }
    return () => clearTimeout(timeout);
  }, [index, phase, displayed, text, afterDeleteText, speed, pause, deleteSpeed, deleteToState]);

  // Reset if text or deleteTo changes
  useEffect(() => {
    setDisplayed("");
    setIndex(0);
    setPhase("typing");
    setDeleteToState(deleteTo !== null ? deleteTo : Math.floor(text.length / 2));
  }, [text, afterDeleteText, deleteTo]);

  return (
    <span className={className} style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function ParticleField({ count = 32 }) {
  const [particles, setParticles] = useState([]);
  const animationRef = useRef();

  useEffect(() => {
    // Initialize particles with random positions, directions, and speeds
    setParticles(
      Array.from({ length: count }).map(() => ({
        x: Math.random(),
        y: Math.random(),
        r: 2 + Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.0015,
        dy: (Math.random() - 0.5) * 0.0015,
        opacity: 0.5 + Math.random() * 0.5,
        twinkle: Math.random() * Math.PI * 2
      }))
    );
  }, [count]);

  useEffect(() => {
    function animate() {
      setParticles((prev) =>
        prev.map((p) => {
          let nx = p.x + p.dx;
          let ny = p.y + p.dy;
          // Wrap around edges
          if (nx < 0) nx = 1;
          if (nx > 1) nx = 0;
          if (ny < 0) ny = 1;
          if (ny > 1) ny = 0;
          return {
            ...p,
            x: nx,
            y: ny,
            twinkle: p.twinkle + 0.05 + Math.random() * 0.02
          };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-10">
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `calc(${p.x * 100}% - ${p.r}px)`,
            top: `calc(${p.y * 100}% - ${p.r}px)`,
            width: p.r * 2,
            height: p.r * 2,
            borderRadius: "50%",
            background: `radial-gradient(circle, #fff 0%, #a78bfa 60%, transparent 100%)`,
            opacity: p.opacity * (0.7 + 0.3 * Math.sin(p.twinkle)),
            filter: "blur(1.5px)",
            pointerEvents: "none",
            transition: "opacity 0.2s"
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [showHero, setShowHero] = useState(false);
  const videoRef = useRef(null);
  const bowlRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (bowlRef.current && contentRef.current && sectionRef.current) {
      // Bowl rotation
      gsap.to(bowlRef.current, {
        rotate: 180,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      // Content fade/slide out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -100,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, [showHero]);

  useEffect(() => {
    // Simulate video duration (e.g., 2.5s)
    const timer = setTimeout(() => setShowHero(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #fff 0%, #f9f6f2 100%)" }}>
      {/* Video Intro Overlay */}
      {!showHero && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          {/* Placeholder video (replace src with your video file) */}
          <video
            ref={videoRef}
            src="/public/placeholder-noodle.mp4"
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ maxHeight: '100vh', background: '#fff' }}
          >
            <track kind="captions" />
          </video>
        </div>
      )}

      {/* Bowl image at the bottom, big and behind all content */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full flex justify-center pointer-events-none" style={{zIndex: 0, height:'50vw', minHeight:'320px', maxHeight:'600px'}}>
        <Image
          ref={bowlRef}
          src="/noodle.png"
          alt="Bowl"
          width={1200}
          height={600}
          style={{
            width: '100vw',
            maxWidth: '1200px',
            minWidth: '600px',
            objectFit: 'contain',
            objectPosition: 'bottom',
            transform: 'translateY(40%)',
            borderBottomLeftRadius: '1000px',
            borderBottomRightRadius: '1000px',
            boxShadow: '0 8px 32px 0 #ffd96644',
            zIndex: 0,
            position: 'relative',
          }}
        />
      </div>

      {/* Hero Content */}
      {showHero && (
        <>
          {/* Animated flying bowls in the background */}
          <Image src="/bowl.png" alt="Flying Bowl" width={120} height={80} className="hidden md:block absolute top-0 left-0 z-0 opacity-30 animate-bowl-fly-left" style={{ pointerEvents: 'none' }} />
          <Image src="/bowl.png" alt="Flying Bowl" width={90} height={60} className="hidden md:block absolute top-8 right-0 z-0 opacity-20 animate-bowl-fly-right" style={{ pointerEvents: 'none', animationDelay: '2s' }} />
          <Image src="/bowl.png" alt="Flying Bowl" width={70} height={50} className="hidden md:block absolute top-20 left-0 z-0 opacity-20 animate-bowl-fly-left" style={{ pointerEvents: 'none', animationDelay: '4s' }} />
          {/* Main Hero Content */}
          <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center w-full px-4 max-w-5xl mx-auto pt-24">
            {/* Static SVG doodles around headline */}
            <div className="relative text-center mt-16 mb-10 leading-none">
              {/* Top left sparkle */}
              <svg width="32" height="32" className="absolute -left-10 -top-6" fill="none"><path d="M16 2 L16 30 M2 16 L30 16 M8 8 L24 24 M24 8 L8 24" stroke="#FFD966" strokeWidth="2" strokeLinecap="round"/></svg>
              {/* Top right star */}
              <svg width="28" height="28" className="absolute -right-8 -top-4" fill="none"><circle cx="14" cy="14" r="6" stroke="#FF8C42" strokeWidth="2"/><path d="M14 2 L14 26 M2 14 L26 14" stroke="#FF8C42" strokeWidth="1.5"/></svg>
              {/* Bottom left squiggle */}
              <svg width="40" height="16" className="absolute -left-12 bottom-0" fill="none"><path d="M2 8 Q 10 2 18 8 T 38 8" stroke="#ec4899" strokeWidth="2" fill="none"/></svg>
              {/* Bottom right sparkle */}
              <svg width="24" height="24" className="absolute -right-6 bottom-2" fill="none"><path d="M12 2 L12 22 M2 12 L22 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/></svg>
              {/* Bowl with noodles SVG - left of headline */}
              <svg width="48" height="36" className="absolute -left-16 top-1/2 -translate-y-1/2" fill="none"><ellipse cx="24" cy="24" rx="20" ry="8" fill="#FFD966" stroke="#FF8C42" strokeWidth="3" /><rect x="12" y="24" width="24" height="6" rx="3" fill="#FF8C42" /><path d="M18 20 Q 24 16 30 20" stroke="#c97a2b" strokeWidth="2" fill="none" /><path d="M20 22 Q 24 18 28 22" stroke="#FF8C42" strokeWidth="1.5" fill="none" /></svg>
              {/* Fork SVG - top left */}
              <svg width="28" height="40" className="absolute left-1 top-10" fill="none"><rect x="12" y="2" width="4" height="28" rx="2" fill="#b0b0b0" /><rect x="10" y="2" width="2" height="8" rx="1" fill="#b0b0b0" /><rect x="16" y="2" width="2" height="8" rx="1" fill="#b0b0b0" /><rect x="14" y="2" width="2" height="8" rx="1" fill="#b0b0b0" /></svg>
              {/* Spoon SVG - top right */}
              <svg width="28" height="40" className="absolute right-1 top-10" fill="none"><ellipse cx="14" cy="8" rx="6" ry="8" fill="#b0b0b0" /><rect x="12" y="8" width="4" height="24" rx="2" fill="#b0b0b0" /></svg>
              {/* Chopsticks SVG - bottom right */}
              <svg width="40" height="32" className="absolute right-0 bottom-0" fill="none"><rect x="8" y="24" width="24" height="3" rx="1.5" fill="#c97a2b" /><rect x="12" y="20" width="20" height="2" rx="1" fill="#FFD966" /></svg>
              {/* Main Headline */}
              <span className="block font-bebas text-8xl sm:text-9xl md:text-[10rem] lg:text-[11rem] font-extrabold text-[#7c4a03] tracking-wider" style={{ letterSpacing: '0.03em', lineHeight: 1.03 }}>
                CHOPSTICK CANVAS
              </span>
              {/* Glowing ADOBE + NOODLES card */}
              <div className="relative inline-block mt-6">
                <span className="block font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold px-8 py-3 text-white hero-glow-card" style={{ background: 'var(--sauce)', borderRadius: '14px', transform: 'rotate(-3deg)', lineHeight: 1.08 }}>
                  ADOBE + NOODLES
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
} 