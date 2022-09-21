const database = require("../models")
const {Op} = require("sequelize");

class ClassController {
    static async getClasses(req, res) {
        try {
            const {start_date, end_date} = req.query
            const where = {}
            start_date || end_date ? where.start_date = {} : null
            start_date ? where.start_date[Op.gte] = start_date : null
            end_date ? where.end_date[Op.gte] = end_date : null

            const getClass = await database.Class.findAll({where})

            if (!getClass.length) {
                return res.status(204).send()
            }

            return res.status(200).json(getClass)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ClassController