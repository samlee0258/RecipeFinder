import { React, useEffect, useCallback } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Grid } from 'semantic-ui-react';

export default function SearchResult({recipes, setRecipes}) {
  const addRecipe = useCallback(
    async (recipeObj) => {
        const res = await fetch('/api/tables/recipes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeObj)
      })
      return await res.json();
      }, [])

      const addRecipes = useCallback(async () => {
        try {
          for (const recipeObj of recipes) {
            await addRecipe(recipeObj);
          }
        } catch (err) {
          console.error(err);
        }
      }, [addRecipe, recipes])
  useEffect(() => {
    addRecipes();
  }, [addRecipes])

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
        {recipes.map((recipeObj, index) =>
            <Grid.Column key={index}>
              <RecipeCard recipe={recipeObj.recipe} />
            </Grid.Column>
          )
        }
      </Grid>
    </div>
  );
}
