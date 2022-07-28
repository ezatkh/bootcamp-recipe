const express = require(`express`);
const path = require(`path`);
const urllib = require(`urllib`);
const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const filterRecipeData = function (fullRecipesInfo) {
  Recipes = fullRecipesInfo.map((recipeElement) => {
    return {
      title: recipeElement.title,
      thumbnail: recipeElement.thumbnail,
      ingredients: recipeElement.ingredients,
      href: recipeElement.href,
    };
  });
};

const port = 8080;
app.listen(port, function () {
  console.log(`The server on port ${port} is listening`);
});

app.get("/sanity", function (request, response) {
  response.send("OK");
});

app.get("/recipes/:ingredient", function (request, response) {
  const ingredientParameter = request.params.ingredient;
  urllib.request(
    `https://recipes-goodness.herokuapp.com/recipes/${ingredientParameter}`,
    function (err, data) {
      filterRecipeData(JSON.parse(data).results);
      response.send(Recipes);
    }
  );
});
