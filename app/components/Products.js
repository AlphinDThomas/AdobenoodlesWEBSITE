import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const levelColors = {
  'Hot and Tangy': '#FF3C32',
  'Medium Heat': '#FFD966',
  'Mild': '#10B981',
  'Plain': '#fff',
};

const products = [
  {
    name: 'Acrobat Coconut Curry Flow',
    description: 'Acrobatically balanced, a harmonious flow of mild curry comfort.',
    image: '/coconut.png',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#FF8C42',
    protein: '20g PROTEIN',
    level: 'Plain',
  },
  {
    name: 'Lightroom Lemon Soy Bright',
    description: 'Perfectly edited, a refreshing zest, subtly brightened.',
    image: '/lemon.png',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#10B981',
    protein: '18g PROTEIN',
    level: 'Plain',
  },
  {
    name: 'Express Egg Noodle Spark',
    description: 'Quick to satisfy, effortlessly smooth and always a classic.',
    image: '/express egg.png',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#F87171',
    protein: '22g PROTEIN',
    level: 'Mild',
  },
  {
    name: 'Toni Pepperoni Premiere',
    description: 'Bold flavors, tastefully toned down, a pepperoni masterpiece.',
    image: '/peperoni.jpg',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#6366F1',
    protein: '15g PROTEIN',
    level: 'Mild',
  },
  {
    name: 'Mama Mia Madness Fresco',
    description: 'A delightful composition of classic flavors, gently layered for mild bliss.',
    image: '/mamamia.png',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#FFD966',
    protein: '17g PROTEIN',
    level: 'Mild',
  },
  {
    name: 'Breakup Butter Chicken After Effects',
    description: 'Intense flavors, bittersweet notes, a fiery yet comforting embrace.',
    image: '/chicken.png',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#A7F3D0',
    protein: '16g PROTEIN',
    level: 'Medium Heat',
  },
  {
    name: 'Garlic Crunch XD',
    description: 'A powerful byte of garlic, perfectly rendered with a satisfying crunch.',
    image: '/garlic.png',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#FBBF24',
    protein: '19g PROTEIN',
    level: 'Medium Heat',
  },
  {
    name: 'Photoshop Paneer Pop Layer',
    description: 'Layers of flavor, expertly blended and enhanced for a vibrant, medium-spiced burst.',
    image: '/paneer.jpg',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#F59E42',
    protein: '21g PROTEIN',
    level: 'Medium Heat',
  },
  {
    name: 'Assasssino Noodelino Audition',
    description: 'Precision-engineered heat, a targeted strike of intense, tangy delight.',
    image: '/assassino.png',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#A78BFA',
    protein: '20g PROTEIN',
    level: 'Hot and Tangy',
  },
  {
    name: 'Ctrl+Z Schezwan Render',
    description: 'Undo blandness. A powerful, irreversible kick of hot and tangy Schezwan.',
    image: '/ctrl.png',
    pieces: ['/bowl.png', '/bowl.png', '/bowl.png'],
    color: '#F3F4F6',
    protein: '14g PROTEIN',
    level: 'Hot and Tangy',
  },
];

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageTrackRef = useRef();
  const sectionRef = useRef();
  const textRef = useRef();
  const cardWidth = 700; // min-w-[600px]

  // Generate random prices for each product (between ₹99 and ₹299)
  const [prices] = useState(() =>
    Array.from({ length: products.length }, () =>
      Math.floor(Math.random() * 201) + 99
    )
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const total = products.length;
    let endValue = 0;
    if (imageTrackRef.current && sectionRef.current) {
      const containerWidth = sectionRef.current.offsetWidth;
      endValue = (cardWidth * total) - containerWidth;
    }
    const ctx = gsap.context(() => {
      gsap.to(imageTrackRef.current, {
        x: () => {
          if (imageTrackRef.current && sectionRef.current) {
            const containerWidth = sectionRef.current.offsetWidth;
            return -((cardWidth * total) - containerWidth);
          }
          return 0;
        },
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${endValue + window.innerHeight}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: self => {
            const idx = Math.round(self.progress * (total - 1));
            setActiveIndex(idx);
          }
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-stretch bg-[#f9f6f2] overflow-hidden" style={{ background: '#f9f6f2', zIndex: 10 }}>
      {/* Left: Text */}
      <div className="flex-1 flex flex-col justify-center pl-4 pr-2 z-10 mt-16 md:mt-24 lg:mt-32">
        <div className="max-w-xl w-full">
          <div className="bg-white/90 rounded-3xl shadow-2xl px-6 py-6 md:px-10 md:py-8 transition-opacity duration-300" ref={textRef} style={{ fontFamily: 'Lato, sans-serif', boxShadow: '0 8px 40px #FFD96633, 0 2px 8px #0001' }}>
            <div className="whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7cxl font-extrabold leading-tight text-[#6b3a0a] mb-2">
              WE HAVE 11
            </div>
            <span className="block relative mt-2 mb-2">
              <span className="inline-block px-4 py-2 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-white skew-y-[-4deg] shadow-lg" style={{ background: products[0].color, transform: 'skew(-4deg)', borderRadius: '1rem', boxShadow: '0 4px 24px #FF8C4288' }}>
                FREAKING
              </span>
            </span>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-[#6b3a0a] mt-2">
              DELICIOUS FLAVORS
            </div>
          </div>
        </div>
      </div>
      {/* Right: Product Images (horizontal scroll track) */}
      <div className="relative flex-1 flex items-center justify-center overflow-visible mt-16 md:mt-24 lg:mt-32">
        <div ref={imageTrackRef} className="flex flex-row items-center h-full w-full" style={{ willChange: 'transform' }}>
          {products.map((product, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center justify-center min-w-[600px] h-[80vh] group transition-all duration-300 hover:shadow-2xl hover:ring-4 hover:ring-[#FFD966]/60 hover:scale-105"
              style={{
                transform: 'skew(-6deg) rotate(-6deg)',
                borderRadius: '2.5rem',
                background: `linear-gradient(135deg, #fff8e7 60%, ${levelColors[product.level] || product.color} 100%)`,
                boxShadow: '0 12px 48px 0 #FFD96655, 0 2px 8px #0001',
                border: '3px solid #FFD96644',
              }}
            >
              {/* Price Tag (bottom, just above image) */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[120px] z-30 text-2xl md:text-3xl font-extrabold text-green-600 bg-white/90 px-6 py-2 rounded-full shadow-lg border-2 border-[#FFD966]/40 flex items-center gap-2" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.04em' }}>
                <span className="text-xl md:text-2xl">₹</span>{prices[idx]}
              </div>
              {/* Main Product Image or Placeholder */}
              {product.image === '/bowl.png' ? (
                <div className="w-[340px] h-[340px] flex items-center justify-center bg-gray-200 rounded-2xl mb-2 relative overflow-hidden">
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="text-gray-400">
                    <path d="M12 16.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5-4.5 2.015-4.5 4.5 2.015 4.5 4.5 4.5zm0 2c-3.59 0-6.5-2.91-6.5-6.5S8.41 5.5 12 5.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z" fill="currentColor"/>
                  </svg>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500">Upload Image</span>
                </div>
              ) : (
                <img src={product.image} alt={product.name} className="w-[340px] h-[340px] object-contain drop-shadow-2xl z-10 mb-2 rounded-2xl" />
              )}
              {/* Heat Level Icon (top right) */}
              <div className="absolute top-8 right-8 z-30">
                {product.level === 'Hot and Tangy' ? (
                  // Red chili pepper SVG
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 36c6-2 10-8 10-14 0-4-2-8-6-10-2-1-4-1-6 0-4 2-6 6-6 10 0 6 4 12 10 14z" fill="#FF3C32" stroke="#B91C1C" strokeWidth="2"/><path d="M20 10V6" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="6" r="2" fill="#FFD966" stroke="#B91C1C" strokeWidth="1.5"/></svg>
                ) : product.level === 'Medium Heat' ? (
                  // Yellow bell pepper SVG
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 36c7-2 10-8 10-14 0-4-2-8-6-10-2-1-4-1-6 0-4 2-6 6-6 10 0 6 3 12 10 14z" fill="#FFD966" stroke="#F59E42" strokeWidth="2"/><ellipse cx="20" cy="10" rx="3" ry="2" fill="#A3E635" stroke="#65A30D" strokeWidth="1.5"/></svg>
                ) : product.level === 'Mild' ? (
                  // Green leaf SVG
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 36c7-2 10-8 10-14 0-4-2-8-6-10-2-1-4-1-6 0-4 2-6 6-6 10 0 6 3 12 10 14z" fill="#A7F3D0" stroke="#10B981" strokeWidth="2"/><path d="M20 10 Q22 6 26 8 Q24 12 20 10z" fill="#10B981"/></svg>
                ) : (
                  // White leaf SVG for Plain
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 36c7-2 10-8 10-14 0-4-2-8-6-10-2-1-4-1-6 0-4 2-6 6-6 10 0 6 3 12 10 14z" fill="#fff" stroke="#e5e7eb" strokeWidth="2"/><path d="M20 10 Q22 6 26 8 Q24 12 20 10z" fill="#e5e7eb"/></svg>
                )}
              </div>
              {/* Product Name */}
              <div
                className="mt-4 text-center text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#c97a2b] px-2 w-full max-w-[90%] tracking-wide"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.04em', lineHeight: 1.1 }}
              >
                {product.name}
              </div>
              {/* Product Description Pop-up on Hover */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-4 w-[90%] bg-white/95 rounded-xl shadow-2xl px-4 py-3 text-xs md:text-base text-[#6b3a0a] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30 text-center border-2 border-[#FFD966]/40">
                {product.description}
              </div>
              {/* Shine/Glow Effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 40px 10px #FFD96688, 0 0 80px 20px #FF8C4288' }} />
              {/* Protein Tag */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-lg md:text-xl font-extrabold text-[#6b3a0a] bg-[#FFD966] px-6 py-2 rounded-full shadow-xl border-2 border-[#FF8C42]/40" style={{ letterSpacing: '0.03em' }}>
                {product.protein}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 