//backend/src/routes/voterRoutes.js

const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voterController');

router.post('/', voterController.createVoter); 
router.get('/', voterController.getAllVoters); 
router.delete('/:id', voterController.deleteVoter);
router.post('/login', voterController.login);
router.post('/', voterController.createVoter);

module.exports = router;