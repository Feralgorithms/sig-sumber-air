import { useState, useMemo } from 'react'
import { useWaterSources } from './useWaterSources'
import { MapFilters } from '../types'

export function useMap() {
  const { waterSources } = useWaterSources()
  const [filters, setFilters] = useState<MapFilters>({
    types: [],
    quality: [],
    capacityRange: [0, 200],
    showHeatmap: false
  })

  const filteredSources = useMemo(() => {
    return waterSources.filter(source => {
      // Filter berdasarkan jenis sumber air
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

  const updateFilters = (newFilters: Partial<MapFilters>) => {
    setFilters(prev => ({ 
      ...prev, 
      ...newFilters 
    }))
  }

  return {
    waterSources: filteredSources,
    filters,
    updateFilters,
    allSources: waterSources 
  }
}