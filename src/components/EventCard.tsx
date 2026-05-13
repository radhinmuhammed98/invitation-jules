import { motion } from 'motion/react';
import { Clock, MapPin } from 'lucide-react';

interface EventCardProps {
  key?: string | number;
  event: {
    title: string;
    date: string;
    time: string;
    venue: string;
    image: string;
    description: string;
  };
  index: number;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      className="relative max-w-4xl mx-auto mb-16"
    >
      {/* Main Card */}
      <div
        className="relative overflow-hidden glass-card"
      >
        {/* Full-bleed image section */}
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-t-[1.5rem]">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8 }}
          />
          {/* Gradient overlay on image */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
            }}
          />
          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="uppercase tracking-[0.4em] text-xs mb-2 font-semibold"
              style={{ color: 'var(--color-w-gold)', fontFamily: 'var(--font-sans)' }}
            >
              ✦ &nbsp; {event.date}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                color: '#fff',
                lineHeight: 1.1,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              {event.title}
            </motion.h2>
          </div>
        </div>

        {/* Details section */}
        <div className="p-6 sm:p-8 md:p-10">
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8 text-base sm:text-lg leading-relaxed font-light"
            style={{ color: 'var(--color-w-emerald)', fontFamily: 'var(--font-sans)' }}
          >
            "{event.description}"
          </motion.p>

          {/* Info pills */}
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-4 flex-1 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.6)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-w-champagne-light)', color: 'var(--color-w-champagne)' }}
              >
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
                  style={{ color: 'rgba(26,26,26,0.5)', fontFamily: 'var(--font-sans)' }}>
                  Time
                </p>
                <p className="text-sm sm:text-base font-medium"
                  style={{ color: 'var(--color-w-emerald)', fontFamily: 'var(--font-sans)' }}>
                  {event.time}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-4 flex-1 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.6)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-w-champagne-light)', color: 'var(--color-w-champagne)' }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
                  style={{ color: 'rgba(26,26,26,0.5)', fontFamily: 'var(--font-sans)' }}>
                  Venue
                </p>
                <p className="text-sm sm:text-base font-medium"
                  style={{ color: 'var(--color-w-emerald)', fontFamily: 'var(--font-sans)' }}>
                  {event.venue}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Get Directions Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex justify-center sm:justify-start"
          >
            <motion.a
              href="https://maps.google.com/?q=Surabhi+Auditorium+Perambra"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest glass-button"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}
            >
              <MapPin size={16} /> Get Directions
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
