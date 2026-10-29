'use client';

import { useEffect, useRef, useState } from 'react';
import type { Shelter, AlertType } from '@/lib/types';
import { getUserPosition, reverseGeocode, type GeocodingResult } from '@/lib/geocoding';

interface MapViewProps {
  center: [number, number];
  radius: number;
  shelters: Shelter[];
  alertType: AlertType;
}

export default function MapView({ center, radius, shelters, alertType }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<GeocodingResult | null>(null);

  // Try to get real user position
  useEffect(() => {
    getUserPosition().then(pos => {
      if (pos) {
        setUserLocation(pos);
        reverseGeocode(pos.lat, pos.lng).then(setLocationName);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let L: typeof import('leaflet');
    let map: import('leaflet').Map;

    const init = async () => {
      L = (await import('leaflet')).default;

      // Fix default marker icon
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (!mapRef.current || mapInstanceRef.current) return;

      map = L.map(mapRef.current, { zoomControl: true }).setView(center, 11);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Affected area circle
      const circleColor = alertType === 'flood' ? '#3b82f6'
        : alertType === 'cyclone' ? '#8b5cf6'
        : alertType === 'heat' ? '#f97316'
        : '#ef4444';

      L.circle(center, {
        radius: radius * 1000,
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '6 4',
      }).addTo(map).bindPopup(
        `<div style="font-family:sans-serif;padding:4px">
          <strong>⚠️ DEMO Affected Area</strong><br/>
          <small style="color:#ef4444">NOT a real emergency zone</small>
        </div>`
      );

      // Alert epicenter marker
      const alertIcon = L.divIcon({
        html: `<div style="background:#ef4444;border:3px solid white;border-radius:50%;width:20px;height:20px;box-shadow:0 2px 8px rgba(239,68,68,0.5)"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: '',
      });

      L.marker(center, { icon: alertIcon }).addTo(map).bindPopup(
        `<div style="font-family:sans-serif;padding:4px">
          <strong>🔴 DEMO Alert Epicenter</strong><br/>
          <small style="color:#94a3b8">This is demo data only</small>
        </div>`
      );

      // User location — use real position if available, otherwise demo offset
      const userPos = userLocation
        ? [userLocation.lat, userLocation.lng] as [number, number]
        : [center[0] + 0.05, center[1] + 0.04] as [number, number];
      const isRealLocation = !!userLocation;

      const userIcon = L.divIcon({
        html: `<div style="background:${isRealLocation ? '#16a34a' : '#3b82f6'};border:3px solid white;border-radius:50%;width:16px;height:16px;box-shadow:0 2px 8px rgba(${isRealLocation ? '22,163,74' : '59,130,246'},0.5)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        className: '',
      });

      const locationLabel = isRealLocation && locationName
        ? `<strong>📍 Your Location</strong><br/><small>${locationName.city}, ${locationName.state}</small>${locationName.isDemo ? '<br/><small style="color:#94a3b8">Geocoding fallback</small>' : ''}`
        : `<strong>📍 Your Demo Location</strong>`;

      L.marker(userPos, { icon: userIcon }).addTo(map).bindPopup(
        `<div style="font-family:sans-serif;padding:4px">
          ${locationLabel}
        </div>`
      );

      // Shelter markers
      shelters.forEach(shelter => {
        const shelterIcon = L.divIcon({
          html: `<div style="background:#16a34a;border:3px solid white;border-radius:6px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 8px rgba(22,163,74,0.4)">🏫</div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          className: '',
        });

        L.marker([shelter.coordinates.lat, shelter.coordinates.lng], { icon: shelterIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:sans-serif;padding:4px">
              <strong>🏫 DEMO Shelter</strong><br/>
              <span style="color:#64748b">${shelter.name}</span><br/>
              <small>${shelter.address}</small><br/>
              <small>Capacity: ${shelter.capacity}</small><br/>
              <small style="color:#ef4444">DEMO DATA — Not a real shelter</small>
            </div>`
          );
      });
    };

    init();

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as import('leaflet').Map).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, radius, shelters, alertType, userLocation, locationName]);

  return (
    <div>
      <div
        ref={mapRef}
        className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-sm z-0"
        style={{ position: 'relative' }}
      />
      {userLocation && locationName && !locationName.isDemo && (
        <div className="mt-2 text-xs text-green-600 flex items-center gap-1.5">
          📍 Your location: <strong>{locationName.city}, {locationName.state}</strong>
          <span className="text-slate-400">(via browser geolocation + Nominatim)</span>
        </div>
      )}
    </div>
  );
}
