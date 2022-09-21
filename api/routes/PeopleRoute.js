const {Router} = require("express")
const PessoaController = require("../controllers/PeopleController")

const router = Router()

router.get("/people", PessoaController.getPeople)
router.get("/people/:id", PessoaController.getPeopleById)
router.get("/people/:id/enrollments", PessoaController.getClassesByEnrollment)
router.get("/people/:studentId/enrollment/:enrollmentId", PessoaController.getEnrollmentByStudent)
router.get("/people/class/:id/confirmed", PessoaController.getEnrollmentByClass)
router.post("/people/student/:id/cancel", PessoaController.inactivateRecord)
router.post("/people/:id/restore", PessoaController.restorePeople)
router.post("/people", PessoaController.storePeople)
router.post("/people/:studentId/enrollment", PessoaController.storeEnrollmentByStudent)
router.put("/people/:id", PessoaController.updatePeople)
router.put("/people/:studentId/enrollment/:enrollmentId", PessoaController.updateEnrollment)
router.delete("/people/:id", PessoaController.deletePeople)
router.delete("/people/:studentId/enrollment/:enrollmentId", PessoaController.deleteEnrollmentByStudent)

module.exports = router