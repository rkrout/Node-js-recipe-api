const router = require("express").Router()
const accountValidator = require("../validators/accountValidator")
const authMiddleware = require("../middlewares/authMiddleware")
const accountController = require("../controllers/accountController")


router.post(
    "/sign_in",
    accountValidator.signIn,
    accountController.signIn
)


router.post(
    "/sign_up",
    accountValidator.signUp,
    accountController.signUp
)


router.patch(
    "/change_password",
    authMiddleware.authenticate,
    accountValidator.changePassword,
    accountController.changePassword
)

router.patch(
    "/edit_account",
    authMiddleware.authenticate,
    accountValidator.editAccount,
    accountController.editAccount
)


router.get(
    "/",
    authMiddleware.authenticate,
    accountController.getAccount
)


router.patch(
    "/refresh_token",
    accountController.refreshToken
)


module.exports = router 