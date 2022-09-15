const database = require("../models")

class LevelController {
    static async getLevel(req, res) {
        try {
            const getLevel = await database.Level.findAll()
            return res.status(200).json(getLevel)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = LevelController