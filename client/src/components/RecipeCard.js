import { Card, Button } from "semantic-ui-react";

export default function RecipeCard({ recipe }) {
  console.log('recipe:', recipe);
  return (
          <Card
            className="recipeCard"
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
                <Button primary positive basic>Favorites</Button>
              </div>
            }
          />
  )
}
