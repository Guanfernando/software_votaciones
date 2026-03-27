// backend/src/routes/voteRoutes.js

const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const auth = require('../middlewares/auth');

router.post('/', voteController.submitVote);
 

// Ruta protegida
router.post('/', auth, voteController.submitVote);

module.exports = router;