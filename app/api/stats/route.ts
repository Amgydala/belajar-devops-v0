import { NextResponse } from 'next/server'
import si from 'systeminformation'

export async function GET() {
  try {
    const cpuLoad = await si.currentLoad()
    const memory = await si.mem()
    
    // SENSOR BARU: Ambil data statistik jaringan internet
    const netStats = await si.networkInterfaceDefault()
    const netData = await si.networkStats(netStats)

    const ramUsagePercentage = Math.round((memory.active / memory.total) * 100)
    const cpuUsagePercentage = Math.round(cpuLoad.currentLoad)

    // Hitung kecepatan download & upload dalam MB/s (Megabytes per second)
    // Kita bagi 1024 dua kali karena data aslinya berupa bytes
    const rx_speed = netData[0] ? parseFloat((netData[0].rx_sec / 1024 / 1024).toFixed(2)) : 0 // Download
    const tx_speed = netData[0] ? parseFloat((netData[0].tx_sec / 1024 / 1024).toFixed(2)) : 0 // Upload

    return NextResponse.json({
      cpu: cpuUsagePercentage,
      ram: ramUsagePercentage,
      download: rx_speed,
      upload: tx_speed,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data hardware' }, { status: 500 })
  }
}