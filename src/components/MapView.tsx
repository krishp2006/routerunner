import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { LngLat } from '../App'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

type Props = {
  startLocation: LngLat | null
  onLocationSelect: (coords: LngLat) => void
}

export default function MapView({ startLocation, onLocationSelect }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)

  // Initialize map
  useEffect(() => {
    if (map.current) return
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.8711, 43.2557],
      zoom: 13
    })

    // Click handler
    map.current.on('click', (e) => {
      const coords: LngLat = [e.lngLat.lng, e.lngLat.lat]
      onLocationSelect(coords)
    })
  }, [])

  // Update marker when startLocation changes
  useEffect(() => {
    if (!map.current || !startLocation) return

    // Remove existing marker
    if (marker.current) marker.current.remove()

    // Add new marker
    marker.current = new mapboxgl.Marker({ color: '#f97316' })
      .setLngLat(startLocation)
      .addTo(map.current)
    
        if (!map.current || !startLocation) return
    map.current.flyTo({
    center: startLocation,
    zoom: 14,
    duration: 1500
  })
  }, [startLocation])

  return <div ref={mapContainer} className="w-full h-full" />
}