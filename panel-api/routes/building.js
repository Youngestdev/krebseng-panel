const Building = require('../controllers/building');
const express = require('express');
const panel = express.Router();
const checkJwt = require('../middleware/auth');

panel.get('/buildings', checkJwt, Building.list);
panel.get('/building/:id', Building.get);
panel.post('/building', checkJwt, Building.create);
  // panel.route('building/:id').put(Building.put);
  // panel.route('/building/:id').delete(Building.delete);
module.exports = panel;
