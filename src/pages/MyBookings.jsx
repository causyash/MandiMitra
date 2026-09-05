import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function MyBookings() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">मेरी बुकिंग (My Bookings)</h1>
        <p className="mt-2 text-muted-foreground">Manage your mandi booking tokens</p>
      </motion.div>

      {/* Placeholder Content */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-semibold text-foreground">No active bookings found</p>
            <p className="text-sm mt-1">
              Navigate to the dashboard and book a slot for grain procurement.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            📌 Use the <span className="font-bold">"मेरी बुकिंग"</span> button in the dashboard to book a slot
          </p>
        </div>
      </div>
    </div>
  );
}