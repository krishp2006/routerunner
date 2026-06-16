import { useState, useRef } from 'react'
import type { LngLat } from '../App'

type Result = {
  id: string
  place_name: string
  center: LngLat
}

type Props = {
  onLocationSelect: (coords: LngLat, name: string) => void
}

export default function SearchBox({ onLocationSelect }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = async (text: string) => {
    if (text.length < 3) {
      setResults([])
      return
    }

    setIsLoading(true)

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&autocomplete=true&limit=5&types=address,place,neighborhood`

    const res = await fetch(url)
    const data = await res.json()

    setResults(data.features || [])
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    // Debounce — wait 300ms after user stops typing before calling API
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => search(value), 300)
  }

  const handleSelect = (result: Result) => {
    setQuery(result.place_name)
    setResults([])
    onLocationSelect(result.center, result.place_name)
  }

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search start location..."
        className="w-full h-9 px-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-orange-400"
      />

      {isLoading && (
        <div className="absolute right-3 top-2 text-gray-400 text-xs">...</div>
      )}

      {results.length > 0 && (
        <ul className="absolute top-10 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {results.map((r) => (
            <li
              key={r.id}
              onClick={() => handleSelect(r)}
              className="px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-0"
            >
              {r.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}