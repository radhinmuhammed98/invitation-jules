import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { WEDDING_DATA } from '../constants';

interface CountdownUnitProps {
  value: number;
  label: string;
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center rounded-xl border"
        style={{
          background: 'linear-gradient(145deg, rgba(26,58,47,0.85), rgba(13,34,24,0.95))',
          borderColor: 'rgba(201,150,42,0.35)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(201,150,42,0.15)',
        }}
      >
        <span
          className="text-2xl sm:text-3xl md:text-4xl font-light leading-none"
          style={{ fontFamily: '"Cormorant Garamond", serif', color: '#E8C96D', letterSpacing: '-0.02em' }}
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span
        className="mt-2 uppercase text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold"
        style={{ color: 'rgba(201,150,42,0.8)', fontFamily: '"Lato", sans-serif' }}
      >
        {label}
      </span>
    </div>
  );
}

// Animated falling petal component
const FallingPetal: React.FC<{ emoji: string; left: string; delay: number; duration: number }> = ({ emoji, left, delay, duration }) => {
  return (
    <motion.div
      className="absolute text-lg pointer-events-none select-none"
      style={{ left, top: '-5%', zIndex: 5 }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, 40, -20, 60, 0],
        rotate: [0, 180, 360],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {emoji}
    </motion.div>
  );
}

const petalsConfig = [
  { emoji: '🌸', left: '5%', delay: 0, duration: 8 },
  { emoji: '🌺', left: '15%', delay: 1.5, duration: 10 },
  { emoji: '✿', left: '28%', delay: 0.8, duration: 7 },
  { emoji: '🌸', left: '42%', delay: 2.5, duration: 9 },
  { emoji: '❀', left: '58%', delay: 0.3, duration: 11 },
  { emoji: '🌺', left: '70%', delay: 1.8, duration: 8.5 },
  { emoji: '✿', left: '82%', delay: 0.6, duration: 10 },
  { emoji: '🌸', left: '92%', delay: 2.2, duration: 9 },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATA.date);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh', background: 'var(--color-w-cream)' }}
    >
      {/* === HERO BACKGROUND === */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/photo_collage.jpg")' }}
        />
        
        {/* Dark gradient overlay for text readability */}
        <div 
          className="absolute inset-0 backdrop-blur-[3px]" 
          style={{ background: 'linear-gradient(to bottom, rgba(13,34,24,0.85) 0%, rgba(13,34,24,0.65) 40%, rgba(13,34,24,0.7) 60%, rgba(13,34,24,0.95) 100%)' }}
        />
      </motion.div>

      {/* Fade-to-cream at the bottom for seamless blending */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '30vh',
          background: 'linear-gradient(to bottom, transparent 0%, var(--color-w-cream) 100%)',
        }}
      />

      {/* === ANIMATED FLORALS === */}
      {/* (Removed broken image links, using cleaner minimal look) */}

      {/* === HERO CONTENT === */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full pt-20"
      >
        {/* Title / Names with Antigravity float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 1.5, delay: 0.3 },
            scale: { duration: 1.5, delay: 0.3 },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          viewport={{ once: true }}
          className="relative mb-8 sm:mb-12 mt-12"
        >
          {/* Top Decorative Arch SVG inside Hero text block */}
          <div className="flex justify-center mb-8 opacity-60">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none" stroke="var(--color-w-gold)" strokeWidth="1.5">
              <path d="M 10 30 Q 60 -10 110 30" />
              <circle cx="60" cy="15" r="3" fill="var(--color-w-gold)" />
            </svg>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl sm:text-2xl mb-6"
            style={{
              color: 'var(--color-w-gold)',
              fontFamily: '"Amiri", serif',
              fontWeight: 700,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.p>

          <h1
            className="leading-[1.1] sm:leading-tight"
            style={{
              fontFamily: 'var(--font-script)',
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
              color: '#FCFAF8', // Cream color for better contrast against dark overlay
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            Althaf
            <br />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                color: 'var(--color-w-gold)',
                letterSpacing: '0.2em',
                display: 'inline-block',
                margin: '0.2em 0',
              }}
            >
              &amp;
            </span>
            <br />
            Fathima
          </h1>
        </motion.div>

        {/* Date pill & Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mb-8 flex flex-col items-center justify-center gap-6 mt-[6vh]"
        >
          <div
            className="px-8 py-3.5 rounded-full text-sm font-bold tracking-widest backdrop-blur-md"
            style={{
              color: '#FCFAF8',
              fontFamily: 'var(--font-sans)',
              border: '1px solid rgba(212,175,55,0.4)',
              background: 'rgba(26,58,47,0.4)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
            }}
          >
            14 . 06 . 2026
          </div>

          {/* Countdown Timer */}
          <div className="flex gap-4 sm:gap-6 backdrop-blur-md p-4 rounded-2xl" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}>
            <CountdownUnit value={days} label="Days" />
            <CountdownUnit value={hours} label="Hours" />
            <CountdownUnit value={minutes} label="Mins" />
            <CountdownUnit value={seconds} label="Secs" />
          </div>
        </motion.div>
      </motion.div>

      {/* === SCROLL INDICATOR === */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span style={{ color: 'var(--color-w-gold)', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)' }}>SCROLL</span>
        <div className="w-[1px] h-10" style={{ background: 'linear-gradient(to bottom, var(--color-w-gold), transparent)' }} />
      </motion.div>
    </section>
  );
}
