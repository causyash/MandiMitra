import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Home,
  MapPin,
  FileText,
  Truck,
  User,
  PhoneCall,
  Sprout,
} from 'lucide-react';

export function Sidebar({ isOpen }) {
  const { t } = useTranslation();

  const menuItems = [
    { icon: Home, label: t('dashboard'), path: '/dashboard' },
    { icon: MapPin, label: t('find_mandi'), path: '/find-mandi' },
    { icon: FileText, label: t('my_bookings'), path: '/my-bookings' },
    { icon: Truck, label: t('track_queue'), path: '/track-queue' },
    { icon: User, label: t('profile'), path: '/profile' },
    { icon: PhoneCall, label: t('help'), path: '/help' },
  ];

  function isItemActive(path, isActive) {
    return isActive || (path === '/dashboard' && window.location.pathname === '/');
  }

  return (
    <>
      <aside className="hidden w-60 flex-col border-r bg-background md:flex h-[calc(100vh-4rem)] justify-between">
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
            {t('main_menu')}
          </div>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => {
                  const active = isItemActive(item.path, isActive);
                  return `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all min-h-[44px] ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`;
                }}
              >
                {({ isActive }) => {
                  const active = isItemActive(item.path, isActive);
                  return (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="flex items-center gap-3 w-full"
                    >
                      <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-primary-foreground' : 'text-primary'}`} />
                      <span className="truncate">{item.label}</span>
                    </motion.span>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t bg-muted/40">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground text-center">
            <Sprout className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold text-primary">MandiMitra</span>
          </div>
          <div className="mt-0.5 text-center text-[10px] text-muted-foreground/80">{t('sample_prototype')}</div>
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
            className="relative z-50 w-72 max-w-[85vw] flex-1 bg-background pt-5 pb-4 h-full flex flex-col justify-between rounded-r-2xl"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <nav className="mt-4 space-y-1 px-3 overflow-y-auto">
              <div className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t('main_menu')}
              </div>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => {
                      const active = isItemActive(item.path, isActive);
                      return `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors min-h-[48px] ${
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-accent'
                      }`;
                    }}
                  >
                    {({ isActive }) => {
                      const active = isItemActive(item.path, isActive);
                      return (
                        <>
                          <Icon className={`h-5 w-5 ${active ? 'text-primary-foreground' : 'text-primary'}`} />
                          <span>{item.label}</span>
                        </>
                      );
                    }}
                  </NavLink>
                );
              })}
            </nav>

            <div className="p-4 border-t text-center text-xs text-muted-foreground">
              {t('sample_prototype')}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
