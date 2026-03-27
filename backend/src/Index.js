//backend/src/Index.js

const app = require ('./App');
const sequelize = require ('./config/Database');


//importacion de lo modelos
const Voter = require ('./models/Voter');
const Candidate = require ('./models/Candidate')
const Vote = require ('./models/Vote')
require ('dotenv').config();

//establecer relacion voto - votante 1 a1
Voter.hasOne(Vote,{foreignKey: 'voterId' })
Vote.belongsTo(Voter,{foreignKey: 'voterId'})

//relacion candidato - votos 1 a muchos
Candidate.hasMany(Vote, { foreignKey: 'candidateId' });
Vote.belongsTo(Candidate, { foreignKey: 'candidateId' });

const PORT = process.env.PORT || 3000;

//conexion con la bas de datos
async function main (){
    try{
        await sequelize.authenticate();
        console.log('Conexion establecida con exito')
        
        await sequelize.sync({force: false})
        console.log('Modelos soncronizados con DB')
        
   
   app.listen(PORT,() =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
   })
}catch (error){
    console.error('Error de onexion');
   }
}

main(); 