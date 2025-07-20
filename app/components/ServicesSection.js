"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites built with modern frameworks like Next.js, React, and Vue.js. We focus on performance, SEO, and user experience.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-blue-500 to-purple-500",
    features: ["React & Next.js", "Performance Optimized", "SEO Friendly", "Responsive Design"]
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that enhance user experience and drive conversions. From wireframes to final designs.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
  },
  {
    id: 3,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences across all devices.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-green-500 to-blue-500",
    features: ["React Native", "Flutter", "iOS & Android", "App Store Optimization"]
  },
  {
    id: 4,
    title: "AI Integration",
    description: "Cutting-edge AI solutions that enhance user experiences and automate complex processes.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-orange-500 to-red-500",
    features: ["Chatbots", "Machine Learning", "Data Analysis", "Automation"]
  }
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    // Title animation with text reveal effect
    const titleChars = title.querySelectorAll('.char');
    gsap.set(titleChars, { opacity: 0, y: 50 });

    gsap.to(titleChars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Cards stagger animation with 3D effect
    const serviceCards = cards.querySelectorAll('.service-card');
    gsap.set(serviceCards, { 
      opacity: 0, 
      y: 100, 
      rotationX: 15,
      transformOrigin: "center center"
    });

    gsap.to(serviceCards, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cards,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse"
      }
    });

    // Hover animations for cards
    serviceCards.forEach((card, index) => {
      const icon = card.querySelector('.service-icon');
      const features = card.querySelectorAll('.feature-item');
      
      // Icon floating animation
      gsap.to(icon, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.3
      });

      // Features stagger on hover
      card.addEventListener('mouseenter', () => {
        gsap.to(features, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(features, {
          opacity: 0.7,
          x: -20,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });

    // Parallax background effect
    gsap.to(section.querySelector('.parallax-bg'), {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900 py-24 px-4"
    >
      {/* Parallax Background */}
      <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
                      <h2 className="text-4xl sm:text-5xl md:text-5xl tracking-wide font-base font-lato text-white mb-6">
            {"Our Services".split('').map((char, index) => (
              <span key={index} className="char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-mono">
            We create digital experiences that inspire, engage, and convert. Our team of designers and developers work together to build solutions that not only look stunning but also perform exceptionally.
          </p>
        </div>

                 {/* Services Grid */}
         <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
                                      <div
               key={service.id}
               className="service-card group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:bg-white/10 hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden shadow-xl hover:shadow-2xl"
             >
               {/* Animated Border Effect */}
               <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="absolute inset-[1px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl" />
               
               {/* Corner Glow Effect */}
               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               {/* Content Container with Proper Z-Index */}
               <div className="relative z-20 p-6">
                 {/* Service Icon */}
                 <div className={`service-icon w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 relative z-10 shadow-lg`}>
                   {service.icon}
                   {/* Icon Glow Effect */}
                   <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 </div>

                 {/* Service Content */}
                 <div className="relative z-10">
                   <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                     {service.title}
                   </h3>
                   <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300 text-base">
                     {service.description}
                   </p>
                   
                   {/* Hover Line Effect */}
                   <div className="absolute -bottom-4 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 group-hover:w-full" />

                   {/* Features List */}
                   <div className="space-y-2 mt-6">
                     {service.features.map((feature, featureIndex) => (
                       <div
                         key={featureIndex}
                         className="feature-item opacity-70 -translate-x-5 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                         style={{ transitionDelay: `${featureIndex * 100}ms` }}
                       >
                         <span className="text-sm text-gray-300 leading-relaxed font-mono group-hover:text-blue-300 transition-colors duration-300">{feature}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>

               {/* Hover Glow Effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-10" />
             </div>
          ))}
        </div>

        {/* Infinite Sliding Text */}
        <div className="mt-16 overflow-hidden">
          <div className="sliding-text-container relative">
            <div className="sliding-text flex whitespace-nowrap">
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
              <span className="text-xl font-bold text-white/80 mr-16">Trusted by many</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .sliding-text {
          animation: slide 20s linear infinite;
        }
        
        .sliding-text:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
} 