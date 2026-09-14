import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing, Plus, Trash2, Loader2, ChevronDown } from 'lucide-react';
import { getCropPrice } from '../../services/api';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const STORAGE_KEY = 'mandimitra_price_alerts';

function loadAlerts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAlerts(alerts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  } catch {
    // Private browsing / storage blocked - alerts just won't persist.
  }
}

// A lightweight, client-side price watch: it stores the farmer's own
// thresholds in this browser (no backend table exists for it yet) and
// checks them against the same real live-price endpoint the rest of the app
// uses. It only ever shows a real fetched price against a real threshold
// the farmer typed in - never an invented one.
export function PriceAlertPanel({ crops, mandis }) {
  const [expanded, setExpanded] = useState(false);
  const [alerts, setAlerts] = useState(loadAlerts);
  const [results, setResults] = useState({}); // alertId -> { checking, price, error }

  const [formCropId, setFormCropId] = useState('');
  const [formMandiId, setFormMandiId] = useState('');
  const [formDirection, setFormDirection] = useState('below');
  const [formThreshold, setFormThreshold] = useState('');

  useEffect(() => {
    if (crops.length > 0 && !formCropId) setFormCropId(String(crops[0].id));
  }, [crops, formCropId]);

  useEffect(() => {
    if (mandis.length > 0 && !formMandiId) setFormMandiId(String(mandis[0].id));
  }, [mandis, formMandiId]);

  const checkAlert = useCallback(async (alert) => {
    setResults((prev) => ({ ...prev, [alert.id]: { checking: true } }));
    try {
      const data = await getCropPrice(alert.mandiId, alert.cropId);
      if (data.error) {
        setResults((prev) => ({
          ...prev,
          [alert.id]: { checking: false, error: 'No live price reported today' },
        }));
        return;
      }
      const price = data.modalPriceRsPerQuintal;
      const triggered =
        alert.direction === 'below' ? price <= alert.threshold : price >= alert.threshold;
      setResults((prev) => ({ ...prev, [alert.id]: { checking: false, price, triggered } }));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [alert.id]: { checking: false, error: err.message || 'Could not check price.' },
      }));
    }
  }, []);

  useEffect(() => {
    if (expanded) alerts.forEach(checkAlert);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  function addAlert(e) {
    e.preventDefault();
    if (!formCropId || !formMandiId || !formThreshold) return;
    const crop = crops.find((c) => String(c.id) === formCropId);
    const mandi = mandis.find((m) => String(m.id) === formMandiId);
    if (!crop || !mandi) return;

    const alert = {
      id: `${Date.now()}`,
      cropId: formCropId,
      cropName: crop.nameEn,
      mandiId: formMandiId,
      mandiName: mandi.nameEn,
      direction: formDirection,
      threshold: Number(formThreshold),
    };
    const next = [...alerts, alert];
    setAlerts(next);
    saveAlerts(next);
    setFormThreshold('');
    checkAlert(alert);
  }

  function removeAlert(id) {
    const next = alerts.filter((a) => a.id !== id);
    setAlerts(next);
    saveAlerts(next);
  }

  const triggeredCount = Object.values(results).filter((r) => r.triggered).length;

  const fieldClass =
    'rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring';

  return (
    <Card>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
          {triggeredCount > 0 ? (
            <BellRing className="h-4 w-4 text-gold" />
          ) : (
            <Bell className="h-4 w-4 text-primary" />
          )}
          Price alerts
          {alerts.length > 0 && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
              {alerts.length}
            </span>
          )}
          {triggeredCount > 0 && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-gold-foreground">
              {triggeredCount} hit
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t p-4">
              <p className="text-xs text-muted-foreground">
                Get an in-app notice when a crop's real live price crosses a value you set. Saved
                on this device only.
              </p>

              {alerts.length > 0 && (
                <div className="space-y-2">
                  {alerts.map((a) => {
                    const r = results[a.id];
                    return (
                      <div
                        key={a.id}
                        className={`flex items-center justify-between rounded-xl border p-3 text-sm ${
                          r?.triggered ? 'border-gold bg-gold/10' : ''
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-foreground">
                            {a.cropName} @ {a.mandiName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Alert when {a.direction} ₹{a.threshold}/quintal
                          </p>
                          {r?.checking ? (
                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <Loader2 className="h-3 w-3 animate-spin" /> Checking live price...
                            </p>
                          ) : r?.error ? (
                            <p className="mt-1 text-xs text-muted-foreground">{r.error}</p>
                          ) : r?.price != null ? (
                            <p
                              className={`mt-1 text-xs font-bold ${r.triggered ? 'text-gold-foreground' : 'text-foreground'}`}
                            >
                              Current: ₹{r.price}/quintal {r.triggered ? '- alert hit!' : ''}
                            </p>
                          ) : null}
                        </div>
                        <button
                          onClick={() => removeAlert(a.id)}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Remove alert"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <form onSubmit={addAlert} className="grid gap-2 sm:grid-cols-2">
                <select
                  value={formCropId}
                  onChange={(e) => setFormCropId(e.target.value)}
                  className={fieldClass}
                >
                  {crops.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameEn}
                    </option>
                  ))}
                </select>
                <select
                  value={formMandiId}
                  onChange={(e) => setFormMandiId(e.target.value)}
                  className={fieldClass}
                >
                  {mandis.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nameEn}
                    </option>
                  ))}
                </select>
                <select
                  value={formDirection}
                  onChange={(e) => setFormDirection(e.target.value)}
                  className={fieldClass}
                >
                  <option value="below">Notify when price falls below</option>
                  <option value="above">Notify when price rises above</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formThreshold}
                  onChange={(e) => setFormThreshold(e.target.value)}
                  placeholder="₹ per quintal"
                  className={fieldClass}
                />
                <Button type="submit" size="sm" className="sm:col-span-2">
                  <Plus className="h-3.5 w-3.5" /> Add alert
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
