import { useState, useMemo } from 'react'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'
import Map from './components/Map'
import DataList from './components/DataList'
import Statistics from './components/Statistics'
import WaterSourceForm from './components/WaterSourceForm'
import ControlPanel from './components/ControlPanel'
import { useWaterSources } from './hooks/useWaterSources'
import { MapFilters } from './types'

function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'data' | 'stats' | 'add'>('map')
  const { waterSources, addWaterSource } = useWaterSources()
  const [filters, setFilters] = useState<MapFilters>({
    types: [],
    quality: [],
    capacityRange: [0, 200],
    showHeatmap: false
  })

  // Filter data berdasarkan state filters
  const filteredWaterSources = useMemo(() => {
    return waterSources.filter(source => {
      // Filter berdasarkan jenis
      if (filters.types.length > 0 && !filters.types.includes(source.type)) {
        return false
      }
      
      // Filter berdasarkan kualitas
      if (filters.quality.length > 0 && !filters.quality.includes(source.quality)) {
        return false
      }
      
      // Filter berdasarkan kapasitas
      if (source.capacity < filters.capacityRange[0] || source.capacity > filters.capacityRange[1]) {
        return false
      }
      
      return true
    })
  }, [waterSources, filters])

  // Fungsi untuk update filters
  const updateFilters = (newFilters: Partial<MapFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  // Reset semua filter
  const resetFilters = () => {
    setFilters({
      types: [],
      quality: [],
      capacityRange: [0, 200],
      showHeatmap: false
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Konten Utama berdasarkan Tab Aktif */}
        <div className="mt-6">
          {activeTab === 'map' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Peta Interaktif */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-4 h-[600px]">
                  <Map 
                    waterSources={filteredWaterSources} 
                    filters={filters}
                  />
                </div>
              </div>
              
              {/* Kontrol Panel */}
              <div>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <ControlPanel 
                    filters={filters}
                    updateFilters={updateFilters}
                    resetFilters={resetFilters}
                    totalSources={waterSources.length}
                    filteredCount={filteredWaterSources.length}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <DataList />
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Statistics />
            </div>
          )}
          
          {activeTab === 'add' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Tambah Data */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <WaterSourceForm onAddWaterSource={addWaterSource} />
                </div>
              </div>
              
              {/* Panduan/Informasi */}
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    🎯 Panduan Pengisian Form
                  </h3>
                  <ul className="space-y-3 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <span>Pastikan data yang dimasukkan sesuai dengan kondisi di lapangan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <span>Koordinat dapat diperoleh dari Google Maps atau GPS di lokasi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <span>Kapasitas diisi dalam satuan liter per detik (L/detik)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <span>Data yang sudah disimpan dapat diedit atau dihapus di tab Data</span>
                    </li>
                  </ul>
                </div>
                
                {/* Statistik Singkat */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    📊 Statistik Data Saat Ini
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Sumber Air</p>
                      <p className="text-2xl font-bold text-blue-600">{waterSources.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Data Terbaru Ditambahkan</p>
                      <p className="text-lg font-medium text-gray-800">
                        {waterSources.length > 0 
                          ? new Date(waterSources[waterSources.length - 1].lastChecked).toLocaleDateString('id-ID')
                          : 'Belum ada data'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App