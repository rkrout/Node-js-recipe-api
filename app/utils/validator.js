const { validationResult } = require("express-validator")


const multipleImage = ({ name, nullable, min, max }) => (request, response, next) => {
    if (nullable && !(request.files && request.files[name] && Array.isArray(request.files[name]))) {
        return next()
    }

    if (!(request.files && request.files[name] && Array.isArray(request.files[name]) &&
        request.files[name].length >= min && request.files[name].length <= max)) {
        return response.status(400).json("Invalid Images")
    }


    for (const key in request.files[name]) {
        const image = request.files[name][key]

        if (!["image/jpeg", "image/jpg", "image/png"].includes(image.mimetype)) {
            return response.status(400).json("Invalid Images")
        }

        if (image.truncated) {
            return response.status(400).json("Invalid Images")
        }
    }

    next()
}


const singleImage = ({ name, nullable }) => (request, response, next) => {
    if (nullable && !(request.files && request.files[name])) {
        return next()
    }

    if (!(request.files && request.files[name])) {
        return response.status(400).json("Invalid Images")
    }

    if (!["image/jpeg", "image/jpg", "image/png"].includes(request.files[name].mimetype)) {
        return response.status(400).json("Invalid Images")
    }

    if (request.files[name].truncated) {
        return response.status(400).json("Invalid Images")
    }

    next()
}


const checkError = () => (request, response, next) => {
    const errors = validationResult(request)
    console.log(errors.array());
    console.log(request.body);
    errors.isEmpty() ? next() : response.status(400).json(errors.array()[0].msg)
}


module.exports = {
    multipleImage,
    singleImage,
    checkError
}