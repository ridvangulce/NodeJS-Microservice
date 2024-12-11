# Desteklenen Node.js sürümünü kullan
FROM node:20

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Next.js uygulamasını build et
RUN npm run build

# Portu belirt
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
