import { Droplets, MapPin, Building2, Users, Zap } from 'lucide-react'

export default function Header() {
  // URL logo Kabupaten Soppeng (gunakan URL eksternal atau path lokal)
  const logoUrl = "/logo.svg"
  
  return (
    <header className="bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-700 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        {/* Bagian Atas: Logo dan Judul */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Kiri: Logo dan Judul */}
          <div className="flex items-center gap-4">
            {/* Logo Kabupaten */}
            <div className="relative group">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                {/* Logo Kabupaten Soppeng */}
                <img 
                  src={logoUrl}
                  alt="Logo Kabupaten Soppeng"
                  className="w-16 h-16 object-contain"
                  onError={(e) => {
                    // Fallback jika gambar gagal load
                    e.currentTarget.style.display = 'none'
                    const fallback = e.currentTarget.parentElement
                    if (fallback) {
                      fallback.innerHTML = `
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                          <span class="text-white font-bold text-xl">SP</span>
                        </div>
                      `
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold text-white">ID</span>
              </div>
            </div>
            
            {/* Judul dan Lokasi */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Droplets className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    SIG SUMBER AIR
                  </h1>
                  <p className="text-xs text-cyan-100 font-medium uppercase tracking-wider">
                    Sistem Informasi Geografis
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <Building2 className="w-4 h-4" />
                  <p className="text-sm font-medium">Kabupaten Soppeng</p>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm">Sulawesi Selatan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: Badge Info */}
          <div className="flex flex-col items-end">
            <div className="mt-3 flex items-center gap-2 text-xs text-cyan-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Sistem Aktif • Versi 1.0.0
            </div>
          </div>
        </div>

        {/* Deskripsi dan Misi */}
        <div className="mt-8 lg:mt-10 pt-6 border-t border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                Visi & Misi
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                "Mewujudkan pengelolaan sumber daya air yang berkelanjutan, 
                transparan, dan akuntabel untuk kesejahteraan masyarakat 
                Kabupaten Soppeng melalui sistem informasi geografis yang 
                terintegrasi."
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-300" />
                Fungsi Utama
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-cyan-200">Pemetaan Digital</p>
                  <p className="text-sm font-medium text-white">Sumber Air</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-cyan-200">Monitoring</p>
                  <p className="text-sm font-medium text-white">Kualitas Air</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-cyan-200">Analisis</p>
                  <p className="text-sm font-medium text-white">Distribusi</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-cyan-200">Pengelolaan</p>
                  <p className="text-sm font-medium text-white">Data Terpadu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-600/20 px-4 py-2 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Data Real-time</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 px-4 py-2 rounded-full border border-blue-400/30">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium">GIS Mapping</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 px-4 py-2 rounded-full border border-purple-400/30">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm font-medium">Analytics Dashboard</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 px-4 py-2 rounded-full border border-cyan-400/30">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-sm font-medium">Public Access</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}