import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// ── All photos ──────────────────────────────────────────────────────────────
const COUPLE_PHOTOS = [
  {
    src: '/WhatsApp Image 2026-05-12 at 9.47.36 PM.jpeg',
    caption: 'Together Always',
    aspect: 'portrait',
  },
  {
    src: '/WhatsApp Image 2026-05-12 at 9.47.35 PM(1).jpeg',
    caption: 'Side by Side',
    aspect: 'portrait',
  },
  {
    src: '/WhatsApp Image 2026-05-12 at 9.47.35 PM.jpeg',
    caption: 'A Glance of Love',
    aspect: 'portrait',
  },
  {
    src: '/photo_agra.jpg',
    caption: 'Our Journey Begins',
    aspect: 'portrait',
  },
  {
    src: '/photo_casual.jpg',
    caption: 'Moments to Cherish',
    aspect: 'portrait',
  },
];

const COLLAGE_PHOTO = {
  src: '/photo_collage.jpg',
  caption: 'Our Story in Frames',
};

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  photos,
  current,
  onClose,
  onPrev,
  onNext,
}: {
  photos: typeof COUPLE_PHOTOS;
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(4, 12, 8, 0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(201,150,42,0.15)', border: '1px solid rgba(201,150,42,0.4)', color: '#E8C96D' }}
      >
        <X size={20} />
      </motion.button>

      {/* Prev */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(201,150,42,0.15)', border: '1px solid rgba(201,150,42,0.4)', color: '#E8C96D' }}
      >
        <ChevronLeft size={22} />
      </motion.button>

      {/* Next */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(201,150,42,0.15)', border: '1px solid rgba(201,150,42,0.4)', color: '#E8C96D' }}
      >
        <ChevronRight size={22} />
      </motion.button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col items-center"
          style={{ maxWidth: '90vw', maxHeight: '90vh' }}
        >
          <img
            src={photos[current].src}
            alt={photos[current].caption}
            style={{
              maxWidth: '85vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: '16px',
              border: '2px solid rgba(201,150,42,0.3)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm uppercase tracking-widest text-center"
            style={{ color: 'rgba(232,201,109,0.8)', fontFamily: '"Cinzel", serif', letterSpacing: '0.2em' }}
          >
            {photos[current].caption}
          </motion.p>

          {/* Counter */}
          <p className="mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"Lato", sans-serif' }}>
            {current + 1} / {photos.length}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Gallery ──────────────────────────────────────────────────────────────
export function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const allPhotos = [...COUPLE_PHOTOS];

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : 0), [allPhotos.length]);
  const nextPhoto = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % allPhotos.length : 0), [allPhotos.length]);

  return (
    <>
      {/* ── Lightbox overlay ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={allPhotos}
            current={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>

      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #F0E8D0 40%, #E8DCC0 70%, #FDF8F0 100%)' }}
      >
        {/* ── Ambient glow orbs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #C9636B 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translateX(-30%)' }} />
          <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #C9962A 0%, transparent 70%)', filter: 'blur(50px)', transform: 'translateX(30%)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 opacity-30"
            style={{ background: 'radial-gradient(ellipse, rgba(201,150,42,0.2) 0%, transparent 70%)' }} />
        </div>

        {/* ── Floating petals ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['🌸', '🌺', '✿', '❀', '🌸', '✿'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-xl opacity-10 select-none"
              style={{ left: `${8 + i * 16}%`, top: `${5 + (i % 3) * 30}%` }}
              animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 6 + i * 1.2, repeat: Infinity, delay: i * 0.9 }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
              transition={{ duration: 1.2, delay: 0.1 }}
              viewport={{ once: true }}
              className="uppercase text-xs mb-4 font-bold"
              style={{ color: 'rgba(201,150,42,0.85)', fontFamily: '"Lato", sans-serif' }}
            >
              ✦ &nbsp; Our Story &nbsp; ✦
            </motion.p>
            <h2
              className="mb-5"
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontSize: 'clamp(3rem, 9vw, 6rem)',
                color: '#1A3A2F',
                lineHeight: 1.1,
              }}
            >
              Captured with Love
            </h2>
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.6))' }} />
              <motion.span
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ color: 'rgba(201,150,42,0.8)', fontSize: '1.2rem' }}
              >
                ✿
              </motion.span>
              <div className="h-px w-24 sm:w-40" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.6), transparent)' }} />
            </div>
            <p
              className="italic text-sm sm:text-base max-w-sm mx-auto"
              style={{ color: 'rgba(26,58,47,0.55)', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1.7 }}
            >
              Every picture holds a thousand memories — a glimpse into the love we've built together
            </p>
          </motion.div>

          {/* ── COLLAGE HERO BANNER ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-10 relative group cursor-pointer"
            whileHover={{ y: -6 }}
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                boxShadow: '0 30px 100px rgba(26,58,47,0.25), 0 8px 30px rgba(0,0,0,0.15)',
                border: '2px solid rgba(201,150,42,0.25)',
              }}
            >
              {/* Golden shimmer top border */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 z-10"
                style={{ background: 'linear-gradient(90deg, transparent, #E8C96D, #C9962A, #E8C96D, transparent)' }}
              />

              <img
                src={COLLAGE_PHOTO.src}
                alt="Our Journey — Photo Collage"
                className="w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                style={{ maxHeight: '75vh', objectPosition: 'center top' }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(0deg, rgba(13,34,24,0.75) 0%, rgba(13,34,24,0.1) 40%, transparent 70%)' }}
              />

              {/* Badge — top left */}
              <div
                className="absolute top-5 left-5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'rgba(13,34,24,0.7)',
                  border: '1px solid rgba(201,150,42,0.5)',
                  color: '#E8C96D',
                  fontFamily: '"Cinzel", serif',
                  backdropFilter: 'blur(10px)',
                }}
              >
                ✦ Our Journey
              </div>

              {/* Caption — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  style={{
                    fontFamily: '"Great Vibes", cursive',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    color: '#E8C96D',
                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {COLLAGE_PHOTO.caption}
                </motion.p>
                <p className="mt-1 text-xs uppercase tracking-widest opacity-70" style={{ color: '#E8C96D', fontFamily: '"Lato", sans-serif' }}>
                  A collection of our beautiful memories together
                </p>
              </div>

              {/* Corner ornaments */}
              {['top-4 right-4', 'bottom-4 left-4'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} text-xl pointer-events-none opacity-60`}
                  style={{ color: 'rgba(201,150,42,0.8)', transform: i === 1 ? 'rotate(180deg)' : 'none' }}>
                  ❧
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Label separator ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-10 sm:mb-12"
          >
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.45))' }} />
            <span className="text-xs uppercase tracking-[0.4em] font-bold" style={{ color: 'rgba(201,150,42,0.7)', fontFamily: '"Cinzel", serif' }}>
              Cherished Moments
            </span>
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.45), transparent)' }} />
          </motion.div>

          {/* ── MASONRY-STYLE PHOTO GRID ── */}
          {/* Row 1: Large + Small + Small */}
          <div className="grid gap-4 sm:gap-5 mb-4 sm:mb-5" style={{ gridTemplateColumns: '1.7fr 1fr 1fr' }}>
            {/* Photo 0 — big */}
            <PhotoCard photo={COUPLE_PHOTOS[0]} index={0} onClick={() => openLightbox(0)} rowSpan />
            {/* Photos 1 & 2 stacked */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <PhotoCard photo={COUPLE_PHOTOS[1]} index={1} onClick={() => openLightbox(1)} />
              <PhotoCard photo={COUPLE_PHOTOS[2]} index={2} onClick={() => openLightbox(2)} />
            </div>
            {/* Photos 3 & 4 stacked */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <PhotoCard photo={COUPLE_PHOTOS[3]} index={3} onClick={() => openLightbox(3)} />
              <PhotoCard photo={COUPLE_PHOTOS[4]} index={4} onClick={() => openLightbox(4)} />
            </div>
          </div>

          {/* ── Islamic verse ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-20 text-center max-w-2xl mx-auto"
          >
            {/* Decorative top line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.5))' }} />
              <span style={{ color: 'rgba(201,150,42,0.6)' }}>✦</span>
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.5), transparent)' }} />
            </div>

            <div
              className="p-8 sm:p-10 rounded-3xl relative"
              style={{
                background: 'linear-gradient(135deg, rgba(26,58,47,0.06), rgba(201,150,42,0.06))',
                border: '1px solid rgba(201,150,42,0.2)',
                boxShadow: 'inset 0 1px 0 rgba(201,150,42,0.1)',
              }}
            >
              <p
                className="text-2xl sm:text-3xl mb-4 leading-relaxed"
                style={{ color: 'rgba(201,150,42,0.8)', direction: 'rtl', fontFamily: 'serif' }}
              >
                ﴾ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴿
              </p>
              <p
                className="italic text-sm sm:text-base mb-2"
                style={{ color: 'rgba(26,58,47,0.6)', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1.8 }}
              >
                "And among His signs is that He created for you from yourselves mates,<br />
                that you may find tranquility in them."
              </p>
              <span className="text-xs" style={{ color: 'rgba(26,58,47,0.4)', fontFamily: '"Lato", sans-serif', letterSpacing: '0.1em' }}>
                — Surah Ar-Rum 30:21
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// ── Photo Card ─────────────────────────────────────────────────────────────────
function PhotoCard({
  photo,
  index,
  onClick,
  rowSpan = false,
}: {
  photo: { src: string; caption: string };
  index: number;
  onClick: () => void;
  rowSpan?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="relative group cursor-pointer"
      style={{ minHeight: rowSpan ? '480px' : '220px' }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 12px 40px rgba(26,58,47,0.18), 0 4px 12px rgba(0,0,0,0.1)',
          border: '2px solid rgba(201,150,42,0.18)',
          minHeight: 'inherit',
        }}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ minHeight: 'inherit' }}
        />

        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(0deg, rgba(13,34,24,0.8) 0%, rgba(13,34,24,0.1) 50%, transparent 100%)' }}
        />

        {/* Caption on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <p
            className="text-xs uppercase tracking-widest text-center"
            style={{ color: 'rgba(232,201,109,0.95)', fontFamily: '"Cinzel", serif', letterSpacing: '0.15em' }}
          >
            {photo.caption}
          </p>
        </div>

        {/* Click to enlarge hint */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: 'rgba(13,34,24,0.7)', border: '1px solid rgba(201,150,42,0.5)' }}
        >
          <span style={{ color: '#E8C96D', fontSize: '10px' }}>⛶</span>
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-2 left-2 text-base opacity-50 pointer-events-none"
          style={{ color: 'rgba(201,150,42,0.8)' }}>❧</div>
        <div className="absolute bottom-2 right-2 text-base opacity-50 pointer-events-none"
          style={{ color: 'rgba(201,150,42,0.8)', transform: 'rotate(180deg)' }}>❧</div>

        {/* Inner glow frame on hover */}
        <div
          className="absolute inset-2 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ border: '1px solid rgba(201,150,42,0.35)', boxShadow: 'inset 0 0 20px rgba(201,150,42,0.1)' }}
        />
      </div>
    </motion.div>
  );
}
