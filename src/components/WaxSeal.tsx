import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface WaxSealProps {
  onOpen: () => void;
  isOpen: boolean;
}

// Simple wax-crack audio trigger (Web Audio API - no file needed)
function playWaxPopSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Short percussive pop for the seal breaking
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Noise burst decaying fast
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 4);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Light bandpass so it sounds like a wax crack, not static
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch (_) {
    // Audio not supported — silently continue
  }
}

// Flap half — left or right
function EnvelopeFlap({
  side,
  isRevealed,
}: {
  side: 'left' | 'right';
  isRevealed: boolean;
}) {
  return (
    <motion.div
      className="absolute top-0 bottom-0 w-1/2 z-30 overflow-hidden"
      style={{
        left: side === 'left' ? 0 : '50%',
        background:
          side === 'left'
            ? 'linear-gradient(to right, #0D2218 0%, #1A3A2F 100%)'
            : 'linear-gradient(to left,  #0D2218 0%, #1A3A2F 100%)',
        boxShadow:
          side === 'left'
            ? 'inset -20px 0 40px rgba(0,0,0,0.25)'
            : 'inset  20px 0 40px rgba(0,0,0,0.25)',
      }}
      animate={
        isRevealed
          ? { x: side === 'left' ? '-100%' : '100%', opacity: 0 }
          : { x: 0, opacity: 1 }
      }
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
    >
      {/* Subtle paper texture stripe at the seam */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          width: 2,
          background:
            side === 'left'
              ? 'linear-gradient(to bottom, transparent, rgba(201,150,42,0.5), transparent)'
              : 'linear-gradient(to bottom, transparent, rgba(201,150,42,0.5), transparent)',
          right: side === 'left' ? 0 : 'auto',
          left: side === 'right' ? 0 : 'auto',
        }}
      />

      {/* Subtle Islamic star watermarks */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-7xl select-none pointer-events-none"
          style={{
            color: 'rgba(201,150,42,0.04)',
            left: `${10 + (i % 2) * 55}%`,
            top: `${15 + Math.floor(i / 2) * 55}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          ✦
        </motion.div>
      ))}

      {/* Falling petals on each flap */}
      {['🌸', '🌺', '✿', '❀'].slice(0, 3).map((e, i) => (
        <motion.div
          key={`fp-${i}`}
          className="absolute text-lg select-none pointer-events-none"
          style={{
            left: `${15 + i * 28}%`,
            top: '-5%',
            opacity: 0.18,
          }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0, 0.22, 0] }}
          transition={{ duration: 8 + i * 2, delay: i * 1.5, repeat: Infinity, ease: 'linear' }}
        >
          {e}
        </motion.div>
      ))}
    </motion.div>
  );
}

// The animated floral SVG ring behind the seal
function FloralRing({ isRevealed }: { isRevealed: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 220 220"
      className="absolute"
      style={{ width: 220, height: 220 }}
      animate={isRevealed ? { scale: 8, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}
    >
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 110 110)`}>
          <ellipse
            cx="110"
            cy="68"
            rx="5"
            ry="15"
            fill={i % 3 === 0 ? '#C9636B' : i % 3 === 1 ? '#E8A0A5' : '#F4D1D3'}
            opacity="0.7"
          />
          <circle cx="110" cy="55" r="3" fill="#C9962A" opacity="0.5" />
        </g>
      ))}
      {/* Inner ring of leaves */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={`leaf-${i}`} transform={`rotate(${angle} 110 110)`}>
          <ellipse
            cx="110"
            cy="82"
            rx="3.5"
            ry="9"
            fill="#2D5E47"
            opacity="0.45"
          />
        </g>
      ))}
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

    // 1. Seal breaks (scale up, fade)  — 600ms
    // 2. Flaps slide open              — 850ms (starts at 100ms)
    // 3. Notify parent to show site    — 1100ms
    setTimeout(() => setIsRevealed(true), 200);
    setTimeout(onOpen, 1100);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="seal-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          {/* LEFT FLAP */}
          <EnvelopeFlap side="left" isRevealed={isRevealed} />

          {/* RIGHT FLAP */}
          <EnvelopeFlap side="right" isRevealed={isRevealed} />

          {/* CENTRE CONTENT — above flaps */}
          <div className="relative z-40 flex flex-col items-center justify-center text-center px-6">

            {/* Floral ring + seal cluster */}
            <div className="relative flex items-center justify-center mb-8">

              {/* Animated floral outer ring */}
              <FloralRing isRevealed={sealBroken} />

              {/* Pulsing glow halo */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 160,
                  height: 160,
                  background: 'radial-gradient(circle, rgba(201,150,42,0.45), transparent 70%)',
                }}
                animate={
                  sealBroken
                    ? { scale: 6, opacity: 0 }
                    : { scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }
                }
                transition={
                  sealBroken
                    ? { duration: 0.6, ease: 'easeIn' }
                    : { duration: 2.2, repeat: Infinity }
                }
              />

              {/* Second halo ring — slower */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 148,
                  height: 148,
                  border: '1.5px solid rgba(201,150,42,0.35)',
                }}
                animate={
                  sealBroken
                    ? { scale: 6, opacity: 0 }
                    : { scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }
                }
                transition={
                  sealBroken
                    ? { duration: 0.6, ease: 'easeIn' }
                    : { duration: 3, repeat: Infinity, delay: 0.4 }
                }
              />

              {/* THE WAX SEAL */}
              <motion.div
                onClick={handleReveal}
                className="relative cursor-pointer"
                whileHover={!sealBroken ? { scale: 1.07 } : {}}
                whileTap={!sealBroken ? { scale: 0.92 } : {}}
                animate={
                  sealBroken
                    ? {
                        scale: 5.5,
                        opacity: 0,
                        rotate: 15,
                        filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))',
                      }
                    : {
                        scale: 1,
                        opacity: 1,
                        rotate: 3,
                        filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
                      }
                }
                transition={
                  sealBroken
                    ? { duration: 0.55, ease: [0.55, 0, 1, 0.45] }
                    : { rotate: { duration: 0.5 }, filter: { duration: 0.3 } }
                }
                style={{
                  position: 'relative',
                  zIndex: 10,
                }}
              >
                {/* Wax body — irregular "hand-poured" shape */}
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: 128,
                    height: 128,
                    borderRadius: '50% 48% 52% 49% / 51% 49% 53% 48%',
                    background:
                      'radial-gradient(circle at 38% 35%, #2D5E47, #1A3A2F 60%, #0D2218 100%)',
                    border: '3px solid rgba(201,150,42,0.55)',
                    boxShadow:
                      '0 12px 30px rgba(0,0,0,0.55), inset 0 2px 6px rgba(201,150,42,0.15), inset 0 -4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Inner embossed ring */}
                  <div
                    className="absolute"
                    style={{
                      inset: 10,
                      borderRadius: '50%',
                      border: '1px solid rgba(201,150,42,0.3)',
                    }}
                  />

                  {/* Monogram */}
                  <div className="relative z-10 flex flex-col items-center select-none">
                    <span
                      style={{
                        fontFamily: '"Great Vibes", cursive',
                        fontSize: '2.4rem',
                        lineHeight: 1,
                        background:
                          'linear-gradient(135deg, #C9962A 0%, #E8C96D 50%, #C9962A 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shimmer 4s linear infinite',
                        textTransform: 'uppercase',
                      }}
                    >
                      A & F
                    </span>
                    <div
                      className="mt-0.5"
                      style={{
                        width: 36,
                        height: 1,
                        background:
                          'linear-gradient(90deg, transparent, rgba(201,150,42,0.7), transparent)',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: '"Lato", sans-serif',
                        fontSize: '0.48rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'rgba(232,201,109,0.7)',
                        marginTop: 3,
                      }}
                    >
                      2026
                    </span>
                  </div>

                  {/* Radial crack lines that appear just as seal breaks */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={sealBroken ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.05 }}
                  >
                    {[0, 45, 90, 135].map((angle) => (
                      <div
                        key={angle}
                        className="absolute"
                        style={{
                          top: '50%',
                          left: '50%',
                          width: 90,
                          height: 1,
                          background:
                            'linear-gradient(90deg, rgba(201,150,42,0.8), transparent)',
                          transformOrigin: '0 50%',
                          transform: `rotate(${angle}deg)`,
                          marginTop: -0.5,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Title block */}
            <motion.div
              animate={isRevealed ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p
                className="text-2xl sm:text-3xl mb-1"
                style={{ color: 'rgba(232,201,109,0.75)' }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              <h1
                className="mb-2 leading-tight"
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: 'clamp(2.2rem, 7vw, 3.8rem)',
                  color: '#E8C96D',
                }}
              >
                Wedding Invitation
              </h1>

              <p
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.18em',
                  color: 'rgba(253,248,240,0.6)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Althaf Hameed &amp; Fathima
              </p>

              {/* Tap prompt */}
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontFamily: '"Lato", sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,150,42,0.65)',
                  marginTop: '0.5rem',
                }}
              >
                ✦ &nbsp; Tap the Seal to Open &nbsp; ✦
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
