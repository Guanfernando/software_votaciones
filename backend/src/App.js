const express = require ('express');
const cors = require ('cors');
const voterRoutes = require ('./routes/voterRoutes')
const candidateRoutes = require ('./routes/CandidateRoutes')
const voteRoutes = require ('./routes/voteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/voters', voterRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);

app.get ('/', (req,res) => {
res.json ({message: "API software de votaciones"})
})

module.exports = app;