const crypto = require("crypto")
const fs = require("fs/promises")


const upload = async (file) => {
    const fileName = crypto.randomBytes(16).toString("hex") + file.name
    const destination = process.cwd() + "/uploads/" + fileName
    await file.mv(destination)
    return fileName
}


const isExist = async (fileName) => {
    try {
        await fs.access(fileName)
        return true
    } catch (error) {
        return false
    }
}


const destroy = async (fileName) => {
    if (isExist(fileName)) {
        const destination = process.cwd() + "/uploads/" + fileName
        await fs.unlink(destination)
    }
}


const uploads = async (files) => {
    const fileNames = []
    for (const file of files) {
        fileNames.push(await upload(file))
    }
    return fileNames
}


const destroyes = async (fileNames) => {
    for (const fileName of fileNames) {
        await destroy(fileName)
    }
}


const replace = async (oldFileName, newFile) => {
    await destroy(oldFileName)
    return await upload(newFile)
}


module.exports = {
    upload,
    uploads,
    destroy,
    destroyes,
    replace
}