const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
    dialect: "sqlite",
    storage: process.cwd() + "/db.sqlite3"
})