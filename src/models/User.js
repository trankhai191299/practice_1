const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) =>{
    return sequelize.define(
        "User",{
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
            },
            name:{
                type:DataTypes.STRING,
                allowNull:false
            },
            role:{
                type:DataTypes.ENUM('USER','ADMIN'),
                defaultValue:'USER',
                allowNull:false
            },
            email:{
                type:DataTypes.STRING,
                allowNull:false,
                unique:'email',
                validate:{
                    isEmail:{
                        msg:'invalid email'
                    },
                    notNull:{
                        msg:'email required'
                    }
                }
            },
            password:{
                type:DataTypes.STRING,
                allowNull:false,
                validate:{
                    notNull:{
                        msg:'password required'
                    }
                },
                set(value){
                    const salt = bcrypt.genSaltSync()
                    const hashedPass = bcrypt.hashSync(value,salt)
                    this.setDataValue('password',hashedPass)
                }
            }

        },{
            tableName:'user',
            timestamps:false,
            defaultScope:{
                attributes:{
                    exclude:['password']
                }
            },
            hooks:{
                afterSave:(record)=>{
                    delete record.dataValues.password
                }
            }
        }
    )
}