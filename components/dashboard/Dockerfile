# Gunakan base image Node.js versi 20 yang ringan
FROM node:20-alpine AS base

# Jalankan instalasi pnpm secara global di dalam kontainer
RUN npm install -g pnpm

WORKDIR /app

# Copy file konfigurasi package dulu agar cache layer efisien
COPY package.json pnpm-lock.yaml* ./

# Install dependensi proyek
RUN pnpm install

# Copy seluruh kodingan proyekmu ke dalam kontainer
COPY . .

# Build aplikasi Next.js agar siap pakai untuk production
RUN pnpm build

# Tentukan port internal yang akan diekspos oleh kontainer
EXPOSE 3000

# Perintah untuk menyalakan Next.js di dalam kontainer
CMD ["pnpm", "start"]