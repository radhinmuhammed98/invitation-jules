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
  {
    src: '/old-photo.jpeg',
    caption: 'Timeless Love',
    sub: 'A moment captured, a memory kept forever',
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
        className="relative overflow-hidden pt-12 pb-24"
      >
        {/* Soft floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, var(--color-w-gold) 0%, transparent 65%)', filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full opacity-[0.02]"
            style={{ background: 'radial-gradient(ellipse, var(--color-w-emerald) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(-50%, -50%)' }} />
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-24"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.55em' }}
              transition={{ duration: 1.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="uppercase text-xs font-semibold mb-5"
              style={{ color: 'var(--color-w-gold)', fontFamily: 'var(--font-sans)' }}
            >
              ✦ &nbsp; Our Moments &nbsp; ✦
            </motion.p>

            <h2 style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(3.2rem, 10vw, 6.5rem)',
              lineHeight: 1.05,
              color: 'var(--color-w-emerald)'
            }}>
              Captured with Love
            </h2>

            <div className="flex items-center justify-center gap-5 mt-6 mb-5">
              <div className="h-px w-28 sm:w-44" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{ color: 'rgba(212,175,55,0.6)', fontSize: '1.1rem' }}
              >✿</motion.span>
              <div className="h-px w-28 sm:w-44" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
            </div>

            <p className="font-light text-sm sm:text-base max-w-md mx-auto leading-relaxed"
              style={{ color: 'rgba(26,26,26,0.6)', fontFamily: 'var(--font-sans)', fontSize: '1rem' }}>
              Every picture holds a thousand memories — a glimpse into the love we've built together
            </p>
          </motion.div>

          {/* ── PHOTO GRID (4 Photos) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -4 }}
                onClick={() => open(i)}
                className={`relative cursor-pointer group ${i === 0 ? 'sm:col-span-2' : ''}`}
              >
                <div className="glass-card p-2 rounded-[2rem]">
                  <div className={`relative rounded-3xl overflow-hidden bg-white/50 ${i === 0 ? 'aspect-video' : 'aspect-[3/4]'}`}>
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: 'center top' }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />

                    {/* Zoom icon */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 backdrop-blur-md bg-white/30"
                      style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}>
                      <ZoomIn size={14} />
                    </div>
                  </div>
                </div>

                {/* Caption below card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                  viewport={{ once: true }}
                  className="mt-5 text-center px-4"
                >
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-w-emerald)', fontFamily: 'var(--font-sans)', fontSize: '1.05rem', letterSpacing: '0.02em' }}>
                    {photo.caption}
                  </p>
                  <p className="text-[11px] mt-1 font-light" style={{ color: 'rgba(26,26,26,0.5)', fontFamily: 'var(--font-sans)', letterSpacing: '0.04em' }}>
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
            className="mt-24 sm:mt-32 text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
              <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}
                style={{ color: 'rgba(212,175,55,0.6)', fontSize: '0.9rem' }}>✦</motion.span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
            </div>

            <div className="p-8 sm:p-12 glass-card">
              <p className="text-2xl sm:text-3xl mb-6 leading-loose" style={{ color: 'var(--color-w-gold)', direction: 'rtl' }}>
                ﴾ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴿
              </p>
              <p className="italic text-sm sm:text-base mb-4 leading-[1.9] font-light"
                style={{ color: 'var(--color-w-emerald)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>
                "And among His signs is that He created for you from yourselves mates,<br />
                that you may find tranquility in them."
              </p>
              <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'rgba(26,26,26,0.4)', fontFamily: 'var(--font-sans)' }}>
                — Surah Ar-Rum 30:21
              </span>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
