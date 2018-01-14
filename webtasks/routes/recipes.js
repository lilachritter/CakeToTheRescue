const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

module.exports = (app) => {
  app.get('/recipes', (req, res) => {
	  const queryIngredients = decodeURI(req.webtaskContext.query.ingredients).split(",");
      req.recipeModel.find({"ingredients": {"$in": queryIngredients}})
	  .exec((err, recipes) => {
		  const recipeArray = recipes.map(recipe => {
			  const missingIngredients = recipe.ingredients.filter(ing => {return queryIngredients.indexOf(ing) === -1});
			  recipe.ingredients = missingIngredients;
			  return recipe;
		  });
		  res.json(recipeArray);
	  });
  });

  app.post('/recipes', (req, res) => {
      const newRecipe = new req.recipeModel(Object.assign({}, req.body, {created_at: Date.now()}));
      newRecipe.save((err, savedRecipe) => {
          res.json(savedRecipe)
      });
  });
}