//backend/src/models/Voter.js

const {DataTypes} = require ('sequelize');
const sequelize= require ('../config/Database');

const Voter = sequelize.define('Voter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true}
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
    hasVoted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamp : true
});

module.exports = Voter;