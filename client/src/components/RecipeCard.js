import { Card, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const recipeUri = btoa(recipe.uri);

  async function addToFavorites() {
    try {
      const resFav = await fetch(`/api/public/Tables/Favorites/${recipeUri}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: 1 })
      });
      if (!resFav.ok) {
        throw new Error('Failed to add to favorites.');
      }
      navigate('/favorites');
      } catch (err) {
        alert(err);
    }
  }
  return (
          <Card
            fluid
            image={recipe.image}
            header={recipe.label}
            description={
              <div>
                <p>CuisineType: {recipe.cuisineType}</p>
                <p>MealType: {recipe.mealType}</p>
                <p>DishType: {recipe.dishType}</p>
                {showInfo ? <ul>Ingredients: {recipe.ingredientLines.map((item, index) => <li key={index}>{item}</li>)}</ul> : null}
                <Button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "Show less" : "Show more"}</Button>
              </div>
            }
            extra={
              <div>
                <Button primary positive basic onClick={addToFavorites}>Favorites</Button>
              </div>
            }
          />
  )
}
