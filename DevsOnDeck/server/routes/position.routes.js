const Poscontroller = require('../controllers/position.controller');

module.exports = (app) => {
  app.get('/api/positions', Poscontroller.FindAllPosition);

  app.post('/api/positions', Poscontroller.createPosition);

  app.get('/positions/:positionId', Poscontroller.FindOneSinglePosition);

 
};