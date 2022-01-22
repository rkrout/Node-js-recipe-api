const { DataTypes } = require("sequelize")
const database = require("../connections/database")

module.exports = database.define("recipes", {
    name: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    process: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

