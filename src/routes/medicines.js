const express = require('express');
const stockController = require('../controllers/medicinesControllers')
const router = express.Router();

router.get('/medicines', stockController.index);
router.get('/show/:id', stockController.show);
router.post('/medicines', stockController.store); 
router.put('/medicines/:id', stockController.update);
router.get('/del/:id', stockController.destroy);
router.post('/query', stockController.likeQ)

module.exports = router;