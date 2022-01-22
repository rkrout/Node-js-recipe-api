const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const { authenticateAdmin } = require("./app/middlewares/authMiddleware")
const adminRoute = require("./app/routes/adminRoute")
const userRoute = require("./app/routes/userRoute")
const accountRoute = require("./app/routes/accountRoute")


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({ parseNested: true }))
app.use(express.static("uploads"))


app.use(
    "/account",
    accountRoute
)


app.use(
    "/admin",
    authenticateAdmin,
    adminRoute
)


app.use(
    "/",
    userRoute
)


app.listen(3000, console.log("listening to port 3000...."))