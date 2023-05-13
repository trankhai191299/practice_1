const {Sequelize} = require("sequelize")
const sequelize = new Sequelize('practice','root','1234',{
    dialect:'mysql',
    host:'localhost',
    port: 3306,
});

(async () => {
    try {
        await sequelize.authenticate()
        console.log("Sequelize connected");
    } catch (error) {
        console.log("Sequelize error",error);
    }
})();

const User = require('./User')(sequelize)
const Product = require('./Product')(sequelize)

User.hasMany(Product,{foreignKey:'userId'})
Product.belongsTo(User,{foreignKey:'userId'})

module.exports = {
    sequelize,
    User,
    Product
}