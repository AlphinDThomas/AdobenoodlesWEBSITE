"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutCards = [
  {
    id: 1,
    title: "Creative Design",
    description: "Unique, modern designs that stand out from the crowd.",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Fast Performance",
    description: "Optimized for speed and user experience.",
    icon: "⚡",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Modern Tech",
    description: "Built with the latest technologies and best practices.",
    icon: "🔧",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80"
  }
];

export default function AboutStudioSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards stagger animation
    const aboutCards = cards.querySelectorAll('.about-card');
    gsap.fromTo(aboutCards, 
      { opacity: 0, y: 100, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === title || trigger.vars.trigger === cards) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-4"
      style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--sauce) 50%, var(--accent) 100%)" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-base font-lato mb-8" style={{ color: "var(--foreground)" }}>
            About Our Studio
          </h2>
          <p className="text-md font-mono max-w-3xl mx-auto leading-relaxed mb-12" style={{ color: "var(--deepblue)" }}>
            We create digital experiences that inspire, engage, and convert. Our team of designers and developers work together to build websites that not only look stunning but also perform exceptionally.
          </p>
        </div>

        {/* About Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {aboutCards.map((card, index) => (
            <div
              key={card.id}
              className="about-card group rounded-xl p-10 border hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden h-80 shadow-lg hover:shadow-2xl"
              style={{ background: "rgba(255, 217, 102, 0.12)", borderColor: "var(--accent)" }}
            >
              {/* Shiny Border Sheen */}
              <span className="absolute inset-0 rounded-xl pointer-events-none z-40 overflow-hidden">
                <span className="block absolute left-[-60%] top-0 w-[120%] h-full opacity-0 group-hover:opacity-100 group-hover:animate-sheen-diag"
                  style={{
                    background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
                    filter: 'blur(2px)'
                  }}
                  data-sheen
                ></span>
              </span>
              {/* Background Image Slide from Top */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:translate-y-0 translate-y-[-100%] z-10"
                style={{ 
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              {/* Noodle Overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, var(--sauce) 0%, transparent 100%)", opacity: 0.18, zIndex: 11 }} />
              {/* Content with Blurred BG */}
              <div className="relative z-30 h-full flex flex-col justify-center items-center px-4">
                <div className="absolute inset-0 rounded-xl" style={{ background: "rgba(255, 217, 102, 0.18)", backdropFilter: "blur(6px)", zIndex: -1 }} />
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-[var(--accent)] transition-colors duration-300 text-center" style={{ color: "var(--foreground)" }}>
                  {card.title}
                </h3>
                <p className="group-hover:text-[var(--deepblue)] transition-colors duration-300 text-center" style={{ color: "var(--foreground)" }}>
                  {card.description}
                </p>
                {/* Hover Glow Effect */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--primary) 0%, var(--sauce) 100%)", opacity: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 10 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes sheen-diag {
          0% { left: -60%; opacity: 0; }
          10% { opacity: 1; }
          60% { left: 60%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
} 