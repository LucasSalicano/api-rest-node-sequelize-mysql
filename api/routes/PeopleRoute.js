const {Router} = require("express")
const PessoaController = require("../controllers/PeopleController")

const router = Router()

router.get("/people", PessoaController.getPeople)
router.get("/people/:id", PessoaController.getPeopleById)
router.post("/people", PessoaController.storePeople)
router.put("/people/:id", PessoaController.updatePeople)
router.delete("/people/:id", PessoaController.deletePeople)
router.get("/people/:studentId/enrollment/:enrollmentId", PessoaController.findEnrollmentByStudent)
router.post("/people/:studentId/enrollment", PessoaController.storeEnrollmentByStudent)
router.put("/people/:studentId/enrollment/:enrollmentId", PessoaController.updateEnrollment)
router.delete("/people/:studentId/enrollment/:enrollmentId", PessoaController.deleteEnrollmentByStudent)

module.exports = router