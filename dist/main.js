class Renderer {
  constructor() {}
  renderAllRecipes(recipes, templateId) {
    const content = $("#content");
    content.empty();
    const source = $(templateId).html();
    const template = Handlebars.compile(source);
    const newHTML = template({ recipes });
    content.append(newHTML);
  }
}
const render = new Renderer();

const requestIngrediant = function () {
  let ingrediantInput = $("input").val();
  $.get(`/recipes/${ingrediantInput}`, function (result) {
    if (result.length > 0) {
      const template = "#recipes-template";
      render.renderAllRecipes(result, template);
    } else {
      const template = "#noRecipes-template";
      render.renderAllRecipes([], template);
    }
  });
};

$("#content").on("click", ".imageclick", function () {
  alert($(this).closest(".recipe").find("li").first().text());
});
