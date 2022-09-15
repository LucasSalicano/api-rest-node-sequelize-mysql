const database = require("../models")

class ClassController {
    static async getLevel(req, res) {
        try {
            const getClass = await database.Class.findAll()
            return res.status(200).json(getClass)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ClassController