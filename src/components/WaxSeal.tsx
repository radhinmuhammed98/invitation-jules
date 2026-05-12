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
          style={{ left: `${p.x}%`, bottom: '-2%', width: p.size, height: p.size, background: `radial-gradient(circle, rgba(232,201,109,${p.opacity}), transparent)` }}
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
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 1 + Math.random() * 2, height: 1 + Math.random() * 2, background: 'rgba(232,201,109,0.7)' }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Islamic arch SVG frame
function ArchFrame() {
  return (
    <svg className="absolute pointer-events-none" style={{ width: '100%', height: '100%', top: 0, left: 0 }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
      {/* Arch top */}
      <path d="M 320 80 Q 400 0 480 80 L 480 300 Q 400 370 320 300 Z" fill="none" stroke="rgba(201,150,42,0.25)" strokeWidth="1.5" />
      <path d="M 305 90 Q 400 -15 495 90 L 495 305 Q 400 385 305 305 Z" fill="none" stroke="rgba(201,150,42,0.12)" strokeWidth="1" />
      {/* Corner ornaments - top left */}
      <g opacity="0.4" stroke="#C9962A" strokeWidth="1" fill="none">
        <path d="M 40 40 L 120 40 M 40 40 L 40 120" />
        <path d="M 50 50 L 100 50 M 50 50 L 50 100" />
        <circle cx="40" cy="40" r="6" fill="rgba(201,150,42,0.3)" />
        <circle cx="70" cy="40" r="2.5" fill="rgba(201,150,42,0.5)" />
        <circle cx="40" cy="70" r="2.5" fill="rgba(201,150,42,0.5)" />
      </g>
      {/* Corner ornaments - top right */}
      <g opacity="0.4" stroke="#C9962A" strokeWidth="1" fill="none" transform="translate(800,0) scale(-1,1)">
        <path d="M 40 40 L 120 40 M 40 40 L 40 120" />
        <path d="M 50 50 L 100 50 M 50 50 L 50 100" />
        <circle cx="40" cy="40" r="6" fill="rgba(201,150,42,0.3)" />
        <circle cx="70" cy="40" r="2.5" fill="rgba(201,150,42,0.5)" />
        <circle cx="40" cy="70" r="2.5" fill="rgba(201,150,42,0.5)" />
      </g>
      {/* Corner ornaments - bottom left */}
      <g opacity="0.4" stroke="#C9962A" strokeWidth="1" fill="none" transform="translate(0,600) scale(1,-1)">
        <path d="M 40 40 L 120 40 M 40 40 L 40 120" />
        <path d="M 50 50 L 100 50 M 50 50 L 50 100" />
        <circle cx="40" cy="40" r="6" fill="rgba(201,150,42,0.3)" />
      </g>
      {/* Corner ornaments - bottom right */}
      <g opacity="0.4" stroke="#C9962A" strokeWidth="1" fill="none" transform="translate(800,600) scale(-1,-1)">
        <path d="M 40 40 L 120 40 M 40 40 L 40 120" />
        <path d="M 50 50 L 100 50 M 50 50 L 50 100" />
        <circle cx="40" cy="40" r="6" fill="rgba(201,150,42,0.3)" />
      </g>
      {/* Top border line */}
      <line x1="160" y1="30" x2="640" y2="30" stroke="rgba(201,150,42,0.2)" strokeWidth="1" />
      <line x1="160" y1="36" x2="640" y2="36" stroke="rgba(201,150,42,0.08)" strokeWidth="0.5" />
      {/* Bottom border line */}
      <line x1="160" y1="570" x2="640" y2="570" stroke="rgba(201,150,42,0.2)" strokeWidth="1" />
      {/* Diamond ornaments on top line */}
      {[240, 320, 400, 480, 560].map((x, i) => (
        <g key={i} transform={`translate(${x}, 30)`}>
          <rect x="-3" y="-3" width="6" height="6" fill="rgba(201,150,42,0.35)" transform="rotate(45)" />
        </g>
      ))}
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
          ? 'linear-gradient(to right, #071510 0%, #0D2218 50%, #142E20 100%)'
          : 'linear-gradient(to left, #071510 0%, #0D2218 50%, #142E20 100%)',
      }}
      animate={isRevealed ? { x: side === 'left' ? '-100%' : '100%', opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
    >
      {/* Repeating Islamic star pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9962A' fill-rule='evenodd'%3E%3Cpolygon points='30,5 35,20 50,20 38,29 43,44 30,35 17,44 22,29 10,20 25,20' /%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      {/* Gold seam line */}
      <div className="absolute top-0 bottom-0" style={{ width: 1, background: 'linear-gradient(to bottom, transparent 0%, rgba(201,150,42,0.6) 30%, rgba(232,201,109,0.9) 50%, rgba(201,150,42,0.6) 70%, transparent 100%)', right: side === 'left' ? 0 : 'auto', left: side === 'right' ? 0 : 'auto' }} />

      {/* Radial glow toward center */}
      <div className="absolute top-0 bottom-0" style={{ width: '40%', background: side === 'left' ? 'linear-gradient(to right, transparent, rgba(201,150,42,0.04))' : 'linear-gradient(to left, transparent, rgba(201,150,42,0.04))', right: side === 'left' ? 0 : 'auto', left: side === 'right' ? 0 : 'auto' }} />

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

// Floral SVG ring
function FloralRing({ isRevealed }: { isRevealed: boolean }) {
  return (
    <motion.svg viewBox="0 0 260 260" className="absolute" style={{ width: 260, height: 260 }}
      animate={isRevealed ? { scale: 8, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 130 130)`}>
          <ellipse cx="130" cy="78" rx="6" ry="18" fill={i % 3 === 0 ? '#C9636B' : i % 3 === 1 ? '#E8A0A5' : '#F4D1D3'} opacity="0.75" />
          <circle cx="130" cy="62" r="3.5" fill="#C9962A" opacity="0.6" />
        </g>
      ))}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={`l-${i}`} transform={`rotate(${angle} 130 130)`}>
          <ellipse cx="130" cy="96" rx="4" ry="11" fill="#2D5E47" opacity="0.5" />
        </g>
      ))}
      {/* Outer decorative ring */}
      <circle cx="130" cy="130" r="122" fill="none" stroke="rgba(201,150,42,0.15)" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="130" cy="130" r="115" fill="none" stroke="rgba(201,150,42,0.08)" strokeWidth="0.5" />
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
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, #1E4A35 0%, #0F2A1E 45%, #071510 100%)' }} />

          {/* Rays of light from center */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'conic-gradient(from 0deg at 50% 42%, transparent 0deg, rgba(201,150,42,0.03) 10deg, transparent 20deg, rgba(201,150,42,0.03) 30deg, transparent 40deg, rgba(201,150,42,0.03) 50deg, transparent 60deg)',
          }} />

          {/* Center radial glow */}
          <div className="absolute pointer-events-none" style={{ width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%, -55%)', background: 'radial-gradient(circle, rgba(201,150,42,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />

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
                  style={{ width: size, height: size, border: `${i === 0 ? '1' : '1.5'}px solid rgba(201,150,42,${i === 0 ? '0.2' : '0.35'})` }}
                  animate={sealBroken ? { scale: 6, opacity: 0 } : { scale: [1, 1.08 + i * 0.05, 1], opacity: [0.3 + i * 0.1, 0.6 + i * 0.1, 0.3 + i * 0.1] }}
                  transition={sealBroken ? { duration: 0.6 } : { duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }} />
              ))}

              {/* Glow halo */}
              <motion.div className="absolute rounded-full"
                style={{ width: 170, height: 170, background: 'radial-gradient(circle, rgba(201,150,42,0.35), transparent 70%)' }}
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
                    borderRadius: '50% 48% 52% 49% / 51% 49% 53% 48%',
                    background: 'radial-gradient(circle at 35% 30%, #3D7A5A, #1A3A2F 55%, #0A1E14 100%)',
                    border: '3px solid rgba(201,150,42,0.6)',
                    boxShadow: '0 0 30px rgba(201,150,42,0.2), 0 12px 40px rgba(0,0,0,0.7), inset 0 2px 8px rgba(201,150,42,0.2), inset 0 -4px 14px rgba(0,0,0,0.4)',
                  }}>
                  <div className="absolute" style={{ inset: 9, borderRadius: '50%', border: '1px solid rgba(201,150,42,0.35)' }} />
                  <div className="absolute" style={{ inset: 16, borderRadius: '50%', border: '0.5px solid rgba(201,150,42,0.15)' }} />

                  {/* Monogram */}
                  <div className="relative z-10 flex flex-col items-center select-none">
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15em' }}>
                      {['A', 'F'].map((letter, i) => (
                        <span key={letter} style={{
                          fontFamily: '"Cinzel", serif',
                          fontSize: i === 0 ? '2.1rem' : '1.7rem',
                          fontWeight: 700,
                          background: 'linear-gradient(180deg, #FFF5CC 0%, #E8C96D 40%, #C9962A 100%)',
                          WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>{letter}</span>
                      ))}
                    </div>
                    <div style={{ width: 40, height: 1, margin: '4px 0 3px', background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.8), transparent)' }} />
                    <span style={{ fontFamily: '"Cinzel", serif', fontSize: '0.4rem', letterSpacing: '0.4em', color: 'rgba(232,201,109,0.6)', textTransform: 'uppercase' }}>2026</span>
                  </div>
                </div>

                {/* Crack lines */}
                <motion.div className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }} animate={sealBroken ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.05 }}>
                  {[0, 45, 90, 135].map(angle => (
                    <div key={angle} className="absolute" style={{
                      top: '50%', left: '50%', width: 95, height: 1,
                      background: 'linear-gradient(90deg, rgba(232,201,109,0.9), transparent)',
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

              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.5))' }} />
                <span style={{ color: 'rgba(201,150,42,0.6)', fontSize: '0.7rem', letterSpacing: '0.5em' }}>✦ ✦ ✦</span>
                <div style={{ height: 1, width: 60, background: 'linear-gradient(90deg, rgba(201,150,42,0.5), transparent)' }} />
              </div>

              {/* Bismillah */}
              <p style={{ fontFamily: '"Amiri", serif', fontSize: 'clamp(1.6rem, 5vw, 2.3rem)', fontWeight: 700, color: 'rgba(232,201,109,0.92)', textShadow: '0 0 30px rgba(201,150,42,0.3)', marginBottom: '0.6rem' }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              {/* Wedding Invitation */}
              <h1 style={{ fontFamily: '"Cinzel", serif', fontSize: 'clamp(1rem, 3.5vw, 1.6rem)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#E8C96D', textShadow: '0 0 20px rgba(232,201,109,0.25)', marginBottom: '0.8rem' }}>
                Wedding Invitation
              </h1>

              {/* Names */}
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.3rem, 4.5vw, 1.9rem)', fontWeight: 600, color: 'rgba(255,250,235,0.97)', textShadow: '0 2px 15px rgba(0,0,0,0.8)', letterSpacing: '0.03em', marginBottom: '0.8rem' }}>
                Althaf Hameed &amp; Fathima
              </p>

              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.4))' }} />
                <span style={{ color: 'rgba(201,150,42,0.4)', fontSize: '0.65rem' }}>✿</span>
                <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, rgba(201,150,42,0.4), transparent)' }} />
              </div>

              {/* Tap prompt */}
              <motion.p animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.6rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(201,150,42,0.65)', marginTop: '0.4rem' }}>
                ✦ &nbsp; Tap the Seal to Open &nbsp; ✦
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
