import { useState } from 'react'
import MapView from './components/MapView'
import BottomPanel from './components/BottomPanel'
import SearchBox from './components/SearchBox'

export type LngLat = [number, number]

function App() {
  const [startLocation, setStartLocation] = useState<LngLat | null>(null)
  const [selectedDistance, setSelectedDistance] = useState<number>(5)
  const [locationName, setLocationName] = useState<string>('')

  const handleLocationSelect = (coords: LngLat, name: string) => {
    setStartLocation(coords)
    setLocationName(name)
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">

      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 shrink-0 z-10">
        <h1 className="text-lg font-bold text-orange-500 shrink-0">RunRunner</h1>
        <SearchBox onLocationSelect={handleLocationSelect} />
      </header>

      <main className="flex-1 relative">
        <MapView
          startLocation={startLocation}
          onLocationSelect={(coords) => handleLocationSelect(coords, '')}
        />
      </main>

      <BottomPanel
        selectedDistance={selectedDistance}
        onDistanceChange={setSelectedDistance}
        startLocation={startLocation}
        locationName={locationName}
      />

    </div>
  )
}

export default App