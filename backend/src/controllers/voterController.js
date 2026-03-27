//backend/src/controllers/voterControllers.js

const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const Voter = require('../models/Voter');

exports.createVoter = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
       
        const newVoter = await Voter.create({ name, email, password:hashedPassword });
        res.status(201).json({message: 'Votante registrado'});
    } catch (error) {
        res.status(400).json({ error: 'Error en el registro'});
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const voter = await Voter.findOne({ where: { email } });

        if (!voter || !(await bcrypt.compare(password, voter.password))) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = jwt.sign({ id: voter.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error en el login" });
    }
};


exports.getAllVoters = async (req, res) => {
    const voters = await Voter.findAll();
    res.json(voters);
};

exports.deleteVoter = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Voter.destroy({ where: { id } });
        
        if (deleted) {
            res.json({ message: `Votante con ID ${id} eliminado correctamente` });
        } else {
            res.status(404).json({ error: "Votante no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el votante" });
    }
};