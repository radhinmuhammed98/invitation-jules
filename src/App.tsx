import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WaxSeal } from './components/WaxSeal';
import { Hero } from './components/Hero';
import { EventCard } from './components/EventCard';
import { PhotoGallery } from './components/PhotoGallery';
import { RSVPSection } from './components/RSVPSection';
import { WEDDING_DATA } from './constants';
import { WeddingWarning } from './components/WeddingWarning';
import { Heart, MapPin, Music, VolumeX, MessageCircle } from 'lucide-react';

// ─── Global Petal Rain ───────────────────────────────────────────────────────
const PETALS = [
  { e: '🌸', l: '4%',  d: 0,    dur: 12 },
  { e: '🌺', l: '13%', d: 2.5,  dur: 9  },
  { e: '✿',  l: '23%', d: 1.2,  dur: 14 },
  { e: '❀',  l: '35%', d: 4,    dur: 10 },
  { e: '🌸', l: '48%', d: 0.7,  dur: 13 },
  { e: '🌺', l: '62%', d: 3.1,  dur: 11 },
  { e: '✿',  l: '74%', d: 1.8,  dur: 15 },
  { e: '❀',  l: '85%', d: 0.4,  dur: 10 },
  { e: '🌸', l: '93%', d: 2.9,  dur: 12 },
];

function GlobalPetalRain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-base select-none"
          style={{ left: p.l, top: '-6%', opacity: 0.18 }}
          animate={{ y: ['0vh', '110vh'], x: [0, 35, -25, 45, 0], rotate: [0, 360] }}
          transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: 'linear' }}
        >
          {p.e}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Floating Music Button ───────────────────────────────────────────────────
function MusicToggle({ audioRef, playing, setPlaying }: { audioRef: React.RefObject<HTMLAudioElement | null>, playing: boolean, setPlaying: (p: boolean) => void }) {
  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      title={playing ? 'Mute background Nasheed' : 'Play background Nasheed'}
      className="fixed bottom-20 right-4 sm:right-6 z-[90] w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
      style={{
        background: 'linear-gradient(135deg, #1A3A2F, #2D5E47)',
        border: '1.5px solid rgba(201,150,42,0.45)',
        color: '#E8C96D',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
      }}
    >
      {playing ? <Music size={18} /> : <VolumeX size={18} />}
      {playing && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(201,150,42,0.4)' }}
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}

// ─── Floating WhatsApp button ────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/?text=We+are+cordially+invited+to+the+wedding+of+Althaf+Hameed+%26+Fathima+on+14+June+2026+at+Surabhi+Auditorium%2C+Perambra"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      title="Share on WhatsApp"
      className="fixed bottom-4 right-4 sm:right-6 z-[90] w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
      style={{
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        border: '1.5px solid rgba(255,255,255,0.2)',
        color: '#fff',
        boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
      }}
    >
      <MessageCircle size={20} fill="white" />
    </motion.a>
  );
}

// ─── Floral decoration SVG ────────────────────────────────────────────────────
function FloralBorder({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 500 60"
      className="w-full max-w-lg mx-auto"
      style={{ transform: flip ? 'scaleY(-1)' : 'none', opacity: 0.75 }}
      fill="none"
    >
      {/* Center motif */}
      <g transform="translate(250,30)">
        <circle cx="0" cy="0" r="6" fill="#C9962A" />
        <circle cx="0" cy="0" r="3" fill="#E8C96D" />
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <ellipse
            key={i}
            cx={Math.cos((a * Math.PI) / 180) * 14}
            cy={Math.sin((a * Math.PI) / 180) * 14}
            rx="5" ry="12"
            transform={`rotate(${a} ${Math.cos((a * Math.PI) / 180) * 14} ${Math.sin((a * Math.PI) / 180) * 14})`}
            fill={i % 2 === 0 ? '#C9636B' : '#E8A0A5'}
            opacity="0.8"
          />
        ))}
      </g>
      {/* Left branch */}
      <path d="M 240 30 Q 200 20 160 28 Q 130 35 100 22 Q 70 12 40 28" stroke="#C9962A" strokeWidth="1.5" opacity="0.5" fill="none" strokeDasharray="3 2" />
      {/* Small flowers left */}
      {[160, 100].map((x, i) => (
        <g key={i} transform={`translate(${x},${i === 0 ? 28 : 22})`}>
          {[0, 60, 120, 180, 240, 300].map((a, j) => (
            <ellipse key={j} cx={Math.cos((a * Math.PI) / 180) * 7} cy={Math.sin((a * Math.PI) / 180) * 7} rx="3" ry="7"
              transform={`rotate(${a} ${Math.cos((a * Math.PI) / 180) * 7} ${Math.sin((a * Math.PI) / 180) * 7})`}
              fill={j % 2 === 0 ? '#C9636B' : '#F4D1D3'} opacity="0.7" />
          ))}
          <circle cx="0" cy="0" r="3" fill="#C9962A" />
        </g>
      ))}
      {/* Right mirror */}
      <path d="M 260 30 Q 300 20 340 28 Q 370 35 400 22 Q 430 12 460 28" stroke="#C9962A" strokeWidth="1.5" opacity="0.5" fill="none" strokeDasharray="3 2" />
      {[340, 400].map((x, i) => (
        <g key={i} transform={`translate(${x},${i === 0 ? 28 : 22})`}>
          {[0, 60, 120, 180, 240, 300].map((a, j) => (
            <ellipse key={j} cx={Math.cos((a * Math.PI) / 180) * 7} cy={Math.sin((a * Math.PI) / 180) * 7} rx="3" ry="7"
              transform={`rotate(${a} ${Math.cos((a * Math.PI) / 180) * 7} ${Math.sin((a * Math.PI) / 180) * 7})`}
              fill={j % 2 === 0 ? '#C9636B' : '#F4D1D3'} opacity="0.7" />
          ))}
          <circle cx="0" cy="0" r="3" fill="#C9962A" />
        </g>
      ))}
    </svg>
  );
}

// ─── Section wrapper with parallax entry ─────────────────────────────────────
function SectionEntry({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-60px' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    // Start Nasheed when seal is opened (user interaction requirement met)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ background: '#FDF8F0', minHeight: '100vh' }}>
      {/* Hidden Audio Player for Nasheed */}
      <audio
        ref={audioRef}
        loop
        src="/wedding_nasheed.mp3"
      />

      {/* ── INTRO SEAL ─────────────────────────────────────────────────── */}
      <WaxSeal isOpen={isOpen} onOpen={handleOpen} />

      {/* ── GLOBAL OVERLAYS (always mounted after open) ───────────────── */}
      {isOpen && <GlobalPetalRain />}
      {isOpen && <MusicToggle audioRef={audioRef} playing={isPlaying} setPlaying={setIsPlaying} />}

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.main
            key="main-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* HERO */}
            <Hero />

            {/* ── GRADIENT BRIDGE: dark hero → light invitation ──────── */}
            <div style={{
              height: '180px',
              background: 'linear-gradient(180deg, #081810 0%, #0f2318 25%, #1a2e1a 55%, #e8dfc8 100%)',
              marginTop: '-2px',
            }} />

            {/* ── INVITATION INTRO ─────────────────────────────────────── */}
            <section
              className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #e8dfc8 0%, #F7EDD8 20%, #FDF8F0 60%, #F7EDD8 100%)' }}
            >
              {/* Background floating petals */}
              {['🌸', '✿', '🌺', '❀'].map((e, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl pointer-events-none opacity-10 select-none"
                  style={{ left: `${15 + i * 22}%`, top: `${5 + (i % 2) * 60}%` }}
                  animate={{ y: [0, -15, 0], rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.8 }}
                >
                  {e}
                </motion.div>
              ))}

              <div className="max-w-3xl mx-auto text-center relative z-10">
                {/* Top floral */}
                <SectionEntry>
                  <FloralBorder />
                </SectionEntry>

                {/* Bismillah */}
                <SectionEntry>
                  <p
                    className="text-3xl sm:text-4xl mt-6 mb-2"
                    style={{ color: 'rgba(201,150,42,0.8)' }}
                  >
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p
                    className="text-xs uppercase tracking-[0.4em] mb-8 font-semibold"
                    style={{ color: 'rgba(26,58,47,0.5)', fontFamily: '"Lato", sans-serif' }}
                  >
                    In the Name of Allah, the Most Gracious, the Most Merciful
                  </p>
                </SectionEntry>

                {/* Main invitation text */}
                <SectionEntry>
                  <p
                    className="text-base sm:text-lg leading-relaxed italic mb-8"
                    style={{ color: 'rgba(26,58,47,0.72)', fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    With great joy and gratitude to the Almighty, we cordially invite you
                    and your family to attend the marriage ceremony of
                  </p>
                </SectionEntry>

                {/* Groom Details */}
                <SectionEntry>
                  <div
                    className="mb-6 p-5 sm:p-6 rounded-2xl relative"
                    style={{
                      background: 'rgba(26,58,47,0.04)',
                      border: '1px solid rgba(26,58,47,0.12)',
                      boxShadow: '0 8px 30px rgba(26,58,47,0.08)',
                    }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest"
                      style={{ background: 'linear-gradient(135deg, #1A3A2F, #2D5E47)', color: '#E8C96D', fontFamily: '"Lato", sans-serif' }}>
                      Groom
                    </div>
                    <h3
                      className="mt-2 mb-1"
                      style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#1A3A2F' }}
                    >
                      Althaf Hameed
                    </h3>
                    <p
                      className="text-sm sm:text-base italic"
                      style={{ color: 'rgba(26,58,47,0.65)', fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      Grandson of{' '}
                      <strong style={{ color: '#1A3A2F' }}>Moideen N.M. &amp; Ayisha</strong>
                      <br />
                      and <strong style={{ color: '#1A3A2F' }}>Moideen &amp; Nabeesa</strong>
                    </p>
                  </div>
                </SectionEntry>

                {/* Divider between groom & bride */}
                <SectionEntry>
                  <div className="flex items-center justify-center gap-3 my-4">
                    <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.5))' }} />
                    <motion.span
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ color: '#C9636B', fontSize: '1.5rem' }}
                    >
                      ❤
                    </motion.span>
                    <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.5), transparent)' }} />
                  </div>
                </SectionEntry>

                {/* Bride Details */}
                <SectionEntry>
                  <div
                    className="mb-6 p-5 sm:p-6 rounded-2xl relative"
                    style={{
                      background: 'rgba(253,248,240,0.85)',
                      border: '1px solid rgba(201,150,42,0.25)',
                      boxShadow: '0 8px 30px rgba(201,150,42,0.1)',
                    }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest"
                      style={{ background: 'linear-gradient(135deg, #C9962A, #E8C96D)', color: '#1A3A2F', fontFamily: '"Lato", sans-serif' }}>
                      Bride
                    </div>
                    <h3
                      className="mt-2 mb-1"
                      style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#1A3A2F' }}
                    >
                      Fathima
                    </h3>
                    <p
                      className="text-sm sm:text-base italic"
                      style={{ color: 'rgba(26,58,47,0.65)', fontFamily: '"Cormorant Garamond", serif' }}
                    >
                      Daughter of <strong style={{ color: '#1A3A2F' }}>Nasir</strong> and{' '}
                      <strong style={{ color: '#1A3A2F' }}>Shamsina</strong>
                    </p>
                    <div
                      className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs"
                      style={{ background: 'rgba(201,150,42,0.1)', color: 'rgba(201,150,42,0.9)', fontFamily: '"Lato", sans-serif', letterSpacing: '0.1em' }}
                    >
                      🏠 Padikkalekkandi
                    </div>
                  </div>
                </SectionEntry>

                {/* Bottom floral */}
                <SectionEntry>
                  <FloralBorder flip />
                </SectionEntry>
              </div>
            </section>

            {/* ── EVENTS SECTION ────────────────────────────────────────── */}
            <section
              className="py-16 sm:py-24 px-4 sm:px-6"
              style={{ background: '#FDF8F0' }}
            >
              <SectionEntry className="text-center mb-12 sm:mb-16">
                <p className="uppercase tracking-[0.5em] text-xs mb-3 font-semibold"
                  style={{ color: 'rgba(201,150,42,0.8)', fontFamily: '"Lato", sans-serif' }}>
                  ✦ &nbsp; Mark Your Calendar &nbsp; ✦
                </p>
                <h2
                  style={{
                    fontFamily: '"Great Vibes", cursive',
                    fontSize: 'clamp(2.8rem, 8vw, 5rem)',
                    color: '#1A3A2F',
                  }}
                >
                  The Blessed Day
                </h2>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="h-px w-20 sm:w-32" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.5))' }} />
                  <span style={{ color: 'rgba(201,150,42,0.7)', fontSize: '1.1rem' }}>❧</span>
                  <div className="h-px w-20 sm:w-32" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.5), transparent)' }} />
                </div>
              </SectionEntry>

              <div className="max-w-4xl mx-auto">
                {WEDDING_DATA.events.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            </section>

            {/* ── WARNING CARD ──────────────────────────────────────────── */}
            <section
              className="py-4 sm:py-6"
              style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #FFF5F5 50%, #FDF8F0 100%)' }}
            >
              <WeddingWarning />
            </section>

            {/* ── PHOTO GALLERY ─────────────────────────────────────────── */}
            <PhotoGallery />

            {/* ── BRIDGE: light gallery → dark venue ── */}
            <div style={{ height: '160px', background: 'linear-gradient(180deg, #F7EDD8 0%, #c8d8c0 30%, #3a6b52 65%, #1A3A2F 100%)', marginTop: '-2px' }} />

            {/* ── VENUE SECTION ─────────────────────────────────────────── */}
            <section
              className="py-16 sm:py-24 px-4 sm:px-6 text-center"
              style={{ background: 'linear-gradient(180deg, #1A3A2F 0%, #0D2218 60%, #071510 100%)' }}
            >
              <div className="max-w-4xl mx-auto">
                <SectionEntry>
                  <p className="uppercase tracking-[0.5em] text-xs mb-3 font-semibold"
                    style={{ color: 'rgba(201,150,42,0.8)', fontFamily: '"Lato", sans-serif' }}>
                    ✦ &nbsp; Venue &nbsp; ✦
                  </p>
                  <h2
                    className="mb-6"
                    style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(2.8rem, 8vw, 5rem)', color: '#E8C96D' }}
                  >
                    Where We Celebrate
                  </h2>

                  {/* Venue card */}
                  <div
                    className="rounded-3xl overflow-hidden mb-8 relative"
                    style={{ border: '1px solid rgba(201,150,42,0.3)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}
                  >
                    <div className="relative h-48 sm:h-64 md:h-80">
                      <img
                        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1920"
                        alt="Surabhi Auditorium"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(0deg, rgba(13,34,24,0.8) 0%, rgba(13,34,24,0.2) 100%)' }}
                      />
                      <div className="absolute bottom-4 left-0 right-0 px-6">
                        <p style={{ fontFamily: '"Cinzel", serif', color: '#E8C96D', fontSize: '1.3rem', letterSpacing: '0.1em' }}>
                          Surabhi Auditorium
                        </p>
                        <p style={{ color: 'rgba(253,248,240,0.6)', fontSize: '0.9rem', fontFamily: '"Lato", sans-serif', letterSpacing: '0.1em' }}>
                          Perambra
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm"
                      style={{ border: '1px solid rgba(201,150,42,0.3)', color: 'rgba(232,201,109,0.9)', fontFamily: '"Cinzel", serif', letterSpacing: '0.08em' }}
                    >
                      📅 &nbsp; Sunday, 14 June 2026
                    </div>
                    <div
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm"
                      style={{ border: '1px solid rgba(201,150,42,0.3)', color: 'rgba(232,201,109,0.9)', fontFamily: '"Cinzel", serif', letterSpacing: '0.08em' }}
                    >
                      🕒 &nbsp; 03:00 PM
                    </div>
                  </div>

                  <motion.a
                    href={WEDDING_DATA.venue.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(201,150,42,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #C9962A, #E8C96D)',
                      color: '#1A3A2F',
                      fontFamily: '"Lato", sans-serif',
                      letterSpacing: '0.18em',
                    }}
                  >
                    <MapPin size={16} /> Get Directions
                  </motion.a>
                </SectionEntry>
              </div>
            </section>

            {/* ── BRIDGE: dark venue → light hosts ── */}
            <div style={{ height: '160px', background: 'linear-gradient(180deg, #071510 0%, #0f2318 30%, #3a6b52 65%, #e8dfc8 100%)' }} />

            {/* ── HOSTS SECTION ─────────────────────────────────────────── */}
            <section
              className="py-16 sm:py-24 px-4 sm:px-6"
              style={{ background: 'linear-gradient(180deg, #e8dfc8 0%, #F7EDD8 15%, #FDF8F0 50%, #F7EDD8 100%)' }}
            >
              <div className="max-w-3xl mx-auto text-center">
                <SectionEntry>
                  <FloralBorder />
                  <p className="uppercase tracking-[0.5em] text-xs mt-6 mb-3 font-semibold"
                    style={{ color: 'rgba(201,150,42,0.8)', fontFamily: '"Lato", sans-serif' }}>
                    ✦ &nbsp; With Love From &nbsp; ✦
                  </p>
                  <h2
                    className="mb-8"
                    style={{ fontFamily: '"Great Vibes", cursive', fontSize: 'clamp(2.8rem, 8vw, 4.5rem)', color: '#1A3A2F' }}
                  >
                    Hosts
                  </h2>

                  {/* With Love */}
                  <div
                    className="mb-6 p-5 sm:p-7 rounded-2xl"
                    style={{
                      background: 'rgba(253,248,240,0.9)',
                      border: '1px solid rgba(201,150,42,0.25)',
                      boxShadow: '0 10px 40px rgba(201,150,42,0.1)',
                    }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.4))' }} />
                      <span className="text-xs uppercase tracking-widest font-bold px-3"
                        style={{ color: '#C9962A', fontFamily: '"Lato", sans-serif' }}>
                        With Love
                      </span>
                      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.4), transparent)' }} />
                    </div>
                    {WEDDING_DATA.hosts.withLove.map((host, i) => (
                      <p
                        key={i}
                        className="text-base sm:text-lg font-semibold mb-1"
                        style={{ color: '#1A3A2F', fontFamily: '"Cormorant Garamond", serif', letterSpacing: '0.02em' }}
                      >
                        {host}
                      </p>
                    ))}
                  </div>

                  {/* With Best Compliments */}
                  <div
                    className="p-5 sm:p-7 rounded-2xl"
                    style={{
                      background: 'rgba(26,58,47,0.04)',
                      border: '1px solid rgba(26,58,47,0.1)',
                    }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(26,58,47,0.2))' }} />
                      <span className="text-xs uppercase tracking-widest font-bold px-3"
                        style={{ color: 'rgba(26,58,47,0.5)', fontFamily: '"Lato", sans-serif' }}>
                        With Best Compliments
                      </span>
                      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(26,58,47,0.2), transparent)' }} />
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {WEDDING_DATA.hosts.withCompliments.map((name, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 rounded-full text-sm font-semibold"
                          style={{
                            background: 'rgba(201,150,42,0.12)',
                            color: 'rgba(26,58,47,0.8)',
                            border: '1px solid rgba(201,150,42,0.2)',
                            fontFamily: '"Cormorant Garamond", serif',
                          }}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <FloralBorder flip />
                </SectionEntry>
              </div>
            </section>

            {/* ── BRIDGE: light hosts → dark RSVP ── */}
            <div style={{ height: '160px', background: 'linear-gradient(180deg, #F7EDD8 0%, #c8d8c0 30%, #3a6b52 65%, #0D2218 100%)', marginTop: '-2px' }} />

            {/* ── RSVP ──────────────────────────────────────────────────── */}
            <RSVPSection />

            {/* ── FOOTER ────────────────────────────────────────────────── */}
            <footer
              className="py-14 sm:py-20 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #071510 0%, #0D2218 40%, #1A3A2F 100%)' }}
            >
              {/* Floating stars */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs pointer-events-none"
                  style={{
                    left: `${8 + (i * 19) % 84}%`,
                    top: `${10 + (i * 17) % 80}%`,
                    color: 'rgba(201,150,42,0.35)',
                  }}
                  animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2 + i * 0.4, delay: i * 0.3, repeat: Infinity }}
                >
                  ✦
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="mb-4"
                >
                  <Heart
                    fill="#C9636B"
                    stroke="none"
                    size={32}
                    className="mx-auto"
                  />
                </motion.div>

                <h2
                  className="mb-2"
                  style={{
                    fontFamily: '"Great Vibes", cursive',
                    fontSize: 'clamp(3rem, 9vw, 5.5rem)',
                    background: 'linear-gradient(135deg, #C9962A 0%, #E8C96D 50%, #C9962A 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 6s linear infinite',
                  }}
                >
                  Althaf Hameed &amp; Fathima
                </h2>

                <p
                  className="text-xs uppercase tracking-[0.6em] mb-6"
                  style={{ color: 'rgba(201,150,42,0.7)', fontFamily: '"Cinzel", serif' }}
                >
                  14 . 06 . 2026
                </p>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.4))' }} />
                  <span style={{ color: 'rgba(201,150,42,0.5)' }}>✿</span>
                  <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.4), transparent)' }} />
                </div>

                <p
                  className="text-sm italic mb-2"
                  style={{ color: 'rgba(253,248,240,0.35)', fontFamily: '"Cormorant Garamond", serif' }}
                >
                  Surabhi Auditorium, Perambra
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'rgba(253,248,240,0.2)', fontFamily: '"Lato", sans-serif', letterSpacing: '0.15em' }}
                >
                  #AlthafFathimaWedding2026
                </p>
              </motion.div>
            </footer>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
