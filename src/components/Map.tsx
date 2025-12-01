import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet.heat'
import { WaterSource, MapFilters } from '../types'

interface MapProps {
  waterSources: WaterSource[]
  filters: MapFilters
}

export default function Map({ waterSources, filters }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const heatLayerRef = useRef<L.Layer | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map centered on Soppeng
    const map = L.map(mapRef.current).setView([-4.384, 119.89], 12)
    mapInstanceRef.current = map

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      minZoom: 10
    }).addTo(map)

    // Add scale control
    L.control.scale({ imperial: false }).addTo(map)

    // Add zoom controls
    L.control.zoom({
      position: 'topright'
    }).addTo(map)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update markers when waterSources or filters change
  useEffect(() => {
    if (!mapInstanceRef.current) return

    const map = mapInstanceRef.current
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []
    
    // Clear heat layer
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current)
      heatLayerRef.current = null
    }

    if (waterSources.length === 0) {
      return
    }

    // Create custom icons based on water quality
    const createIcon = (quality: string) => {
      const color = {
        baik: '#10B981',    // green
        sedang: '#F59E0B',  // yellow
        buruk: '#EF4444'    // red
      }[quality] || '#6B7280'

      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 28px;
            height: 28px;
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <div style="
              width: 10px;
              height: 10px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      })
    }

    // Add markers for filtered water sources
    waterSources.forEach((source) => {
      const marker = L.marker([source.latitude, source.longitude], {
        icon: createIcon(source.quality)
      })

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <div style="
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 6px 6px 0 0;
            margin: -12px -12px 0 -12px;
          ">
            <h4 style="margin: 0; font-size: 16px; font-weight: bold;">${source.name}</h4>
            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">
              ${source.village}, ${source.district}
            </p>
          </div>
          <div style="padding: 12px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div>
                <p style="margin: 0; font-size: 11px; color: #6b7280;">Jenis</p>
                <p style="margin: 0; font-size: 13px; font-weight: 500;">${source.type.replace('_', ' ')}</p>
              </div>
              <div>
                <p style="margin: 0; font-size: 11px; color: #6b7280;">Kualitas</p>
                <span style="
                  display: inline-block;
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-size: 11px;
                  font-weight: 500;
                  margin-top: 2px;
                  ${source.quality === 'baik' ? 'background: #dcfce7; color: #166534;' :
                    source.quality === 'sedang' ? 'background: #fef3c7; color: #92400e;' :
                    'background: #fee2e2; color: #991b1b;'}
                ">
                  ${source.quality}
                </span>
              </div>
              <div>
                <p style="margin: 0; font-size: 11px; color: #6b7280;">Kapasitas</p>
                <p style="margin: 0; font-size: 13px; font-weight: 500;">${source.capacity} L/detik</p>
              </div>
              <div>
                <p style="margin: 0; font-size: 11px; color: #6b7280;">Dilayani</p>
                <p style="margin: 0; font-size: 13px; font-weight: 500;">${source.populationServed.toLocaleString()} jiwa</p>
              </div>
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 11px; color: #6b7280;">Terakhir diperiksa</p>
              <p style="margin: 0; font-size: 12px; font-weight: 500;">${source.lastChecked}</p>
            </div>
          </div>
        </div>
      `

      marker.bindPopup(popupContent)
      marker.addTo(map)
      markersRef.current.push(marker)
    })

    // Add heatmap layer if enabled
    if (filters.showHeatmap && waterSources.length > 0) {
      const heatPoints = waterSources.map(source => [
        source.latitude,
        source.longitude,
        Math.min(source.capacity / 10, 1.5) // Normalize capacity for heat intensity
      ]) as [number, number, number][]

      // @ts-expect-error - leaflet.heat doesn't have TypeScript definitions
      heatLayerRef.current = L.heatLayer(heatPoints, {
        radius: 30,
        blur: 20,
        maxZoom: 16,
        gradient: {
          0.1: '#3b82f6', // blue
          0.3: '#10b981', // green
          0.5: '#f59e0b', // yellow
          0.7: '#f97316', // orange
          1.0: '#ef4444'  // red
        }
      }).addTo(map)
    }

    // Fit bounds to show all markers if we have any
    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current)
      map.fitBounds(group.getBounds().pad(0.2))
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove())
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current)
      }
    }
  }, [waterSources, filters])

  return <div ref={mapRef} className="w-full h-full rounded-lg" />
}