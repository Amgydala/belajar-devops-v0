FROM node:20-alpine

WORKDIR /app

# Copy file konfigurasi package
COPY package.json pnpm-lock.yaml* ./

# Install pnpm dan pasang semua library
RUN npm install -g pnpm && pnpm install

# Copy semua file kodingan dari v0
COPY . .

# Buka gerbang port 3000
EXPOSE 3000

# Trik Sakti: Kita set IP dan Port lewat Environment Variable (ENV) global Linux
ENV HOST=0.0.0.0
ENV PORT=3000

# Jalankan perintah murni bawaan Next.js
CMD ["pnpm", "dev"]