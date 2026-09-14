import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Info, MapPin, Truck, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const HOW_IT_WORKS = [
  {
    icon: MapPin,
    title: 'Find a mandi',
    desc: 'Browse real procurement centres near your district and see how busy each one is right now.',
  },
  {
    icon: Truck,
    title: 'Book a slot',
    desc: 'Pick your crop, quantity and date to get a real booking token for that mandi.',
  },
  {
    icon: TrendingUp,
    title: 'Check MSP prices',
    desc: 'View the latest government Minimum Support Prices before you sell.',
  },
];

export function HelpPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          किसान सहायता · Help
        </h1>
        <p className="mt-1.5 text-muted-foreground">Kisan Call Centre & support</p>
      </motion.div>

      <Card className="overflow-hidden">
        <div className="bg-primary leaf-pattern p-6 text-center space-y-2">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/15">
            <PhoneCall className="h-5 w-5 text-primary-foreground" />
          </div>
          <p className="text-xs font-semibold text-primary-foreground/80">
            Kisan Call Centre · Free Toll-Free Number
          </p>
          <div className="text-3xl font-black text-primary-foreground">1800-180-1551</div>
          <p className="text-xs text-primary-foreground/70">Open 6:00 AM – 10:00 PM, all days</p>
        </div>
        <div className="p-5">
          <a href="tel:18001801551">
            <Button size="lg" variant="gold" className="w-full">
              <PhoneCall className="h-5 w-5" />
              Call Kisan Call Centre
            </Button>
          </a>
        </div>
      </Card>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">How MandiMitra works</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="h-full">
                  <div className="space-y-2 p-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Card className="border-dashed">
        <div className="flex items-start gap-2.5 p-5 text-sm text-muted-foreground">
          <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
          <p>
            Region-specific mandi helpdesk contacts will be added here as they become available.
            For now, the Kisan Call Centre above can help with any booking or mandi query
            nationwide.
          </p>
        </div>
      </Card>
    </div>
  );
}
