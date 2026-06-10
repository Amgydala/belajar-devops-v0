import { NextResponse } from 'next/server'
import si from 'systeminformation'

export async function GET() {
  try {
    const cpuLoad = await si.currentLoad()
    const memory = await si.mem()
    
    // AMBIL SEMUA DATA KARTU JARINGAN (Termasuk yang virtual)
    const netData = await si.networkStats()

    const ramUsagePercentage = Math.round((memory.active / memory.total) * 100)
    const cpuUsagePercentage = Math.round(cpuLoad.currentLoad)

    // Trik DevOps: Cari kartu jaringan yang angka rx_sec (download) atau tx_sec (upload) nya diatas 0
    const activeNet = netData.find(net => net.rx_sec > 0 || net.tx_sec > 0) || netData[0]

    // Konversi bytes ke Megabytes per second (MB/s)
    const rx_speed = activeNet ? parseFloat((activeNet.rx_sec / 1024 / 1024).toFixed(2)) : 0
    const tx_speed = activeNet ? parseFloat((activeNet.tx_sec / 1024 / 1024).toFixed(2)) : 0

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