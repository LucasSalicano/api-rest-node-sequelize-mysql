const {Router} = require("express")
const LevelRoute = require("../controllers/LevelController")

const router = Router()

router.get("/level", LevelRoute.getLevel)

module.exports = router