const express = require('express');
const authcontorller = require('../controllers/authcontroller');
const routes = express.Router();

routes.post('/register', authcontorller.store);
routes.post('/auth', authcontorller.auth)
routes.get('/cookiesGet', authcontorller.verifyJWT)
routes.get('/logout', authcontorller.logout)
routes.post('/addFav', authcontorller.addFav)

module.exports = routes;