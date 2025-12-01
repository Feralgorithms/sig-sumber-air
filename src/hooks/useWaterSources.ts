import { useState, useEffect } from 'react'
import { WaterSource } from '../types'
import { storeData, getInitialData } from '../utils/storage'

export function useWaterSources() {
  const [waterSources, setWaterSources] = useState<WaterSource[]>([])

  useEffect(() => {
    const initialData = getInitialData()
    setWaterSources(initialData)
  }, [])

  const addWaterSource = (source: WaterSource) => {
    const updated = [...waterSources, source]
    setWaterSources(updated)
    storeData('waterSources', updated)
  }

  const updateWaterSource = (id: string, updates: Partial<WaterSource>) => {
    const updated = waterSources.map(source =>
      source.id === id ? { ...source, ...updates } : source
    )
    setWaterSources(updated)
    storeData('waterSources', updated)
  }

  const deleteWaterSource = (id: string) => {
    const updated = waterSources.filter(source => source.id !== id)
    setWaterSources(updated)
    storeData('waterSources', updated)
  }

  return {
    waterSources,
    addWaterSource,
    updateWaterSource,
    deleteWaterSource
  }
}