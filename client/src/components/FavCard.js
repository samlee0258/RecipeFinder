import { Grid, Card, Button } from "semantic-ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function FavCard({ handleDelete, recipe }) {
  const [showInfo, setShowInfo] = useState(false);

  async function deleteFromFav() {
    try {
      const deleteRecipe = await fetch(`/api/public/Tables/Favorites/${recipe.recipeId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(deleteRecipe);
      if (!deleteRecipe.ok) {
        throw new Error('Failed to delete recipe.');
      }
      handleDelete(recipe.recipeId);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Card
      fluid
      image={recipe.image}
      header={recipe.name}
      description={
        <div>
          <p>CuisineType: {recipe.cuisineType}</p>
          <p>MealType: {recipe.mealType}</p>
          <p>DishType: {recipe.dishType}</p>
          {showInfo ? <ul>Ingredients: {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}</ul> : null}
          <Button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "Show less" : "Show more"}</Button>
        </div>
      }
      extra={
        <Grid verticalAlign='middle' columns={2}>
          <Grid.Column>
            <Link to={recipe.recipeLink} target="_blank" rel="noreferrer noopener">Recipe Link</Link>
          </Grid.Column>
          <Grid.Column>
            <Button secondary negative basic onClick={deleteFromFav}>Delete</Button>
          </Grid.Column>
        </Grid>
      }
    />
  )
}
