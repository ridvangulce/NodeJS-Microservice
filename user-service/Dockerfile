# Node.js base image kullan
FROM node:16

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları Docker içinde yeniden yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamanın çalışacağı portu belirt
EXPOSE 5001

# Uygulamayı başlat
CMD ["npm", "start"]
