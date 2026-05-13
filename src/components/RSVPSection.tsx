import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle } from 'lucide-react';

export function RSVPSection() {
  const [formState, setFormState] = useState({
    name: '',
    guests: '1',
    attending: 'yes',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F3E5AB', '#D8A7A7', '#1A1A1A', '#FCFAF8'],
    });
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Soft glass overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl -z-10" />

      {/* Decorative patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating petals */}
        {['🌸', '🌺', '✿', '❀', '🌸', '🌺'].map((emoji, i) => (
          <motion.div
            key={`rsvp-petal-${i}`}
            className="absolute text-lg opacity-[0.15] pointer-events-none"
            style={{ left: `${8 + i * 16}%`, top: '-5%' }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, 30, -20, 0],
              rotate: [0, 360],
              opacity: [0, 0.25, 0.25, 0],
            }}
            transition={{
              duration: 9 + i,
              delay: i * 1.2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-lg mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <p
            className="uppercase tracking-[0.5em] text-xs mb-3 font-semibold"
            style={{ color: 'var(--color-w-gold)', fontFamily: 'var(--font-sans)' }}
          >
            ✦ &nbsp; Kindly Reply &nbsp; ✦
          </p>
          <h2
            className="mb-3"
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
              color: 'var(--color-w-emerald)',
            }}
          >
            Will You Join Us?
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
            <span style={{ color: 'rgba(212,175,55,0.6)', fontSize: '0.9rem' }}>✿</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-3xl p-6 sm:p-8 md:p-10 glass-card"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="block text-[10px] uppercase tracking-widest font-bold mb-2"
                  style={{ color: 'rgba(26,26,26,0.6)', fontFamily: 'var(--font-sans)' }}
                >
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              {/* Guests & Attending */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-[10px] uppercase tracking-widest font-bold mb-2"
                    style={{ color: 'rgba(26,26,26,0.6)', fontFamily: 'var(--font-sans)' }}
                  >
                    No. of Guests
                  </label>
                  <select
                    value={formState.guests}
                    onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                    className="form-input"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4+">4+ Persons</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[10px] uppercase tracking-widest font-bold mb-2"
                    style={{ color: 'rgba(26,26,26,0.6)', fontFamily: 'var(--font-sans)' }}
                  >
                    Attending?
                  </label>
                  <select
                    value={formState.attending}
                    onChange={(e) => setFormState({ ...formState, attending: e.target.value })}
                    className="form-input"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="yes">Yes, Joyfully!</option>
                    <option value="no">Sadly, I can't</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-[10px] uppercase tracking-widest font-bold mb-2"
                  style={{ color: 'rgba(26,26,26,0.6)', fontFamily: 'var(--font-sans)' }}
                >
                  Blessings & Wishes
                </label>
                <textarea
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="form-input resize-none"
                  placeholder="Share your blessings for the couple..."
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.2em] text-sm transition-all glass-button"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Send Blessings <Send size={15} />
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'var(--color-w-champagne-light)', color: 'var(--color-w-champagne)' }}
              >
                <CheckCircle size={40} />
              </motion.div>
              <h3
                className="mb-2"
                style={{ fontFamily: 'var(--font-script)', fontSize: '2.8rem', color: 'var(--color-w-emerald)' }}
              >
                JazakAllah Khair!
              </h3>
              <p
                className="italic text-sm mb-2"
                style={{ color: 'rgba(26,26,26,0.7)', fontFamily: 'var(--font-serif)' }}
              >
                Thank you, {formState.name.split(' ')[0]}! Your response has been noted.
                <br />We look forward to celebrating with you!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-[10px] uppercase tracking-widest font-bold border-b pb-0.5 transition-colors"
                style={{
                  color: 'var(--color-w-gold)',
                  borderColor: 'rgba(212,175,55,0.4)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Edit Response
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
