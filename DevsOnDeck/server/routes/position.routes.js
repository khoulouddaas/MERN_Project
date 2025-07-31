const Poscontroller = require('../controllers/position.controller');

module.exports = (app) => {
  app.get('/api/positions', Poscontroller.FindAllPosition);

  app.post('/api/positions', Poscontroller.createPosition);

  app.get('/api/positions/:positionId', Poscontroller.FindOneSinglePosition);

    app.get('/api/positions/:positionId/devs', Poscontroller.FindDevsForPosition);

 
};