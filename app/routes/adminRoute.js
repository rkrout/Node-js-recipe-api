const router = require("express").Router()
const adminValidator = require("../validators/adminValidator")
const categoryController = require("../controllers/admin/categoryController")
const recipeController = require("../controllers/admin/recipeController")


router.get(
    "/categories",
    categoryController.getCategories
)


router.post(
    "/categories",
    adminValidator.createCategory,
    categoryController.createCategory
)


router.patch(
    "/categories/:id",
    adminValidator.editCategory,
    categoryController.editCategory
)


router.delete(
    "/categories/:id",
    categoryController.deleteCategory
)


router.get(
    "/recipes",
    recipeController.getRecipes
)


router.post(
    "/recipes",
    adminValidator.createRecipe,
    recipeController.createRecipe
)


router.post(
    "/recipes/:id",
    adminValidator.editRecipe,
    recipeController.editRecipe
)


router.delete(
    "/recipes/:id",
    recipeController.deleteRecipe
)


module.exports = router