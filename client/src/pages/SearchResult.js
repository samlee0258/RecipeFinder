import { React, useEffect, useState, useCallback } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

export default function SearchResult({recipes, setRecipes}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
        setError(err);
      }
      setIsLoading(false);
      }, [addRecipe, recipes])
  useEffect(() => {
    setIsLoading(true);
    addRecipes();
  }, [addRecipes])

  if (isLoading) return (
    <div>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    </div>
  )

  if (error) return (
    <div>Error occurred: {error.message}</div>
  )

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
        {recipes.length > 0 ? recipes.map((recipeObj, index) =>
            <Grid.Column key={index}>
              <RecipeCard recipe={recipeObj.recipe} />
            </Grid.Column>
          ) : <Grid.Row stretched centered style={{background: 'white'}}>No Results</Grid.Row>
        }
      </Grid>
    </div>
  );
}
