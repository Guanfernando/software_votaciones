const express = require ('express');
const cors = require ('cors');
const voterRoutes = require ('./routes/voterRoutes')
const candidateRoutes = require ('./routes/candidateRoutes')
const voteRoutes = require ('./routes/voteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/voters', voterRoutes);
app.use('/candidates', candidateRoutes);
app.use('/votes', voteRoutes);

app.get ('/', (req,res) => {
res.json ({message: "API software de votaciones"})
})

module.exports = app;