import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST(request: Request) {
  try {
    const { pid } = await request.json();

    if (!pid) {
      return NextResponse.json({ error: 'PID tidak ditemukan' }, { status: 400 });
    }

    // Perintah sakral Linux untuk mematikan proses secara paksa
    // Menggunakan rumus matematika sistem: kill -9 PID
    exec(`kill -9 ${pid}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Gagal kill proses: ${error}`);
        
        return;
      }
    });

    return NextResponse.json({ success: true, message: `Proses ${pid} berhasil dimatikan` });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}