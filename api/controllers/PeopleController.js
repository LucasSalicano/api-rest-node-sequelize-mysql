const database = require("../models")

class PeopleController {
    static STATUS_CONFIRMED = "confirmed"
    static STATUS_CANCELLED = "cancelled"

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

            return res.json({message: "successful updated registry."})
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

            return res.send({message: "successful deleted registry."})
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async restorePeople(req, res) {
        try {
            const peopleId = req.params.id
            await database.People.restore({
                where: {
                    id: Number(peopleId)
                }
            })

            return res.send({message: "successful restored registry."})
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async getEnrollmentByStudent(req, res) {
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

            return res.json({message: "registration successfully updated."})
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

            return res.send({message: "registration successfully deleted."})
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async getClassesByEnrollment(req, res) {
        try {
            const studentId = req.params.id
            const people = await database.People.findOne({
                where: {
                    id: Number(studentId)
                }
            })

            const enrollments = await people.getRegisteredClasses()

            if (!enrollments.length) {
                return res.status(204).send()
            }

            return res.json(enrollments)

        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async getEnrollmentByClass(req, res) {
        try {
            const classId = req.params.id
            const getAllEnrollment = await database.Enrollment.findAndCountAll({
                where: {
                    class_id: Number(classId),
                    status: PeopleController.STATUS_CONFIRMED
                },
                limit: 20,
                order: [["createdAt", "DESC"]]
            })

            if (!getAllEnrollment.length) {
                return res.status(204).send()
            }

            return res.json(getAllEnrollment)
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }

    static async inactivateRecord(req, res) {
        try {
            const studentId = req.params.id

            const people = await database.People.findByPk(studentId)

            if (!people.active) {
                return res.status(400).json({message: "Registration has already been deactivated."})
            }

            database.sequelize.transaction(async transaction => {
                await database.People.update({
                    active: false
                }, {
                    where: {
                        id: Number(studentId)
                    }
                })

                await database.Enrollment.update({
                    status: "cancelled"
                }, {
                    where: {
                        student_id: Number(studentId)
                    }
                })
            })

            return res.json({message: "Registration has been successfully deactivated!"})
        } catch (error) {
            return res.status(500).json("Error: " + error.message)
        }
    }
}

module.exports = PeopleController