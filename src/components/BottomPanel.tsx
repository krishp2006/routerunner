import type { LngLat } from '../App'

const distances = [
  { label: '5K', km: 5 },
  { label: '10K', km: 10 },
  { label: 'Half', km: 21 },
]

type Props = {
  selectedDistance: number
  onDistanceChange: (km: number) => void
  startLocation: LngLat | null
  locationName: string
}


export default function BottomPanel({ selectedDistance, onDistanceChange, startLocation, locationName }: Props) {
  return (

    <div className="bg-white border-t border-gray-200 p-4 shrink-0">

    {locationName && (
        <p className="text-xs text-orange-500 font-medium mb-2 truncate">
          📍 {locationName}
        </p>
      )}

      <p className="text-xs text-gray-500 mb-2 font-medium">SELECT DISTANCE</p>
      <div className="flex gap-2 mb-4">
        {distances.map((d) => (
          <button
            key={d.km}
            onClick={() => onDistanceChange(d.km)}
            className={`flex-1 py-2 rounded-full border text-sm font-medium transition-colors
              ${selectedDistance === d.km
                ? 'bg-orange-500 text-white border-orange-500'
                : 'border-gray-300 text-gray-600'
              }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <button
        disabled={!startLocation}
        className={`w-full py-3 rounded-full font-semibold text-sm transition-colors
          ${startLocation
            ? 'bg-orange-500 text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
      >
        {startLocation ? 'Generate Route' : 'Tap map to set start'}
      </button>

    </div>
  )
}