import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
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
function FallingPetal({ emoji, left, delay, duration }: { emoji: string; left: string; delay: number; duration: number }) {
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
      style={{ minHeight: '100svh' }}
    >
      {/* === HERO BACKGROUND IMAGE === */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/old-photo.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat',
            // A subtle overall overlay to ensure text is readable if the photo is very bright or dark
            boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.15)'
          }}
        />
      </motion.div>

      {/* Fade-to-cream at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '40vh',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(252,250,248,0.6) 60%, var(--color-w-cream) 100%)',
        }}
      />

      {/* === FALLING PETALS === */}
      {petalsConfig.map((p, i) => (
        <FallingPetal key={i} {...p} />
      ))}

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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl sm:text-2xl mb-6"
            style={{
              color: '#fff',
              fontFamily: '"Amiri", serif',
              fontWeight: 700,
              textShadow: '0 2px 12px rgba(0,0,0,0.4)'
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
              color: '#fff',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            Althaf
            <br />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 4vw, 2.5rem)',
                color: 'var(--color-w-gold)',
                letterSpacing: '0.4em',
                display: 'inline-block',
                margin: '0.1em 0',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              &amp;
            </span>
            <br />
            Fathima
          </h1>
        </motion.div>

        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-[10vh]"
        >
          <div
            className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest glass-card"
            style={{
              color: 'var(--color-w-emerald)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            14 . 06 . 2026
          </div>
        </motion.div>
      </motion.div>

      {/* === SCROLL INDICATOR === */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-[1px] h-12" style={{ background: 'linear-gradient(to bottom, var(--color-w-emerald-mid), transparent)' }} />
      </motion.div>
    </section>
  );
}
