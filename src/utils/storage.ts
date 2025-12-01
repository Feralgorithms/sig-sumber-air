import { WaterSource } from '../types'
import { initialWaterSources } from '../data/initialData'

export const storeData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error storing data:', error)
  }
}

export const getStoredData = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error retrieving data:', error)
    return null
  }
}

export const getInitialData = (): WaterSource[] => {
  try {
    const stored = getStoredData<WaterSource[]>('waterSources')
    if (stored && stored.length > 0) {
      return stored
    }
    return initialWaterSources
  } catch (error) {
    console.error('Error getting initial data:', error)
    return initialWaterSources
  }
}