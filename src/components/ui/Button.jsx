import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20',
  gold: 'bg-gold text-gold-foreground hover:bg-gold/90 shadow-sm shadow-gold/30',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
};

const sizes = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-10 px-4 py-2',
  lg: 'h-12 px-8 text-base',
};

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
