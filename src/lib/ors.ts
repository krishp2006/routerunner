import type { LngLat } from '../App'

export async function generateRoute(start: LngLat, distanceKm: number) {
  const url = 'https://api.openrouteservice.org/v2/directions/foot-walking/geojson'

  const body = {
    coordinates: [start],
    options: {
      round_trip: {
        length: (distanceKm * 1000) * .9,
        points: 3,
        seed: Math.floor(Math.random() * 1000)
      }
    }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': import.meta.env.VITE_ORS_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    throw new Error('Failed to generate route')
  }

  const data = await res.json()
  return data
}