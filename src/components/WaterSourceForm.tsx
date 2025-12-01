import { useState } from 'react'
import { Save, MapPin, AlertCircle, Check } from 'lucide-react'
import { WaterSource, WaterSourceType, WaterQuality } from '../types'

interface WaterSourceFormProps {
  onAddWaterSource: (source: WaterSource) => void
}

export default function WaterSourceForm({ onAddWaterSource }: WaterSourceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'mata_air' as WaterSourceType,
    latitude: -4.384,
    longitude: 119.89,
    quality: 'baik' as WaterQuality,
    capacity: 0,
    populationServed: 0,
    address: '',
    district: '',
    village: '',
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama sumber air wajib diisi'
    }

    if (formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = 'Latitude harus antara -90 dan 90'
    }

    if (formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = 'Longitude harus antara -180 dan 180'
    }

    if (formData.capacity < 0) {
      newErrors.capacity = 'Kapasitas tidak boleh negatif'
    }

    if (formData.populationServed < 0) {
      newErrors.populationServed = 'Jumlah jiwa tidak boleh negatif'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const newWaterSource: WaterSource = {
        ...formData,
        id: Date.now().toString(),
        lastChecked: new Date().toISOString().split('T')[0]
      }
      
      onAddWaterSource(newWaterSource)
      
      // Reset form
      setFormData({
        name: '',
        type: 'mata_air',
        latitude: -4.384,
        longitude: 119.89,
        quality: 'baik',
        capacity: 0,
        populationServed: 0,
        address: '',
        district: '',
        village: '',
        notes: ''
      })
      
      setErrors({})
      
      // Show success message
      alert('✅ Data sumber air berhasil ditambahkan!')
      
    } catch (error) {
      console.error('Error adding water source:', error)
      alert('❌ Gagal menambahkan data. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'mata_air',
      latitude: -4.384,
      longitude: 119.89,
      quality: 'baik',
      capacity: 0,
      populationServed: 0,
      address: '',
      district: '',
      village: '',
      notes: ''
    })
    setErrors({})
  }

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }))
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.')
        }
      )
    } else {
      alert('Browser tidak mendukung geolocation')
    }
  }

  // Handler untuk perubahan select dengan type assertion yang aman
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as WaterSourceType
    setFormData(prev => ({ ...prev, type: value }))
  }

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as WaterQuality
    setFormData(prev => ({ ...prev, quality: value }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Form Tambah Data Sumber Air
        </h2>
        <p className="text-gray-600">
          Lengkapi form berikut untuk menambahkan data sumber air baru ke dalam sistem
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informasi Dasar */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            Informasi Dasar
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Sumber Air *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Contoh: Mata Air Bulue"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Sumber Air *
                </label>
                <select
                  value={formData.type}
                  onChange={handleTypeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sumur">Sumur</option>
                  <option value="mata_air">Mata Air</option>
                  <option value="sungai">Sungai</option>
                  <option value="danau">Danau</option>
                  <option value="pdam">PDAM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kualitas Air *
                </label>
                <select
                  value={formData.quality}
                  onChange={handleQualityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="baik">Baik</option>
                  <option value="sedang">Sedang</option>
                  <option value="buruk">Buruk</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lokasi */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Lokasi
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Koordinat Geografis *
              </label>
              <button
                type="button"
                onClick={setCurrentLocation}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <MapPin className="w-4 h-4" />
                Gunakan Lokasi Saat Ini
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Latitude *
                </label>
                <input
                  type="number"
                  step="0.000001"
                  required
                  value={formData.latitude}
                  onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value)})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.latitude ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="-4.384000"
                />
                {errors.latitude && (
                  <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Longitude *
                </label>
                <input
                  type="number"
                  step="0.000001"
                  required
                  value={formData.longitude}
                  onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value)})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.longitude ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="119.890000"
                />
                {errors.longitude && (
                  <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat Lengkap
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Desa Bulue, Kecamatan Marioriawa"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kecamatan
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Marioriawa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desa/Kelurahan
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({...formData, village: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Bulue"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kapasitas dan Pelayanan */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kapasitas dan Pelayanan
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kapasitas (L/detik) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: parseFloat(e.target.value) || 0})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.capacity ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="25.5"
                />
                {errors.capacity && (
                  <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jiwa Dilayani *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.populationServed}
                  onChange={(e) => setFormData({...formData, populationServed: parseInt(e.target.value) || 0})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.populationServed ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="1500"
                />
                {errors.populationServed && (
                  <p className="mt-1 text-sm text-red-600">{errors.populationServed}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catatan Tambahan
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tambahkan catatan atau keterangan khusus..."
              />
            </div>
          </div>
        </div>

        {/* Footer Form dengan Tombol Aksi */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Informasi Penting
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Pastikan semua data yang dimasukkan sudah diverifikasi. Data yang sudah disimpan 
                akan langsung muncul di peta dan dapat diakses di tab Data Sumber Air.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Simpan Data Sumber Air
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-md transition duration-200"
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}