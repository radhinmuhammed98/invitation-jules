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

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* === BACKGROUND === */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {/* Deep emerald to rich night gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, #0D2218 0%, #1A3A2F 30%, #0F2920 60%, #081810 100%)',
          }}
        />
        {/* Radial glow spots */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,150,42,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(107,175,138,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 80% 80%, rgba(201,99,107,0.05) 0%, transparent 60%)',
          }}
        />
        {/* Islamic geometric overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-conic-gradient(rgba(201,150,42,1) 0 10deg, transparent 10deg 30deg)',
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Bottom fade — hero bleeds into gradient bridge below */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '220px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(8,24,16,0.6) 60%, #081810 100%)',
        }}
      />

      {/* === FALLING PETALS === */}
      {petalsConfig.map((p, i) => (
        <FallingPetal key={i} {...p} />
      ))}

      {/* === FLOATING DECORATIVE STARS === */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute pointer-events-none text-xs"
          style={{
            left: `${5 + (i * 17) % 90}%`,
            top: `${8 + (i * 13) % 80}%`,
            color: i % 3 === 0 ? 'rgba(201,150,42,0.6)' : i % 3 === 1 ? 'rgba(232,201,109,0.4)' : 'rgba(253,248,240,0.3)',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 2 + (i * 0.4) % 3,
            delay: (i * 0.3) % 4,
            repeat: Infinity,
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* === HERO CONTENT === */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full"
      >
        {/* Bismillah */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-xl sm:text-2xl mb-3"
          style={{ color: 'rgba(232,201,109,0.75)', letterSpacing: '0.05em' }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        {/* Subtitle label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="uppercase tracking-[0.5em] text-[10px] sm:text-xs font-semibold mb-6"
          style={{ color: 'rgba(201,150,42,0.9)', fontFamily: '"Lato", sans-serif' }}
        >
          ✦ &nbsp; Together in Love &nbsp; ✦
        </motion.p>

        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.6))' }} />
          <span style={{ color: 'rgba(201,150,42,0.8)', fontSize: '0.9rem' }}>❧</span>
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.6), transparent)' }} />
        </motion.div>

        {/* Title / Names with Antigravity float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{
            y: [0, -12, 0],
            rotate: [-0.3, 0.3, -0.3],
          }}
          transition={{
            opacity: { duration: 1.5, delay: 0.3 },
            scale: { duration: 1.5, delay: 0.3 },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          viewport={{ once: true }}
          className="relative mb-8 sm:mb-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl mb-4"
            style={{
              color: 'rgba(232,201,109,0.8)',
              fontFamily: '"Amiri", serif',
              fontWeight: 700,
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.p>

          <h1
            className="leading-[1.1] sm:leading-tight"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(3.2rem, 11vw, 7rem)',
              background: 'linear-gradient(135deg, #C9962A 0%, #E8C96D 40%, #FFF5CC 55%, #E8C96D 70%, #C9962A 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 6s linear infinite',
            }}
          >
            Althaf Hameed
            <br />
            <span
              style={{
                fontFamily: '"Cinzel", serif',
                fontStyle: 'normal',
                fontSize: 'clamp(1rem, 4vw, 2.5rem)',
                background: 'linear-gradient(135deg, rgba(201,150,42,0.8), rgba(232,201,109,0.9))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5em',
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

        {/* Family lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mb-8"
        >
          <p
            className="text-sm sm:text-base italic"
            style={{ color: 'rgba(253,248,240,0.55)', fontFamily: '"Cormorant Garamond", serif', letterSpacing: '0.02em' }}
          >
            Grandson of Moideen N.M. &amp; Ayisha, and Moideen &amp; Nabeesa
            <br />
            <span style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.85em' }}>
              Daughter of Nasir &amp; Shamsina &nbsp;·&nbsp; Padikkalekkandi
            </span>
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.5))' }} />
          <span style={{ color: 'rgba(201,150,42,0.7)', fontSize: '1.1rem' }}>✿</span>
          <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.5), transparent)' }} />
        </motion.div>

        {/* Date & Venue pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <div
            className="px-6 py-3 rounded-full text-sm"
            style={{
              border: '1px solid rgba(201,150,42,0.4)',
              background: 'rgba(201,150,42,0.08)',
              color: 'rgba(232,201,109,0.9)',
              fontFamily: '"Cinzel", serif',
              letterSpacing: '0.12em',
            }}
          >
            Sunday, 14 June 2026
          </div>
          <div style={{ color: 'rgba(201,150,42,0.4)', fontSize: '0.8rem' }}>✦</div>
          <div
            className="px-6 py-3 rounded-full text-sm"
            style={{
              border: '1px solid rgba(201,150,42,0.4)',
              background: 'rgba(201,150,42,0.08)',
              color: 'rgba(232,201,109,0.9)',
              fontFamily: '"Cinzel", serif',
              letterSpacing: '0.12em',
            }}
          >
            03:00 PM &nbsp;·&nbsp; Surabhi Auditorium
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="flex justify-center items-end gap-3 sm:gap-5"
        >
          <CountdownUnit value={days} label="Days" />
          <span style={{ color: 'rgba(201,150,42,0.5)', fontSize: '1.5rem', marginBottom: '1.8rem', fontFamily: '"Cormorant Garamond", serif' }}>:</span>
          <CountdownUnit value={hours} label="Hours" />
          <span style={{ color: 'rgba(201,150,42,0.5)', fontSize: '1.5rem', marginBottom: '1.8rem', fontFamily: '"Cormorant Garamond", serif' }}>:</span>
          <CountdownUnit value={minutes} label="Mins" />
          <span style={{ color: 'rgba(201,150,42,0.5)', fontSize: '1.5rem', marginBottom: '1.8rem', fontFamily: '"Cormorant Garamond", serif' }}>:</span>
          <CountdownUnit value={seconds} label="Secs" />
        </motion.div>
      </motion.div>

      {/* === SCROLL INDICATOR === */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.4em]"
          style={{ color: 'rgba(201,150,42,0.55)', fontFamily: '"Lato", sans-serif' }}
        >
          Scroll
        </span>
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 h-1.5 rounded-full"
              style={{ background: 'rgba(201,150,42,0.5)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>

      {/* === CORNER FLORAL ORNAMENTS === */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none opacity-40 z-10">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ color: '#C9962A', fontSize: '2.5rem', lineHeight: 1 }}
        >
          ❧
        </motion.div>
      </div>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none opacity-40 z-10">
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          style={{ color: '#C9962A', fontSize: '2.5rem', lineHeight: 1, transform: 'scaleX(-1)' }}
        >
          ❧
        </motion.div>
      </div>
      <div className="absolute bottom-14 left-4 sm:left-6 pointer-events-none opacity-25 z-10">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          style={{ color: '#C9962A', fontSize: '2rem', lineHeight: 1 }}
        >
          ✿
        </motion.div>
      </div>
      <div className="absolute bottom-14 right-4 sm:right-6 pointer-events-none opacity-25 z-10">
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          style={{ color: '#C9962A', fontSize: '2rem', lineHeight: 1 }}
        >
          ✿
        </motion.div>
      </div>
    </section>
  );
}
