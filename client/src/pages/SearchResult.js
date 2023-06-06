import {React, useEffect, useCallback} from 'react';
import RecipeCard from '../components/RecipeCard';
import { Grid } from 'semantic-ui-react';

export default function SearchResult({recipes, setRecipes}) {
  console.log('Recipes:', recipes);
  const addRecipe = useCallback(
    async (recipeObj) => {
      const res = await fetch('/api/public/Tables/Recipes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipeObj })
      })
      const result = await res.json();
      setRecipes([...recipes, result]);
      }, [recipes, setRecipes])

  useEffect(() => {
    async function addRecipes() {
      try {
        for (const recipeObj of recipes) {
          await addRecipe(recipeObj);
        }
      } catch (err) {
        console.error(err);
      }
    }
    addRecipes();
  }, [addRecipe, recipes])

  return (
    <div>
      <h1 style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'white',
                  WebkitTextStroke: '1px black'
                }}
      >
        Search Result
      </h1>
      <Grid container stackable doubling columns={4}>
        {recipes.map((recipeObj) =>
            <Grid.Column key={recipeObj.recipe.uri}>
              <RecipeCard recipe={recipeObj.recipe} />
            </Grid.Column>
          )
        }
      </Grid>
    </div>
  );
}
