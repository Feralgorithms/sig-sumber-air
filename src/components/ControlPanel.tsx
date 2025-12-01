import { useState, useEffect } from 'react'
import { 
  Filter, 
  Layers, 
  Thermometer, 
  Droplets, 
  Eye,
  EyeOff,
  RefreshCw,
  Check,
  AlertCircle,
  MapPin
} from 'lucide-react'
import { MapFilters, WaterSourceType, WaterQuality } from '../types'

interface ControlPanelProps {
  filters: MapFilters
  updateFilters: (filters: Partial<MapFilters>) => void
  resetFilters: () => void
  totalSources: number
  filteredCount: number
}

export default function ControlPanel({ 
  filters, 
  updateFilters, 
  resetFilters,
  totalSources,
  filteredCount 
}: ControlPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    filter: true,
    layer: true,
    view: true
  })
  const [capacityInput, setCapacityInput] = useState({
    min: filters.capacityRange[0],
    max: filters.capacityRange[1]
  })

  // Update capacity input when filters change
  useEffect(() => {
    setCapacityInput({
      min: filters.capacityRange[0],
      max: filters.capacityRange[1]
    })
  }, [filters.capacityRange])

  const waterSourceTypes: { value: WaterSourceType; label: string; icon: React.ElementType; color: string }[] = [
    { value: 'sumur', label: 'Sumur', icon: Droplets, color: 'bg-blue-500' },
    { value: 'mata_air', label: 'Mata Air', icon: Thermometer, color: 'bg-green-500' },
    { value: 'sungai', label: 'Sungai', icon: Droplets, color: 'bg-purple-500' },
    { value: 'danau', label: 'Danau', icon: Droplets, color: 'bg-cyan-500' },
    { value: 'pdam', label: 'PDAM', icon: Droplets, color: 'bg-orange-500' }
  ]

  const qualityOptions: { value: WaterQuality; label: string; color: string; bgColor: string }[] = [
    { value: 'baik', label: 'Baik', color: 'text-green-700', bgColor: 'bg-green-100' },
    { value: 'sedang', label: 'Sedang', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    { value: 'buruk', label: 'Buruk', color: 'text-red-700', bgColor: 'bg-red-100' }
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleTypeToggle = (type: WaterSourceType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type]
    
    updateFilters({ types: newTypes })
  }

  const handleQualityToggle = (quality: WaterQuality) => {
    const newQuality = filters.quality.includes(quality)
      ? filters.quality.filter(q => q !== quality)
      : [...filters.quality, quality]
    
    updateFilters({ quality: newQuality })
  }

  const handleCapacityChange = (type: 'min' | 'max', value: number) => {
    setCapacityInput(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const applyCapacityFilter = () => {
    updateFilters({ 
      capacityRange: [capacityInput.min, capacityInput.max]
    })
  }

  const toggleHeatmap = () => {
    updateFilters({ showHeatmap: !filters.showHeatmap })
  }

  const selectAllTypes = () => {
    updateFilters({ types: waterSourceTypes.map(t => t.value) })
  }

  const clearAllTypes = () => {
    updateFilters({ types: [] })
  }

  const selectAllQuality = () => {
    updateFilters({ quality: qualityOptions.map(q => q.value) })
  }

  const clearAllQuality = () => {
    updateFilters({ quality: [] })
  }

  const showAll = () => {
    updateFilters({
      types: [],
      quality: [],
      capacityRange: [0, 200],
      showHeatmap: false
    })
    setCapacityInput({ min: 0, max: 200 })
  }

  const hideAll = () => {
    updateFilters({
      types: [],
      quality: [],
      capacityRange: [0, 0],
      showHeatmap: false
    })
    setCapacityInput({ min: 0, max: 0 })
  }

  const applyActiveFilters = () => {
    // Filter sudah aktif, tidak perlu action tambahan
    console.log('Filter aktif diterapkan:', filters)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Layers className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Kontrol Peta</h3>
      </div>

      {/* Filter Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('filter')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filter Data</span>
          </div>
          <span className="text-sm text-gray-500">
            {expandedSections.filter ? '▲' : '▼'}
          </span>
        </button>
        
        {expandedSections.filter && (
          <div className="p-4 space-y-4">
            {/* Jenis Sumber Air */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Jenis Sumber Air
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllTypes}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Semua
                  </button>
                  <button
                    onClick={clearAllTypes}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {waterSourceTypes.map((type) => {
                  const isActive = filters.types.includes(type.value)
                  
                  return (
                    <button
                      key={type.value}
                      onClick={() => handleTypeToggle(type.value)}
                      className={`
                        flex items-center gap-2 p-2 rounded border text-sm
                        transition-all duration-200
                        ${isActive
                          ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className={`w-3 h-3 rounded-full ${type.color}`} />
                      <span className="truncate">{type.label}</span>
                      {isActive && (
                        <Check className="w-3 h-3 ml-auto text-blue-600" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Kualitas Air */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Kualitas Air
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllQuality}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Semua
                  </button>
                  <button
                    onClick={clearAllQuality}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                {qualityOptions.map((quality) => {
                  const isActive = filters.quality.includes(quality.value)
                  
                  return (
                    <button
                      key={quality.value}
                      onClick={() => handleQualityToggle(quality.value)}
                      className={`
                        flex-1 flex items-center justify-center gap-2 p-2 rounded border text-sm font-medium
                        transition-all duration-200
                        ${isActive
                          ? `${quality.bgColor} border-transparent shadow-sm`
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      {isActive ? <Check className="w-3 h-3" /> : <div className="w-3 h-3" />}
                      <span className={isActive ? quality.color : 'text-gray-600'}>
                        {quality.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Range Kapasitas */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Rentang Kapasitas (L/detik)
                </label>
                <span className="text-xs text-gray-500">
                  {filters.capacityRange[0]} - {filters.capacityRange[1]}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={capacityInput.min}
                    onChange={(e) => handleCapacityChange('min', parseInt(e.target.value) || 0)}
                    placeholder="Min"
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-gray-500">sampai</span>
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={capacityInput.max}
                    onChange={(e) => handleCapacityChange('max', parseInt(e.target.value) || 200)}
                    placeholder="Max"
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={applyCapacityFilter}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Terapkan
                  </button>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={filters.capacityRange[0]}
                    onChange={(e) => updateFilters({ 
                      capacityRange: [parseInt(e.target.value), filters.capacityRange[1]] 
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={filters.capacityRange[1]}
                    onChange={(e) => updateFilters({ 
                      capacityRange: [filters.capacityRange[0], parseInt(e.target.value)] 
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layer Control Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('layer')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span className="font-medium">Layer & Tampilan</span>
          </div>
          <span className="text-sm text-gray-500">
            {expandedSections.layer ? '▲' : '▼'}
          </span>
        </button>
        
        {expandedSections.layer && (
          <div className="p-4 space-y-3">
            {/* Heatmap Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 via-green-400 to-red-500 rounded" />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Heatmap Kepadatan
                  </span>
                  <p className="text-xs text-gray-500">
                    Tampilkan distribusi sumber air
                  </p>
                </div>
              </div>
              <button
                onClick={toggleHeatmap}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors duration-200
                  ${filters.showHeatmap ? 'bg-blue-600' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                    ${filters.showHeatmap ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Legend */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legenda Marker
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-600">Kualitas Baik</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <span className="text-xs text-gray-600">Kualitas Sedang</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-xs text-gray-600">Kualitas Buruk</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('view')}
          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="font-medium">Aksi Cepat</span>
          </div>
          <span className="text-sm text-gray-500">
            {expandedSections.view ? '▲' : '▼'}
          </span>
        </button>
        
        {expandedSections.view && (
          <div className="p-4 grid grid-cols-2 gap-2">
            <button 
              onClick={showAll}
              className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700 hover:bg-green-100 transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-2 justify-center">
                <Eye className="w-4 h-4" />
                <span>Lihat Semua</span>
              </div>
            </button>
            <button 
              onClick={hideAll}
              className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700 hover:bg-red-100 transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-2 justify-center">
                <EyeOff className="w-4 h-4" />
                <span>Sembunyikan</span>
              </div>
            </button>
            <button 
              onClick={applyActiveFilters}
              className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700 hover:bg-blue-100 transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-2 justify-center">
                <Filter className="w-4 h-4" />
                <span>Filter Aktif</span>
              </div>
            </button>
            <button 
              onClick={resetFilters}
              className="p-3 bg-orange-50 border border-orange-200 rounded text-sm text-orange-700 hover:bg-orange-100 transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-2 justify-center">
                <RefreshCw className="w-4 h-4" />
                <span>Reset Peta</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-blue-800">Status Filter</p>
                <p className="text-xs text-blue-600 mt-1">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {filteredCount} dari {totalSources} sumber air ditampilkan
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-blue-700 hover:text-blue-900 font-medium"
              >
                Reset All
              </button>
            </div>
            
            <div className="mt-3 space-y-2">
              {filters.types.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-xs text-gray-600">Jenis:</span>
                  {filters.types.map(type => (
                    <span key={type} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {waterSourceTypes.find(t => t.value === type)?.label}
                    </span>
                  ))}
                </div>
              )}
              
              {filters.quality.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-xs text-gray-600">Kualitas:</span>
                  {filters.quality.map(quality => (
                    <span key={quality} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      {qualityOptions.find(q => q.value === quality)?.label}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600">Kapasitas:</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                  {filters.capacityRange[0]} - {filters.capacityRange[1]} L/detik
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600">Heatmap:</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  filters.showHeatmap 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {filters.showHeatmap ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}