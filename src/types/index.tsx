export interface WaterSource {
  id: string
  name: string
  type: WaterSourceType
  latitude: number
  longitude: number
  quality: WaterQuality
  capacity: number
  populationServed: number
  lastChecked: string
  address: string
  district: string
  village: string
  notes?: string 
}

export interface MapFilters {
  types: WaterSourceType[]
  quality: WaterQuality[]
  capacityRange: [number, number]
  showHeatmap: boolean
}

export type WaterSourceType = 'sumur' | 'mata_air' | 'sungai' | 'danau' | 'pdam'
export type WaterQuality = 'baik' | 'sedang' | 'buruk'
export type TabType = 'map' | 'data' | 'stats' | 'add'