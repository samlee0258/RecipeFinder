import { Card, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [recipeWithId, setRecipeWithId] = useState({});
  const recipeUri = recipe.uri;

  useEffect(() => {
    let body = { uri: recipeUri };
    async function getRecipeWithId() {
      try {
        const res = await fetch('/api/public/Tables/Recipes/uri', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
          const result = await res.json();
          setRecipeWithId(result);
        } catch (err) {
          console.error(err);
        }
      }
      getRecipeWithId();
  }, [recipeUri]);

  async function addToFavorites() {
    try {
      console.log('recipe:', recipeWithId);
      const resFav = await fetch('/api/public/Tables/Favorites', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipeId: recipeWithId.recipeId, userId: 1 })
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
