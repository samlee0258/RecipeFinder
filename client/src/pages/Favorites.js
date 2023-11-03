import { Grid, Dimmer, Loader } from "semantic-ui-react"
import { useState, useEffect } from "react";
import FavCard from "../components/FavCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  useEffect(() => {
    async function getFavoritesData() {
      try {
        const getFavorites = await fetch('/api/tables/favorites', {
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
        setError(err);
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    getFavoritesData();
  }, []);

  const onDelete = (recipeId) => {
    const newFav = favorites.filter(favorite => favorite.recipeId !== recipeId);
    setFavorites(newFav);
  }

  const favoriteValue = favorites.map((recipe) => {
    return (
      <Grid.Column key={recipe.recipeId}>
        <FavCard onDelete={onDelete} recipe={recipe}/>
      </Grid.Column>
    )
  });

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
        Favorites
      </h1>
      <Grid container stackable doubling columns={4}>
        {favoriteValue.length > 0 ? favoriteValue : <Grid.Row stretched centered style={{background: 'white'}}>No Favorites</Grid.Row>}
      </Grid>
    </div>
  )
}
