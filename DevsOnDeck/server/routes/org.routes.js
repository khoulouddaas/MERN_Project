const OrgController = require("../controllers/org.controller");

module.exports = (app) => {
    app.get('/api/org/allOrganizations', OrgController.findAllOrganizations);
    app.post('/api/org/register', OrgController.register);
    app.post('/api/org/login', OrgController.login);
    app.post('/api/org/logout', OrgController.logout);
    
};
