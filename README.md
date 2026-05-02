# 🎨 portafolio-frontend

SPA construida con **Angular 18 + Angular Material + NgModules** que consume la API REST del proyecto portafolio.

## 🖥️ Vistas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con dashboard de estadísticas |
| `/usuarios` | Listado con búsqueda, ordenamiento y paginación |
| `/usuarios/:id` | Detalle del usuario |
| `/regiones` | Acordeón de regiones con sus comunas (lazy load) |

---

## ✅ Pre-requisitos

1. **Docker Desktop** corriendo con `portafolio-db` levantado:
   ```bash
   cd ../portafolio-db
   docker compose up -d
   ```
2. **API NestJS corriendo** en `http://localhost:3000/api`:
   ```bash
   cd ../portafolio-api
   npm run start:dev
   ```
3. **Node.js 20+** (el mismo que usaste para la API)
4. **Angular CLI** (lo instalas a continuación)

---

## 🚀 Levantar el frontend

### Paso 1: Instalar Angular CLI globalmente (solo la primera vez)

```bash
npm install -g @angular/cli
```

Verifica:

```bash
ng version
```

Debe mostrar Angular CLI 18.x.

> 💡 Si aparece "Permission denied" en Mac/Linux, prueba con `sudo npm install -g @angular/cli`. En Windows ejecuta la terminal como administrador.

### Paso 2: Instalar dependencias del proyecto

Desde dentro de la carpeta `portafolio-frontend/`:

```bash
npm install
```

Tarda 2-4 minutos la primera vez. Verás warnings de "deprecated" o vulnerabilidades, son normales en Angular.

### Paso 3: Levantar en modo desarrollo

```bash
npm start
```

(Equivalente a `ng serve`.)

**Salida esperada:**

```
Local:   http://localhost:4200/
Application bundle generation complete. [X.XXX seconds]
```

### Paso 4: Abrir en el navegador

👉 **http://localhost:4200**

Vas a ver la home con:
- Hero "Bienvenido al Portafolio"
- 3 cards con conteos (usuarios, regiones, comunas)
- Card descriptivo del proyecto

Si las cards muestran números, ¡todo está conectado y funcionando! 🎉

---

## 🧪 Probar todo

1. **Click en "Usuarios"** (toolbar) → ves la tabla con Juan Pérez
2. **Click en el ojo** → ves el detalle completo
3. **Click en "Regiones"** → ves las 16 regiones
4. **Click en una región** → carga las comunas (solo la primera vez, después está cacheado)

### ¿Qué pasa si la API NO está corriendo?

Verás un snackbar rojo arriba a la derecha:
> "No se pudo conectar con el servidor. ¿La API está corriendo?"

Eso es el **error interceptor** funcionando. Levanta la API y recarga.

---

## 📁 Estructura del proyecto

```
portafolio-frontend/
├── src/
│   ├── app/
│   │   ├── app.module.ts                  # módulo raíz (≈ AppModule de Nest)
│   │   ├── app-routing.module.ts          # rutas raíz con lazy loading
│   │   ├── app.component.{ts,html,scss}   # componente raíz
│   │   │
│   │   ├── core/                          # ⭐ singletons globales
│   │   │   ├── core.module.ts
│   │   │   ├── models/                    # interfaces TS
│   │   │   │   ├── usuario.model.ts
│   │   │   │   ├── region.model.ts
│   │   │   │   └── comuna.model.ts
│   │   │   ├── services/                  # services HTTP
│   │   │   │   ├── api.service.ts         # service base centralizado
│   │   │   │   ├── usuarios.service.ts
│   │   │   │   ├── regiones.service.ts
│   │   │   │   └── comunas.service.ts
│   │   │   └── interceptors/
│   │   │       └── error.interceptor.ts   # snackbar global de errores
│   │   │
│   │   ├── shared/                        # 🔁 reutilizables
│   │   │   ├── shared.module.ts
│   │   │   └── components/loading/        # spinner reutilizable
│   │   │
│   │   ├── layout/
│   │   │   ├── layout.module.ts
│   │   │   └── main-layout/               # toolbar + sidenav + footer
│   │   │
│   │   └── features/                      # 🧩 módulos de negocio
│   │       ├── home/
│   │       │   ├── home.module.ts
│   │       │   └── home/
│   │       ├── usuarios/
│   │       │   ├── usuarios.module.ts
│   │       │   ├── usuarios-routing.module.ts
│   │       │   ├── usuarios-list/
│   │       │   └── usuario-detail/
│   │       └── regiones/
│   │           ├── regiones.module.ts
│   │           └── regiones-list/
│   │
│   ├── environments/
│   │   ├── environment.ts                 # apiUrl: http://localhost:3000/api
│   │   └── environment.prod.ts            # apiUrl: /api (mismo dominio)
│   ├── index.html
│   ├── main.ts
│   └── styles.scss                        # estilos globales
│
├── angular.json                           # config del CLI
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧠 Conceptos clave (mapeo NestJS ↔ Angular)

Como pediste consistencia con NestJS, esta es la simetría:

| Concepto | NestJS | Angular |
|----------|--------|---------|
| Módulo | `@Module` | `@NgModule` |
| Vista/Endpoint | `@Controller` | `@Component` |
| Lógica reutilizable | `@Injectable` Service | `@Injectable` Service |
| Configuración HTTP | DTOs + Pipes | HttpClient + Interceptors |
| Inyección de dependencias | constructor | constructor |
| Estructura | módulos por feature | módulos por feature |

**Un service en Angular** se ve igual que en NestJS:

```typescript
// NestJS
@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario) private model: typeof Usuario) {}
  findAll() { return this.model.findAll(); }
}

// Angular
@Injectable({ providedIn: 'root' })
export class UsuariosService {
  constructor(private api: ApiService) {}
  findAll() { return this.api.get<Usuario[]>('/usuarios'); }
}
```

---

## 🎨 Patrón "core / shared / features / layout"

Esta es la organización **estándar de proyectos Angular profesionales**:

| Carpeta | ¿Qué va aquí? | Importa a |
|---------|--------------|-----------|
| `core/` | Singletons (services HTTP, interceptors, guards) | Solo en `AppModule` |
| `shared/` | Componentes/pipes/directivas reutilizables | Cualquier feature |
| `features/` | Módulos de negocio (cada uno autocontenido) | Solo desde routing |
| `layout/` | Chrome de la app (toolbar, sidenav, footer) | Solo en `AppModule` |

**Beneficio del lazy loading:** las features se cargan solo cuando el usuario navega a esa ruta. La descarga inicial es ~30% más liviana.

---

## ⚙️ Configuración

Variables de entorno en `src/environments/`:

| Variable | Dev | Prod |
|----------|-----|------|
| `production` | `false` | `true` |
| `apiUrl` | `http://localhost:3000/api` | `/api` |

Cuando hagas `ng build`, Angular **automáticamente** reemplaza `environment.ts` por `environment.prod.ts` (configurado en `angular.json`).

---

## 🛠️ Comandos disponibles

```bash
npm start              # ng serve, modo desarrollo en :4200
npm run build          # build de producción → dist/
npm run watch          # build con watch (sin servir)
npm test               # tests con Karma + Jasmine
ng generate component features/algo   # genera un componente nuevo
ng generate service core/services/algo  # genera un service nuevo
```

---

## 🆘 Troubleshooting

### `Cannot find module '@angular/...'` o errores raros al levantar

Borra y reinstala:

```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### `Port 4200 is already in use`

Otra app está usando el puerto. Cambia el puerto:

```bash
ng serve --port 4201
```

### Snackbar rojo: "No se pudo conectar con el servidor"

La API NestJS no está corriendo. En otra terminal:

```bash
cd ../portafolio-api
npm run start:dev
```

### Snackbar rojo aunque la API esté corriendo

Probable problema de **CORS**. Verifica en `portafolio-api/.env`:

```
CORS_ORIGIN=http://localhost:4200
```

Si lo cambias, reinicia la API.

### Las cards de la home muestran 0 en todo

La API responde pero sin datos. Verifica en el navegador:
- http://localhost:3000/api/usuarios → debe devolver al menos a Juan Pérez
- Si está vacío, revisa que la BD tenga los datos del `init.sql`

### `ng: command not found`

Angular CLI no está instalado o no está en el PATH:

```bash
npm install -g @angular/cli
```

Reinicia la terminal después.

### Errores de TypeScript con strict templates

El proyecto está configurado con `strictTemplates: true` (lo más estricto). Si copias código de tutoriales antiguos, puede fallar. Cuéntame el error específico.

---

## 🚧 Próximos pasos

- [ ] Formularios reactivos para crear/editar usuarios (cuando agreguemos POST/PATCH a la API)
- [ ] Validador visual de RUT chileno
- [ ] Selector encadenado región → comuna
- [ ] Tests unitarios de services
- [ ] Tests E2E con Cypress
- [ ] Dockerizar el frontend (build → nginx)
- [ ] Migrar a Standalone components (cuando quieras)

---

## 📦 Subir a GitHub

```bash
cd portafolio-frontend
git init
git branch -M main
git add .
git commit -m "feat: frontend Angular 18 con Material y NgModules"

# Crea el repo "portafolio-frontend" en GitHub (sin README ni gitignore)
git remote add origin https://github.com/rodrigoandrescordova/portafolio-frontend.git
git push -u origin main
```

El `.gitignore` ya excluye `node_modules/` y `dist/`. ✅

---

**Repos relacionados:**
- 🐘 [portafolio-db](https://github.com/rodrigoandrescordova/portafolio-db) — Base de datos PostgreSQL dockerizada
- 🚀 [portafolio-api](https://github.com/rodrigoandrescordova/portafolio-api) — API REST con NestJS y Sequelize
- 📚 portafolio-docs — Documentación general
