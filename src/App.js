import React, { useState } from "react";
import MealList from "./MealList";
import RecipeList from './RecipeList';
import RecipeListItem from './RecipeListItem';
import UiRecipe from './UiRecipe';

import fs from 'fs';
import { isBuffer } from "util";
import { render } from "@testing-library/react";
import { isCompositeComponent } from "react-dom/test-utils";

function App() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     id: null
  //   }
  // }
  const [diet, setDiet] = useState("");
  const [includeIngredients, setIncludeIngredients] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [recipeData, setRecipeData] = useState(null);
  const [id, setId] = useState(null);
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [clicked, setClicked] = useState(false);

  const getId = (childId) => {
    setClicked(true);
    setId(childId);
    // getRecipeInfo();
  };

  function getRecipeData() {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?ranking=2&number=5&offset=0&excludeIngredients=${excludeIngredients}&diet=${diet}&intolerances=${intolerances}&includeIngredients=${includeIngredients}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "API-KEY",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then((resp) => {
        setRecipeData(resp);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const getRecipeInfo = () => {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "API-KEY",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then((response) => response.json())
      .then((resp) => {
        setRecipeInfo(resp);
        console.log(resp);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleChange(e) {
    setDiet(e.target.value);
  }

  function handleIntolerances(e) {
    setIntolerances(e.target.value);
  }

  function handleExclude(e) {
    setExcludeIngredients(e.target.value);
  }

  function handleInclude(e) {
    setIncludeIngredients(e.target.value);
  }
  return (
    <div className="App">
      <section className="controls">
        <input
          type="string"
          placeholder="Diet"
          onChange={handleChange}
        />
        <input
          type="string"
          placeholder="Ingredients to include"
          onChange={handleInclude}
        />
        <input
          type="string"
          placeholder="Ingredients to exclude"
          onChange={handleExclude}
        />
        <input
          type="string"
          placeholder="Intolerances"
          onChange={handleIntolerances}
        />
        <h2>{diet}</h2>
        <h2>{excludeIngredients}</h2>
        <h2>{includeIngredients}</h2>
        <h2>{intolerances}</h2>
        <button onClick={getRecipeData}>Get Recipe Suggestions!</button>
      </section>
      <main>
        <section className="meals">
          {recipeData && recipeData.results.map((recipe) => {
            return <RecipeListItem key={recipe.id} recipe={recipe} getId={getId} />;
          })}
        </section>
        <section className="meals">
          {id}
          {id && <UiRecipe recipeId={id} />}
        </section>
      </main>
    </div >
  );
}


export default App;
