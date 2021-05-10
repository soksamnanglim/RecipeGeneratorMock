import React, { useState, useEffect } from 'react';

class UiRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.recipeId,
      data: null,
      imageUrl: null,
      title: null,
      vegetarian: null
    }
  }

  getRecipeInfo() {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.id}/information`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "621409563cmshab64d51a4e7a120p11b940jsn5305e86310da",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then((response) => response.json())
      .then((resp) => {
        this.setState({ data: resp, imageUrl: resp.image, title: resp.title, vegetarian: resp.vegetarian });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    this.getRecipeInfo();

    return (
      <article>
        <h1> {this.state.id}</h1>
        <h1>{this.state.title}</h1>
        <img src={this.state.imageUrl} alt="recipe image" />
        { (this.state.vegetarian) && <h2>Vegetarian: {this.vegetarian}</h2>}
        <h2>Ingredients</h2>
        {/* <h2>
        {extendedIngredients.map((ingredient) => {
          <ul>
            <img src={ingredient.image} alt="ingredient" />
            <li>{ingredient.name}</li>
            <li>{ingredient.amount} {ingredient.unit}</li>
          </ul>
        })}
      </h2> */}
        {/* <h2>{instructions}</h2> */}
      </article >
    );
  }
}

export default UiRecipe;