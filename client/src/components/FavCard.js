import { Grid, Card, Button } from "semantic-ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function FavCard({ recipe }) {
  const [showInfo, setShowInfo] = useState(false);

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
          {showInfo ? <ul>Ingredients: {recipe.ingredients.map(item => <li>{item}</li>)}</ul> : null}
          <Button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "Show less" : "Show more"}</Button>
        </div>
      }
      extra={
        <Grid verticalAlign='middle' columns={2}>
          <Grid.Column>
            <Link to={recipe.recipeLink} target="_blank" rel="noreferrer noopener">Recipe Link</Link>
          </Grid.Column>
          <Grid.Column>
            <Button secondary negative basic>Delete</Button>
          </Grid.Column>
        </Grid>
      }
    />
  )
}
