const database = require("../models")

class PeopleController {
    static async getPeople(req, res) {
        try {
            const people = await database.People.findAll()
            return res.json(people)
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async getPeopleById(req, res) {
        try {
            const id = req.params.id
            const people = await database.People.findByPk(id)

            if (!people) {
                return res.status(204).send()
            }

            return res.json(people)
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async storePeople(req, res) {
        try {
            const newPeople = req.body

            const peopleExists = await database.People.findOne({
                where: {
                    name: newPeople.name,
                    email: newPeople.email
                }
            })

            if (peopleExists) {
                return res.status(400).send({message: "People already exists in the database."})
            }

            const people = await database.People.create(newPeople)
            return res.json(people)
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async updatePeople(req, res) {
        try {
            const newData = req.body
            const id = req.params.id

            const peopleUpdated = await database.People.update(newData, {
                where: {
                    id: Number(id)
                }
            })

            if (!Boolean(Number(peopleUpdated))) {
                return res.status(400).json({message: "People doesn't exists."})
            }

            return res.json({message: "successful people update."})
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async deletePeople(req, res) {
        try {
            const id = req.params.id
            let people = await database.People.findByPk(id)

            if (!people) {
                return res.status(400).json({message: "People doesn't exist."})
            }

            const peopleDelete = await database.People.destroy({
                where: {
                    id: Number(id)
                }
            })

            return res.send({message: "success people deleted."})
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async findEnrollmentByStudent(req, res) {
        try {
            const {enrollmentId, studentId} = req.params

            const enrollment = await database.Enrollment.findOne({
                where: {
                    id: Number(enrollmentId),
                    student_id: Number(studentId)
                }
            })

            return res.json(enrollment)
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async storeEnrollmentByStudent(req, res) {
        try {
            const {studentId} = req.params
            const newEnrollment = {...req.body, student_id: Number(studentId)}

            const createNewEnrollment = await database.Enrollment.create(newEnrollment)
            return res.status(201).json(createNewEnrollment)
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async updateEnrollment(req, res) {
        try {
            const {enrollmentId, studentId} = req.params
            const newData = req.body

            const peopleUpdated = await database.Enrollment.update(newData, {
                where: {
                    id: Number(enrollmentId),
                    student_id: Number(studentId)
                }
            })

            return res.json({message: "successful enrollment update."})
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async deleteEnrollmentByStudent(req, res) {
        try {
            const {studentId, enrollmentId} = req.params

            let enrollment = await database.Enrollment.destroy({
                where: {
                    id: Number(enrollmentId),
                    student_id: Number(studentId)
                }
            })

            if (!enrollment) {
                return res.status(400).json({message: "Enrollment doesn't exist."})
            }

            return res.send({message: "success enrollment deleted."})
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }
}

module.exports = PeopleController