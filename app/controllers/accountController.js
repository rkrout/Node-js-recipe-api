const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const constants = require("../utils/constants")
const { User } = require("../models/models")
const { Op } = require("sequelize")


const refreshToken = async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.substring(7, req.headers.authorization.length) : null

    const { userId, roleId } = jwt.verify(token, constants.REFRESH_TOKEN_SECRECT)

    const accessToken = jwt.sign(
        { userId, roleId },
        constants.ACCESS_TOKEN_SECRECT,
        { expiresIn: "1h" }
    )

    return res.json({ accessToken })
}


const signIn = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })

    if (!(user && await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json("Invalid email or password")
    }

    const payload = {
        userId: user.id,
        roleId: user.roleId
    }

    const accessToken = jwt.sign(
        payload,
        constants.ACCESS_TOKEN_SECRECT,
        { expiresIn: "1h" }
    )

    const refreshToken = jwt.sign(
        payload,
        constants.REFRESH_TOKEN_SECRECT,
        { expiresIn: "1440h" }
    )

    res.json({
        accessToken,
        refreshToken
    })
}


const signUp = async (req, res) => {
    if (await User.findOne({ where: req.body.email })) {
        return res.status(409).json("Email already taken")
    }

    const { id } = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    })

    res.status(201).json({ id })
}


const changePassword = async (req, res) => {
    const user = await User.findByPk(req.userId)

    if (!await bcrypt.compare(req.body.oldPassword, user.password)) {
        return res.status(400).json("Old password do not match")
    }

    user.password = await bcrypt.hash(req.body.newPassword, 10)
    await user.save()

    res.json("Password changed successfully")
}


const editAccount = async (req, res) => {
    if (await User.findOne({ where: { email: req.body.email, [Op.not]: { id: req.userId } } })) {
        return res.status(409).json("Email already taken")
    }

    const user = await User.findByPk(req.userId)
    user.name = req.body.name
    user.email = req.body.email
    await user.save()

    res.json("Account edited successfully")
}


const getAccount = async (req, res) => {
    const user = await User.findByPk(req.userId)
    res.json(user)
}


module.exports = {
    signIn,
    signUp,
    changePassword,
    editAccount,
    getAccount,
    refreshToken
}