const { body } = require("express-validator")
const { checkError } = require("../utils/validator")


const signIn = [
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password").notEmpty(),
    checkError()
]


const signUp = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    body("email").trim().isEmail().normalizeEmail(),
    body("password").notEmpty().isStrongPassword(),
    checkError()
]


const changePassword = [
    body("oldPassword").notEmpty(),
    body("newPassword").notEmpty().isStrongPassword(),
    checkError()
]


const editAccount = [
    body("name").trim().notEmpty().isLength({ min: 2, max: 255 }),
    body("email").trim().notEmpty().normalizeEmail(),
    checkError()
]


module.exports = {
    signIn,
    signUp,
    changePassword,
    editAccount
}
