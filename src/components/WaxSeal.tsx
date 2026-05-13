import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface WaxSealProps { onOpen: () => void; isOpen: boolean; }

function playWaxPopSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 4);
    const source = ctx.createBufferSource(); source.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 800; filter.Q.value = 0.8;
    const gain = ctx.createGain(); gain.gain.setValueAtTime(0.6, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination); source.start();
  } catch (_) {}
}

// Floating gold dust particles
function GoldParticles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 5,
    opacity: 0.2 + Math.random() * 0.5,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, bottom: '-2%', width: p.size, height: p.size, background: `radial-gradient(circle, rgba(212,175,55,${p.opacity}), transparent)` }}
          animate={{ y: [0, -(window.innerHeight || 800)], x: [0, (Math.random() - 0.5) * 80], opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

// Twinkling stars
function Stars() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 1 + Math.random() * 2, height: 1 + Math.random() * 2, background: 'rgba(212,175,55,0.5)' }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Clean minimalist envelope frame
function ArchFrame() {
  return (
    <svg className="absolute pointer-events-none" style={{ width: '100%', height: '100%', top: 0, left: 0 }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
      {/* Top border line */}
      <line x1="160" y1="30" x2="640" y2="30" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
      {/* Bottom border line */}
      <line x1="160" y1="570" x2="640" y2="570" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
    </svg>
  );
}

// Envelope flap
function EnvelopeFlap({ side, isRevealed }: { side: 'left' | 'right'; isRevealed: boolean }) {
  return (
    <motion.div
      className="absolute top-0 bottom-0 w-1/2 z-30 overflow-hidden"
      style={{
        left: side === 'left' ? 0 : '50%',
        background: side === 'left'
          ? 'linear-gradient(to right, #FCFAF8 0%, #F5EFE6 50%, #EBE1D0 100%)'
          : 'linear-gradient(to left, #FCFAF8 0%, #F5EFE6 50%, #EBE1D0 100%)',
      }}
      animate={isRevealed ? { x: side === 'left' ? '-100%' : '100%', opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-rule='evenodd'%3E%3Cpolygon points='30,5 35,20 50,20 38,29 43,44 30,35 17,44 22,29 10,20 25,20' /%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      {/* Gold seam line */}
      <div className="absolute top-0 bottom-0" style={{ width: 1, background: 'linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.3) 30%, rgba(212,175,55,0.6) 50%, rgba(212,175,55,0.3) 70%, transparent 100%)', right: side === 'left' ? 0 : 'auto', left: side === 'right' ? 0 : 'auto' }} />

      {/* Falling petals */}
      {['🌸', '🌺', '✿'].map((e, i) => (
        <motion.div key={i} className="absolute text-lg select-none pointer-events-none"
          style={{ left: `${10 + i * 35}%`, top: '-5%', opacity: 0.15 }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0, 0.2, 0] }}
          transition={{ duration: 9 + i * 2, delay: i * 2, repeat: Infinity, ease: 'linear' }}>
          {e}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Clean minimalist seal ring
function FloralRing({ isRevealed }: { isRevealed: boolean }) {
  return (
    <motion.svg viewBox="0 0 260 260" className="absolute" style={{ width: 260, height: 260 }}
      animate={isRevealed ? { scale: 8, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}>
      {/* Outer decorative ring */}
      <circle cx="130" cy="130" r="115" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
    </motion.svg>
  );
}

export function WaxSeal({ onOpen, isOpen }: WaxSealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);

  const handleReveal = () => {
    if (isRevealed) return;
    playWaxPopSound();
    setSealBroken(true);
    setTimeout(() => setIsRevealed(true), 200);
    setTimeout(onOpen, 1100);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div key="seal-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.8 }}>

          {/* ── BACKGROUND ── */}
          <div className="absolute inset-0" style={{ background: 'var(--color-w-cream)' }} />

          {/* Center radial glow */}
          <div className="absolute pointer-events-none" style={{ width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%, -55%)', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

          <Stars />
          <GoldParticles />
          <ArchFrame />

          {/* ENVELOPE FLAPS */}
          <EnvelopeFlap side="left" isRevealed={isRevealed} />
          <EnvelopeFlap side="right" isRevealed={isRevealed} />

          {/* CENTRE CONTENT */}
          <div className="relative z-40 flex flex-col items-center justify-center text-center px-6">

            {/* Seal cluster */}
            <div className="relative flex items-center justify-center mb-6">
              <FloralRing isRevealed={sealBroken} />

              {/* Outer pulse rings */}
              {[160, 145].map((size, i) => (
                <motion.div key={i} className="absolute rounded-full"
                  style={{ width: size, height: size, border: `${i === 0 ? '1' : '1.5'}px solid rgba(212,175,55,${i === 0 ? '0.2' : '0.35'})` }}
                  animate={sealBroken ? { scale: 6, opacity: 0 } : { scale: [1, 1.08 + i * 0.05, 1], opacity: [0.3 + i * 0.1, 0.6 + i * 0.1, 0.3 + i * 0.1] }}
                  transition={sealBroken ? { duration: 0.6 } : { duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }} />
              ))}

              {/* Glow halo */}
              <motion.div className="absolute rounded-full"
                style={{ width: 170, height: 170, background: 'radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)' }}
                animate={sealBroken ? { scale: 6, opacity: 0 } : { scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={sealBroken ? { duration: 0.6 } : { duration: 2.2, repeat: Infinity }} />

              {/* WAX SEAL */}
              <motion.div onClick={handleReveal} className="relative cursor-pointer"
                whileHover={!sealBroken ? { scale: 1.08 } : {}}
                whileTap={!sealBroken ? { scale: 0.92 } : {}}
                animate={sealBroken
                  ? { scale: 5.5, opacity: 0, rotate: 15 }
                  : { scale: 1, opacity: 1, rotate: 3 }}
                transition={sealBroken ? { duration: 0.55, ease: [0.55, 0, 1, 0.45] } : { rotate: { duration: 0.5 } }}
                style={{ position: 'relative', zIndex: 10 }}>

                <div className="relative flex items-center justify-center"
                  style={{
                    width: 132, height: 132,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F3E5AB, #D4AF37)',
                    border: '3px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 10px 30px rgba(212,175,55,0.3), inset 0 2px 10px rgba(255,255,255,0.8)',
                  }}>
                  <div className="absolute" style={{ inset: 9, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)' }} />

                  {/* Monogram */}
                  <div className="relative z-10 flex flex-col items-center select-none">
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15em' }}>
                      {['A', 'F'].map((letter, i) => (
                        <span key={letter} style={{
                          fontFamily: 'var(--font-script)',
                          fontSize: i === 0 ? '2.1rem' : '1.7rem',
                          color: '#fff',
                          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>{letter}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Crack lines */}
                <motion.div className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }} animate={sealBroken ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.05 }}>
                  {[0, 45, 90, 135].map(angle => (
                    <div key={angle} className="absolute" style={{
                      top: '50%', left: '50%', width: 95, height: 1,
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.9), transparent)',
                      transformOrigin: '0 50%', transform: `rotate(${angle}deg)`, marginTop: -0.5,
                    }} />
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Text block */}
            <motion.div
              animate={isRevealed ? { opacity: 0, y: -20 } : { opacity: 1, y: [0, -8, 0], rotate: [-0.4, 0.4, -0.4] }}
              transition={isRevealed ? { duration: 0.3 } : {
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              }}>

              {/* Bismillah */}
              <p style={{ fontFamily: '"Amiri", serif', fontSize: 'clamp(1.6rem, 5vw, 2.3rem)', fontWeight: 700, color: 'var(--color-w-gold)', marginBottom: '0.6rem' }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              {/* Wedding Invitation */}
              <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-w-emerald)', marginBottom: '0.8rem' }}>
                Wedding Invitation
              </h1>

              {/* Names */}
              <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-w-emerald)', marginBottom: '0.8rem' }}>
                Althaf &amp; Fathima
              </p>

              {/* Tap prompt */}
              <motion.p animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--color-w-gold)', marginTop: '0.4rem' }}>
                ✦ &nbsp; Tap the Seal to Open &nbsp; ✦
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
