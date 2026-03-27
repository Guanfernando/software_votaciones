// backend/src/models/Vote.js

const { DataTypes } = require ('sequelize')
const sequelize = require ('../config/Database')

const Vote = sequelize.define('Vote',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports= Vote;