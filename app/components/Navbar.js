"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [dark, setDark] = useState(() => typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.slice(1)));
      const scrollY = window.scrollY + 150; // Increased offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollY >= sections[i].offsetTop) {
          setActive(navLinks[i].href.slice(1));
          break;
        }
      }
    };
    
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  // Toggle dark mode on button click
  const handleThemeToggle = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setDark(false);
    } else {
      html.classList.add('dark');
      setDark(true);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[rgba(255,249,242,0.95)] backdrop-blur-xl border border-[var(--sauce)] shadow-2xl rounded-full w-[90%] max-w-6xl">
      <div className="flex items-center justify-between px-12 py-5">
        {/* Logo - Left Side */}
        <div className="flex-shrink-0 flex items-center gap-2 relative" style={{ height: '56px' }}>
          {/* Noodle SVG as logo image, always visible */}
          <a href="#home" className="group cursor-pointer flex flex-col items-center gap-0" style={{ position: 'relative', top: '-8px' }}>
            <img src="/logo.png" alt="Noodles Logo" className="h-16 w-auto" style={{ display: 'block', marginBottom: '-4px' }} />
            {/* Animated noodle SVG always visible */}
            <span className="block mt-1">
              <svg width="36" height="8" viewBox="0 0 36 8" fill="none">
                <path id="noodlePath" d="M2 4 Q 9 8 18 4 T 34 4" stroke="var(--sauce)" strokeWidth="2.5" fill="none">
                  <animate attributeName="d" values="M2 4 Q 9 8 18 4 T 34 4;M2 4 Q 9 0 18 4 T 34 4;M2 4 Q 9 8 18 4 T 34 4" dur="2.5s" repeatCount="indefinite"/>
                </path>
              </svg>
            </span>
          </a>
        </div>
        
        {/* Navigation Links - Center */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <ul className="flex items-center gap-2">
            {navLinks.map(link => (
              <li key={link.href} className="relative">
                {/* Chopstick SVG for active state */}
                {active === link.href.slice(1) && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                    <svg width="36" height="18" viewBox="0 0 36 18" fill="none">
                      <rect x="6" y="2" width="24" height="4" rx="2" fill="#c97a2b" />
                      <rect x="10" y="8" width="16" height="2.5" rx="1.25" fill="#FFD966" />
                    </svg>
                  </span>
                )}
                <a
                  href={link.href}
                  className={`relative px-6 py-3 rounded-xl font-semibold text-base uppercase tracking-wider transition-all duration-500 ease-out group overflow-hidden ${
                    active === link.href.slice(1)
                      ? "text-white bg-gradient-to-r from-[var(--sauce)]/80 to-[var(--primary)]/80 shadow-lg shadow-[var(--sauce)]/20"
                      : "text-[#c97a2b]"
                  } ${active !== link.href.slice(1) ? 'hover:underline hover:decoration-[var(--sauce)] hover:decoration-4' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = link.href.slice(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {/* Active State Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-[var(--sauce)]/60 to-[var(--primary)]/60 rounded-xl transition-all duration-500 ease-out ${
                    active === link.href.slice(1) ? 'opacity-100' : 'opacity-0'
                  }`} />
                  {/* Text */}
                  <span className={`relative z-10 transition-all duration-300 ${active !== link.href.slice(1) ? 'wiggle-hover' : ''}`}>{link.name}</span>
                  {/* Active State Glow */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 ease-out ${
                    active === link.href.slice(1) 
                      ? 'shadow-[0_0_20px_rgba(255,217,102,0.3)]' 
                      : 'shadow-none'
                  }`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right Side - Dark Mode Toggle & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Night/Day Theme Toggle - Redesigned */}
          <button
            className={`p-3 rounded-full transition-all duration-300 group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--sauce)] border-2 ${dark ? 'bg-[#222] border-[#FFD966]' : 'bg-[#FFD966]/20 border-[#FFD966]/40'}`}
            onClick={handleThemeToggle}
            aria-label="Toggle dark mode"
            style={{ boxShadow: '0 2px 12px 0 #ffd96644' }}
          >
            <span className="absolute inset-0 rounded-full transition-all duration-300" style={{ background: dark ? 'var(--deepblue)' : 'var(--primary)', opacity: 0.18, zIndex: 1 }} />
            <span className="relative z-10 flex items-center justify-center">
              {dark ? (
                // Playful moon icon
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-transform duration-200 group-active:scale-90" style={{ display: 'block' }}>
                  <circle cx="16" cy="16" r="15" fill="var(--deepblue)" stroke="#fff" strokeWidth="2" />
                  <path d="M22 16.5c-2.5 2.5-7.5 2.5-10 0 2.5 1 5-1 5-5 0 4 2.5 6 5 5z" fill="#fff" />
                  <circle cx="22" cy="12" r="2" fill="#FFD966" />
                </svg>
              ) : (
                // Playful sun icon
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-transform duration-200 group-active:scale-90" style={{ display: 'block' }}>
                  <circle cx="16" cy="16" r="13" fill="#FFD966" stroke="#FF8C42" strokeWidth="2" />
                  <g stroke="#FF8C42" strokeWidth="2" strokeLinecap="round">
                    <line x1="16" y1="3" x2="16" y2="8" />
                    <line x1="16" y1="24" x2="16" y2="29" />
                    <line x1="3" y1="16" x2="8" y2="16" />
                    <line x1="24" y1="16" x2="29" y2="16" />
                    <line x1="7.5" y1="7.5" x2="11" y2="11" />
                    <line x1="21" y1="21" x2="24.5" y2="24.5" />
                    <line x1="7.5" y1="24.5" x2="11" y2="21" />
                    <line x1="21" y1="11" x2="24.5" y2="7.5" />
                  </g>
                </svg>
              )}
            </span>
          </button>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-xl text-[#c97a2b] hover:text-white hover:bg-[var(--primary)]/20 transition-all duration-300 group relative overflow-hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {/* Button Glow */}
            <div className="absolute inset-0 bg-[var(--primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            
            {/* Icon */}
            <div className="relative z-10">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[rgba(255,249,242,0.98)] backdrop-blur-xl border border-[var(--sauce)] rounded-2xl mt-3 mx-6">
          <ul className="flex flex-col gap-2 p-6">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block px-6 py-4 rounded-xl font-semibold text-base uppercase tracking-wider transition-all duration-500 ease-out group relative overflow-hidden ${
                    active === link.href.slice(1)
                      ? "text-white bg-gradient-to-r from-[var(--sauce)]/80 to-[var(--primary)]/80 shadow-lg shadow-[var(--sauce)]/20"
                      : "text-[#c97a2b]"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = link.href.slice(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    setOpen(false);
                  }}
                >
                  {/* Active State Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-[var(--sauce)]/60 to-[var(--primary)]/60 rounded-xl transition-all duration-500 ease-out ${
                    active === link.href.slice(1) ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  {/* Text */}
                  <span className="relative z-10 transition-all duration-300">{link.name}</span>
                  
                  {/* Bottom Border Animation - Only on hover, not active */}
                  <span className="absolute bottom-0 left-0 w-full h-5 pointer-events-none overflow-hidden mt-2">
                    <svg
                      width="100%"
                      height="12"
                      viewBox="0 0 100 12"
                      fill="none"
                      className="w-full h-full group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                      style={{ display: 'block' }}
                    >
                      <path
                        d="M0 6 Q 20 0 40 6 T 100 6"
                        stroke="url(#noodle-hover)"
                        strokeWidth="3"
                        fill="none"
                      >
                        <animate attributeName="d" values="M0 6 Q 20 0 40 6 T 100 6;M0 6 Q 20 12 40 6 T 100 6;M0 6 Q 20 0 40 6 T 100 6" dur="1.2s" repeatCount="indefinite"/>
                      </path>
                      <defs>
                        <linearGradient id="noodle-hover" x1="0" y1="6" x2="100" y2="6" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFD966"/>
                          <stop offset="0.5" stopColor="#FF8C42"/>
                          <stop offset="1" stopColor="#FF3C32"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  
                  {/* Active State Glow */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 ease-out ${
                    active === link.href.slice(1) 
                      ? 'shadow-[0_0_20px_rgba(255,217,102,0.3)]' 
                      : 'shadow-none'
                  }`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

<style jsx global>{`
@keyframes wiggle {
  0%, 100% { transform: rotate(-2deg); }
  20% { transform: rotate(2deg); }
  40% { transform: rotate(-2deg); }
  60% { transform: rotate(2deg); }
  80% { transform: rotate(-2deg); }
}
.wiggle-hover:hover {
  animation: wiggle 0.4s ease-in-out;
}
`}</style> 