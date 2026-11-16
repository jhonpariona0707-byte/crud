# Frontend Angular

Interfaz independiente de Blog App con pantallas CRUD para alumnos y posts.

## Desarrollo

1. Inicia Rails en la raíz del proyecto con `bin\rails server`.
2. Desde esta carpeta, ejecuta `npm install` y `npm start`.
3. Abre `http://localhost:4200`. `proxy.conf.json` envía las llamadas `/api` al backend en `http://localhost:3000`.

## Producción

Ejecuta `npm run build`. Configura el servidor web para servir Angular y reenviar `/api` a Rails bajo el mismo origen.
