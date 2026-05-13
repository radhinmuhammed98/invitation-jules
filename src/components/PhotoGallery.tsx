import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const PHOTOS = [
  {
    src: '/photo_collage.jpg',
    caption: 'Our Story in Frames',
    sub: 'A lifetime of adventures together',
    role: 'collage',
  },
  {
    src: '/photo_agra.jpg',
    caption: 'Our Journey Begins',
    sub: 'Agra Fort — where history met our love',
    role: 'portrait',
  },
  {
    src: '/photo_casual.jpg',
    caption: 'Cherished Moments',
    sub: 'Every ordinary day, extraordinary together',
    role: 'portrait',
  },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ idx, onClose, onPrev, onNext }: {
  idx: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: 'rgba(2,8,5,0.96)', backdropFilter: 'blur(24px)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(201,150,42,0.15)', border: '1px solid rgba(201,150,42,0.45)', color: '#E8C96D' }}
      >
        <X size={18} />
      </button>
      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 z-10 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(201,150,42,0.15)', border: '1px solid rgba(201,150,42,0.45)', color: '#E8C96D' }}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 z-10 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(201,150,42,0.15)', border: '1px solid rgba(201,150,42,0.45)', color: '#E8C96D' }}
      >
        <ChevronRight size={22} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
          className="flex flex-col items-center px-4"
          style={{ maxWidth: '92vw' }}
        >
          <img
            src={PHOTOS[idx].src}
            alt={PHOTOS[idx].caption}
            style={{
              maxWidth: '88vw', maxHeight: '78vh', objectFit: 'contain',
              borderRadius: '18px', border: '2px solid rgba(201,150,42,0.3)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-5 text-center"
          >
            <p style={{ fontFamily: '"Great Vibes", cursive', fontSize: '1.8rem', color: '#E8C96D' }}>
              {PHOTOS[idx].caption}
            </p>
            <p className="text-xs mt-1 uppercase tracking-widest" style={{ color: 'rgba(232,201,109,0.5)', fontFamily: '"Cinzel", serif' }}>
              {idx + 1} / {PHOTOS.length}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function PhotoGallery() {
  const [lightIdx, setLightIdx] = useState<number | null>(null);
  const open = useCallback((i: number) => setLightIdx(i), []);
  const close = useCallback(() => setLightIdx(null), []);
  const prev = useCallback(() => setLightIdx(i => i != null ? (i - 1 + PHOTOS.length) % PHOTOS.length : 0), []);
  const next = useCallback(() => setLightIdx(i => i != null ? (i + 1) % PHOTOS.length : 0), []);

  return (
    <>
      <AnimatePresence>
        {lightIdx !== null && <Lightbox idx={lightIdx} onClose={close} onPrev={prev} onNext={next} />}
      </AnimatePresence>

      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #EDE3CA 35%, #E4D8B8 65%, #FDF8F0 100%)' }}
      >
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #C9962A 0%, transparent 65%)', filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #C9636B 0%, transparent 65%)', filter: 'blur(70px)', transform: 'translate(20%, 20%)' }} />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #1A3A2F 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(-50%, -50%)' }} />
        </div>

        {/* Floating petals */}
        {['🌸','✿','🌺','❀','🌸','✿'].map((e, i) => (
          <motion.div
            key={i}
            className="absolute text-xl pointer-events-none select-none"
            style={{ left: `${6 + i * 17}%`, top: `${8 + (i % 3) * 28}%`, opacity: 0.08 }}
            animate={{ y: [0, -22, 0], rotate: [0, 12, -12, 0] }}
            transition={{ duration: 7 + i, repeat: Infinity, delay: i * 1.1, ease: 'easeInOut' }}
          >
            {e}
          </motion.div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20 sm:mb-28"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.55em' }}
              transition={{ duration: 1.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="uppercase text-xs font-bold mb-5"
              style={{ color: 'rgba(201,150,42,0.9)', fontFamily: '"Cinzel", serif' }}
            >
              ✦ &nbsp; Our Moments &nbsp; ✦
            </motion.p>

            <h2 style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(3.2rem, 10vw, 6.5rem)',
              lineHeight: 1.05,
              background: 'linear-gradient(135deg, #1A3A2F 0%, #2D5E47 50%, #1A3A2F 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Captured with Love
            </h2>

            <div className="flex items-center justify-center gap-5 mt-6 mb-5">
              <div className="h-px w-28 sm:w-44" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.65))' }} />
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{ color: 'rgba(201,150,42,0.85)', fontSize: '1.1rem' }}
              >✿</motion.span>
              <div className="h-px w-28 sm:w-44" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.65), transparent)' }} />
            </div>

            <p className="italic text-sm sm:text-base max-w-md mx-auto leading-relaxed"
              style={{ color: 'rgba(26,58,47,0.55)', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem' }}>
              Every picture holds a thousand memories — a glimpse into the love we've built together
            </p>
          </motion.div>

          {/* ── COLLAGE HERO ── */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            onClick={() => open(0)}
            className="relative cursor-pointer mb-6 sm:mb-8 group"
          >
            {/* Glow ring behind */}
            <div className="absolute -inset-1 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'linear-gradient(135deg, rgba(201,150,42,0.4), rgba(201,99,107,0.3), rgba(201,150,42,0.4))', filter: 'blur(12px)' }} />

            <div className="relative rounded-3xl overflow-hidden" style={{
              boxShadow: '0 32px 100px rgba(26,58,47,0.22), 0 8px 32px rgba(0,0,0,0.14)',
              border: '1.5px solid rgba(201,150,42,0.28)',
            }}>
              {/* Gold shimmer top stripe */}
              <div className="absolute top-0 left-0 right-0 h-[2px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent 0%, #E8C96D 30%, #C9962A 50%, #E8C96D 70%, transparent 100%)' }} />

              <img
                src="/photo_collage.jpg"
                alt="Our Journey — Photo Collage"
                className="w-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-[1.04]"
                style={{ maxHeight: '80vh', objectPosition: 'center top' }}
              />

              {/* Bottom cinematic gradient */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(0deg, rgba(10,26,18,0.82) 0%, rgba(10,26,18,0.25) 38%, transparent 65%)',
              }} />

              {/* Top-left badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                viewport={{ once: true }}
                className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                style={{ background: 'rgba(10,26,18,0.75)', border: '1px solid rgba(201,150,42,0.55)', color: '#E8C96D', fontFamily: '"Cinzel", serif', backdropFilter: 'blur(12px)' }}
              >
                ✦ Our Journey
              </motion.div>

              {/* Zoom hint */}
              <div className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: 'rgba(10,26,18,0.7)', border: '1px solid rgba(201,150,42,0.5)', color: '#E8C96D' }}>
                <ZoomIn size={16} />
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-7 sm:p-10">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.9 }}
                  viewport={{ once: true }}
                  style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(2rem, 5.5vw, 4rem)', color: '#E8C96D', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
                >
                  Our Story in Frames
                </motion.p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em]" style={{ color: 'rgba(232,201,109,0.6)', fontFamily: '"Cinzel", serif' }}>
                  A collection of beautiful memories together
                </p>
              </div>

              {/* Corner ornaments */}
              <div className="absolute top-4 right-16 text-xl opacity-40 pointer-events-none" style={{ color: '#E8C96D' }}>❧</div>
              <div className="absolute bottom-4 left-5 text-xl opacity-40 pointer-events-none" style={{ color: '#E8C96D', transform: 'rotate(180deg)' }}>❧</div>
            </div>
          </motion.div>

          {/* ── SECTION DIVIDER ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-5 mb-6 sm:mb-8"
          >
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.5))' }} />
            <span className="text-xs uppercase tracking-[0.45em] font-bold" style={{ color: 'rgba(201,150,42,0.75)', fontFamily: '"Cinzel", serif' }}>
              Cherished Moments
            </span>
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.5), transparent)' }} />
          </motion.div>

          {/* ── PORTRAIT DUO — cinematic split ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {[PHOTOS[1], PHOTOS[2]].map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 55, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.05, delay: i * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => open(i + 1)}
                className="relative cursor-pointer group"
              >
                {/* Hover glow */}
                <div className="absolute -inset-1 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                  style={{ background: i === 0 ? 'radial-gradient(ellipse, rgba(201,150,42,0.35) 0%, transparent 70%)' : 'radial-gradient(ellipse, rgba(107,175,138,0.35) 0%, transparent 70%)', filter: 'blur(14px)' }} />

                <div className="relative rounded-2xl overflow-hidden" style={{
                  boxShadow: '0 20px 65px rgba(26,58,47,0.2), 0 6px 20px rgba(0,0,0,0.12)',
                  border: '1.5px solid rgba(201,150,42,0.22)',
                  aspectRatio: '3/4',
                }}>
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ objectPosition: 'center top' }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(0deg, rgba(10,26,18,0.82) 0%, rgba(10,26,18,0.1) 50%, transparent 80%)' }} />

                  {/* Caption slide-up */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p style={{ fontFamily: '"Great Vibes", cursive', fontSize: '1.8rem', color: '#E8C96D' }}>
                      {photo.caption}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(232,201,109,0.65)', fontFamily: '"Lato", sans-serif', letterSpacing: '0.08em' }}>
                      {photo.sub}
                    </p>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'rgba(10,26,18,0.72)', border: '1px solid rgba(201,150,42,0.5)', color: '#E8C96D' }}>
                    <ZoomIn size={14} />
                  </div>

                  {/* Corner ornaments */}
                  <div className="absolute top-3 left-3 text-base opacity-45 pointer-events-none" style={{ color: 'rgba(201,150,42,0.9)' }}>❧</div>
                  <div className="absolute bottom-3 right-3 text-base opacity-45 pointer-events-none" style={{ color: 'rgba(201,150,42,0.9)', transform: 'rotate(180deg)' }}>❧</div>

                  {/* Inner glow frame */}
                  <div className="absolute inset-3 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ border: '1px solid rgba(201,150,42,0.38)', boxShadow: 'inset 0 0 25px rgba(201,150,42,0.08)' }} />
                </div>

                {/* Caption below card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                  viewport={{ once: true }}
                  className="mt-4 text-center"
                >
                  <p className="text-sm font-semibold" style={{ color: 'rgba(26,58,47,0.7)', fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', letterSpacing: '0.04em' }}>
                    {photo.caption}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(26,58,47,0.42)', fontFamily: '"Lato", sans-serif', letterSpacing: '0.06em' }}>
                    {photo.sub}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* ── Islamic Verse ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 sm:mt-28 text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.55))' }} />
              <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 3, repeat: Infinity }}
                style={{ color: 'rgba(201,150,42,0.7)', fontSize: '1.1rem' }}>✦</motion.span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.55), transparent)' }} />
            </div>

            <div className="p-8 sm:p-12 rounded-3xl" style={{
              background: 'linear-gradient(135deg, rgba(26,58,47,0.05) 0%, rgba(201,150,42,0.05) 100%)',
              border: '1px solid rgba(201,150,42,0.22)',
              boxShadow: '0 8px 48px rgba(26,58,47,0.07), inset 0 1px 0 rgba(201,150,42,0.12)',
            }}>
              <p className="text-2xl sm:text-3xl mb-5 leading-loose" style={{ color: 'rgba(201,150,42,0.85)', direction: 'rtl' }}>
                ﴾ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴿
              </p>
              <p className="italic text-sm sm:text-base mb-3 leading-[1.9]"
                style={{ color: 'rgba(26,58,47,0.62)', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem' }}>
                "And among His signs is that He created for you from yourselves mates,<br />
                that you may find tranquility in them."
              </p>
              <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(26,58,47,0.38)', fontFamily: '"Cinzel", serif' }}>
                — Surah Ar-Rum 30:21
              </span>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
