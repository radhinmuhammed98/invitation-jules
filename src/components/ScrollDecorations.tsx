import { motion, useScroll, useTransform } from 'motion/react';

// Floral decorative element
const FloralBranch = ({ className, style }: { className?: string; style?: any }) => (
  <svg viewBox="0 0 100 200" className={className} style={{ width: '60px', height: '120px', ...style }}>
    <path d="M 50 200 Q 50 150 20 100 Q 40 100 50 120" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="2" />
    <path d="M 50 200 Q 50 150 80 100 Q 60 100 50 120" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="2" />
    <path d="M 50 150 Q 50 100 20 50 Q 40 50 50 70" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
    <path d="M 50 150 Q 50 100 80 50 Q 60 50 50 70" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
    <path d="M 50 100 Q 50 50 50 10" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
    
    {/* Flowers */}
    <circle cx="20" cy="100" r="4" fill="#C9636B" opacity="0.8" />
    <circle cx="80" cy="100" r="4" fill="#E8A0A5" opacity="0.8" />
    <circle cx="20" cy="50" r="3" fill="#F4D1D3" opacity="0.8" />
    <circle cx="80" cy="50" r="3" fill="#C9636B" opacity="0.8" />
    <circle cx="50" cy="10" r="5" fill="#C9962A" opacity="0.9" />
  </svg>
);

export function ScrollDecorations() {
  const { scrollYProgress } = useScroll();
  
  // Create parallax values based on scroll progress
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden hidden md:block">
      {/* Left side decorations */}
      <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute top-[15%] left-4 opacity-60">
        <FloralBranch />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[50%] left-6 opacity-40 transform -scale-x-100">
        <FloralBranch />
      </motion.div>
      
      {/* Right side decorations */}
      <motion.div style={{ y: y3, rotate: rotate2 }} className="absolute top-[25%] right-4 opacity-50 transform -scale-x-100">
        <FloralBranch />
      </motion.div>
      <motion.div style={{ y: y1 }} className="absolute top-[65%] right-6 opacity-40">
        <FloralBranch />
      </motion.div>

      {/* Scattered particles that float on scroll */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl"
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${(i * 18)}%`,
            opacity: 0.15,
            y: useTransform(scrollYProgress, [0, 1], [0, (i % 2 === 0 ? 250 : -250)]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, (i % 2 === 0 ? 90 : -90)])
          }}
        >
          {['✿', '🌸', '✨', '🌺'][i % 4]}
        </motion.div>
      ))}
    </div>
  );
}
