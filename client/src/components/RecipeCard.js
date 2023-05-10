import { Card, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  async function addToFavorites() {
    try {
      const resRecipes = await fetch('/api/public/Tables/Recipes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipe: recipe.recipe })
      });
      if (!resRecipes.ok) {
        throw new Error('Failed to add recipe.');
      }
      const jsonData = await resRecipes.json();
      const resFav = await fetch('/api/public/Tables/Favorites', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipeId: jsonData.recipeId, userId: 1 })
      });
      if (!resFav.ok) {
        throw new Error('Failed to add to favorites.');
      }
      navigate('/favorites');
      } catch (err) {
        console.error(err);
    }
  }
  return (
          <Card
            fluid
            image={recipe.recipe.image}
            header={recipe.recipe.label}
            description={
              <div>
                <p>CuisineType: {recipe.recipe.cuisineType}</p>
                <p>MealType: {recipe.recipe.mealType}</p>
                <p>DishType: {recipe.recipe.dishType}</p>
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
