import React, { useState } from 'react';
import i18n from '../../i18n';
import { Menu, Bell, User, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function Navbar({ toggleSidebar, language, setLanguage }) {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'mr', label: 'मराठी' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground hidden sm:inline-block">
              MandiMitra
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="btn btn-sm btn-secondary gap-2 flex items-center px-3 py-1.5 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>{languages.find(l => l.code === language)?.label}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground ml-1" />
            </button>
            
            {isLangMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm"
                  onClick={() => setIsLangMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover text-popover-foreground rounded-md shadow-lg z-50 overflow-hidden">
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
          
          <Button variant="ghost" size="sm" className="sm:hidden">
            <User className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
