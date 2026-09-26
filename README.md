# Arbey Ramos Gómez · Presidente del Concejo de Restrepo

Sitio personal de Arbey Ramos Gómez —su historia, su gestión como concejal—
**y plataforma de participación ciudadana**, bajo la marca **Avanza Restrepo**.
HTML + CSS + JavaScript, sin dependencias ni proceso de compilación.

> **Importante:** el sitio no menciona candidaturas ni campañas. Es la página
> personal del Presidente del Concejo: perfil, trayectoria, gestión y el canal
> para que la comunidad reporte problemáticas.

## Cómo verlo

El sitio usa **URLs limpias** (`/perfil`, `/gestion`, `/voz`… sin `.html`),
así que en local conviene servirlo con el mismo Caddy de producción:

```bash
# Con Caddy instalado (caddyserver.com):
SITE_ROOT=. caddy run
# abre http://localhost:8080
```

También sirve `python -m http.server 8000`, pero ahí las páginas solo
responden con su nombre de archivo (`/perfil.html`); los enlaces del menú
apuntan a las rutas limpias y necesitan Caddy. La instalación como app y el
service worker solo funcionan sobre `http://` o `https://`.

## Estructura del sitio

Nueve páginas. Cada tema tiene su propio espacio; la portada solo resume y enlaza.

| Página | Qué contiene |
|---|---|
| [index.html](index.html) | **Portada.** Hero, tablero en vivo, accesos a las secciones y un resumen de cada una |
| [perfil.html](perfil.html) | Biografía completa, ficha de datos y valores |
| [gestion.html](gestion.html) | Gestión como concejal: 6 frentes con el trabajo adelantado |
| [voz.html](voz.html) | **Tu voz**: mapa ciudadano, reportes, apoyos, ranking, formulario |
| [noticias.html](noticias.html) | Sala de prensa con filtros |
| [eventos.html](eventos.html) | Agenda con confirmación de asistencia y descarga al calendario |
| [logros.html](logros.html) | Trayectoria y semáforo de gestiones |
| [unete.html](unete.html) | Participa: formas de aportar y formulario de registro |
| [contacto.html](contacto.html) | Datos de contacto y formulario de mensaje |

Cada página se publica con su URL limpia: `perfil.html` responde en
`/perfil`, y las direcciones viejas con `.html` redirigen (301) a la limpia.
`/candidato` y `/propuestas` —nombres antiguos ya compartidos— redirigen a
`/perfil` y `/gestion` desde el `Caddyfile`.

### Navegación

El menú y el pie se generan desde `ui.js`, en las constantes `MENU` y `PIE`. **Es el único
sitio donde vive la navegación**: cambiar un enlace ahí lo cambia en las nueve páginas.

```
Inicio · Quién soy · Mi gestión · Tu voz · Actualidad ▾ · Contacto     [Participa]
                                           ├─ Noticias
                                           ├─ Eventos y agenda
                                           └─ Trayectoria
```

### Tono de los textos

Todo el sitio habla **en primera persona**: es Arbey hablándole directamente
al lector, de tú («cuéntame tu problemática», «ver mi gestión», «te espero»).
Al editar cualquier texto hay que mantener esa voz; nada en tercera persona
(«Arbey gestionó…»), salvo su nombre en títulos, firmas y textos alternativos.

El pie repite todo como mapa del sitio en tres columnas: Conoce a Arbey, Participa y Contacto.

## Archivos que el equipo edita

| Archivo | Para qué |
|---|---|
| [assets/js/config.js](assets/js/config.js) | Nombre, cargo, municipio, contacto, redes, coordenadas del mapa, categorías, claves del servidor |
| [assets/js/contenido.js](assets/js/contenido.js) | Perfil, gestión, noticias, eventos, trayectoria y la pregunta de la semana |
| [perfil.html](perfil.html) | La biografía larga (es prosa, se edita más cómodo en el HTML) |
| [assets/img/](assets/img/) | Fotos y logo (ver `README.txt` dentro de la carpeta) |

Todo lo marcado con `demo: true` sale con una etiqueta **"Ejemplo"** visible en la página.
Al reemplazarlo por contenido real, borra esa línea.

**La gestión vive en `contenido.js`** (clave `gestion`), no en el HTML: la portada muestra
el resumen y `gestion.html` el detalle, pero ambas leen del mismo sitio. Cambiar un frente
una vez lo cambia en las dos. Los puntos de cada frente están escritos en general: hay que
afinarlos con los acuerdos, debates y gestiones reales (número de acuerdo, año y resultado).

## Código

```
assets/css/styles.css        Base: paleta, tipografía, portada, pie
assets/css/plataforma.css    Menú desplegable, mapa, tarjetas, modales, agenda, semáforo
assets/js/carga.js           Pantalla de marca: el logo se ensambla por piezas
                             y la flecha despega en ciclo; un toque la relanza
                             y en escritorio la marca sigue al mouse
assets/js/config.js          Configuración
assets/js/contenido.js       Contenido editable
assets/js/store.js           Capa de datos (local o servidor)
assets/js/ui.js              Navegación, pie, iconos, modales, registro, avisos, encuesta
sw.js + manifest.json        Instalación como app y funcionamiento sin señal
```

Un archivo JS por página, con el mismo nombre de la página:

```
main.js        index.html          perfil.js      perfil.html
gestion.js     gestion.html        voz.js         voz.html
noticias.js    noticias.html       eventos.js     eventos.html
logros.js      logros.html         unete.js       unete.html
contacto.js    contacto.html
```

Todas las páginas cargan la misma cadena, en este orden:
`config.js → contenido.js → store.js → ui.js → <página>.js`

Antes de esa cadena, y sin `defer`, va `carga.js`: pinta la pantalla de carga en el
primer fotograma y se retira sola cuando la página termina de cargar.

`ui.js` también monta lo que se mueve con el scroll: la barra de lectura de arriba, el
botón de volver arriba, la profundidad del fondo del hero y la aparición escalonada de
los bloques (`.reveal`, con las variantes `--zoom`, `--izq`, `--der`). Las cifras de los
tableros empiezan a contar cuando entran en pantalla, no al cargar la página.

En celular las tarjetas van de a dos por fila (accesos, ejes, noticias, semáforo, pasos,
cifras y contacto), con el texto de apoyo recortado a tres líneas. Está en el bloque
`MÓVIL: DOS TARJETAS POR FILA` de `plataforma.css`; el hero compacto, en el bloque de
620 px de `styles.css`.

## El backend: Postgres + PostgREST en Railway

**Modo remoto (el actual).** Los reportes, apoyos, registros, asistencias y votos se
guardan en una base de datos **PostgreSQL** del mismo proyecto de Railway, expuesta
con **[PostgREST](https://postgrest.org)** (el servicio `postgrest`, imagen oficial
`postgrest/postgrest`). El sitio la consume por REST desde `config.js`:

```js
api: {
  url: "https://postgrest-production-fdb5.up.railway.app",
  anonKey: ""     // solo hace falta si el servidor es Supabase
}
```

Si el servidor se cae, la plataforma sigue funcionando en local en vez de mostrar un
error; y si `url` se deja vacío, cae a modo local (los datos quedan solo en el
navegador de cada visitante — útil para desarrollo).

**Permisos.** PostgREST atiende cada petición del sitio con el rol `web_anon`:
puede **leer** `reportes`, `apoyos` y `votos`, puede **crear** en las cinco tablas,
y **no puede editar, borrar, ni leer los datos personales** (`registros`,
`asistencias`). Para cambiar el estado del semáforo de un reporte se entra por
`railway ssh -s Postgres` y se actualiza con SQL (`update reportes set estado=...`).

El esquema se creó ejecutando el SQL de abajo dentro del contenedor:
`railway ssh -s Postgres`, y ahí `psql "$DATABASE_URL"`.

### SQL de las tablas

```sql
create table reportes (
  id uuid primary key default gen_random_uuid(),
  creado timestamptz default now(),
  categoria text not null,
  titulo text not null,
  descripcion text not null,
  zona text,
  autor text,
  lat double precision,
  lng double precision,
  foto text,
  estado text default 'recibido'
);

create table apoyos (
  id uuid primary key default gen_random_uuid(),
  reporte_id uuid references reportes(id) on delete cascade,
  huella text,
  creado timestamptz default now(),
  unique (reporte_id, huella)      -- un apoyo por dispositivo
);

create table registros (
  id uuid primary key default gen_random_uuid(),
  nombre text not null, telefono text, correo text,
  zona text, ayuda text, mensaje text,
  creado timestamptz default now()
);

create table asistencias (
  id uuid primary key default gen_random_uuid(),
  evento_id text not null, nombre text, telefono text, huella text,
  creado timestamptz default now(),
  unique (evento_id, huella)       -- una confirmación por dispositivo
);

create table votos (
  id uuid primary key default gen_random_uuid(),
  encuesta_id text not null, opcion_id text not null, huella text,
  creado timestamptz default now(),
  unique (encuesta_id, huella)     -- un voto por dispositivo
);

-- Roles de PostgREST: "authenticator" es el que se conecta (la clave
-- vive en la variable PGRST_DB_URI del servicio postgrest) y cambia a
-- "web_anon" para atender cada petición anónima del sitio.
create role web_anon nologin;
create role authenticator noinherit login password '...';
grant web_anon to authenticator;
grant usage on schema public to web_anon;

-- Cualquiera puede leer lo público y crear; nadie puede editar ni
-- borrar, y los datos personales no se pueden leer desde el sitio.
grant select on reportes, apoyos, votos to web_anon;
grant insert on reportes, apoyos, registros, asistencias, votos to web_anon;
```

El estado de cada reporte (`recibido` → `revision` → `compromiso` → `cumplido`; en
pantalla: Recibido → En estudio → En gestión → Gestionado) se cambia a mano desde el
panel de Supabase. Eso es lo que mueve el semáforo de [logros.html](logros.html).

## Paleta

**Azul y blanco únicamente.** Una sola escala de azul, sin ningún otro color de marca.
Todo sale de las variables al inicio de [assets/css/styles.css](assets/css/styles.css):

| Variable | Color | Uso |
|---|---|---|
| `--azul-900` | `#05193F` | Fondos oscuros, títulos |
| `--azul-800` | `#07245C` | Degradados, texto sobre blanco |
| `--azul-700` | `#0A3488` | Logo, hover |
| `--azul-600` | `#0D47B5` | Color primario, botones sobre fondo claro |
| `--azul-500` | `#1E5CD6` | Foco, detalles |
| `--azul-400` | `#3D7BEC` | Bordes activos |
| `--azul-300` | `#6D9DF2` | **Acento sobre fondo oscuro** (antes era el dorado) |
| `--azul-200` | `#A8C4F4` | Textos secundarios sobre azul |
| `--azul-100` | `#D5E2FA` | Etiquetas |
| `--azul-50` | `#EEF4FD` | Fondos suaves |
| `--nieve` | `#F3F7FC` | Secciones alternas (blanco frío) |

### Los tres botones

| Clase | Aspecto | Dónde |
|---|---|---|
| `.btn--claro` | Blanco con texto azul | Acción principal **sobre fondo azul oscuro** |
| `.btn--primary` | Azul sólido con texto blanco | Acción principal **sobre fondo blanco** |
| `.btn--linea` | Contorno azul | Acción secundaria sobre fondo blanco |
| `.btn--ghost` | Contorno blanco translúcido | Acción secundaria sobre fondo azul |

Los únicos colores fuera de la escala azul son los **rojos de error** de los formularios
(`#C0392B`), que se mantienen por legibilidad: un mensaje de error en azul no se lee como error.

## Desplegar en Railway

El sitio se sirve con Caddy dentro de un contenedor. Railway detecta el
`Dockerfile` y no hay que configurar nada más.

1. En [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
   y elegir `444Pipe/ArbeyRamosAlcalde`.
2. Railway construye la imagen y publica. No hace falta definir variables de
   entorno: `PORT` la inyecta Railway sola y el `Caddyfile` la lee.
3. En **Settings → Networking → Generate Domain** sale la dirección pública.

### Después del primer despliegue

Con el dominio ya en la mano, hay que escribirlo en las etiquetas que las
redes exigen absolutas. Sin esto, al compartir el enlace en WhatsApp o
Facebook sale sin imagen:

```bash
python configurar-dominio.py https://tu-dominio.up.railway.app
git add -A && git commit -m "Configura el dominio de producción" && git push
```

El script se puede correr de nuevo cuando haya dominio propio: actualiza las
etiquetas en vez de duplicarlas.

### Qué hace el `Caddyfile`

**URLs limpias.** `/perfil` sirve `perfil.html` (`try_files`), `/index.html`
redirige a `/`, cualquier `/pagina.html` redirige a `/pagina` (301), y los
nombres antiguos `/candidato` y `/propuestas` redirigen a `/perfil` y
`/gestion`.

| Archivos | Caché | Por qué |
|---|---|---|
| Páginas, `.css`, `.js`, `sw.js`, `manifest.json` | `no-cache` | No llevan hash en el nombre; una caché larga dejaría el sitio (o la app instalada) en la versión vieja |
| Imágenes | 1 día | Cambian poco y pesan |

`no-cache` no significa "no guardar": guarda y revalida, y una respuesta 304
pesa unos pocos bytes.

También añade cabeceras de seguridad (`X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options`) y permite geolocalización y cámara, que
el mapa ciudadano necesita para ubicar el reporte y adjuntar la foto.

### Lo que NO va al servidor

El `.dockerignore` deja fuera las fuentes del logo y la foto —varios MB que
solo sirven para regenerar los archivos con los scripts— y los propios
scripts. La imagen final lleva únicamente las páginas, el CSS, el JS y las
imágenes que el navegador pide.

## Imágenes

> **Si reemplazas una imagen sin cambiarle el nombre**, súbele el número a la
> versión de su URL (`?v=2` → `?v=3`) donde se use —`ui.js`, `carga.js`,
> `styles.css` y `sw.js`— y sube la `VERSION` del service worker. Las imágenes
> se cachean un día en el navegador y sin ese cambio los celulares siguen
> mostrando la vieja.

El logo y la foto se procesan con dos scripts, para no depender de editar
imágenes a mano:

```bash
python assets/img/generar-logos.py    # 7 versiones del logo, favicon e iconos
python assets/img/generar-fotos.py    # foto optimizada + imagen para redes
```

Si llega un logo o una foto nueva, se reemplaza el archivo fuente (el logo azul
de `nuevo logo/` / `arbeyramos.PNG`) y se corre el script correspondiente.
Ver [assets/img/README.txt](assets/img/README.txt).

## Marca y eslogan

El logo es **Avanza Restrepo** (monograma AR con la flecha). Vive en
`assets/img/nuevo logo/` y de ahí salen todas las versiones.

**«Orgullosamente restrepense»** — el lema del perfil de Arbey. Vive en el hero
de [index.html](index.html) y en `eslogan` dentro de `config.js`. La pantalla
de carga muestra solo la marca, sin lema.

## Pendientes

- [ ] **Afinar la gestión** — los puntos de `gestion` en `contenido.js` están en general;
      falta ponerles los acuerdos, debates y gestiones reales con año y resultado
- [ ] **Datos de contacto y redes** — en `config.js`
- [ ] **Conectar Supabase** para que los datos sean compartidos
- [ ] **Política de tratamiento de datos** (Ley 1581 de 2012) — publicar la página y enlazarla
      desde los formularios
- [ ] **Contenido real** en `contenido.js` (noticias, eventos)

## Notas técnicas

- **Mapa**: Leaflet + OpenStreetMap. Gratis y sin llave de API. Si no hay internet, el mapa
  muestra un aviso y la lista de reportes sigue funcionando.
- **Fotos de los reportes**: se reducen en el navegador antes de enviarse (máx. 1000 px, JPEG 72%),
  para que suban rápido con mala señal.
- **Apoyos y votos**: se controlan con un identificador anónimo del dispositivo. Evita el
  duplicado casual, no es un sistema de identidad.
- **Accesibilidad**: enlace de salto, foco visible, `aria-label` en iconos, soporte de teclado
  en las tarjetas y respeto a `prefers-reduced-motion`.
- **Instalable**: desde el navegador del celular, "Agregar a pantalla de inicio".
