# Blog App

Aplicación Rails para administrar alumnos y posts, con el frontend Angular como opción independiente.

## Requisitos

- Ruby 3.2.x y Bundler (el proyecto declara Ruby 3.2.3)
- Node.js y npm

En Windows, instala Ruby 3.2 con Devkit. Después de instalarlo, reinicia la terminal de VS Code y verifica que estén disponibles:

```powershell
ruby -v
gem install bundler
bundle -v
```

## Ejecutar la interfaz original de Rails

Desde la raíz del proyecto, inicia Rails:

```powershell
bundle install
ruby .\bin\rails db:prepare
ruby .\bin\rails server
```

Abre `http://localhost:3000` para usar las vistas Rails originales.

## Interfaz Angular opcional

Si quieres usar Angular, abre otra terminal:

```powershell
cd frontend
npm.cmd install
npm.cmd start
```

Abre `http://localhost:4200`. Esta interfaz usa la API JSON de Rails en `/api/v1/alumnos` y `/api/v1/posts`.

Para compilar Angular para producción:

```powershell
cd frontend
npm run build
```

El frontend y Rails son aplicaciones separadas. En producción, publica Angular detrás del mismo origen de la API o configura un proxy inverso para `/api`.

## Pruebas Rails

```powershell
ruby .\bin\rails test
```
