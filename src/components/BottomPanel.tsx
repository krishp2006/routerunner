import { useState } from 'react'

const distances = [
  { label: '5K', km: 5 },
  { label: '10K', km: 10 },
  { label: 'Half', km: 21 },
]

export default function BottomPanel() {
  const [selected, setSelected] = useState<number>(5)

  return (
    <div className="bg-white border-t border-gray-200 p-4 shrink-0">
      
      <p className="text-xs text-gray-500 mb-2 font-medium">SELECT DISTANCE</p>
      <div className="flex gap-2 mb-4">
        {distances.map((d) => (
          <button
            key={d.km}
            onClick={() => setSelected(d.km)}
            className={`flex-1 py-2 rounded-full border text-sm font-medium transition-colors
              ${selected === d.km
                ? 'bg-orange-500 text-white border-orange-500'
                : 'border-gray-300 text-gray-600'
              }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <button className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold text-sm">
        Generate Route
      </button>

    </div>
  )
}