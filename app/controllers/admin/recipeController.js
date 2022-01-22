const { Recipe } = require("../../models/models")
const { destroy, upload } = require("../../utils/fileSystem")


const getRecipes = async(req, res) => {
    const recipes = await Recipe.findAll({
        limit: limit,
        offset: offset,
        attributes: [
            "recipes.id",
            "recipes.title",
            "recipes.image",
            "recipes.createdAt",
            "recipes.updatedAt"
        ]
    })

    res.json(recipes)
}


const getRecipe = async(req, res) => {
    const recipe = await Recipe.findByPk(req.params.id)
    res.json(recipe)
}


const createRecipe = async(req, res) => {
    if(!await Category.findByPk(req.body.categoryId)){
        return res.status(404).json("Category does not exist")
    }

    const recipe = await Recipe.create({
        name: req.body.name,
        image: await upload(req.files.image),
        categoryId: req.body.categoryId,
        process: req.body.process
    })

    res.status(201).json(recipe)
}


const editRecipe = async(req, res) => {
    if(!await Category.findByPk(req.body.categoryId)){
        return res.status(404).json("Category does not exist")
    }

    const recipe = await Recipe.findByPk(req.params.id)
    if(!recipe)return res.status(404).json("Category does not exist")

    recipe.name = req.body.name 
    recipe.categoryId = req.body.categoryId
    recipe.process = req.body.process
    if(req.files && req.files.image){
        recipe.image = await replace(recipe.image, req.files.image)
    }
    await recipe.save()

    res.json(recipe)
}


const deleteRecipe = async(req, res) => {
    const recipe = await Recipe.findByPk(req.params.id)
    if(!recipe)return res.status(404).json("Category does not exist")
    
    await destroy(recipe.image)
    await recipe.destroy()

    res.json("Recipe deleted successfully")
}


module.exports = {
    getRecipe,
    getRecipes,
    createRecipe,
    editRecipe,
    deleteRecipe
}