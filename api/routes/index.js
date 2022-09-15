const bodyParser = require("body-parser")
const people = require("./PeopleRoute")
const level = require("./LevelRoute")
const classRoute = require("./ClassRoute")

module.exports = app => {
    app.get("/", (req, res) => res.send("It's Works!!"))
        .use(bodyParser.json())
        .use(people)
        .use(level)
        .use(classRoute)
}