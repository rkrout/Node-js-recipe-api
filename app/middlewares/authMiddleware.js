const jwt = require("jsonwebtoken")
const constants = require("../utils/constants")


const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.substring(7, req.headers.authorization.length) : null

    const payload = jwt.verify(token, constants.ACCESS_TOKEN_SECRECT)
    payload.roleId === 1 ? next() : res.status(401).json("Unauthenticated")
}


module.exports = {
    authenticateAdmin
}