const { Op } = require("sequelize")
const { Recipe } = require("../../models/models")


const getRecipes = async (req, res) => {
    const limit = Number(req.query.limit) || limit
    const offset = Number(req.query.offset) || 0

    if (req.query.query) {
        const recipes = await Recipe.findAll({
            limit: limit,
            offset: offset,
            where: {
                [Op.or]: {
                    name: { [Op.like]: `%${req.query.query}%` },
                    process: { [Op.like]: `%${req.query.query}%` }
                }
            },
            order: ["id", "DESC"],
            attributes: {
                exclude: ["process"]
            }
        })

        return res.json(recipes)
    }

    if (req.query.categoryId) {
        const recipes = await Recipe.findAll({
            limit: limit,
            offset: offset,
            where: {
                categoryId: req.query.categoryId
            },
            order: ["id", "DESC"],
            attributes: {
                exclude: ["process"]
            }
        })

        return res.json(recipes)
    }

    const recipes = await Recipe.findAll({
        limit: limit,
        offset: offset,
        order: ["id", "DESC"],
        attributes: {
            exclude: ["process"]
        }
    })

    res.json(recipes)
}


const getRecipe = async (req, res) => {
    const recipe = await Recipe.findByPk(req.params.id)
    res.json(recipe)
}


module.exports = {
    getRecipes,
    getRecipe
}