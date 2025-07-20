"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import DecryptedText from "./DecryptedText";

function FloatingOrbs({ count = 8 }) {
  const [orbs, setOrbs] = useState([]);
  const animationRef = useRef();

  useEffect(() => {
    setOrbs(
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 40,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.1 + Math.random() * 0.3,
        color: ['#3b82f6', '#8b5cf6', '#ec4899', '#ef4444', '#10b981'][Math.floor(Math.random() * 5)]
      }))
    );
  }, [count]);

  useEffect(() => {
    function animate() {
      setOrbs(prev => 
        prev.map(orb => ({
          ...orb,
          y: orb.y - orb.speed * 0.05,
          opacity: orb.opacity + Math.sin(Date.now() * 0.001) * 0.1
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            opacity: orb.opacity,
            filter: 'blur(20px)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [orb.opacity, orb.opacity * 1.5, orb.opacity],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

function CreatorCard({ creator, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        delay: index * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  };

  const textVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-[#fff8e7] border border-[#FFD966]/40 rounded-2xl p-6 hover:border-[#FFD966]/80 transition-all duration-500 cursor-pointer shadow-xl"
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD966]/40 via-[#FF8C42]/40 to-[#FFD966]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Avatar */}
        <motion.div
          variants={imageVariants}
          className="w-24 h-24 mb-4 rounded-full bg-[#FFD966] flex items-center justify-center text-3xl text-[#c97a2b] font-bold shadow-2xl shadow-[#FFD966]/40 group-hover:shadow-[#FF8C42]/60 transition-shadow duration-300 overflow-hidden"
        >
          {creator.avatar ? (
            <img 
              src={creator.avatar} 
              alt={creator.name}
              className="w-full h-full object-cover"
              style={{
                imageRendering: 'high-quality',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="w-full h-full flex items-center justify-center text-3xl text-white font-bold" style={{ display: creator.avatar ? 'none' : 'flex' }}>
            {creator.fallback || '👤'}
          </div>
        </motion.div>

        {/* Name */}
        <motion.h3
          variants={textVariants}
          className="text-xl font-bold text-[#c97a2b] mb-2"
        >
          {creator.name}
        </motion.h3>

        {/* Role */}
        <motion.p
          variants={textVariants}
          className="text-[#FF8C42] text-sm mb-3"
        >
          {creator.role}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={textVariants}
          className="text-[#7c4a03] text-xs leading-relaxed"
        >
          {creator.description}
        </motion.p>

        {/* Social Links */}
        <motion.div
          variants={textVariants}
          className="flex gap-3 mt-4"
        >
          {creator.socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-[#FFD966] flex items-center justify-center text-[#c97a2b] text-sm hover:shadow-lg hover:shadow-[#FFD966]/50 transition-all duration-300 border border-[#FF8C42]/40"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-4 left-4 w-3 h-3 bg-pink-400 rounded-full opacity-40 animate-ping" />
      </div>
    </motion.div>
  );
}

export default function CreatorsSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity = useTransform(scrollY, [0, 500, 1000], [0, 1, 0]);

  const creators = [
    {
      name: "Noah Cherian Jacob",
      role: "Full Stack Developer",
      avatar: "/noah.png",
      fallback: "🎨",
      description: "Third-year Electronics and Computer Engineering student at Saintgits Engineering College, Kottayam. Passionate about full-stack development and building intuitive user interfaces.",
      socials: [
        { 
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          ), 
          url: "https://www.linkedin.com/in/ncjnoah/" 
        },
        { 
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          ), 
          url: "https://instagram.com/ncjnoah" 
        }
      ]
    },
    {
      name: "Alphin D Thomas",
      role: "Frontend Developer",
      avatar: "/alphin.jpg",
      fallback: "⚡",
      description: "Third-year Computer Science student at Saintgits Engineering College, Kottayam. Loves writing clean React code and crafting smooth animations.",
      socials: [
        { 
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          ), 
          url: "https://www.linkedin.com/in/alphin-d-thomas/" 
        },
        { 
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          ), 
          url: "https://www.instagram.com/_alph/" 
        }
      ]
    },
    {
      name: "Amrutha Ajish",
      role: "Backend Engineer",
      avatar: "/amrutha.jpg",
      fallback: "🔧",
      description: "Third-year Computer Science student at Saintgits Engineering College, Kottayam. Focused on designing scalable backend systems and robust APIs.",
      socials: [
        { 
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          ), 
          url: "https://www.linkedin.com/in/amrutha-ajish-achuthan/" 
        },
        { 
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          ), 
          url: "https://instagram.com/amrutha.ajish" 
        }
      ]
    },
    {
      name: "Parvathi Ullas",
      role: "SEO",
      avatar: "/parbathi.jpg",
      fallback: "🚀",
      description: "Final-year Electronics and Computer Engineering student at Saintgits Engineering College, Kottayam. Skilled in SEO strategies and optimizing web content for maximum reach.",
      socials: [
        { 
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          ), 
          url: "https://www.linkedin.com/in/parvathi-ullas-bb3130313/" 
        },
        { 
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          ), 
          url: "https://www.instagram.com/parvvathii?igsh=b3R1a2M1OTY1em55" 
        }
      ]
    }
  ];

  return (
    <section className="relative min-h-[100vh] bg-[#f9f6f2] py-20 overflow-hidden -mt-1 pt-40">
      {/* Floating doodle particles - even more, with bowls */}
      <svg width="32" height="32" className="absolute left-10 top-24 opacity-30 animate-float-slow z-0" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#FFD966" strokeWidth="4" fill="#fff8e7" />
      </svg>
      <svg width="40" height="24" className="absolute right-20 top-40 opacity-20 animate-float-fast z-0" fill="none">
        <rect x="4" y="4" width="32" height="16" rx="8" fill="#FF8C42" />
      </svg>
      <svg width="28" height="28" className="absolute left-1/3 bottom-24 opacity-20 animate-float-mid z-0" fill="none">
        <ellipse cx="14" cy="14" rx="12" ry="8" fill="#FFD966" />
      </svg>
      <svg width="36" height="36" className="absolute right-1/4 bottom-10 opacity-20 animate-float-mid z-0" fill="none">
        <path d="M6 18 Q 18 6 30 18 Q 18 30 6 18" stroke="#FF8C42" strokeWidth="3" fill="none" />
      </svg>
      <svg width="24" height="24" className="absolute left-1/4 top-1/2 opacity-20 animate-float-fast z-0" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#FF8C42" strokeWidth="3" fill="#FFD966" />
      </svg>
      <svg width="30" height="18" className="absolute right-1/3 top-1/3 opacity-20 animate-float-slow z-0" fill="none">
        <rect x="3" y="3" width="24" height="12" rx="6" fill="#FFD966" />
      </svg>
      <svg width="20" height="20" className="absolute left-1/2 bottom-1/4 opacity-20 animate-float-mid z-0" fill="none">
        <ellipse cx="10" cy="10" rx="8" ry="6" fill="#FF8C42" />
      </svg>
      <svg width="32" height="32" className="absolute right-10 bottom-24 opacity-30 animate-float-slow z-0" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#FFD966" strokeWidth="4" fill="#fff8e7" />
      </svg>
      <svg width="36" height="36" className="absolute left-1/5 top-1/4 opacity-20 animate-float-fast z-0" fill="none">
        <path d="M6 18 Q 18 6 30 18 Q 18 30 6 18" stroke="#FF8C42" strokeWidth="3" fill="none" />
      </svg>
      <svg width="24" height="24" className="absolute right-1/5 top-1/5 opacity-20 animate-float-mid z-0" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="7" fill="#FFD966" />
      </svg>
      {/* Floating bowls */}
      <svg width="48" height="32" className="absolute left-0 top-1/3 opacity-30 animate-bowl-left z-0" fill="none">
        <ellipse cx="24" cy="24" rx="20" ry="8" fill="#FFD966" stroke="#FF8C42" strokeWidth="3" />
        <rect x="12" y="24" width="24" height="6" rx="3" fill="#FF8C42" />
      </svg>
      <svg width="48" height="32" className="absolute right-0 top-2/3 opacity-30 animate-bowl-right z-0" fill="none">
        <ellipse cx="24" cy="24" rx="20" ry="8" fill="#FFD966" stroke="#FF8C42" strokeWidth="3" />
        <rect x="12" y="24" width="24" height="6" rx="3" fill="#FF8C42" />
      </svg>
      <svg width="36" height="24" className="absolute left-1/2 top-1/4 opacity-20 animate-bowl-left z-0" fill="none">
        <ellipse cx="18" cy="18" rx="14" ry="6" fill="#FFD966" stroke="#FF8C42" strokeWidth="2" />
        <rect x="7" y="18" width="22" height="4" rx="2" fill="#FF8C42" />
      </svg>
      <svg width="36" height="24" className="absolute right-1/3 bottom-1/3 opacity-20 animate-bowl-right z-0" fill="none">
        <ellipse cx="18" cy="18" rx="14" ry="6" fill="#FFD966" stroke="#FF8C42" strokeWidth="2" />
        <rect x="7" y="18" width="22" height="4" rx="2" fill="#FF8C42" />
      </svg>
      <style>{`
        @keyframes float-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        @keyframes float-fast { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-32px)} }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        @keyframes float-mid { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} }
        .animate-float-mid { animation: float-mid 6.5s ease-in-out infinite; }
        @keyframes bowl-left { 0%{left:0} 50%{left:60%} 100%{left:0} }
        .animate-bowl-left { animation: bowl-left 18s linear infinite; }
        @keyframes bowl-right { 0%{right:0} 50%{right:60%} 100%{right:0} }
        .animate-bowl-right { animation: bowl-right 20s linear infinite; }
      `}</style>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Creators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {creators.map((creator, index) => (
              <CreatorCard creator={creator} index={index} key={index} />
            ))}
          </div>

          {/* Right Side - Big Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center flex flex-col justify-center items-center order-1 lg:order-2"
          >
            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-5xl md:text-6xl text-center font-lato tracking-wide lg:text-7xl font-base text-[#c97a2b] mb-8 leading-none"
            >
              meet the {" "}
              <span className="text-[#FF8C42] font-extrabold">CREATORS</span>
            </motion.h2>

            {/* Subtitle with Decryption Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg md:text-xl font-mono text-gray-300 mb-8 leading-relaxed max-w-lg"
            >
              The{" "}
              <DecryptedText
                text="brilliant minds"
                speed={100}
                maxIterations={20}
                loop={true}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
                className="text-[#c97a2b] font-mono"
                encryptedClassName="text-[#c97a2b] font-mono"
                animateOn="view"
                revealDirection="center"
              />
              {" "}behind every pixel, line of code, and user experience that makes your vision come to life.
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF8C42] mb-2">50+</div>
                <div className="text-[#c97a2b] text-sm">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFD966] mb-2">8+</div>
                <div className="text-[#c97a2b] text-sm">Years Experience</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px #FFD96655" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#FF8C42] text-[#fff8e7] font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group mx-auto border border-[#FFD966]/40"
            >
              <span className="relative z-10">Join Our Team</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 