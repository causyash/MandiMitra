import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">मेरी प्रोफाइल (Profile)</h1>
        <p className="mt-2 text-muted-foreground">Manage your farmer profile and settings</p>
      </motion.div>

      {/* Placeholder Content */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-semibold text-foreground">Farmer Profile</p>
            <p className="text-sm mt-1">
              View and edit your personal information, crop types, and preferences.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-emerald-200 dark:border-emerald-800">
          <div className="p-4 rounded-lg bg-muted text-sm space-y-1">
            <p className="text-muted-foreground/70 font-medium">Profile Sections (To be Implemented)</p>
            <ul className="space-y-1 text-muted-foreground/60 ml-2">
              <li>• Personal Details (Name, Mobile, Village)</li>
              <li>• Aadhaar/KYC Status</li>
              <li>• Crops List</li>
              <li>• Notifications Settings</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700">
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
              👉 Profile management will be integrated here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}