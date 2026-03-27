const express = require ('express');
const router = express.Router();
const candidateController = require ('../controllers/candidateController');

router.post('/', candidateController.createCandidate);
router.get('/', candidateController.getAllCandidates);
router.get('/results', candidateController.getResults);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
