/**
 * Nominatim Geocoding — Free, OpenStreetMap-based
 *
 * Usage policy compliance:
 *   - Max 1 request/second (enforced by caller)
 *   - Proper User-Agent header
 *   - Results cached in sessionStorage
 *
 * https://operations.osmfoundation.org/policies/nominatim/
 */

interface NominatimResult {
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state_district?: string;
    state?: string;
    county?: string;
    country?: string;
  };
}

export interface GeocodingResult {
  displayName: string;
  city: string;
  state: string;
  isDemo: boolean;
}

const CACHE_PREFIX = 'sahara_geo_';

function getCached(key: string): GeocodingResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = sessionStorage.getItem(CACHE_PREFIX + key);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

function setCache(key: string, value: GeocodingResult): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — ignore
  }
}

/**
 * Reverse geocode coordinates to a location name via Nominatim.
 * Caches results in sessionStorage. Returns demo fallback on failure.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<GeocodingResult> {
  const cacheKey = `${lat.toFixed(4)}_${lng.toFixed(4)}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Sahara-Hackathon-Prototype/1.0 (sahara@example.com)',
          'Accept-Language': 'en',
        },
      }
    );

    if (!res.ok) throw new Error(`Nominatim returned ${res.status}`);

    const data: NominatimResult = await res.json();

    const result: GeocodingResult = {
      displayName: data.display_name,
      city: data.address.city ?? data.address.town ?? data.address.village ?? data.address.state_district ?? 'Unknown',
      state: data.address.state ?? data.address.country ?? 'Unknown',
      isDemo: false,
    };

    setCache(cacheKey, result);
    return result;
  } catch (err) {
    console.warn('Nominatim geocoding failed:', err);
    return {
      displayName: 'Demo Location, India',
      city: 'Demo City',
      state: 'Demo State',
      isDemo: true,
    };
  }
}

/**
 * Get the user's current position via browser Geolocation API.
 * Returns null if permission is denied or unavailable.
 */
export function getUserPosition(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  });
}
