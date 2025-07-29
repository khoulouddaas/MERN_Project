const DevController = require('../controllers/developer.controller');
const {authenticateDev} = require("../config/jwt.config");
const SkillController = require('../controllers/skill.controller');

module.exports = (app) => {
    app.get("/api/devs/allDevs", DevController.findAllDevs)
    app.get("/api/devs/:id", DevController.getOneDev)
    app.post("/api/devs/register", DevController.register)
    app.put("/api/devs/:id", DevController.updateDev)
    app.post("/api/devs/login", DevController.login)
    app.post("/api/devs/logout", DevController.logout)
    app.get("/api/devs", authenticateDev, DevController.getLoggedInDev)
    app.delete("/api/devs/:id", DevController.deleteDev)
    app.get('/api/devswithskills', DevController.getAllDevelopersWithSkills);

app.post('/api/skills/languages/:devId', SkillController.createNewSkill);


}