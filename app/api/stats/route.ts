import { NextResponse } from 'next/server'
import si from 'systeminformation'

export async function GET() {
  try {
    // 1. Ambil data beban CPU asli saat ini
    const cpuLoad = await si.currentLoad()
    
    // 2. Ambil data memori RAM asli saat ini
    const memory = await si.mem()

    // Hitung persentase RAM yang terpakai
    const ramUsagePercentage = Math.round((memory.active / memory.total) * 100)
    const cpuUsagePercentage = Math.round(cpuLoad.currentLoad)

    // 3. Kirim datanya dalam format JSON bersih
    return NextResponse.json({
      cpu: cpuUsagePercentage,
      ram: ramUsagePercentage,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data hardware' }, { status: 500 })
  }
}