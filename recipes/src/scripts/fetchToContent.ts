import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import matter from 'gray-matter';

const categories = ['Seafood', 'Chicken', 'Beef', 'Dessert', 'Vegetarian'];

async function fetchDataAndWriteFiles() {
  const folder = path.join(process.cwd(), 'src', 'content', 'recetas');
  fs.mkdirSync(folder, { recursive: true });

  const uniqueMeals = new Map();

  for (const category of categories) {
    const listRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const listJson = await listRes.json();
    const meals = listJson.meals;

    for (const meal of meals) {
      if (!uniqueMeals.has(meal.idMeal)) {
        uniqueMeals.set(meal.idMeal, meal);
      }
    }
  }

  for (const meal of uniqueMeals.values()) {
    const detailRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
    const detailJson = await detailRes.json();
    const m = detailJson.meals[0];

    const ingredients: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      if (m[`strIngredient${i}`]) {
        ingredients.push({
          name: m[`strIngredient${i}`],
          measure: m[`strMeasure${i}`]
        });
      }
    }

    const frontmatter = {
      title: m.strMeal,
      idMeal: m.idMeal,
      category: m.strCategory,
      area: m.strArea,
      thumb: m.strMealThumb,
      ingredients
    };

    const markdown = matter.stringify(m.strInstructions || 'Sin instrucciones', frontmatter);
    const filename = path.join(folder, `${m.idMeal}.md`);
    fs.writeFileSync(filename, markdown, 'utf-8');
  }

  console.log(`✅ Guardadas ${uniqueMeals.size} recetas como archivos .md en content/recetas.`);
}

fetchDataAndWriteFiles();