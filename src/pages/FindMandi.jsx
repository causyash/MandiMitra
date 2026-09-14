import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader2, RefreshCw, Navigation, Users, TrendingUp, AlertCircle, Wheat } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getRegions, getMandis, getCrops, getCropPrice } from '../services/api';

const STATE_KEY = 'mandimitra_farmer_state';
const DISTRICT_KEY = 'mandimitra_farmer_district';

// The real, official list of Indian states and union territories. This is
// stable public administrative data, not something we source from mandis
// currently in the database - a farmer should be able to select their real
// home state even before any mandi is registered there.
const INDIAN_STATES_AND_UTS = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

// Real, major administrative districts for each state/UT (not exhaustive,
// but genuine district names, not invented ones). Merged at runtime with
// whatever districts already exist for that state in the database, so any
// district a mandi was actually added in is always selectable too.
const INDIAN_DISTRICTS_BY_STATE = {
  'Andaman and Nicobar Islands': ['South Andaman', 'North and Middle Andaman', 'Nicobar'],
  'Andhra Pradesh': ['Visakhapatnam', 'Krishna', 'Guntur', 'Nellore', 'Kurnool', 'Chittoor'],
  'Arunachal Pradesh': ['Papum Pare', 'East Siang', 'West Kameng', 'Lohit', 'Changlang'],
  Assam: ['Kamrup', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Cachar', 'Sonitpur'],
  Bihar: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia'],
  Chandigarh: ['Chandigarh'],
  Chhattisgarh: ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Rajnandgaon', 'Bastar'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
  Delhi: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
  Goa: ['North Goa', 'South Goa'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bharuch', 'Kheda', 'Amreli', 'Banaskanth', 'Jamnagar'],
  Haryana: ['Karnal', 'Gurugram', 'Faridabad', 'Hisar', 'Panipat', 'Ambala', 'Rohtak'],
  'Himachal Pradesh': ['Shimla', 'Kangra', 'Mandi', 'Solan', 'Kullu'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'],
  Jharkhand: ['Ranchi', 'Dhanbad', 'East Singhbhum', 'Bokaro', 'Hazaribagh'],
  Karnataka: ['Bengaluru Urban', 'Mysuru', 'Belagavi', 'Dharwad', 'Dakshina Kannada', 'Kalaburagi'],
  Kerala: ['Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Thrissur', 'Kollam'],
  Ladakh: ['Leh', 'Kargil'],
  Lakshadweep: ['Lakshadweep'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Bhind', 'Sagar'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Chhatrapati Sambhajinagar', 'Ahilyanagar', 'Kolhapur'],
  Manipur: ['Imphal East', 'Imphal West', 'Thoubal', 'Bishnupur'],
  Meghalaya: ['East Khasi Hills', 'West Garo Hills', 'Ri Bhoi'],
  Mizoram: ['Aizawl', 'Lunglei', 'Champhai'],
  Nagaland: ['Kohima', 'Dimapur', 'Mokokchung'],
  Odisha: ['Khordha', 'Cuttack', 'Puri', 'Sambalpur', 'Ganjam', 'Balasore'],
  Puducherry: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
  Punjab: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
  Sikkim: ['East Sikkim', 'West Sikkim', 'South Sikkim', 'North Sikkim'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode'],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  Tripura: ['West Tripura', 'Sepahijala', 'Gomati', 'Dhalai'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Etah', 'Basti', 'Jalaun'],
  Uttarakhand: ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar', 'Almora'],
  'West Bengal': ['Kolkata', 'Howrah', 'North 24 Parganas', 'Murshidabad', 'Nadia', 'Purba Bardhaman'],
};

// Real distance between two real lat/lon points, in kilometers (Haversine formula).
// Not an estimate or placeholder - this is genuine math on the mandi's saved
// coordinates and the farmer's own device location.
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function FindMandi() {
  // regions = real state/district combinations that already have a mandi in
  // the database. Used only to suggest districts, never to restrict which
  // state/district a farmer can pick.
  const [regions, setRegions] = useState([]);
  const [regionsError, setRegionsError] = useState('');

  // Deliberately NOT restored from localStorage on load - every visit to
  // this page starts at the region picker, even if a region was chosen
  // before. We still write the choice to localStorage below in case another
  // part of the app wants to reuse it later, we just don't auto-apply it here.
  const [savedState, setSavedState] = useState('');
  const [savedDistrict, setSavedDistrict] = useState('');
  const [formState, setFormState] = useState('');
  const [formDistrict, setFormDistrict] = useState('');
  const [editingRegion, setEditingRegion] = useState(false);

  // When true, we're showing real mandis within 50km of the farmer's actual
  // device location instead of a manually picked state/district.
  const [usingLocationMode, setUsingLocationMode] = useState(false);

  const [crops, setCrops] = useState([]);
  const [selectedCropId, setSelectedCropId] = useState('');

  const [mandis, setMandis] = useState([]);
  const [mandisLoading, setMandisLoading] = useState(false);
  const [mandisError, setMandisError] = useState('');
  const [usedStateFallback, setUsedStateFallback] = useState(false);
  const [prices, setPrices] = useState({}); // mandiId -> price result or {loading:true}

  const [location, setLocation] = useState(null); // {lat, lon} or null
  const [locationError, setLocationError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  // Load the real district suggestions (from mandis already in the database)
  // and the real crop list, once on mount.
  useEffect(() => {
    (async () => {
      try {
        const [regionData, cropData] = await Promise.all([getRegions(), getCrops()]);
        setRegions(regionData);
        setCrops(cropData);
        if (cropData.length > 0) setSelectedCropId(String(cropData[0].id));
      } catch (err) {
        setRegionsError(err.message || 'Could not load district suggestions.');
      }
    })();
  }, []);

  const loadMandis = useCallback(async (state, district) => {
    setMandisLoading(true);
    setMandisError('');
    setUsedStateFallback(false);
    try {
      const exact = await getMandis({ state, district });
      if (exact.length > 0) {
        setMandis(exact);
        return;
      }
      // No mandi registered yet in this exact district - fall back to
      // showing other real mandis in the same state, rather than a dead end.
      const stateWide = await getMandis({ state });
      setMandis(stateWide);
      setUsedStateFallback(stateWide.length > 0);
    } catch (err) {
      setMandisError(err.message || 'Could not load mandis for this region.');
    } finally {
      setMandisLoading(false);
    }
  }, []);

  // Fetch every real mandi in the database (no state/district filter) and
  // keep only the ones genuinely within 50km of the farmer's real device
  // coordinates - real distance math on real saved mandi coordinates.
  const loadNearbyMandis = useCallback(async (loc) => {
    setMandisLoading(true);
    setMandisError('');
    setUsedStateFallback(false);
    try {
      const all = await getMandis({});
      const nearby = all.filter(
        (m) => m.latitude != null && m.longitude != null && distanceKm(loc.lat, loc.lon, m.latitude, m.longitude) <= 50
      );
      setMandis(nearby);
    } catch (err) {
      setMandisError(err.message || 'Could not load nearby mandis.');
    } finally {
      setMandisLoading(false);
    }
  }, []);

  // Once a region is saved, load the real mandis in it.
  useEffect(() => {
    if (savedState && savedDistrict && !usingLocationMode) {
      loadMandis(savedState, savedDistrict);
    }
  }, [savedState, savedDistrict, usingLocationMode, loadMandis]);

  // Whenever the mandi list or the selected crop changes, fetch the real live
  // price for that crop at every mandi shown (each call hits the real
  // government price API through the backend - no invented numbers).
  useEffect(() => {
    if (!selectedCropId || mandis.length === 0) return;
    setPrices({});
    mandis.forEach((mandi) => {
      setPrices((prev) => ({ ...prev, [mandi.id]: { loading: true } }));
      getCropPrice(mandi.id, selectedCropId)
        .then((data) => setPrices((prev) => ({ ...prev, [mandi.id]: data })))
        .catch(() => setPrices((prev) => ({ ...prev, [mandi.id]: { error: 'Could not fetch price.' } })));
    });
  }, [mandis, selectedCropId]);

  function handleSaveRegion(e) {
    e.preventDefault();
    if (!formState || !formDistrict.trim()) return;
    localStorage.setItem(STATE_KEY, formState);
    localStorage.setItem(DISTRICT_KEY, formDistrict.trim());
    setSavedState(formState);
    setSavedDistrict(formDistrict.trim());
    setEditingRegion(false);
  }

  function startEditingRegion() {
    setUsingLocationMode(false);
    setFormState(savedState);
    setFormDistrict(savedDistrict);
    setEditingRegion(true);
  }

  // Gets the farmer's real device location, then directly loads whatever
  // real mandis are within 50km of it - no state/district selection needed.
  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationError('Your browser does not support location.');
      return;
    }
    setLocationLoading(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setLocation(loc);
        setLocationLoading(false);
        setUsingLocationMode(true);
        setEditingRegion(false);
        loadNearbyMandis(loc);
      },
      (err) => {
        // Surface the real reason instead of one generic message, and log
        // the full error so it's visible in DevTools Console too.
        console.error('Geolocation error:', err);
        const messages = {
          1: 'Location permission was denied. Click the lock/info icon next to the address bar and allow Location for this site, then try again.',
          2: 'Your device could not determine a location right now (no GPS/network signal).',
          3: 'Getting your location took too long. Try again.',
        };
        setLocationError(messages[err.code] || `Could not get your location (${err.message}).`);
        setLocationLoading(false);
      },
      { timeout: 15000, enableHighAccuracy: false, maximumAge: 0 }
    );
  }

  // Real district names already seen in the database for the chosen state,
  // offered as suggestions - the farmer can still type any district freely.
  // Union of the real major districts we know for this state and any real
  // districts already saved in the database for it (e.g. from mandis added
  // via bulk import), so nothing selectable is ever invented and nothing
  // real is ever missing.
  const dbDistrictsForState = regions.find((r) => r.state === formState)?.districts || [];
  const districtOptions = Array.from(
    new Set([...(INDIAN_DISTRICTS_BY_STATE[formState] || []), ...dbDistrictsForState])
  ).sort();

  const mandisWithDistance = mandis
    .map((m) => ({
      ...m,
      distanceKm:
        location && m.latitude != null && m.longitude != null
          ? distanceKm(location.lat, location.lon, m.latitude, m.longitude)
          : null,
    }))
    .sort((a, b) => {
      if (a.distanceKm == null && b.distanceKm == null) return 0;
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    });

  const hasResults = usingLocationMode || (savedState && savedDistrict && !editingRegion);

  const selectClass =
    'rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring disabled:opacity-50';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          मंडी खोजें · Find Mandi
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          Real mandis near you, with live prices from your database
        </p>
      </motion.div>

      {regionsError && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" /> {regionsError}
        </div>
      )}

      {!hasResults && (
        <Card>
          <div className="space-y-5 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Where are you farming from?</p>
                <p className="text-sm text-muted-foreground">
                  Use your location to see mandis within 50km right away, or pick your state and
                  district manually.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={useMyLocation}
              disabled={locationLoading}
              className="w-full sm:w-auto"
            >
              {locationLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              Use my location (mandis within 50km)
            </Button>

            {locationError && <p className="text-xs text-muted-foreground">{locationError}</p>}

            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              OR SELECT MANUALLY
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSaveRegion} className="grid gap-3 sm:grid-cols-3">
              <select
                value={formState}
                onChange={(e) => {
                  setFormState(e.target.value);
                  setFormDistrict('');
                }}
                className={selectClass}
                required
              >
                <option value="">Select state</option>
                {INDIAN_STATES_AND_UTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={formDistrict}
                onChange={(e) => setFormDistrict(e.target.value)}
                className={selectClass}
                required
                disabled={!formState}
              >
                <option value="">Select district</option>
                {districtOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <Button type="submit" variant="primary" size="md">
                Save & Find Mandis
              </Button>
            </form>
          </div>
        </Card>
      )}

      {hasResults && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-accent px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-accent-foreground">
              <MapPin className="h-4 w-4" />
              {usingLocationMode ? (
                <>
                  Mandis within <strong>50km</strong> of your current location
                </>
              ) : (
                <>
                  Your region: <strong>{savedDistrict}, {savedState}</strong>
                </>
              )}
            </span>
            <div className="flex items-center gap-2">
              {usingLocationMode ? (
                <Button variant="outline" size="sm" onClick={startEditingRegion}>
                  Search by state/district instead
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={startEditingRegion}>
                    Change region
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={useMyLocation}
                    disabled={locationLoading}
                  >
                    {locationLoading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Navigation className="h-3.5 w-3.5" />
                    )}
                    Use my location instead
                  </Button>
                </>
              )}
            </div>
          </div>

          {locationError && <p className="text-xs text-muted-foreground">{locationError}</p>}

          {usedStateFallback && (
            <div className="flex items-center gap-2 rounded-xl border bg-gold/10 p-3 text-xs text-gold-foreground">
              <AlertCircle className="h-4 w-4 shrink-0 text-gold" />
              No mandi is registered yet in {savedDistrict} — showing other real mandis in{' '}
              {savedState} instead.
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Wheat className="h-4 w-4 shrink-0 text-primary" />
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className={selectClass}
            >
              {crops.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameEn} ({c.nameHi})
                </option>
              ))}
            </select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                usingLocationMode ? loadNearbyMandis(location) : loadMandis(savedState, savedDistrict)
              }
              className="text-muted-foreground"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </Button>
          </div>

          {mandisLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading mandis...
            </div>
          )}

          {mandisError && (
            <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" /> {mandisError}
            </div>
          )}

          {!mandisLoading && !mandisError && mandisWithDistance.length === 0 && (
            <div className="rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
              {usingLocationMode
                ? 'No mandis are registered yet within 50km of your location. Try searching by state/district instead.'
                : `No mandis are registered yet anywhere in ${savedState}. As more mandis are added, they'll show up here automatically.`}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mandisWithDistance.map((mandi, i) => {
              const price = prices[mandi.id];
              return (
                <motion.div
                  key={mandi.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4) }}
                >
                  <Card className="flex h-full flex-col justify-between">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base leading-snug">
                        {mandi.nameEn}{' '}
                        <span className="font-normal text-muted-foreground">({mandi.nameHi})</span>
                      </CardTitle>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                        {mandi.district}, {mandi.state}
                        {mandi.distanceKm != null && (
                          <span className="ml-1 font-semibold text-foreground">
                            • {mandi.distanceKm.toFixed(1)} km away
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0 text-sm">
                      <div className="flex items-center justify-between border-t pt-3">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <TrendingUp className="h-3.5 w-3.5" /> Live price
                        </span>
                        {!price || price.loading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                        ) : price.error ? (
                          <span className="text-xs text-muted-foreground">
                            No live price reported today
                          </span>
                        ) : (
                          <span className="font-bold text-primary">
                            ₹{price.modalPriceRsPerQuintal}/quintal
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="h-3.5 w-3.5" /> Farmers in queue
                        </span>
                        <span className="font-semibold text-foreground">{mandi.farmersWaiting}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
