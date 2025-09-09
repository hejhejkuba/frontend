# Frontend
Frontend for App

Należy pobrać projekt z repozytorium

````
git clone https://github.com/hejhejkuba/frontend.git
````

Należy utworzyć sieć

````
docker network create mynet
````


W pliku vite.config.ts podmienić adres na lokalizacje backendu np.

````
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
````

Zbudować obraz 

````
docker build -t myapp-frontend-dev ./frontend
````

Uruchomić kontener

````
docker run -d \
  --name frontend \
  --network mynet \
  -p 5173:5173 \
  myapp-frontend-dev
````