import MapView from './components/MapView'
import BottomPanel from './components/BottomPanel'

function App() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 shrink-0 z-10">
        <h1 className="text-lg font-bold text-orange-500">RouteRunner</h1>
      </header>

      {/* Map takes all remaining space */}
      <main className="flex-1 relative">
        <MapView />
      </main>

      {/* Bottom Panel */}
      <BottomPanel />

    </div>
  )
}

export default App