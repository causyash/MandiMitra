import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, Wheat, MapPin, Calendar, Hash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getBookings } from '../services/api';
import { Card } from '../components/ui/Card';

function formatSlotDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function statusStyle(status) {
  switch ((status || '').toUpperCase()) {
    case 'CONFIRMED':
      return 'bg-accent text-accent-foreground';
    case 'ARRIVED':
      return 'bg-gold text-gold-foreground';
    case 'COMPLETED':
      return 'bg-primary text-primary-foreground';
    case 'CANCELLED':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function MyBookings() {
  const { farmer } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!farmer?.phone) return;
    setLoading(true);
    setError('');
    getBookings({ farmerPhone: farmer.phone })
      .then(setBookings)
      .catch((err) => setError(err.message || 'Could not load your bookings.'))
      .finally(() => setLoading(false));
  }, [farmer?.phone]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          मेरी बुकिंग · My Bookings
        </h1>
        <p className="mt-1.5 text-muted-foreground">Your full mandi slot booking history</p>
      </motion.div>

      {loading ? (
        <Card>
          <div className="flex items-center justify-center gap-2 p-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading your bookings...
          </div>
        </Card>
      ) : error ? (
        <Card>
          <div className="p-8 text-center text-sm text-destructive">{error}</div>
        </Card>
      ) : bookings.length === 0 ? (
        <Card className="border-dashed">
          <div className="space-y-2 p-10 text-center">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground/60" />
            <p className="font-semibold text-foreground">No bookings yet</p>
            <p className="text-sm text-muted-foreground">
              Head to your dashboard to book your first mandi slot.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
            >
              <Card className="overflow-hidden">
                <div className="space-y-3 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                        <Wheat className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {b.crop?.nameEn}
                          {b.crop?.nameHi ? ` (${b.crop.nameHi})` : ''}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {b.quantityQuintal} Quintals
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle(b.status)}`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">
                        {b.mandi?.nameEn}
                        {b.mandi?.nameHi ? ` (${b.mandi.nameHi})` : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                      {formatSlotDate(b.slotDate)}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Hash className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="font-mono">{b.tokenNumber}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
