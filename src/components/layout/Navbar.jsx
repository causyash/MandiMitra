import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import { Menu, Sprout, ChevronDown, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const THEME_KEY = 'mandimitra_theme';

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function Navbar({ toggleSidebar, language, setLanguage }) {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const { farmer, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Private browsing / storage blocked - theme just won't persist.
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'mr', label: 'मराठी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'or', label: 'ଓଡ଼ିଆ' },
    { code: 'as', label: 'অসমীয়া' },
  ];

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md"
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="md:hidden !px-2">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-foreground hidden sm:inline-block">
              MandiMitra
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="!px-2"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span>{languages.find((l) => l.code === language)?.label}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {isLangMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsLangMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 max-h-80 w-44 overflow-y-auto rounded-xl border bg-popover text-popover-foreground shadow-lg z-50">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          i18n.changeLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors ${
                          language === lang.code ? 'bg-accent text-accent-foreground' : ''
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {farmer && (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l">
              <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
                {farmer.name}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="!px-2">
                <LogOut className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          )}

          <Button variant="ghost" size="sm" className="sm:hidden !px-2" onClick={handleLogout}>
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
