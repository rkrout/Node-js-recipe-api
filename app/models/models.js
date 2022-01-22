const User = require("./user")
const Category = require("./category")
const Role = require("./role")
const Recipe = require("./recipe")


Category.hasMany(Recipe, {
    foreignKey: {
        name: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
Recipe.belongsTo(Category)



Role.hasMany(User, {
    foreignKey: {
        name: "roleId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})
User.belongsTo(Role)



require("../connections/database").sync({force: true})


module.exports = {
    User, 
    Category,
    Role,
    Recipe
}