const express = require('express');
const router = express.Router();
const response =  require('../../network/response');
const controller = require('./controller');

router.post('/', function(req, res) {
  controller.addUser(req.body)
    .then((fullUser) => {
      response.success(req, res, fullUser, 201);
    })
    .catch(e => {
      response.error(req, res, 'Información invalida', 400, e)
    })
});

router.get('/', function(req, res) {
  const filter = req.query || null;
  controller.getUser(filter)
    .then((userList) => {
      response.success(req, res, userList);
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    })
});

module.exports = router;