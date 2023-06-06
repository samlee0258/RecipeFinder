import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import ClientError from './lib/client-error.js';
import pg from 'pg';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/public/Tables/Recipes', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "Recipes";
    `;
    const result = await db.query(sql);
    const recipes = result.rows;
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

app.post('/api/public/Tables/uri', async (req, res, next) => {
  try {
    const { uri } = req.body;
    const sql = `
      select *
        from "Recipes"
        where "uri" = $1;
    `;
    const params = [uri];
    const result = await db.query(sql, params);
    const recipeWithId = result.rows[0];
    res.json(recipeWithId);
  } catch (err) {
    next(err);
  }
});

app.get('/api/public/Tables/Users', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "Users";
    `;
    const result = await db.query(sql);
    const users = result.rows;
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.get('/api/public/Tables/Favorites', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "Favorites"
        join "Recipes" using ("recipeId");
    `;
    const result = await db.query(sql);
    const favorites = result.rows;
    favorites.forEach((recipe) => {
      fixIngredients(recipe);
    });
    res.json(favorites);
  } catch (err) {
    next(err);
  }
});

app.get('/api/public/Tables/Favorites/:recipeId', async (req, res, next) => {
  try {
    const recipeId = Number(req.params.recipeId);
    if (!Number.isInteger(recipeId) || recipeId <= 0) {
      throw new ClientError(400, `${recipeId} must be a positive integer`);
    }
    const sql = `
      select *
        from "Favorites"
        join "Recipes" using ("recipeId")
      where "recipeId" = $1;
    `;
    const params = [recipeId];
    const result = await db.query(sql, params);
    const [recipe] = result.rows;
    if (!recipe) {
      throw new ClientError(404, `cannot find recipe with recipeId ${recipeId}`);
    } else {
      fixIngredients(recipe);
      res.json(recipe);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/public/Tables/Favorites', async (req, res, next) => {
  try {
    const userId = Number(req.body.userId);
    const recipeId = Number(req.body.recipeId);
    if (!userId || !recipeId) {
      throw new ClientError(400, 'userId and recipeId are required fields');
    }
    if (Number.isNaN(recipeId) || !Number.isInteger(recipeId) || recipeId <= 0) {
      throw new ClientError(400, 'recipeId must be a positive integer');
    }
    if (Number.isNaN(recipeId) || !Number.isInteger(userId) || userId <= 0) {
      throw new ClientError(400, 'userId must be a positive integer');
    }
    const sql = `
      insert into "Favorites" ("recipeId", "userId")
      values ($1, $2)
      returning *
    `;
    const params = [recipeId, userId];
    const result = await db.query(sql, params);
    const [newRecipe] = result.rows;
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
});

app.post('/api/public/Tables/Recipes', async (req, res, next) => {
  try {
    const { recipe } = req.body;
    if (!recipe) {
      throw new ClientError(400, 'recipe is required');
    }
    const calories = Number(recipe.calories.toFixed(0));
    console.log(calories);
    const servingSize = Number(recipe.yield.toFixed(0));
    if (!Number.isInteger(calories) || calories <= 0) {
      throw new ClientError(400, 'calories must be a positive integer');
    }
    if (!Number.isInteger(servingSize) || servingSize <= 0) {
      throw new ClientError(400, 'servingSize must be a positive integer');
    }
    const ingredients = JSON.stringify(recipe.ingredientLines);
    const cuisineType = recipe.cuisineType[0];
    const mealType = recipe.mealType[0];
    const dishType = recipe.dishType[0];
    const sql = `
      select *
      from "Recipes"
      where  "uri" = $1;
    `;
    const params = [recipe.uri];
    const result = await db.query(sql, params);
    const duplicateRecipe = result.rows;
    if (duplicateRecipe.length === 0) {
      const sql2 = `
      insert into "Recipes" ("name", "image", "ingredients", "calories", "servingSize", "recipeLink", "cuisineType", "mealType", "dishType", "uri")
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *
      `;
      const params2 = [recipe.label, recipe.image, ingredients, calories, servingSize, recipe.url, cuisineType, mealType, dishType, recipe.uri];
      const result2 = await db.query(sql2, params2);
      const newRecipe = result2.rows[0];
      fixIngredients(newRecipe);
      res.status(201).json(newRecipe);
    } else {
      res.status(201).json(duplicateRecipe[0]);
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/api/public/Tables/Favorites/:recipeId', async (req, res, next) => {
  try {
    const recipeId = Number(req.params.recipeId);
    if (!Number.isInteger(recipeId) || recipeId <= 0) {
      throw new ClientError(400, 'grade must be a positive integer');
    }
    const sql = `
      delete from "Favorites"
      where "recipeId" = $1
      returning *
    `;
    const params = [recipeId];
    const result = await db.query(sql, params);
    const [deletedRecipe] = result.rows;
    if (!deletedRecipe) {
      throw new ClientError(404, `cannot find grade with gradeId ${recipeId}`);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

function fixIngredients(newRecipe) {
  newRecipe.ingredients = JSON.parse(newRecipe.ingredients);
}
