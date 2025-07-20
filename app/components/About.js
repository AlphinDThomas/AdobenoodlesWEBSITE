import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";

const aboutText = `At Adobe Noodles, we believe creativity shouldn't be bland — it should be bold, spicy, and instantly satisfying. Born from a late-night brainstorm between design nerds and noodle fanatics, Adobe Noodles is where the flavor of visual storytelling meets the slurp of instant inspiration.`;

const storyText = `What started as a joke — "what if Photoshop came in a packet?" — became a full-blown creative experiment. We combined the power of iconic editing tools with the relatable comfort of instant noodles to build a brand that speaks to both the pixel-pusher and the midnight muncher in all of us.`;

function Typewriter({ text, className = '', speed = 24, highlightWords = [] }) {
  const spanRef = useRef();
  useEffect(() => {
    let i = 0;
    let timeout;
    function type() {
      if (spanRef.current) {
        // Highlight key words
        let html = text.slice(0, i);
        highlightWords.forEach(word => {
          html = html.replace(new RegExp(word, 'gi'), match => `<span class='highlight'>${match}</span>`);
        });
        spanRef.current.innerHTML = html;
      }
      if (i < text.length) {
        i++;
        timeout = setTimeout(type, speed);
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, [text, speed, highlightWords]);
  return <span ref={spanRef} className={className} />;
}

export default function About() {
  const sectionRef = useRef();
  const timelineRef = useRef();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
    gsap.utils.toArray('.timeline-step').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.2 + i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);
  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-x-hidden" style={{ background: 'radial-gradient(ellipse at 60% 20%, #fff8e7 60%, #FFD966 100%)', transition: 'none' }}>
      {/* Large playful background SVGs */}
      <svg width="420" height="220" className="absolute left-[-120px] top-[-60px] opacity-20 z-0" fill="none"><ellipse cx="210" cy="110" rx="200" ry="90" fill="#FFD966" /><ellipse cx="210" cy="110" rx="120" ry="50" fill="#FF8C42" opacity="0.3"/></svg>
      <svg width="320" height="120" className="absolute right-[-80px] top-32 opacity-15 z-0" fill="none"><ellipse cx="160" cy="60" rx="140" ry="50" fill="#FF8C42" /><ellipse cx="160" cy="60" rx="80" ry="30" fill="#FFD966" opacity="0.3"/></svg>
      <svg width="180" height="180" className="absolute left-1/4 bottom-12 opacity-10 z-0" fill="none"><circle cx="90" cy="90" r="80" fill="#FFD966" /><path d="M30 90 Q 90 30 150 90 Q 90 150 30 90" stroke="#FF8C42" strokeWidth="8" fill="none"/></svg>
      <svg width="200" height="80" className="absolute right-1/3 bottom-0 opacity-10 z-0" fill="none"><ellipse cx="100" cy="40" rx="90" ry="30" fill="#FF8C42" /><ellipse cx="100" cy="40" rx="50" ry="15" fill="#FFD966" opacity="0.3"/></svg>
      {/* Chopsticks graphic */}
      <svg width="120" height="24" className="absolute left-1/2 -translate-x-1/2 top-0 opacity-20 z-0" fill="none"><rect x="10" y="4" width="100" height="6" rx="3" fill="#c97a2b" /><rect x="30" y="14" width="80" height="4" rx="2" fill="#FFD966" /></svg>
      {/* Sauce splash */}
      <svg width="160" height="60" className="absolute right-10 bottom-24 opacity-10 z-0" fill="none"><path d="M10 50 Q 40 10 80 30 T 150 50" stroke="#FF3C32" strokeWidth="10" fill="none"/></svg>
      {/* Floating Noodle SVGs */}
      <svg width="120" height="40" className="absolute left-8 top-8 opacity-30 z-0" fill="none"><path d="M10 30 Q 30 10 60 30 T 110 30" stroke="#FFD966" strokeWidth="8" fill="none"/></svg>
      <svg width="80" height="32" className="absolute right-12 top-24 opacity-20 z-0" fill="none"><ellipse cx="40" cy="16" rx="36" ry="10" fill="#FF8C42"/></svg>
      <svg width="100" height="36" className="absolute left-1/3 bottom-16 opacity-20 z-0" fill="none"><path d="M10 18 Q 50 2 90 18 Q 50 34 10 18" stroke="#FFD966" strokeWidth="6" fill="none"/></svg>
      {/* Hero: Logo + About + Noodle underline */}
      <div className="mb-8 flex flex-col items-center z-10">
        <div className="w-28 h-28 rounded-full bg-[#FFD966] flex items-center justify-center shadow-2xl mb-2 border-4 border-[#FF8C42]/30 overflow-hidden">
          <Image src="/adobee.png" alt="Adobe Noodles Logo" width={80} height={80} className="w-20 h-20 object-contain" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bebas text-[#c97a2b] tracking-wider mb-2 mt-2 relative z-10">About
          <svg width="180" height="18" className="absolute left-1/2 -translate-x-1/2 bottom-[-18px]" viewBox="0 0 180 18" fill="none"><path d="M10 9 Q 60 0 90 9 T 170 9" stroke="#FF8C42" strokeWidth="6" fill="none"/></svg>
        </h1>
      </div>
      {/* Typewriter Body in Card */}
      <div className="max-w-3xl mx-auto text-center mb-10 min-h-[120px]">
        <div className="bg-white/90 rounded-2xl shadow-2xl px-8 py-8 border-2 border-[#FFD966]/40 relative">
          <Typewriter
            text={aboutText}
            speed={16}
            highlightWords={["bold", "spicy", "inspiration"]}
            className="whitespace-pre-line text-xl md:text-2xl font-mono text-[#7c4a03] leading-relaxed"
          />
        </div>
      </div>
      {/* Story Section in Card */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="bg-[#fff8e7]/80 rounded-xl shadow-xl px-6 py-6 border border-[#FFD966]/30 relative">
          <span className="inline-block bg-[#FFD966]/60 rounded-lg px-4 py-2 font-bold mb-2 text-[#c97a2b]">Cooked with Creativity</span>
          <Typewriter
            text={storyText}
            speed={14}
            highlightWords={["packet", "editing tools", "instant noodles"]}
            className="whitespace-pre-line text-base md:text-lg font-mono text-[#c97a2b] leading-relaxed mt-2"
          />
        </div>
      </div>
      <style>{`
        .highlight { color: #FF8C42; font-weight: bold; background: #FFD96633; border-radius: 0.3em; padding: 0 0.2em; }
      `}</style>
    </section>
  );
} 