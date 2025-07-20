"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

function FloatingParticles({ count = 20 }) {
  const [particles, setParticles] = useState([]);
  const animationRef = useRef();

  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.3 + Math.random() * 0.7,
        color: ['#3b82f6', '#8b5cf6', '#ec4899', '#ef4444', '#10b981'][Math.floor(Math.random() * 5)]
      }))
    );
  }, [count]);

  useEffect(() => {
    function animate() {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y - p.speed * 0.1,
          opacity: p.opacity + Math.sin(Date.now() * 0.001) * 0.1
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            filter: 'blur(1px)',
            transform: `translateY(${Math.sin(Date.now() * 0.001 + i) * 10}px)`
          }}
        />
      ))}
    </div>
  );
}

function StackedCard({ step, index, totalCards, activeIndex, onCardClick }) {
  const isActive = index === activeIndex;
  const isNext = index === (activeIndex + 1) % totalCards;
  const isPrev = index === (activeIndex - 1 + totalCards) % totalCards;
  
  // Calculate position and scale based on card position
  const getCardStyle = () => {
    if (isActive) {
      return {
        zIndex: 30,
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
        rotateY: 0,
        filter: "brightness(1)"
      };
    } else if (isNext) {
      return {
        zIndex: 20,
        scale: 0.98,
        x: 20,
        y: -10,
        opacity: 0.9,
        rotateY: 2,
        filter: "brightness(0.95)"
      };
    } else if (isPrev) {
      return {
        zIndex: 10,
        scale: 0.96,
        x: 40,
        y: -20,
        opacity: 0.7,
        rotateY: 4,
        filter: "brightness(0.85)"
      };
    } else {
      return {
        zIndex: 5,
        scale: 0.94,
        x: 60,
        y: -30,
        opacity: 0.5,
        rotateY: 6,
        filter: "brightness(0.7)"
      };
    }
  };

  const cardStyle = getCardStyle();

  return (
    <motion.div
      className="absolute inset-0 flex justify-center items-center cursor-pointer"
      style={{
        zIndex: cardStyle.zIndex,
        transformStyle: "preserve-3d"
      }}
      animate={{
        scale: cardStyle.scale,
        x: cardStyle.x,
        y: cardStyle.y,
        opacity: cardStyle.opacity,
        rotateY: cardStyle.rotateY,
        filter: cardStyle.filter
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      onClick={() => onCardClick(index)}
      whileHover={{
        scale: isActive ? 1.02 : cardStyle.scale * 1.03,
        x: isActive ? 0 : cardStyle.x + 5,
        y: isActive ? 0 : cardStyle.y - 5,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl p-6 w-[500px] h-[280px] transform-gpu transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/25 group">
        
        {/* Opaque Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl" />
        
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Step Number */}
            <div className="w-10 h-10 rounded-full border-2 border-purple-400 flex items-center justify-center text-purple-400 text-base font-bold">
              {index + 1}
            </div>
            
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/75 transition-shadow duration-300"
            >
              <div className="text-3xl text-white font-bold">
                {step.icon}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Title with Gradient */}
            <h3 className="text-2xl font-black text-white mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-sm mb-4 line-clamp-3">
              {step.description}
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isActive ? "100%" : "0%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-400 rounded-full opacity-40 animate-ping" />
          <div className="absolute top-1/2 left-3 w-1 h-1 bg-blue-400 rounded-full opacity-80 animate-bounce" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);

  const processSteps = [
    {
      icon: "💡",
      title: "Discovery",
      description: "We dive deep into your vision, understanding your goals, target audience, and unique requirements to craft the perfect strategy.",
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: "🎨",
      title: "Design",
      description: "Our creative team transforms your ideas into stunning visual concepts, creating wireframes and prototypes that bring your vision to life.",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: "⚡",
      title: "Development",
      description: "Using cutting-edge technologies, we build your website with clean code, optimal performance, and seamless functionality.",
      gradient: "from-pink-500 to-red-600",
      bgGradient: "from-pink-500/20 to-red-500/20"
    },
    {
      icon: "🚀",
      title: "Launch",
      description: "We thoroughly test, optimize, and deploy your website, ensuring it's ready to make a lasting impression on your audience.",
      gradient: "from-green-500 to-blue-600",
      bgGradient: "from-green-500/20 to-blue-500/20"
    }
  ];

  const handleCardClick = (newIndex) => {
    setActiveIndex(newIndex);
    // Reset auto-cycle timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % processSteps.length);
    }, 4000);
  };

  useEffect(() => {
    // Start the animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Auto-cycle through cards
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % processSteps.length);
    }, 4000); // Change every 4 seconds

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 py-20 overflow-hidden -mb-1">
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-blue-600/20" />
      <FloatingParticles count={40} />
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">
            Our <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We follow a proven methodology that ensures your project is delivered on time, 
            within budget, and exceeds your expectations.
          </p>
        </motion.div>

        {/* Stacked Cards Container */}
        <div className="relative min-h-[400px] flex justify-center items-center w-full">
          <div className="relative w-[500px] h-[300px]">
            {processSteps.map((step, index) => (
              <StackedCard
                key={index}
                step={step}
                index={index}
                totalCards={processSteps.length}
                activeIndex={activeIndex}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex flex-col items-center gap-6 mt-12">
          {/* Cool Animated Progress Slider */}
          <div className="relative w-96 h-3 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full overflow-hidden border border-white/10 shadow-inner">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Progress Fill */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((activeIndex + 1) / processSteps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                backgroundSize: "200% 100%",
                animation: "gradient-shift 2s ease infinite"
              }}
            />
            
            {/* Glowing Effect */}
            <motion.div
              className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              animate={{
                x: [0, 384, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Step Indicators */}
            <div className="absolute inset-0 flex justify-between items-center px-3">
              {processSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-500 ${
                    index <= activeIndex 
                      ? 'bg-white shadow-lg shadow-purple-500/50 ring-2 ring-purple-400' 
                      : 'bg-white/20 hover:bg-white/40 ring-1 ring-white/30'
                  }`}
                  whileHover={{ 
                    scale: 1.4,
                    boxShadow: index <= activeIndex ? "0 0 20px rgba(147, 51, 234, 0.6)" : "0 0 10px rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCardClick(index)}
                  animate={{
                    scale: index === activeIndex ? [1, 1.2, 1] : 1
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: index === activeIndex ? Infinity : 0,
                    repeatDelay: 1
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Start Your Project</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 