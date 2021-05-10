import React, { useState, useEffect } from "react";
import fs from 'fs';
import UiRecipe from './UiRecipe';
export default function RecipeListItem({ recipe, getId }) {
  const {
    id,
    image,
    title,
    usedIngredientCount,
    missedIngredientCount, å
  } = recipe;

  const onTrigger = (event) => {
    getId(recipe.id);
    event.preventDefault();
  }

  // function getRecipeInfo() {
  //   fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
  //     "method": "GET",
  //     "headers": {
  //       "x-rapidapi-key": "621409563cmshab64d51a4e7a120p11b940jsn5305e86310da",
  //       "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((resp) => {
  //       setRecipeInfo(resp);
  //       const data = JSON.stringify(resp, null, 4);
  //       fs.writeFile("sample.json", data, (err) => {
  //         if (err) {
  //           throw err;
  //         }
  //         console.log("JSON data saved.");
  //       });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  return (
    <article>
      <h1>{title}</h1>
      <img src={image} alt="recipe" />
      <ul className="instructions">
        <li>{id}</li>
        <li>Ingredients used: {usedIngredientCount}</li>
        <li>Ingredients missed: {missedIngredientCount}</li>
      </ul>
      {recipe && <button onClick={onTrigger}> More information</button>}
      {/* {clicked && function () {
        return <UiRecipe id={id} />
      }} */}
      {/* { recipeInfo && <UiRecipe recipeInfo={recipeInfo} />} */}
    </article >
  );
}
