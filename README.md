# Arbey Ramos Gómez · Alcaldía de Restrepo 2027–2030

Sitio de campaña **y plataforma de participación ciudadana**. HTML + CSS + JavaScript,
sin dependencias ni proceso de compilación.

## Cómo verlo

```bash
python -m http.server 8000
# abre http://localhost:8000
```

Funciona también abriendo `index.html` con doble clic, pero **conviene usar el servidor local**:
la instalación como app y el service worker solo funcionan sobre `http://` o `https://`.

## Estructura del sitio

Nueve páginas. Cada tema tiene su propio espacio; la portada solo resume y enlaza.

| Página | Qué contiene |
|---|---|
| [index.html](index.html) | **Portada.** Hero, tablero en vivo, accesos a las secciones y un resumen de cada una |
| [candidato.html](candidato.html) | Biografía completa, ficha de datos y valores |
| [propuestas.html](propuestas.html) | Programa de gobierno: 6 ejes con sus compromisos detallados |
| [voz.html](voz.html) | **Tu voz**: mapa ciudadano, reportes, apoyos, ranking, formulario |
| [noticias.html](noticias.html) | Sala de prensa con filtros |
| [eventos.html](eventos.html) | Agenda con confirmación de asistencia y descarga al calendario |
| [logros.html](logros.html) | Trayectoria y semáforo de compromisos |
| [unete.html](unete.html) | Formas de aportar y formulario de registro |
| [contacto.html](contacto.html) | Datos de contacto y formulario de mensaje |

### Navegación

El menú y el pie se generan desde `ui.js`, en las constantes `MENU` y `PIE`. **Es el único
sitio donde vive la navegación**: cambiar un enlace ahí lo cambia en las nueve páginas.

```
Inicio · El candidato · Propuestas · Tu voz · Actualidad ▾ · Contacto     [Únete]
                                              ├─ Noticias
                                              ├─ Eventos y agenda
                                              └─ Trayectoria
```

El pie repite todo como mapa del sitio en tres columnas: La campaña, Participa y Contacto.

## Archivos que el equipo edita

| Archivo | Para qué |
|---|---|
| [assets/js/config.js](assets/js/config.js) | Nombre, municipio, contacto, redes, coordenadas del mapa, categorías, claves del servidor |
| [assets/js/contenido.js](assets/js/contenido.js) | Perfil, propuestas, noticias, eventos, trayectoria y la pregunta de la semana |
| [candidato.html](candidato.html) | La biografía larga (es prosa, se edita más cómodo en el HTML) |
| [assets/img/](assets/img/) | Fotos y logo (ver `README.txt` dentro de la carpeta) |

Todo lo marcado con `demo: true` sale con una etiqueta **"Ejemplo"** visible en la página.
Al reemplazarlo por contenido real, borra esa línea.

**Las propuestas viven en `contenido.js`**, no en el HTML: la portada muestra el resumen y
`propuestas.html` el detalle, pero ambas leen del mismo sitio. Cambiar un eje una vez lo
cambia en las dos.

## Código

```
assets/css/styles.css        Base: paleta, tipografía, portada, pie
assets/css/plataforma.css    Menú desplegable, mapa, tarjetas, modales, agenda, semáforo
assets/js/config.js          Configuración
assets/js/contenido.js       Contenido editable
assets/js/store.js           Capa de datos (local o servidor)
assets/js/ui.js              Navegación, pie, iconos, modales, registro, avisos, encuesta
sw.js + manifest.json        Instalación como app y funcionamiento sin señal
```

Un archivo JS por página, con el mismo nombre de la página:

```
main.js        index.html          candidato.js   candidato.html
propuestas.js  propuestas.html     voz.js         voz.html
noticias.js    noticias.html       eventos.js     eventos.html
logros.js      logros.html         unete.js       unete.html
contacto.js    contacto.html
```

Todas las páginas cargan la misma cadena, en este orden:
`config.js → contenido.js → store.js → ui.js → <página>.js`

## Los dos modos de funcionamiento

**Modo demo (el actual).** Todo funciona —reportar, apoyar, confirmar asistencia, votar—
pero los datos se guardan solo en el navegador de cada visitante. Sirve para mostrar la
plataforma y para probarla, no para recoger datos reales.

**Modo servidor.** Crea un proyecto gratuito en [supabase.com](https://supabase.com), ejecuta el
SQL de abajo, y pega las dos claves en `config.js`:

```js
supabase: {
  url: "https://xxxxxxxx.supabase.co",
  anonKey: "eyJhbGci..."          // la clave "anon" pública, NUNCA la "service_role"
}
```

No hay que cambiar nada más: el sitio detecta las claves y empieza a compartir los datos
entre todos los visitantes. Si el servidor se cae, la plataforma sigue funcionando en local
en vez de mostrar un error.

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
  creado timestamptz default now()
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
  creado timestamptz default now()
);

create table votos (
  id uuid primary key default gen_random_uuid(),
  encuesta_id text not null, opcion_id text not null, huella text,
  creado timestamptz default now()
);

-- Permisos: cualquiera puede leer y crear; nadie puede borrar ni editar.
-- Los datos personales de "registros" no se pueden leer desde el sitio.
alter table reportes    enable row level security;
alter table apoyos      enable row level security;
alter table registros   enable row level security;
alter table asistencias enable row level security;
alter table votos       enable row level security;

create policy "leer reportes" on reportes for select using (true);
create policy "crear reportes" on reportes for insert with check (true);
create policy "leer apoyos" on apoyos for select using (true);
create policy "crear apoyos" on apoyos for insert with check (true);
create policy "crear registros" on registros for insert with check (true);
create policy "crear asistencias" on asistencias for insert with check (true);
create policy "leer votos" on votos for select using (true);
create policy "crear votos" on votos for insert with check (true);
```

El estado de cada reporte (`recibido` → `revision` → `compromiso` → `cumplido`) se cambia
a mano desde el panel de Supabase. Eso es lo que mueve el semáforo de
[logros.html](logros.html).

## Paleta

**Azul y blanco únicamente.** Una sola escala de azul, sin ningún otro color de marca.
Todo sale de las variables al inicio de [assets/css/styles.css](assets/css/styles.css):

| Variable | Color | Uso |
|---|---|---|
| `--azul-900` | `#061A3E` | Fondos oscuros, títulos |
| `--azul-800` | `#0A2559` | Degradados, texto sobre blanco |
| `--azul-700` | `#0E3374` | Logo, hover |
| `--azul-600` | `#12448F` | Color primario, botones sobre fondo claro |
| `--azul-500` | `#1A5FBF` | Foco, detalles |
| `--azul-400` | `#3D7FD8` | Bordes activos |
| `--azul-300` | `#6BA3E8` | **Acento sobre fondo oscuro** (antes era el dorado) |
| `--azul-200` | `#A9C6EE` | Textos secundarios sobre azul |
| `--azul-100` | `#D6E4F7` | Etiquetas |
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

## Imágenes

El logo y la foto se procesan con dos scripts, para no depender de editar
imágenes a mano:

```bash
python assets/img/generar-logos.py    # 7 versiones del logo, favicon e iconos
python assets/img/generar-fotos.py    # foto optimizada + imagen para redes
```

Si llega un logo o una foto nueva, se reemplaza el archivo fuente
(`logo-original.png` / `arbeyramos.PNG`) y se corre el script correspondiente.
Ver [assets/img/README.txt](assets/img/README.txt).

## Eslogan

**«Restrepo lo hacemos entre todos»** — vive en el hero de [index.html](index.html)
y en `eslogan` dentro de `config.js`. Se eligió porque dice exactamente lo que
promete la plataforma: el programa de gobierno lo escribe la gente.

Alternativa si algún día se quiere algo más territorial: *«La sal de Restrepo es
su gente»*, que se apoya en los 160 años del municipio como Capital Salinera del
Meta y en las Salinas de Upín, declaradas patrimonio inmaterial del departamento.

## Pendientes

- [ ] **Biografía real** — el texto actual es de ejemplo y no afirma datos verificables
- [ ] **Datos de contacto y redes** — en `config.js`
- [ ] **Conectar Supabase** para que los datos sean compartidos
- [ ] **Política de tratamiento de datos** (Ley 1581 de 2012) — publicar la página y enlazarla
      desde los formularios
- [ ] **Contenido real** en `contenido.js` (noticias, eventos, trayectoria)

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
