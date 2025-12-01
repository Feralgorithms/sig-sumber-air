import { WaterSource } from '../types'

export const initialWaterSources: WaterSource[] = [
  {
    id: "1",
    name: "Mata Air Bulue",
    type: "mata_air",
    latitude: -4.384,
    longitude: 119.89,
    quality: "baik",
    capacity: 25,
    populationServed: 1500,
    lastChecked: "2024-01-15",
    address: "Desa Bulue, Kecamatan Marioriawa",
    district: "Marioriawa",
    village: "Bulue"
  },
  {
    id: "2",
    name: "Sumur Bor PDAM",
    type: "pdam",
    latitude: -4.365,
    longitude: 119.91,
    quality: "sedang",
    capacity: 50,
    populationServed: 5000,
    lastChecked: "2024-01-10",
    address: "Jl. Poros Watansoppeng",
    district: "Lalabata",
    village: "Watansoppeng"
  },
  {
    id: "3",
    name: "Sungai Walanae",
    type: "sungai",
    latitude: -4.395,
    longitude: 119.87,
    quality: "sedang",
    capacity: 200,
    populationServed: 10000,
    lastChecked: "2024-01-12",
    address: "Kecamatan Marioriwawo",
    district: "Marioriwawo",
    village: "Bulu Pase"
  },
  {
    id: "4",
    name: "Sumur Desa Citta",
    type: "sumur",
    latitude: -4.372,
    longitude: 119.85,
    quality: "baik",
    capacity: 15,
    populationServed: 800,
    lastChecked: "2024-01-14",
    address: "Desa Citta, Kecamatan Lilirilau",
    district: "Lilirilau",
    village: "Citta"
  },
   {
    id: "5",
    name: "Taman Wisata Alam Lejja (Sumber Utama)",
    type: "mata_air",
    latitude: -4.3649028, 
    longitude: 119.8978028,
    quality: "baik",
    capacity: 200, 
    populationServed: 5000, 
    lastChecked: "2024-12-01",
    address: "Kawasan Hutan Lindung, Desa Bulue, Kecamatan Marioriawa",
    district: "Marioriawa",
    village: "Bulue[citation:2][citation:4]"
  },
  {
    id: "6",
    name: "Mata Air Ompō",
    type: "mata_air",
    latitude: -4.380,
    longitude: 119.882,
    quality: "baik",
    capacity: 20,
    populationServed: 1200,
    lastChecked: "2024-10-15",
    address: "Permandian Alam Ompō",
    district: "Lalabata",
    village: "Watansoppeng"
  }
]