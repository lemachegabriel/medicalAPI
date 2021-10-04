const express = require('express');
const problemsController = require('../controllers/problemsControllers')
const router = express.Router();

router.post('/create', problemsController.create)
router.post('/add', problemsController.addMed)
router.post('/del', problemsController.delMed)
router.get('/index', problemsController.index)
router.post('/query', problemsController.likeQ)
module.exports = router