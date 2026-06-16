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
  onGenerate: () => void
  isGenerating: boolean
  error: string
  routeData: any
}

export default function BottomPanel({
  selectedDistance,
  onDistanceChange,
  startLocation,
  locationName,
  onGenerate,
  isGenerating,
  error,
  routeData
}: Props) {

  const distanceKm = routeData?.features?.[0]?.properties?.summary?.distance
  const durationMin = routeData?.features?.[0]?.properties?.summary?.duration

  return (
    <div className="bg-white border-t border-gray-200 p-4 shrink-0">

      {locationName && (
        <p className="text-xs text-orange-500 font-medium mb-2 truncate">
          📍 {locationName}
        </p>
      )}

      <p className="text-xs text-gray-500 mb-2 font-medium">SELECT DISTANCE</p>
      <div className="flex gap-2 mb-3">
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

      {routeData && (
        <div className="bg-orange-50 rounded-lg p-3 mb-3 flex justify-between text-sm">
          <span className="font-medium text-gray-700">
            {(distanceKm / 1000).toFixed(2)} km
          </span>
          <span className="text-gray-500">
            ~{Math.round(durationMin / 60)} min
          </span>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs mb-2">{error}</p>
      )}

      <button
        disabled={!startLocation || isGenerating}
        onClick={onGenerate}
        className={`w-full py-3 rounded-full font-semibold text-sm transition-colors
          ${!startLocation
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-orange-500 text-white'
          }`}
      >
        {!startLocation
          ? 'Tap map to set start'
          : isGenerating
          ? 'Generating...'
          : routeData
          ? 'Try Another Route'
          : 'Generate Route'}
      </button>

    </div>
  )
}