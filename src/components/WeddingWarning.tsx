import { motion } from 'motion/react';

export function WeddingWarning() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      className="max-w-2xl mx-auto px-4 sm:px-6 my-14"
    >
      <div
        className="rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10 text-center relative overflow-hidden glass-card"
        style={{
          border: '1px solid rgba(201,99,107,0.3)',
          boxShadow: '0 10px 40px rgba(201,99,107,0.08)',
        }}
      >
        {/* Subtle red background glow */}
        <div className="absolute inset-0 bg-red-50/30 -z-10" />
        
        {/* Corner emoji decorations */}
        {['😤', '👀', '🏃', '📣'].map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-xl select-none pointer-events-none"
            style={{
              top: i < 2 ? '10px' : 'auto',
              bottom: i >= 2 ? '10px' : 'auto',
              left: i % 2 === 0 ? '12px' : 'auto',
              right: i % 2 !== 0 ? '12px' : 'auto',
              opacity: 0.6,
            }}
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
          >
            {e}
          </motion.span>
        ))}

        {/* Badge */}
        <div
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.35em] mb-5"
          style={{
            background: 'rgba(201,99,107,0.1)',
            color: '#B04050',
            fontFamily: 'var(--font-sans)',
          }}
        >
          ⚠️ &nbsp; Official Warning
        </div>

        {/* Malayalam yelling text — shakes every 3 s */}
        <motion.h2
          animate={{
            x: [0, -8, 8, -8, 8, -5, 5, 0],
            rotate: [0, -1.2, 1.2, -1.2, 1.2, -0.5, 0.5, 0],
          }}
          transition={{
            duration: 0.55,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.4rem, 5vw, 2rem)',
            color: '#C9273B',
            fontWeight: 700,
            lineHeight: 1.55,
            marginBottom: '1rem',
          }}
        >
          വന്നില്ലെങ്കിൽ വീട്ടിൽ വന്നു
          <br />
          വിളിച്ചുകൊണ്ടുപോകും! 😤
        </motion.h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,99,107,0.35))' }} />
          <span style={{ color: 'rgba(201,99,107,0.5)', fontSize: '0.9rem' }}>✦</span>
          <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, rgba(201,99,107,0.35), transparent)' }} />
        </div>

        {/* English translation */}
        <motion.p
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="italic text-sm sm:text-base mb-4"
          style={{
            color: 'rgba(100,40,50,0.7)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          }}
        >
          "If you don't show up, we will come to your house
          <br className="hidden sm:block" /> and drag you here!"
        </motion.p>

        {/* Attribution */}
        <span
          className="text-[10px] font-bold uppercase tracking-[0.3em] block"
          style={{
            color: 'rgba(201,99,107,0.6)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          — Warning from the Groom's Friends 🫵
        </span>
      </div>
    </motion.div>
  );
}
