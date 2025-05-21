### MERN Stack CRUD with JWT

This is a web application project using React, with a Nodejs Backend using Express and Mongodb as Database (MERN Stack)

### Instalación con docker-compose (Recomendado)

```sh
# Construir y ejecutar todos los contenedores (MongoDB, Backend y Frontend)
docker-compose up -d --build

# Para ver los logs de los contenedores
docker-compose logs -f
```

Esto iniciará tres contenedores:
- **tasksdb**: Base de datos MongoDB
- **mern-backend**: Servidor Node.js/Express (accesible en http://localhost:4000)
- **mern-frontend**: Cliente React/Vite (accesible en http://localhost:5173)

### Detener los contenedores

```sh
docker-compose down
```

### Deployment

```sh
git clone https://github.com/FaztWeb/mern-tasks-auth
cd mern-tasks-auth
npm i
npm run build
npm start
```

> You need to have a Mongodb database running