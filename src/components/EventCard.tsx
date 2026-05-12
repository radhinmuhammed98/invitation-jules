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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className="relative max-w-4xl mx-auto"
    >
      {/* Main Card */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          boxShadow: '0 30px 80px rgba(26,58,47,0.2), 0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(201,150,42,0.2)',
        }}
      >
        {/* Full-bleed image section */}
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8 }}
          />
          {/* Gradient overlay on image */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(0deg, rgba(13,34,24,0.95) 0%, rgba(13,34,24,0.5) 50%, rgba(13,34,24,0.1) 100%)',
            }}
          />
          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="uppercase tracking-[0.4em] text-xs mb-2 font-semibold"
              style={{ color: 'rgba(201,150,42,0.9)', fontFamily: '"Lato", sans-serif' }}
            >
              ✦ &nbsp; {event.date}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                color: '#E8C96D',
                lineHeight: 1.1,
              }}
            >
              {event.title}
            </motion.h2>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-4 right-4 text-2xl opacity-50"
            style={{ color: '#C9962A' }}>❧</div>
        </div>

        {/* Details section */}
        <div
          className="p-6 sm:p-8 md:p-10"
          style={{ background: 'linear-gradient(135deg, #FDF8F0 0%, #F7EDD8 100%)' }}
        >
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="italic mb-6 text-base sm:text-lg leading-relaxed"
            style={{ color: 'rgba(26,58,47,0.7)', fontFamily: '"Cormorant Garamond", serif' }}
          >
            "{event.description}"
          </motion.p>

          {/* Info pills */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex items-center gap-3 flex-1"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(26,58,47,0.1)', color: '#1A3A2F' }}
              >
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
                  style={{ color: 'rgba(201,150,42,0.8)', fontFamily: '"Lato", sans-serif' }}>
                  Time
                </p>
                <p className="text-sm sm:text-base font-semibold"
                  style={{ color: '#1A3A2F', fontFamily: '"Cinzel", serif', letterSpacing: '0.05em' }}>
                  {event.time}
                </p>
              </div>
            </motion.div>

            <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-amber-200 to-transparent" />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex items-center gap-3 flex-1"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(26,58,47,0.1)', color: '#1A3A2F' }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5"
                  style={{ color: 'rgba(201,150,42,0.8)', fontFamily: '"Lato", sans-serif' }}>
                  Venue
                </p>
                <p className="text-sm sm:text-base font-semibold"
                  style={{ color: '#1A3A2F', fontFamily: '"Cinzel", serif', letterSpacing: '0.05em' }}>
                  {event.venue}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Get Directions Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-6 flex justify-center sm:justify-start"
          >
            <motion.a
              href="https://maps.google.com/?q=Surabhi+Auditorium+Perambra"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(26,58,47,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all"
              style={{
                background: 'linear-gradient(135deg, #1A3A2F, #2D5E47)',
                color: '#E8C96D',
                border: '1px solid rgba(201,150,42,0.3)',
                fontFamily: '"Lato", sans-serif',
                letterSpacing: '0.18em',
              }}
            >
              <MapPin size={14} /> Get Directions
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Floating ornament */}
      <motion.div
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
        style={{
          background: 'linear-gradient(135deg, #C9962A, #E8C96D)',
          boxShadow: '0 4px 20px rgba(201,150,42,0.5)',
        }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <span style={{ color: '#1A3A2F', fontSize: '1.3rem' }}>✿</span>
      </motion.div>
    </motion.div>
  );
}
