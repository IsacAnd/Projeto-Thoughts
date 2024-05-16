const express = require('express');
const ThoughtsController = require('../controllers/ThoughtsController');
const router = express.Router();

// helper 
const checkAuth = require('../helpers/auth').checkAuth;

router.post('/edit', checkAuth, ThoughtsController.updateThoughtSave)
router.get('/edit/:id', checkAuth, ThoughtsController.updateThought);
router.post('/remove', checkAuth, ThoughtsController.removeThought);
router.post('/add', checkAuth, ThoughtsController.createThoughtSave);
router.get('/add', checkAuth, ThoughtsController.createThought);
router.get('/dashboard', checkAuth, ThoughtsController.dashboard);
router.get('/', ThoughtsController.showThoughts);

module.exports = router;