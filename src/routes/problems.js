const express = require('express');
const problemsController = require('../controllers/problemsControllers')
const router = express.Router();

router.post('/create', problemsController.create)
router.post('/add', problemsController.addMed)
router.post('/delMed', problemsController.delMed)
router.get('/delPro/:id', problemsController.destroy)
router.get('/index', problemsController.index)
router.post('/query', problemsController.likeQ)
router.post('/update/:id', problemsController.update)
module.exports = router