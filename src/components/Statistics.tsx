import { Droplets, Users, Zap, TrendingUp } from 'lucide-react'
import { useWaterSources } from '../hooks/useWaterSources'

export default function Statistics() {
  const { waterSources } = useWaterSources()

  const totalCapacity = waterSources.reduce((sum, source) => sum + source.capacity, 0)
  const totalPopulationServed = waterSources.reduce((sum, source) => sum + source.populationServed, 0)
  
  const typeCounts = waterSources.reduce((acc, source) => {
    acc[source.type] = (acc[source.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const qualityCounts = waterSources.reduce((acc, source) => {
    acc[source.quality] = (acc[source.quality] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const stats = [
    {
      title: 'Total Sumber Air',
      value: waterSources.length,
      icon: Droplets,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Kapasitas',
      value: `${totalCapacity} L/detik`,
      icon: Zap,
      color: 'bg-green-500'
    },
    {
      title: 'Jiwa Dilayani',
      value: totalPopulationServed.toLocaleString(),
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Rata-rata Kualitas',
      value: Object.keys(qualityCounts).length > 0 ? 'Baik' : '-',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Statistik Sumber Air
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">
            Distribusi Jenis
          </h4>
          <div className="space-y-3">
            {Object.entries(typeCounts).map(([type, count]) => {
              const percentage = (count / waterSources.length * 100).toFixed(1)
              return (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">
                    {type.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {count} ({percentage}%)
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-4">
            Status Kualitas
          </h4>
          <div className="space-y-3">
            {Object.entries(qualityCounts).map(([quality, count]) => {
              const percentage = (count / waterSources.length * 100).toFixed(1)
              const colorClass = {
                baik: 'bg-green-500',
                sedang: 'bg-yellow-500',
                buruk: 'bg-red-500'
              }[quality] || 'bg-gray-500'
              
              return (
                <div key={quality} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">
                    {quality}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colorClass} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {count} ({percentage}%)
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}