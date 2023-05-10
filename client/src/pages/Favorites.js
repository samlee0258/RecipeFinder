import { Grid } from "semantic-ui-react"
import { useState, useEffect } from "react";
import FavCard from "../components/FavCard";

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
    console.log('recipe:', recipe);
    return (
      <Grid.Column>
        <FavCard recipe={recipe}/>
      </Grid.Column>
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
      <Grid container stackable doubling columns={4}>
        {favoriteValue}
      </Grid>
    </div>
  )
}
