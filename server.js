//Server
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const config = require('./config');
const db = require('./db');
//Routes
const router = require('./network/routes');
db(config.dbUrl);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
router(app);

server.listen(3000, function() {
  console.log('La app esta escuchando en localhost:3000');
});