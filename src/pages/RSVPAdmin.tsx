import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { Users, UserCheck, MessageSquare } from 'lucide-react';

interface RSVP {
  id: string;
  name: string;
  guests: string;
  attending: string;
  message: string;
  timestamp: string;
}

export function RSVPAdmin() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rsvps"));
        const data: RSVP[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as RSVP);
        });
        // Sort by newest first
        data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setRsvps(data);
      } catch (error) {
        console.error("Error fetching RSVPs: ", error);
        // Note: Error is expected here if Firebase is not yet configured.
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, []);

  const totalResponses = rsvps.length;
  const totalAttending = rsvps.filter(r => r.attending === 'yes').length;
  const totalGuests = rsvps
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => sum + parseInt(r.guests || '1', 10), 0);

  return (
    <div className="min-h-screen p-6 sm:p-12 font-sans text-emerald-900 bg-emerald-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-emerald-900 font-serif">RSVP Dashboard</h1>
          <p className="text-emerald-700/70">Manage your guest responses in real-time.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-600/70 uppercase tracking-wider">Responses</p>
              <p className="text-3xl font-bold">{totalResponses}</p>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <UserCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-600/70 uppercase tracking-wider">Attending</p>
              <p className="text-3xl font-bold">{totalAttending}</p>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-600/70 uppercase tracking-wider">Total Guests</p>
              <p className="text-3xl font-bold">{totalGuests}</p>
            </div>
          </motion.div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/50 border-b border-emerald-100">
                  <th className="px-6 py-4 text-xs font-semibold text-emerald-700/70 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-emerald-700/70 uppercase tracking-wider">Attending</th>
                  <th className="px-6 py-4 text-xs font-semibold text-emerald-700/70 uppercase tracking-wider">Guests</th>
                  <th className="px-6 py-4 text-xs font-semibold text-emerald-700/70 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-xs font-semibold text-emerald-700/70 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-emerald-600/50">
                      Loading RSVPs...
                    </td>
                  </tr>
                ) : rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-emerald-600/50">
                      No responses yet. (Or Firebase is not configured properly).
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{rsvp.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${rsvp.attending === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {rsvp.attending === 'yes' ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{rsvp.guests}</td>
                      <td className="px-6 py-4 text-sm text-emerald-800/80 max-w-xs truncate">{rsvp.message || '-'}</td>
                      <td className="px-6 py-4 text-sm text-emerald-800/60">
                        {new Date(rsvp.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
