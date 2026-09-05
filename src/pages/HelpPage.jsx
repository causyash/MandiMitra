import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, AlertCircle } from 'lucide-react';

export function HelpPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">किसान सहायता (Help)</h1>
        <p className="mt-2 text-muted-foreground">Kisan Helpline & Support</p>
      </motion.div>

      {/* Placeholder Content */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <PhoneCall className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-semibold text-foreground">Kisan Helpline</p>
            <p className="text-sm mt-1">
              Reach out to our support team for assistance with bookings and mandi queries.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-emerald-200 dark:border-emerald-800">
          <div className="p-4 rounded-lg bg-muted text-sm space-y-1">
            <p className="text-muted-foreground/70 font-medium">Support Channels (Demo)</p>
            <ul className="space-y-1 text-muted-foreground/60 ml-2">
              <li>• Helpline: 1800-XXX-XXXX</li>
              <li>• Email: support@mandimitra.org</li>
              <li>• Working Hours: 8 AM - 8 PM (All Days)</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700">
            <div className="flex items-start gap-2 text-sm text-muted-foreground/80">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                The actual helpline number and contact details will be configured based on MandiMitra operations team information.
              </p>
            </div>
          </div>

          <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            <PhoneCall className="h-5 w-5" />
            <span>Call Helpline Now</span>
          </button>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="space-y-3 pt-4 border-t">
        <p className="text-sm font-semibold text-foreground">Quick Links:</p>
        <div className="grid grid-cols-2 gap-3">
          <a href="#faq" className="p-3 rounded-lg border bg-muted hover:bg-muted/60 text-sm text-center transition-colors">
            FAQs
          </a>
          <a href="#reports" className="p-3 rounded-lg border bg-muted hover:bg-muted/60 text-sm text-center transition-colors">
            Report Issue
          </a>
        </div>
      </div>
    </div>
  );
}