import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  MapPin,
  FileText,
  Truck,
  User,
  PhoneCall,
  LineChart,
  Users,
} from 'lucide-react';

const primaryMenuItems = [
  { icon: Home, label: 'डैशबोर्ड (Dashboard)', path: '/dashboard' },
  { icon: MapPin, label: 'मंडी खोजें (Find Mandi)', path: '/find-mandi' },
  { icon: FileText, label: 'मेरी बुकिंग (My Bookings)', path: '/my-bookings' },
  { icon: Truck, label: 'कतार देखें (Track Queue)', path: '/track-queue' },
  { icon: User, label: 'मेरी प्रोफाइल (Profile)', path: '/profile' },
  { icon: PhoneCall, label: 'किसान सहायता (Help)', path: '/help' },
];

const secondaryMenuItems = [
  { icon: LineChart, label: 'मंडी भाव विश्लेषण (Analytics)', path: '#' },
  { icon: Users, label: 'किसान समुदाय (Community)', path: '#' },
];

export function Sidebar({ isOpen }) {
  return (
    <>
      <aside className="hidden w-64 flex-col border-r bg-background md:flex h-[calc(100vh-4rem)] justify-between">
        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
            मुख्य मेन्यू (Main Menu)
          </div>
          {primaryMenuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => {
                  const active = isActive || (item.path === '/dashboard' && window.location.pathname === '/');
                  return `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all min-h-[44px] ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                      : 'text-foreground hover:bg-emerald-50 hover:text-emerald-900 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-200'
                  }`;
                }}
              >
                {({ isActive }) => {
                  const active = isActive || (item.path === '/dashboard' && window.location.pathname === '/');
                  return (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 w-full"
                    >
                      <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </motion.span>
                  );
                }}
              </NavLink>
            );
          })}

          <div className="pt-6">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              अन्य विकल्प (Secondary)
            </div>
            <div className="space-y-1 opacity-75">
              {secondaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t bg-muted/30">
          <div className="text-[11px] text-muted-foreground text-center">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">MandiMitra v1.0</span>
            <div className="mt-0.5 text-[10px] text-muted-foreground/80">डेमो प्रोटोटाइप (Sample Prototype)</div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="relative z-50 w-72 max-w-xs flex-1 bg-background pt-5 pb-4 h-full flex flex-col justify-between"
          >
            <nav className="mt-4 space-y-1 px-3 overflow-y-auto">
              <div className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                मुख्य मेन्यू (Menu)
              </div>
              {primaryMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) => {
                      const active = isActive || (item.path === '/dashboard' && window.location.pathname === '/');
                      return `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors min-h-[48px] ${
                        active
                          ? 'bg-emerald-600 text-white'
                          : 'text-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                      }`;
                    }}
                  >
                    {({ isActive }) => {
                      const active = isActive || (item.path === '/dashboard' && window.location.pathname === '/');
                      return (
                        <>
                          <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'}`} />
                          <span>{item.label}</span>
                        </>
                      );
                    }}
                  </NavLink>
                );
              })}

              <div className="pt-4 border-t mt-4">
                <div className="px-2 pb-2 text-[11px] font-medium text-muted-foreground">
                  अन्य विकल्प (Secondary)
                </div>
                {secondaryMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.path}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </nav>

            <div className="p-4 border-t text-center text-xs text-muted-foreground">
              डेमो प्रोटोटाइप (Sample Prototype)
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
