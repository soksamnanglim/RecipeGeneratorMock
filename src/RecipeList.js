import React, { useState } from "react";
import RecipeListItem from "./RecipeListItem.js";

export default function RecipeList({ mealData }) {
  const results = mealData.results;
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState(null);

  const getId = (grandChildId) => {
    setRecipeId(grandChildId);
  }

  return (
    <main>
      <section className="meals">
        {results.map((recipe) => {
          // setRecipes(prevArr => [...prevArr, new RecipeListItem(recipe)]);
          return <RecipeListItem key={recipe.id} recipe={recipe} getId={getId} />;
        })}
      </section>
    </main>
  );
}
