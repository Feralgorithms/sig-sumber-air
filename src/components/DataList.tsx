import { Edit2, Trash2, Eye } from 'lucide-react'
import { useWaterSources } from '../hooks/useWaterSources'
import { WaterSource } from '../types'

export default function DataList() {
  const { waterSources, deleteWaterSource } = useWaterSources()

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      sumur: 'Sumur',
      mata_air: 'Mata Air',
      sungai: 'Sungai',
      danau: 'Danau',
      pdam: 'PDAM'
    }
    return labels[type] || type
  }

  const getQualityColor = (quality: string) => {
    const colors: Record<string, string> = {
      baik: 'bg-green-100 text-green-800',
      sedang: 'bg-yellow-100 text-yellow-800',
      buruk: 'bg-red-100 text-red-800'
    }
    return colors[quality] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Daftar Sumber Air
        </h3>
        <span className="text-sm text-gray-500">
          Total: {waterSources.length} sumber air
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kualitas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kapasitas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jiwa Dilayani
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {waterSources.map((source: WaterSource) => (
              <tr key={source.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {source.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {source.village}, {source.district}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {getTypeLabel(source.type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getQualityColor(source.quality)}`}>
                    {source.quality.charAt(0).toUpperCase() + source.quality.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {source.capacity} L/detik
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {source.populationServed.toLocaleString()} jiwa
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteWaterSource(source.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 truncate">
                      {source.address}
                    </p>
                    {source.notes && (
                      <p className="text-xs text-gray-500 mt-1">
                        {source.notes}
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}