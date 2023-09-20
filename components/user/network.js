const express = require('express');
const router = express.Router();
const response =  require('../../network/response');
const controller = require('./controller');

router.get('/', function(req, res) {
  controller.getUser()
    .then((userList) => {
      response.success(req, res, userList);
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    })
});

module.exports = router;