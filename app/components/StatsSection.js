"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { id: 1, number: 150, suffix: "+", label: "Projects Completed", color: "text-blue-400" },
  { id: 2, number: 50, suffix: "+", label: "Happy Clients", color: "text-purple-400" },
  { id: 3, number: 5, suffix: "+", label: "Years Experience", color: "text-pink-400" },
  { id: 4, number: 24, suffix: "/7", label: "Support Available", color: "text-green-400" }
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const stats = statsRef.current;

    if (!section || !title || !stats) return;

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, x: -100 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats animation
    const statElements = stats.querySelectorAll('.stat-item');
    
    statElements.forEach((stat, index) => {
      // Initial state
      gsap.set(stat, { opacity: 0, y: 50 });
      
      // Animate in
      gsap.to(stat, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === title || trigger.vars.trigger === stats) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 py-24 px-4"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Title */}
          <div ref={titleRef} className="text-left">
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-lato tracking-wide text-white mb-8 leading-tight">
              Our
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Numbers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-mono">
              We've achieved remarkable milestones through dedication, innovation, and unwavering commitment to excellence.
            </p>
          </div>

          {/* Right Side - Stats */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="stat-item group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:bg-white/10 hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className={`text-5xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                    <CountUp
                      from={0}
                      to={stat.number}
                      separator=","
                      direction="up"
                      duration={2}
                      delay={index * 0.2}
                      className="stat-number"
                    />
                    <span className="text-3xl">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 