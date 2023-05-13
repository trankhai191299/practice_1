const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    return sequelize.define(
        'Product',{
            id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true
            },
            userId:{
                type:DataTypes.INTEGER,
                field:'user_id'
            },
            name:{
                type:DataTypes.STRING,
                field:'ten_san_pham'
            }
        },{
            tableName:'product',
            timestamps:false
        }
    );
}