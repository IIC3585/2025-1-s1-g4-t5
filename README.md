# 🌍 Recetas del Mundo - Sitio Estático en Astro (con Content Collections)

Este proyecto es un sitio web estático desarrollado con [Astro](https://astro.build/) que presenta recetas del mundo, especialmente mariscos y otros platillos internacionales. El sitio usa **content collections**, **islas interactivas** con frameworks distintos, y generación estática (SSG).

---

## ✅ Requisitos y Cumplimiento

### 1. 🏝️ Dos islas con frameworks distintos

- **Svelte:** `IngredientScaler.svelte` permite escalar los ingredientes por número de porciones. Requiere JavaScript porque escucha eventos de entrada del usuario, actualiza en tiempo real la cantidad mostrada para cada ingrediente realizando cálculos dinámicos.
- **React:** `StepAssistant.jsx` muestra en los pasos de las recetas que involucran un tiempo un temporizador integrado. Requiere JavaScript porque cuenta los segundos en tiempo real, reacciona a botones Iniciar, Pausar y Reset y controla estados para la lógica del temporizador.

```astro
<IngredientScaler client:visible ingredients={receta.ingredients} />
<StepAssistant client:load instructions={instrucciones} />
```

Ambas islas usan **directivas `client:*`** como `client:visible` y `client:load`.

---

### 2. ⚙️ Generación estática (SSG) con Content Collections

Se usa una colección `recetas` definida en `src/content/config.ts`, con archivos `.md` generados automáticamente desde la API de [TheMealDB](https://www.themealdb.com/). La estructura usa frontmatter para campos como:

```ts
{
  title: string,
  idMeal: string,
  category: string,
  area: string,
  thumb: string,
  ingredients: { name: string, measure: string }[]
}
```

Los archivos `.md` son generados por el script:

```bash
npx tsx src/scripts/fetchToContent.ts
```

---

### 3. 📄 Al menos 50 recetas

El script combina recetas de varias categorías (`Seafood`, `Chicken`, `Beef`, etc.) para asegurar más de 50 recetas:

```ts
const categories = ['Seafood', 'Chicken', 'Beef', 'Dessert', 'Vegetarian'];
```

Los datos se almacenan en `src/content/recetas/` como `.md` válidos.

---

### 4. 🔁 Uso de instrucciones dinámicas y slug

Cada receta genera una página estática en tiempo de build:

```ts
export async function getStaticPaths() {
  const { getCollection } = await import('astro:content');
  const recetas = await getCollection('recetas');

  return recetas.map((receta) => ({
    params: { id: receta.slug },
  }));
}
```

Luego se accede con:

```ts
const entry = await getEntryBySlug('recetas', id);
const receta = entry.data;
const instrucciones = entry.body;
```

---

### 5. 🧠 Originalidad

- **Temporizador embebido por paso** con duración interpretada desde el texto.
- **Escalador interactivo** de ingredientes.
- Todo implementado usando lo mínimo necesario de JS, ideal para el paradigma Astro.

---

## 🗂 Estructura

```
src/
├── content/
│   ├── config.ts
│   └── recetas/
│       └── *.md
├── scripts/
│   └── fetchToContent.ts
├── components/
│   ├── IngredientScaler.svelte
│   └── StepAssistant.jsx
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   └── recetas/
│       └── [id].astro
```

---

## 🚀 Cómo correr el proyecto localmente

### 1. Clona el repositorio y entra a la carpeta
```bash
git clone https://github.com/IIC3585/2025-1-s1-g4-t5.git
cd 2025-1-s1-g4-t5.git/recipes
```

### 2. Instala dependencias
```bash
npm install
```

### 3. Genera los archivos de contenido
Este paso no es necesario ya que se subieron los archivos generados al repositorio pero se puede probar su funcionamiento eliminando la carpeta src/content/recetas y corriendo el comando:
```bash
npx tsx src/scripts/fetchToContent.ts
```

### 4. Corre el servidor de desarrollo
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`.

---

## 🔗 Fuenets

- Datos de [TheMealDB](https://www.themealdb.com/api.php)
- Proyecto desarrollado con [Astro](https://astro.build/)