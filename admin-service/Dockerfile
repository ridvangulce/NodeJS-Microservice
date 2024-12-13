# Node.js base image kullan
FROM node:20

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Portu belirt
EXPOSE 5002

# Uygulamayı başlat
CMD ["npm", "start"]
