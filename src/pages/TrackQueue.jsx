import React from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

export function TrackQueue() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">कतार देखें (Track Queue)</h1>
        <p className="mt-2 text-muted-foreground">Real-time queue status and waiting time</p>
      </motion.div>

      {/* Placeholder Content */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Truck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-semibold text-foreground">Queue Tracking</p>
            <p className="text-sm mt-1">
              View the current queue status for selected procurement centres.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-emerald-200 dark:border-emerald-800">
          <div className="p-4 rounded-lg bg-muted text-sm space-y-1">
            <p className="text-muted-foreground/70 font-medium">Example Queue Data (Demo)</p>
            <p className="text-muted-foreground/60">
              This section will display live queue updates, estimated wait times, and position in line.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/40">
            <span className="text-xs text-muted-foreground/80">Status:</span>
            <span className="font-semibold text-emerald-900 dark:text-emerald-200">Under Development</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            👉 Check queue status from your booking details on the dashboard
          </p>
        </div>
      </div>
    </div>
  );
}