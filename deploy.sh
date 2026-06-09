#!/bin/bash

# Nama kontainer yang diatur
NAMA_KONTAINER="web-otomatis"

echo "[INFO] Memulai proses otomatisasi devops..."

# 1. Cek apakah ada kontainer dengan nama tersebut yang sedang berjalan
if [ "$(docker ps -aq -f name=$NAMA_KONTAINER)" ]; then
    echo "[WARN] Menemukan kontainer lama ($NAMA_KONTAINER). Menghancurkan server lama..."
    docker stop $NAMA_KONTAINER
    docker rm $NAMA_KONTAINER
    echo "[SUCCESS] Server lama berhasil dibersihkan!"
fi

# 2. Nyalakan server baru
echo "[INFO] Menyandarkan server web Nginx yang baru..."
docker run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html --name $NAMA_KONTAINER nginx

echo "[SUCCESS] Otomatisasi Selesai! Silakan cek localhost:8080 di browsermu."