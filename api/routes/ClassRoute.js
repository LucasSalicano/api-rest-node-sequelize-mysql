const {Router} = require("express")
const classRoute = require("../controllers/ClassController")

const router = Router()

router.get("/class", classRoute.getLevel)

module.exports = router