"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 300); // Faster content reveal
    }, 1500); // Reduced loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            {/* Vertical Line with Logo Bypass */}
            <div className="absolute left-1/2 top-0 w-1 h-full flex flex-col items-center">
              {/* Top Line Segment */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "calc(50vh - 60px)" }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.1
                }}
                className="w-1 bg-gradient-to-b from-[var(--sauce)] via-[var(--primary)] to-[var(--accent)]"
              />
              {/* Logo Area with Curved Bypass */}
              <div className="relative w-32 h-24 flex items-center justify-center">
                {/* Left Curve */}
                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: "16px", height: "24px" }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.7
                  }}
                  className="absolute left-0 top-0 w-4 h-6 border-l-2 border-t-2 border-[var(--sauce)] rounded-tl-full"
                />
                {/* Right Curve */}
                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: "16px", height: "24px" }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.8
                  }}
                  className="absolute right-0 top-0 w-4 h-6 border-r-2 border-t-2 border-[var(--accent)] rounded-tr-full"
                />
                {/* Bottom Left Curve */}
                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: "16px", height: "24px" }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.9
                  }}
                  className="absolute left-0 bottom-0 w-4 h-6 border-l-2 border-b-2 border-[var(--primary)] rounded-bl-full"
                />
                {/* Bottom Right Curve */}
                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: "16px", height: "24px" }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 1.0
                  }}
                  className="absolute right-0 bottom-0 w-4 h-6 border-r-2 border-b-2 border-[var(--accent)] rounded-br-full"
                />
                {/* Centered Logo Image */}
                <motion.img
                  src="/logo.png"
                  alt="Logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-20 h-20 object-contain z-20"
                />
              </div>
              {/* Bottom Line Segment */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "calc(50vh - 60px)" }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 1.3
                }}
                className="w-1 bg-gradient-to-b from-[var(--sauce)] via-[var(--primary)] to-[var(--accent)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content with Slide Effect */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ 
              clipPath: "inset(0 50% 0 50%)",
              opacity: 0
            }}
            animate={{ 
              clipPath: "inset(0 0% 0 0%)",
              opacity: 1
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="relative bg-black"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 