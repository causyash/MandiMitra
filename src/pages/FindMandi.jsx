import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export function FindMandi() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">मंडी खोजें (Find Mandi)</h1>
          <p className="mt-2 text-muted-foreground"> nearby grain markets and their availability</p>
        </motion.div>
      </div>

      {/* Placeholder Content - Replace with real implementation */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <AlertCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-semibold text-foreground">This section is under development</p>
            <p className="text-sm mt-1">
              This page will show a map of nearby mandis, their locations, and current availability status.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground/80 pt-2 border-t border-emerald-200 dark:border-emerald-800">
          <p>Features to be implemented:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Interactive map with mandi locations</li>
            <li>Real-time queue status for each mandi</li>
            <li>Filtration by crop type and distance</li>
            <li>Estimated travel time display</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            👉 Navigate to <span className="font-bold">Dashboard</span> for mandi recommendations
          </p>
        </div>
      </div>
    </div>
  );
}