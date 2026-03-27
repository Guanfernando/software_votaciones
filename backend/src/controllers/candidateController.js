// backend/src/controllers/candicateControllers.js

const Candidate = require ('../models/Candidate');
const sequelize = require ('../config/Database')
const Vote = require ('../models/Vote')

//crear nuevo candidato
exports.createCandidate = async (req,res) => {
    try{
        const  {name, party} =req.body;
        const newCandidate = await Candidate.create({name, party});
        res.status (201).json(newCandidate);
    } catch (error) {
        res.status(400).json({error: 'Error al intentar crear candidato'});
    }
};

// obtener lo candidatos
exports.getAllCandidates = async (req,res) => {
    try {
        const candidates = await Candidate.findAll();
        res.json(candidates)
    } catch (error) {
        res.status(500).json ({error:'Error al intentar obtener candidatos'})
    }
};

//obtener resultados
exports.getResults =async (req, res) =>{
    try{
        const results = await Candidate.findAll({
            attributes: [
                'name',
                'party',
                
                [sequelize.fn('COUNT', sequelize.col('Votes.id')), 'totalVotes']
            ],
            include: [{
                model: Vote,
                attributes: [] 
            }],
            group: ['Candidate.id']
        });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los resultados' });
    }
};

exports.deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Candidate.destroy({ where: { id } });
        
        if (deleted) {
            res.json({ message: `Candidato con ID ${id} eliminado correctamente` });
        } else {
            res.status(404).json({ error: "Candidato no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el candidato" });
    }
};

        
