import { motion } from 'motion/react';
import { WEDDING_DATA } from '../constants';

export function PhotoGallery() {
  const photos = WEDDING_DATA.couple_photos;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #F7EDD8 50%, #FDF8F0 100%)' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9636B, transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #C9962A, transparent)' }} />
        {/* Floating floral emojis */}
        {['🌸', '🌺', '✿', '❀', '🌸'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-15 select-none"
            style={{ left: `${10 + i * 20}%`, top: `${10 + (i % 2) * 70}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7 }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p
            className="uppercase tracking-[0.5em] text-xs mb-3 font-semibold"
            style={{ color: 'rgba(201,150,42,0.8)', fontFamily: '"Lato", sans-serif' }}
          >
            ✦ &nbsp; Our Moments &nbsp; ✦
          </p>
          <h2
            className="mb-4 leading-tight"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(2.8rem, 8vw, 5rem)',
              color: '#1A3A2F',
            }}
          >
            Captured with Love
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-20 sm:w-32" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,150,42,0.5))' }} />
            <span style={{ color: 'rgba(201,150,42,0.7)', fontSize: '1.1rem' }}>✿</span>
            <div className="h-px w-20 sm:w-32" style={{ background: 'linear-gradient(90deg, rgba(201,150,42,0.5), transparent)' }} />
          </div>
          <p
            className="italic text-sm sm:text-base"
            style={{ color: 'rgba(26,58,47,0.55)', fontFamily: '"Cormorant Garamond", serif' }}
          >
            A glimpse of the love we share
          </p>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: index * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              {/* Card container */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: index === 1 ? '3/4.5' : '3/4',
                  boxShadow: '0 10px 40px rgba(26,58,47,0.15), 0 4px 12px rgba(0,0,0,0.1)',
                  border: '3px solid rgba(201,150,42,0.2)',
                }}
              >
                {/* Photo */}
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Elegant overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6"
                  style={{ background: 'linear-gradient(0deg, rgba(26,58,47,0.7) 0%, transparent 60%)' }}
                >
                  <p
                    className="text-sm tracking-widest uppercase"
                    style={{ color: 'rgba(232,201,109,0.9)', fontFamily: '"Cinzel", serif', letterSpacing: '0.15em' }}
                  >
                    Althaf &amp; Fathima
                  </p>
                </div>

                {/* Corner floral ornament */}
                <div className="absolute top-3 right-3 text-lg opacity-70 pointer-events-none"
                  style={{ color: 'rgba(201,150,42,0.8)' }}>
                  ❧
                </div>
                <div className="absolute bottom-3 left-3 text-lg opacity-70 pointer-events-none"
                  style={{ color: 'rgba(201,150,42,0.8)', transform: 'scaleX(-1) scaleY(-1)' }}>
                  ❧
                </div>

                {/* Inner border frame */}
                <div
                  className="absolute inset-3 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ border: '1px solid rgba(201,150,42,0.4)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Islamic verse below photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto"
        >
          <p
            className="text-2xl sm:text-3xl mb-3"
            style={{ color: 'rgba(201,150,42,0.7)' }}
          >
            ﴾ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا ﴿
          </p>
          <p
            className="italic text-sm sm:text-base"
            style={{ color: 'rgba(26,58,47,0.55)', fontFamily: '"Cormorant Garamond", serif' }}
          >
            "And among His signs is that He created for you from yourselves mates"
            <br />
            <span className="text-xs" style={{ color: 'rgba(26,58,47,0.4)' }}>— Surah Ar-Rum 30:21</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
