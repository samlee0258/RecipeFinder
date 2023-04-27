import { Grid, Card } from "semantic-ui-react"
import { useState, useEffect } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function getFavoritesData() {
      try {
        const getFavorites = await fetch('/api/public/Tables/Favorites', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!getFavorites.ok) {
          throw new Error('Failed to load recipes');
        }
        const recipeData = await getFavorites.json();
        setFavorites(recipeData);
      } catch (err) {
        console.error(err);
      }
    }
    getFavoritesData();
  }, []);

  const favoriteValue = favorites.map((recipe) => {
    return (
      <Card
        image={recipe.image}
        header={recipe.name}
        description={
          <div>
            <p>CuisineType: {recipe.cuisineType}</p>
            <p>MealType: {recipe.mealType}</p>
            <p>DishType: {recipe.dishType}</p>
          </div>
        }
      />
    )
  });

  return (
    <div>
      <h1 style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'white',
                  WebkitTextStroke: '1px black'
                }}
      >
        Favorites
      </h1>
      <Grid container>
        <Grid.Row>
          <Grid>
            {favoriteValue}
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  )
}
