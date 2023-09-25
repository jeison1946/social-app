const express = require('express');
const response =  require('../../network/response');
const router = express.Router();
const controller = require('./controller');

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

router.post('/', function(req, res) {
  controller.addUser(req.body)
    .then((fullUser) => {
      response.success(req, res, fullUser, 201);
    })
    .catch(e => {
      response.error(req, res, e, 400, e)
    })
});

router.post('/login', function(req, res) {
  controller.loginUser(req.body)
    .then((fullUser) => {
      response.success(req, res, fullUser, 201);
    })
    .catch(e => {
      response.error(req, res, e, 403, e)
    })
});

router.patch('/:id', function (req, res) {
  controller.updateUser(req.params.id, req.body)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    });
});

router.delete('/:id', function (req, res) {
  controller.deleteUser(req.params.id)
    .then((result) => {
      response.success(req, res, result, 200);
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    });
});

router.get('/status', function(req, res) {
  const idToken = req.headers['authorization'];
  controller.getStatus(idToken)
  .then((status) => {
    response.success(req, res, status);
  })
  .catch(e => {
    response.error(req, res, 'Unexpected Error', 500, e);
  });
});

module.exports = router;