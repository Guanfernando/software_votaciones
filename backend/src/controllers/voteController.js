// backend/src/controllers/voteController.js

const sequelize = require('../config/Database');
const Vote = require('../models/Vote');
const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');


const submitVote = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const voterId = req.user.id; 
        const { candidateId } = req.body;

       
        const voter = await Voter.findByPk(voterId);
        if (!voter) return res.status(404).json({ error: 'Votante no encontrado' });


        if (voter.hasVoted) {
            return res.status(400).json({ error: 'El votante ya ejerció su derecho al voto' });
        }

        const candidate = await Candidate.findByPk(candidateId);
        if (!candidate) return res.status(404).json({ error: 'Candidato no encontrado' });

        await Vote.create({ voterId, candidateId }, { transaction: t });
        await Voter.update({ hasVoted: true }, { where: { id: voterId }, transaction: t });

        await t.commit();
        res.status(201).json({ message: 'Voto registrado exitosamente' });

    } catch (error) {
        if (t) await t.rollback();
        console.error(error); // Para que veas qué falló en la terminal
        res.status(500).json({ error: 'Error al procesar el voto' });
    }
};


module.exports = { submitVote };