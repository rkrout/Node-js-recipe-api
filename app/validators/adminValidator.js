const { body } = require("express-validator");
const { singleImage, checkError } = require("../utils/validator")


const createCategory = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    checkError(),
    singleImage({ name: "image" })
]


const editCategory = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    singleImage({ name: "image", nullable: true }),
    checkError()
]


const createRecipe = [
    body("name").trim().notEmpty(),
    body("process").trim().notEmpty(),
    body("categoryId").notEmpty().isInt(),
    singleImage({ name: "thumbnail" }),
    checkError()
]


const editRecipe = [
    body("name").trim().notEmpty(),
    body("process").trim().notEmpty(),
    body("categoryId").notEmpty().isInt(),
    singleImage({ name: "thumbnail", nullable: true }),
    checkError()
]



module.exports = {
    createCategory,
    editCategory,
    createRecipe,
    editRecipe
}