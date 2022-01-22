const router = require("express").Router()
const recipeController = require("../controllers/user/recipeController")


router.get(
    "/recipes",
    recipeController.getRecipes
)


router.get(
    "/recipes/:id",
    recipeController.getRecipe
)


module.exports = router