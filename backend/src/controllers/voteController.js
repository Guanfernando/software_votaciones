// backend/src/controllers/voteController.js

const sequelize = require ('../config/Database')
const Vote = require ('../models/Vote');
const Voter = require ('../models/Voter');
const Candidate = require ('../models/Candidate');


exports.submitVote = async (req,res) => {
    const t = await sequelize.transaction(); //permite que no se graben datosparciales si algo falla

    try {
        const {voterId, candidateId }= req.body;

        //buscar votante
        const voter = await Voter.findByPk(voterId);
        if (!voter) return res.status(404).json({error: 'Votante no encontrado'})
        
        //verificar si ya voto
        if (voter.hasVoted){
            return res.status(400).json ({error: 'el votante ya ejercio su derecho al voto'})
        }

        //verificar si el candidato existe
        const candidate = await Candidate.findByPk(candidateId);
        if (!candidate) return res.status(404).json({error:'candidato no eencontrado'})

        //registrar voto y actualizar estado
        await Vote.create({voterId, candidateId}, {transaction: t});
        await Voter.update({hasVoted: true}, {where: {id: voterId}, transaction: t})

        await t.commit();
        res.status(201).json ({message: 'Voto registrado exitosamente'})

    } catch (error) {
        await t.rollback();
        res.status(500).json ({error: 'Error al procesar el voto'})
    }
}