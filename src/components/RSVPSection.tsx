import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle, ChevronDown, Loader2 } from 'lucide-react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

const ATTENDANCE_OPTIONS = [
  { value: 'yes', label: 'ഇൻഷാ അള്ളാ, ബിരിയാണി കഴിക്കാൻ ഞാൻ വരും! 🍛' },
  { value: 'maybe', label: 'വരാൻ നോക്കാം, പക്ഷെ ഉറപ്പില്ല. 🤔' },
  { value: 'no', label: 'എനിക്ക് വരാൻ പറ്റില്ല, പകരം ഒരു പാഴ്സൽ അയച്ചുതരുമോ? 📦' },
];

const GUESTS_OPTIONS = [
  { value: '1', label: '1 Person' },
  { value: '2', label: '2 Persons' },
  { value: '3', label: '3 Persons' },
  { value: '4+', label: '4+ Persons' },
];

function CustomSelect({ options, value, onChange, className = '' }: any) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((o: any) => o.value === value) || options[0];

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className={`w-full bg-white/5 border p-3 rounded-xl text-white cursor-pointer flex items-center justify-between transition-all ${
          open ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] bg-white/10' : 'border-white/30 hover:border-white/50 hover:bg-white/10'
        } ${className}`}
      >
        <span className="truncate pr-2">{selectedOption.label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-[#D4AF37] flex-shrink-0" />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute z-50 w-full mt-2 bg-[#0A1C14]/95 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl overflow-hidden shadow-2xl"
            >
              {options.map((opt: any) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`p-3 cursor-pointer transition-colors text-sm sm:text-base ${
                    value === opt.value ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RSVPSection() {
  const [formState, setFormState] = useState({
    name: '',
    guests: '1',
    attending: 'yes',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [docId, setDocId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        name: formState.name,
        guests: formState.guests,
        attending: formState.attending,
        message: formState.message,
        timestamp: new Date().toISOString()
      };

      if (docId) {
        // Use static updateDoc and doc for editing
        await updateDoc(doc(db, "rsvps", docId), data);
      } else {
        // Add a new document to the "rsvps" collection
        const docRef = await addDoc(collection(db, "rsvps"), data);
        setDocId(docRef.id);
      }

      setSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#D8A7A7', '#1A1A1A', '#FCFAF8'],
      });
    } catch (err: any) {
      console.error("Error adding/updating RSVP: ", err);
      setError("Failed to submit. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#06402B] text-white">
      {/* Soft glass overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl -z-10" />

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
              color: '#D4AF37',
            }}
          >
            Will You Join Us?
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
            <span style={{ color: '#D4AF37', fontSize: '0.9rem' }}>✿</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  className="block text-xs uppercase tracking-widest font-bold mb-2 text-[#D4AF37]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/30 p-3 rounded-xl text-white placeholder-white/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Attending */}
              <div>
                <label
                  className="block text-xs uppercase tracking-widest font-bold mb-2 text-[#D4AF37]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Attendance
                </label>
                <CustomSelect
                  options={ATTENDANCE_OPTIONS}
                  value={formState.attending}
                  onChange={(val: string) => setFormState({ ...formState, attending: val })}
                  className="font-malayalam"
                />
              </div>

              {/* Blessings */}
              <div>
                <label
                  className="block text-xs uppercase tracking-widest font-bold mb-2 mt-2 text-[#D4AF37]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Leave your thoughts or blessings:
                </label>
                <div className="relative group">
                  <textarea
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/30 p-4 rounded-xl text-white placeholder-white/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:bg-white/10 hover:border-white/50 outline-none resize-none transition-all shadow-inner"
                    placeholder="Prayers for the couple..."
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Submit */}
              {error && (
                <div className="text-red-400 text-sm text-center font-medium bg-red-900/20 p-2 rounded border border-red-500/30">
                  {error}
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em] text-sm transition-all"
                style={{ fontFamily: 'var(--font-sans)', background: loading ? '#A08020' : '#D4AF37', color: '#06402B', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <>Sending... <Loader2 size={15} className="animate-spin" /></>
                ) : (
                  <>Send RSVP <Send size={15} /></>
                )}
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
                style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37' }}
              >
                <CheckCircle size={40} />
              </motion.div>
              <h3
                className="mb-2"
                style={{ fontFamily: 'var(--font-script)', fontSize: '2.8rem', color: '#D4AF37' }}
              >
                JazakAllah Khair!
              </h3>
              <p
                className="italic text-sm mb-2"
                style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-serif)' }}
              >
                Thank you, {formState.name.split(' ')[0]}! Your response has been noted.
                <br />We look forward to celebrating with you!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-[10px] uppercase tracking-widest font-bold border-b pb-0.5 transition-colors"
                style={{
                  color: '#D4AF37',
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
