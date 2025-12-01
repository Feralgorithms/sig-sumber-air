import { Map, Database, BarChart3, PlusCircle } from 'lucide-react'

interface TabNavigationProps {
  activeTab: 'map' | 'data' | 'stats' | 'add'
  onTabChange: (tab: 'map' | 'data' | 'stats' | 'add') => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    {
      id: 'map' as const,
      label: 'Peta Interaktif',
      icon: Map,
      description: 'Visualisasi sumber air pada peta'
    },
    {
      id: 'data' as const,
      label: 'Data Sumber Air',
      icon: Database,
      description: 'Tabel data lengkap'
    },
    {
      id: 'stats' as const,
      label: 'Statistik',
      icon: BarChart3,
      description: 'Analisis dan dashboard'
    },
    {
      id: 'add' as const,
      label: 'Tambah Data',
      icon: PlusCircle,
      description: 'Input data sumber air baru'
    }
  ]

  return (
    <div className="border-b border-gray-200">
      <nav className="flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg
                transition-colors duration-200 relative flex-shrink-0
                ${isActive 
                  ? 'bg-white text-blue-600 border-t border-x border-gray-200 -mb-px' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : ''}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
              
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          )
        })}
      </nav>
      
      <div className="mt-2 px-4">
        <p className="text-sm text-gray-600">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>
    </div>
  )
}